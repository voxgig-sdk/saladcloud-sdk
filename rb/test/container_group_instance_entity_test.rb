# ContainerGroupInstance entity test

require "minitest/autorun"
require "json"
require_relative "../Saladcloud_sdk"
require_relative "runner"

class ContainerGroupInstanceEntityTest < Minitest::Test
  def test_create_instance
    testsdk = SaladcloudSDK.test(nil, nil)
    ent = testsdk.ContainerGroupInstance(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "container_group_instance" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = SaladcloudSDK.test(seed, nil)
    seen = base.ContainerGroupInstance(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = SaladcloudConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = SaladcloudSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.ContainerGroupInstance(nil).stream("list", nil, nil).each do |item|
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
    setup = container_group_instance_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "update"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "container_group_instance." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    container_group_instance_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.container_group_instance")))
    container_group_instance_ref01_data = nil
    if container_group_instance_ref01_data_raw.length > 0
      container_group_instance_ref01_data = Helpers.to_map(container_group_instance_ref01_data_raw[0][1])
    end

    # LIST
    container_group_instance_ref01_ent = client.ContainerGroupInstance(nil)
    container_group_instance_ref01_match = {
      "container_group_name" => setup[:idmap]["container_group_name01"],
      "organization_name" => setup[:idmap]["organization_name01"],
      "project_id" => setup[:idmap]["project01"],
    }

    container_group_instance_ref01_list_result = container_group_instance_ref01_ent.list(container_group_instance_ref01_match, nil)
    assert container_group_instance_ref01_list_result.is_a?(Array)

    # UPDATE
    container_group_instance_ref01_data_up0_up = {
      "id" => container_group_instance_ref01_data["id"],
      "container_id" => setup[:idmap]["container_id"],
      "organization_name" => setup[:idmap]["organization_name"],
      "project_id" => setup[:idmap]["project_id"],
    }

    container_group_instance_ref01_markdef_up0_name = "machine_id"
    container_group_instance_ref01_markdef_up0_value = "Mark01-container_group_instance_ref01_#{setup[:now]}"
    container_group_instance_ref01_data_up0_up[container_group_instance_ref01_markdef_up0_name] = container_group_instance_ref01_markdef_up0_value

    container_group_instance_ref01_resdata_up0_result = container_group_instance_ref01_ent.update(container_group_instance_ref01_data_up0_up, nil)
    container_group_instance_ref01_resdata_up0 = Helpers.to_map(container_group_instance_ref01_resdata_up0_result.respond_to?(:data_get) ? container_group_instance_ref01_resdata_up0_result.data_get : container_group_instance_ref01_resdata_up0_result)
    assert !container_group_instance_ref01_resdata_up0.nil?
    assert_equal container_group_instance_ref01_resdata_up0["id"], container_group_instance_ref01_data_up0_up["id"]
    assert_equal container_group_instance_ref01_resdata_up0[container_group_instance_ref01_markdef_up0_name], container_group_instance_ref01_markdef_up0_value

  end
end

def container_group_instance_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "container_group_instance", "ContainerGroupInstanceTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = SaladcloudSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["container_group_instance01", "container_group_instance02", "container_group_instance03", "container01", "container02", "container03", "container_group_name01", "organization_name01", "project01"],
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
  entid_env_raw = ENV["SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID" => idmap,
    "SALADCLOUD_TEST_LIVE" => "FALSE",
    "SALADCLOUD_TEST_EXPLAIN" => "FALSE",
    "SALADCLOUD_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["container_id"].nil?
    idmap_resolved["container_id"] = idmap_resolved["container01"]
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
