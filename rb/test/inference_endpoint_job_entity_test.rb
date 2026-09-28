# InferenceEndpointJob entity test

require "minitest/autorun"
require "json"
require_relative "../Saladcloud_sdk"
require_relative "runner"

class InferenceEndpointJobEntityTest < Minitest::Test
  def test_create_instance
    testsdk = SaladcloudSDK.test(nil, nil)
    ent = testsdk.InferenceEndpointJob(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = inference_endpoint_job_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "inference_endpoint_job." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    inference_endpoint_job_ref01_ent = client.InferenceEndpointJob(nil)
    inference_endpoint_job_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.inference_endpoint_job"), "inference_endpoint_job_ref01"))
    inference_endpoint_job_ref01_data["inference_endpoint_id"] = setup[:idmap]["inference_endpoint01"]
    inference_endpoint_job_ref01_data["inference_endpoint_name"] = setup[:idmap]["inference_endpoint_name01"]
    inference_endpoint_job_ref01_data["organization_name"] = setup[:idmap]["organization_name01"]

    inference_endpoint_job_ref01_data_result = inference_endpoint_job_ref01_ent.create(inference_endpoint_job_ref01_data, nil)
    inference_endpoint_job_ref01_data = Helpers.to_map(inference_endpoint_job_ref01_data_result.respond_to?(:data_get) ? inference_endpoint_job_ref01_data_result.data_get : inference_endpoint_job_ref01_data_result)
    assert !inference_endpoint_job_ref01_data.nil?
    assert !inference_endpoint_job_ref01_data["id"].nil?

    # LOAD
    inference_endpoint_job_ref01_match_dt0 = {
      "id" => inference_endpoint_job_ref01_data["id"],
    }
    inference_endpoint_job_ref01_data_dt0_loaded = inference_endpoint_job_ref01_ent.load(inference_endpoint_job_ref01_match_dt0, nil)
    inference_endpoint_job_ref01_data_dt0_load_result = Helpers.to_map(inference_endpoint_job_ref01_data_dt0_loaded.respond_to?(:data_get) ? inference_endpoint_job_ref01_data_dt0_loaded.data_get : inference_endpoint_job_ref01_data_dt0_loaded)
    assert !inference_endpoint_job_ref01_data_dt0_load_result.nil?
    assert_equal inference_endpoint_job_ref01_data_dt0_load_result["id"], inference_endpoint_job_ref01_data["id"]

  end
end

def inference_endpoint_job_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "inference_endpoint_job", "InferenceEndpointJobTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = SaladcloudSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["inference_endpoint_job01", "inference_endpoint_job02", "inference_endpoint_job03", "inference_endpoint01", "inference_endpoint02", "inference_endpoint03", "inference_endpoint_name01", "organization_name01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_ENTID" => idmap,
    "SALADCLOUD_TEST_LIVE" => "FALSE",
    "SALADCLOUD_TEST_EXPLAIN" => "FALSE",
    "SALADCLOUD_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["SALADCLOUD_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["SALADCLOUD_APIKEY"],
      },
      extra || {},
    ])
    client = SaladcloudSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["SALADCLOUD_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["SALADCLOUD_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
