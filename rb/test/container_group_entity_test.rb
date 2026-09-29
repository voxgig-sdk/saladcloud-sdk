# ContainerGroup entity test

require "minitest/autorun"
require "json"
require_relative "../Saladcloud_sdk"
require_relative "runner"

class ContainerGroupEntityTest < Minitest::Test
  def test_create_instance
    testsdk = SaladcloudSDK.test(nil, nil)
    ent = testsdk.ContainerGroup(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = container_group_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "container_group." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set SALADCLOUD_TEST_CONTAINER_GROUP_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    container_group_ref01_ent = client.ContainerGroup(nil)
    container_group_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.container_group"), "container_group_ref01"))
    container_group_ref01_data["container_id"] = setup[:idmap]["container01"]
    container_group_ref01_data["instance_id"] = setup[:idmap]["instance01"]
    container_group_ref01_data["organization_name"] = setup[:idmap]["organization_name01"]
    container_group_ref01_data["project_id"] = setup[:idmap]["project01"]

    container_group_ref01_data_result = container_group_ref01_ent.create(container_group_ref01_data, nil)
    container_group_ref01_data = Helpers.to_map(container_group_ref01_data_result.respond_to?(:data_get) ? container_group_ref01_data_result.data_get : container_group_ref01_data_result)
    assert !container_group_ref01_data.nil?
    assert !container_group_ref01_data["id"].nil?

    # LOAD
    container_group_ref01_match_dt0 = {
      "id" => container_group_ref01_data["id"],
    }
    container_group_ref01_data_dt0_loaded = container_group_ref01_ent.load(container_group_ref01_match_dt0, nil)
    container_group_ref01_data_dt0_load_result = Helpers.to_map(container_group_ref01_data_dt0_loaded.respond_to?(:data_get) ? container_group_ref01_data_dt0_loaded.data_get : container_group_ref01_data_dt0_loaded)
    assert !container_group_ref01_data_dt0_load_result.nil?
    assert_equal container_group_ref01_data_dt0_load_result["id"], container_group_ref01_data["id"]

  end
end

def container_group_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "container_group", "ContainerGroupTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = SaladcloudSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["container_group01", "container_group02", "container_group03", "container01", "container02", "container03", "instance01", "organization_name01", "project01"],
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
  entid_env_raw = ENV["SALADCLOUD_TEST_CONTAINER_GROUP_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "SALADCLOUD_TEST_CONTAINER_GROUP_ENTID" => idmap,
    "SALADCLOUD_TEST_LIVE" => "FALSE",
    "SALADCLOUD_TEST_EXPLAIN" => "FALSE",
    "SALADCLOUD_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["SALADCLOUD_TEST_CONTAINER_GROUP_ENTID"])
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
