-- ContainerGroupInstance entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("saladcloud_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("ContainerGroupInstanceEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:ContainerGroupInstance(nil)
    assert.is_not_nil(ent)
  end)

  -- Feature #4: the entity stream(action, ...) method runs the op pipeline and
  -- returns an iterator over result items. With the streaming feature active it
  -- yields the feature's incremental output; otherwise it falls back to the
  -- materialised list so stream always yields.
  it("should stream", function()
    local seed = {
      entity = {
        ["container_group_instance"] = {
          s1 = { id = "s1" },
          s2 = { id = "s2" },
          s3 = { id = "s3" },
        },
      },
    }

    -- Fallback: streaming inactive -> yields the materialised list items.
    local base = sdk.test(seed, nil)
    local seen = {}
    for item in base:ContainerGroupInstance(nil):stream("list", nil, nil) do
      table.insert(seen, item)
    end
    assert.are.equal(3, #seen)

    -- Inbound: streaming active -> yields each item from the feature.
    local config = require("config_shared")()
    if type(config.feature) == "table" and config.feature.streaming ~= nil then
      local streamsdk = sdk.test(seed, { feature = { streaming = { active = true } } })
      local got = {}
      for item in streamsdk:ContainerGroupInstance(nil):stream("list", nil, nil) do
        if vs.islist(item) then
          for _, sub in ipairs(item) do
            table.insert(got, sub)
          end
        else
          table.insert(got, item)
        end
      end
      assert.are.equal(3, #got)
    end
  end)

  it("should run basic flow", function()
    local setup = container_group_instance_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list", "update"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "container_group_instance." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local container_group_instance_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.container_group_instance")))
    local container_group_instance_ref01_data = nil
    if #container_group_instance_ref01_data_raw > 0 then
      container_group_instance_ref01_data = helpers.to_map(container_group_instance_ref01_data_raw[1][2])
    end

    -- LIST
    local container_group_instance_ref01_ent = client:ContainerGroupInstance(nil)
    local container_group_instance_ref01_match = {
      ["container_group_name"] = setup.idmap["container_group_name01"],
      ["organization_name"] = setup.idmap["organization_name01"],
      ["project_id"] = setup.idmap["project01"],
    }

    local container_group_instance_ref01_list_result, err = container_group_instance_ref01_ent:list(container_group_instance_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(container_group_instance_ref01_list_result)

    -- UPDATE
    local container_group_instance_ref01_data_up0_up = {
      id = container_group_instance_ref01_data["id"],
      ["container_id"] = setup.idmap["container_id"],
      ["organization_name"] = setup.idmap["organization_name"],
      ["project_id"] = setup.idmap["project_id"],
    }

    local container_group_instance_ref01_markdef_up0_name = "machine_id"
    local container_group_instance_ref01_markdef_up0_value = "Mark01-container_group_instance_ref01_" .. tostring(setup.now)
    container_group_instance_ref01_data_up0_up[container_group_instance_ref01_markdef_up0_name] = container_group_instance_ref01_markdef_up0_value

    local container_group_instance_ref01_resdata_up0_result, err = container_group_instance_ref01_ent:update(container_group_instance_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local container_group_instance_ref01_resdata_up0 = helpers.to_map(type(container_group_instance_ref01_resdata_up0_result) == 'table' and container_group_instance_ref01_resdata_up0_result.data_get and container_group_instance_ref01_resdata_up0_result:data_get() or container_group_instance_ref01_resdata_up0_result)
    assert.is_not_nil(container_group_instance_ref01_resdata_up0)
    assert.are.equal(container_group_instance_ref01_resdata_up0["id"], container_group_instance_ref01_data_up0_up["id"])
    assert.are.equal(container_group_instance_ref01_resdata_up0[container_group_instance_ref01_markdef_up0_name], container_group_instance_ref01_markdef_up0_value)

  end)
end)

function container_group_instance_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/container_group_instance/ContainerGroupInstanceTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read container_group_instance test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "container_group_instance01", "container_group_instance02", "container_group_instance03", "container01", "container02", "container03", "container_group_name01", "organization_name01", "project01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID"] = idmap,
    ["SALADCLOUD_TEST_LIVE"] = "FALSE",
    ["SALADCLOUD_TEST_EXPLAIN"] = "FALSE",
    ["SALADCLOUD_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["container_id"] == nil then
    idmap_resolved["container_id"] = idmap_resolved["container01"]
  end
  if idmap_resolved["organization_name"] == nil then
    idmap_resolved["organization_name"] = idmap_resolved["organization_name01"]
  end
  if idmap_resolved["project_id"] == nil then
    idmap_resolved["project_id"] = idmap_resolved["project01"]
  end

  if env["SALADCLOUD_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["SALADCLOUD_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["SALADCLOUD_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["SALADCLOUD_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
