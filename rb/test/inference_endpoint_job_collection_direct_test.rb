# InferenceEndpointJobCollection direct test

require "minitest/autorun"
require "json"
require_relative "../Saladcloud_sdk"
require_relative "runner"

class InferenceEndpointJobCollectionDirectTest < Minitest::Test
  def test_direct_list_inference_endpoint_job_collection
    setup = inference_endpoint_job_collection_direct_setup([
      { "id" => "direct01" },
      { "id" => "direct02" },
    ])
    _should_skip, _reason = Runner.is_control_skipped("direct", "direct-list-inference_endpoint_job_collection", setup[:live] ? "live" : "unit")
    if _should_skip
      skip(_reason || "skipped via sdk-test-control.json")
      return
    end
    if setup[:live]
      ["inference_endpoint_name01", "organization_name01"].each do |_live_key|
        if setup[:idmap][_live_key].nil?
          skip "live test needs #{_live_key} via *_ENTID env var (synthetic IDs only)"
          return
        end
      end
    end
    client = setup[:client]

    params = {}
    if setup[:live]
      params["inference_endpoint_name"] = setup[:idmap]["inference_endpoint_name01"]
    else
      params["inference_endpoint_name"] = "direct01"
    end
    if setup[:live]
      params["organization_name"] = setup[:idmap]["organization_name01"]
    else
      params["organization_name"] = "direct01"
    end

    result = client.direct({
      "path" => "organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs",
      "method" => "GET",
      "params" => params,
    })
    if setup[:live]
      # Live mode is lenient: synthetic IDs frequently 4xx and the list-
      # response shape varies wildly across public APIs. Skip rather than
      # fail when the call doesn't return a usable list.
      if !result["err"].nil?
        skip("list call failed (likely synthetic IDs against live API): #{result["err"]}")
        return
      end
      unless result["ok"]
        skip("list call not ok (likely synthetic IDs against live API)")
        return
      end
      status = Helpers.to_int(result["status"])
      if status < 200 || status >= 300
        skip("expected 2xx status, got #{status}")
        return
      end
    else
      assert_nil result["err"]
      assert result["ok"]
      assert_equal 200, Helpers.to_int(result["status"])
      assert result["data"].is_a?(Array)
      assert_equal 2, result["data"].length
      assert_equal 1, setup[:calls].length
    end
  end

end


def inference_endpoint_job_collection_direct_setup(mockres)
  Runner.load_env_local

  calls = []

  env = Runner.env_override({
    "SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_COLLECTION_ENTID" => {},
    "SALADCLOUD_TEST_LIVE" => "FALSE",
    "SALADCLOUD_APIKEY" => "",
  })

  live = env["SALADCLOUD_TEST_LIVE"] == "TRUE"

  if live
    # Merged so the generated fields win: sdk-test-control.json's
    # test.client.options adds to the live client, it does not redirect it.
    merged_opts = Runner.live_client_options.merge({
      "apikey" => env["SALADCLOUD_APIKEY"],
    })
    client = SaladcloudSDK.new(merged_opts)
    return {
      client: client,
      calls: calls,
      live: true,
      idmap: {},
    }
  end

  mock_fetch = ->(url, init) {
    calls.push({ "url" => url, "init" => init })
    return {
      "status" => 200,
      "statusText" => "OK",
      "headers" => {},
      "json" => ->() {
        if !mockres.nil?
          return mockres
        end
        return { "id" => "direct01" }
      },
      "body" => "mock",
    }, nil
  }

  client = SaladcloudSDK.new({
    "base" => "http://localhost:8080",
    "system" => {
      "fetch" => mock_fetch,
    },
  })

  {
    client: client,
    calls: calls,
    live: false,
    idmap: {},
  }
end
