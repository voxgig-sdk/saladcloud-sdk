# Container entity test

require "minitest/autorun"
require "json"
require_relative "../Saladcloud_sdk"
require_relative "runner"

class ContainerEntityTest < Minitest::Test
  def test_create_instance
    testsdk = SaladcloudSDK.test(nil, nil)
    ent = testsdk.Container(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "container" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = SaladcloudSDK.test(seed, nil)
    seen = base.Container(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = SaladcloudConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = SaladcloudSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Container(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = container_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "container." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set SALADCLOUD_TEST_CONTAINER_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    container_ref01_ent = client.Container(nil)
    container_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.container"), "container_ref01"))
    container_ref01_data["organization_name"] = setup[:idmap]["organization_name01"]
    container_ref01_data["project_id"] = setup[:idmap]["project01"]
    container_ref01_data["project_name"] = setup[:idmap]["project_name01"]

    container_ref01_data_result = container_ref01_ent.create(container_ref01_data, nil)
    container_ref01_data = Helpers.to_map(container_ref01_data_result.respond_to?(:data_get) ? container_ref01_data_result.data_get : container_ref01_data_result)
    assert !container_ref01_data.nil?
    assert !container_ref01_data["id"].nil?

    # LIST
    container_ref01_match = {
      "organization_name" => setup[:idmap]["organization_name01"],
      "project_name" => setup[:idmap]["project_name01"],
    }

    container_ref01_list_result = container_ref01_ent.list(container_ref01_match, nil)
    assert container_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(container_ref01_list_result),
      { "id" => container_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # UPDATE
    container_ref01_data_up0_up = {
      "id" => container_ref01_data["id"],
      "organization_name" => setup[:idmap]["organization_name"],
      "project_id" => setup[:idmap]["project_id"],
    }

    container_ref01_markdef_up0_name = "create_time"
    container_ref01_markdef_up0_value = "Mark01-container_ref01_#{setup[:now]}"
    container_ref01_data_up0_up[container_ref01_markdef_up0_name] = container_ref01_markdef_up0_value

    container_ref01_resdata_up0_result = container_ref01_ent.update(container_ref01_data_up0_up, nil)
    container_ref01_resdata_up0 = Helpers.to_map(container_ref01_resdata_up0_result.respond_to?(:data_get) ? container_ref01_resdata_up0_result.data_get : container_ref01_resdata_up0_result)
    assert !container_ref01_resdata_up0.nil?
    assert_equal container_ref01_resdata_up0["id"], container_ref01_data_up0_up["id"]
    assert_equal container_ref01_resdata_up0[container_ref01_markdef_up0_name], container_ref01_markdef_up0_value

    # LOAD
    container_ref01_match_dt0 = {
      "id" => container_ref01_data["id"],
    }
    container_ref01_data_dt0_loaded = container_ref01_ent.load(container_ref01_match_dt0, nil)
    container_ref01_data_dt0_load_result = Helpers.to_map(container_ref01_data_dt0_loaded.respond_to?(:data_get) ? container_ref01_data_dt0_loaded.data_get : container_ref01_data_dt0_loaded)
    assert !container_ref01_data_dt0_load_result.nil?
    assert_equal container_ref01_data_dt0_load_result["id"], container_ref01_data["id"]

    # REMOVE
    container_ref01_match_rm0 = {
      "id" => container_ref01_data["id"],
    }
    container_ref01_ent.remove(container_ref01_match_rm0, nil)

    # LIST
    container_ref01_match_rt0 = {
      "organization_name" => setup[:idmap]["organization_name01"],
      "project_name" => setup[:idmap]["project_name01"],
    }

    container_ref01_list_rt0_result = container_ref01_ent.list(container_ref01_match_rt0, nil)
    assert container_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(container_ref01_list_rt0_result),
      { "id" => container_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def container_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "container", "ContainerTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = SaladcloudSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["container01", "container02", "container03", "organization_name01", "project01", "project_name01"],
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
  entid_env_raw = ENV["SALADCLOUD_TEST_CONTAINER_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "SALADCLOUD_TEST_CONTAINER_ENTID" => idmap,
    "SALADCLOUD_TEST_LIVE" => "FALSE",
    "SALADCLOUD_TEST_EXPLAIN" => "FALSE",
    "SALADCLOUD_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["SALADCLOUD_TEST_CONTAINER_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["organization_name"].nil?
    idmap_resolved["organization_name"] = idmap_resolved["organization_name01"]
  end
  if idmap_resolved["project_id"].nil?
    idmap_resolved["project_id"] = idmap_resolved["project01"]
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
