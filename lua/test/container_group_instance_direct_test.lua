-- ContainerGroupInstance direct test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("saladcloud_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

describe("ContainerGroupInstanceDirect", function()
  it("should direct-list-container_group_instance", function()
    local setup = container_group_instance_direct_setup({
      { id = "direct01" },
      { id = "direct02" },
    })
    local _should_skip, _reason = runner.is_control_skipped("direct", "direct-list-container_group_instance", setup.live and "live" or "unit")
    if _should_skip then
      pending(_reason or "skipped via sdk-test-control.json")
      return
    end
    if setup.live then
      for _, _live_key in ipairs({"container_group_name01", "organization_name01", "project01"}) do
        if setup.idmap[_live_key] == nil then
          pending("live test needs " .. _live_key .. " via *_ENTID env var (synthetic IDs only)")
          return
        end
      end
    end
    local client = setup.client

    local params = {}
    if setup.live then
      params["container_group_name"] = setup.idmap["container_group_name01"]
    else
      params["container_group_name"] = "direct01"
    end
    if setup.live then
      params["organization_name"] = setup.idmap["organization_name01"]
    else
      params["organization_name"] = "direct01"
    end
    if setup.live then
      params["project_id"] = setup.idmap["project01"]
    else
      params["project_id"] = "direct01"
    end

    local result, err = client:direct({
      path = "organizations/{organization_name}/projects/{project_id}/containers/{container_group_name}/instances",
      method = "GET",
      params = params,
    })
    if setup.live then
      -- Live mode is lenient: synthetic IDs frequently 4xx and the list-
      -- response shape varies wildly across public APIs. Skip rather than
      -- fail when the call doesn't return a usable list.
      if err ~= nil then
        pending("list call failed (likely synthetic IDs against live API): " .. tostring(err))
        return
      end
      if not result["ok"] then
        pending("list call not ok (likely synthetic IDs against live API)")
        return
      end
      local status = helpers.to_int(result["status"])
      if status < 200 or status >= 300 then
        pending("expected 2xx status, got " .. tostring(status))
        return
      end
    else
      assert.is_nil(err)
      assert.is_true(result["ok"])
      assert.are.equal(200, helpers.to_int(result["status"]))
      assert.is_table(result["data"])
      assert.are.equal(2, #result["data"])
      assert.are.equal(1, #setup.calls)
    end
  end)

end)


function container_group_instance_direct_setup(mockres)
  runner.load_env_local()

  local calls = {}

  local env = runner.env_override({
    ["SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID"] = {},
    ["SALADCLOUD_TEST_LIVE"] = "FALSE",
    ["SALADCLOUD_APIKEY"] = "",
  })

  local live = env["SALADCLOUD_TEST_LIVE"] == "TRUE"

  if live then
    local merged_opts = {
      apikey = env["SALADCLOUD_APIKEY"],
    }
    -- sdk-test-control.json's test.client.options goes UNDER the generated
    -- fields: it adds to the live client, it does not redirect it.
    for _k, _v in pairs(runner.live_client_options()) do
      if merged_opts[_k] == nil then
        merged_opts[_k] = _v
      end
    end
    local client = sdk.new(merged_opts)
    return {
      client = client,
      calls = calls,
      live = true,
      idmap = {},
    }
  end

  local function mock_fetch(url, init)
    table.insert(calls, { url = url, init = init })
    return {
      status = 200,
      statusText = "OK",
      headers = {},
      json = function()
        if mockres ~= nil then
          return mockres
        end
        return { id = "direct01" }
      end,
      body = "mock",
    }, nil
  end

  local client = sdk.new({
    base = "http://localhost:8080",
    system = {
      fetch = mock_fetch,
    },
  })

  return {
    client = client,
    calls = calls,
    live = false,
    idmap = {},
  }
end
