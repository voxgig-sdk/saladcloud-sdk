-- Saladcloud SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Typed-model annotations (LuaLS ---@class); empty at runtime.
require("saladcloud_types")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local SaladcloudSDK = {}
SaladcloudSDK.__index = SaladcloudSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

SaladcloudSDK._make_feature = _make_feature


function SaladcloudSDK.new(options)
  local self = setmetatable({}, SaladcloudSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config_shared")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- CONSUMED, not kept. `extend` holds feature INSTANCES, and every shipped
  -- feature's init stores `self.client = ctx.client` - so leaving the list
  -- in self.options makes the options map CYCLIC (client.options.extend[1]
  -- .client == client), and options_map()'s vs.clone, which has no cycle
  -- guard, blew the stack on the first prepare_auth of any client built with
  -- an extend feature. The instances live on self.features from here on,
  -- which is the only place anything reads them; the SAME table is
  -- self._rootctx.options, so the root context loses the key too.
  self.options["extend"] = nil

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

    -- feature: debug
  -- feature: idempotency
  -- feature: metrics
  -- feature: paging
  -- feature: ratelimit
  -- feature: retry
  -- feature: test
  -- feature: timeout


  return self
end


function SaladcloudSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function SaladcloudSDK:get_utility()
  return Utility.copy(self._utility)
end


function SaladcloudSDK:get_root_ctx()
  return self._rootctx
end


function SaladcloudSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


-- Raw endpoint access is operator-controllable, like every entity op.
-- Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
-- either one reaches the same endpoint.
function SaladcloudSDK:direct(fetchargs)
  if not self:_op_allowed("direct") then
    return self:_op_denied("direct"), nil
  end

  return self:_raw_request(fetchargs)
end


-- Is this raw-access op permitted by the SDK's allow.op option?
function SaladcloudSDK:_op_allowed(op)
  local allow = vs.getpath(self.options, "allow.op")
  return type(allow) == "string" and allow:find(op, 1, true) ~= nil
end


function SaladcloudSDK:_op_denied(op)
  local allow = vs.getpath(self.options, "allow.op")
  if type(allow) ~= "string" then allow = "" end
  return {
    ok = false,
    err = "SaladcloudSDK: " .. op .. ": operation not allowed by" ..
      " SDK option allow.op value: \"" .. allow .. "\"",
  }
end


-- Ungated request path shared by direct and graphql, each of which checks its
-- own allow.op token first. Private, rather than a flag on fetchargs: a
-- caller-supplied marker would let anyone opt straight back out of the gate
-- by passing it.
function SaladcloudSDK:_raw_request(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end


-- Raw GraphQL access: the pressure valve that makes the generated surface's
-- deliberate omissions (per-call selection sets, typed filter builders,
-- batching, subscriptions) livable — the whole schema stays reachable.
--
-- Thin wrapper over the same prepare/fetch path direct uses, with the one
-- thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200 as
-- a top-level `errors` array, so status alone would report a failed query as
-- ok.
--
-- NOTE: like direct, this bypasses the feature pipeline — no retry, ratelimit
-- or paging features apply.
function SaladcloudSDK:graphql(query, variables, ctrl)
  if not self:_op_allowed("graphql") then
    return self:_op_denied("graphql"), nil
  end

  local res, err = self:_raw_request({
    method = "POST",
    headers = { ["content-type"] = "application/json" },
    body = {
      query = query,
      variables = type(variables) == "table" and variables or {},
    },
    ctrl = type(ctrl) == "table" and ctrl or {},
  })

  if err ~= nil or type(res) ~= "table" then
    return res, err
  end

  -- Errors are read BEFORE any status check: a GraphQL parse or validation
  -- failure comes back as HTTP 400 carrying the standard { errors = {...} }
  -- body, and the raw path represents a non-2xx as ok=false with no err — so
  -- returning early on status would discard the server's own diagnostics,
  -- which are the only useful part of that response.
  local errors = vs.getpath(res, "data.errors")

  if type(errors) == "table" and 0 < #errors then
    local msg = vs.getprop(errors[1], "message")
    if type(msg) ~= "string" or msg == "" then
      msg = "graphql error"
    end
    res.ok = false
    res.err = "SaladcloudSDK: graphql: " .. msg
    res.graphql = errors
  end

  return res, nil
end



-- Idiomatic facade: client:Container():list() / client:Container():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SaladcloudSDK:Container(data)
  local EntityMod = require("entity.container_entity")
  if data == nil then
    if self._container == nil then
      self._container = EntityMod.new(self, nil)
    end
    return self._container
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ContainerGroup():list() / client:ContainerGroup():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SaladcloudSDK:ContainerGroup(data)
  local EntityMod = require("entity.container_group_entity")
  if data == nil then
    if self._container_group == nil then
      self._container_group = EntityMod.new(self, nil)
    end
    return self._container_group
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ContainerGroupInstance():list() / client:ContainerGroupInstance():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SaladcloudSDK:ContainerGroupInstance(data)
  local EntityMod = require("entity.container_group_instance_entity")
  if data == nil then
    if self._container_group_instance == nil then
      self._container_group_instance = EntityMod.new(self, nil)
    end
    return self._container_group_instance
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CpuAvailability():list() / client:CpuAvailability():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SaladcloudSDK:CpuAvailability(data)
  local EntityMod = require("entity.cpu_availability_entity")
  if data == nil then
    if self._cpu_availability == nil then
      self._cpu_availability = EntityMod.new(self, nil)
    end
    return self._cpu_availability
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GpuAvailability():list() / client:GpuAvailability():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SaladcloudSDK:GpuAvailability(data)
  local EntityMod = require("entity.gpu_availability_entity")
  if data == nil then
    if self._gpu_availability == nil then
      self._gpu_availability = EntityMod.new(self, nil)
    end
    return self._gpu_availability
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GpuClass():list() / client:GpuClass():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SaladcloudSDK:GpuClass(data)
  local EntityMod = require("entity.gpu_class_entity")
  if data == nil then
    if self._gpu_class == nil then
      self._gpu_class = EntityMod.new(self, nil)
    end
    return self._gpu_class
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:InferenceEndpoint():list() / client:InferenceEndpoint():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SaladcloudSDK:InferenceEndpoint(data)
  local EntityMod = require("entity.inference_endpoint_entity")
  if data == nil then
    if self._inference_endpoint == nil then
      self._inference_endpoint = EntityMod.new(self, nil)
    end
    return self._inference_endpoint
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:InferenceEndpointJob():list() / client:InferenceEndpointJob():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SaladcloudSDK:InferenceEndpointJob(data)
  local EntityMod = require("entity.inference_endpoint_job_entity")
  if data == nil then
    if self._inference_endpoint_job == nil then
      self._inference_endpoint_job = EntityMod.new(self, nil)
    end
    return self._inference_endpoint_job
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:InferenceEndpointJobCollection():list() / client:InferenceEndpointJobCollection():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SaladcloudSDK:InferenceEndpointJobCollection(data)
  local EntityMod = require("entity.inference_endpoint_job_collection_entity")
  if data == nil then
    if self._inference_endpoint_job_collection == nil then
      self._inference_endpoint_job_collection = EntityMod.new(self, nil)
    end
    return self._inference_endpoint_job_collection
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LogEntry():list() / client:LogEntry():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SaladcloudSDK:LogEntry(data)
  local EntityMod = require("entity.log_entry_entity")
  if data == nil then
    if self._log_entry == nil then
      self._log_entry = EntityMod.new(self, nil)
    end
    return self._log_entry
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Queue():list() / client:Queue():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SaladcloudSDK:Queue(data)
  local EntityMod = require("entity.queue_entity")
  if data == nil then
    if self._queue == nil then
      self._queue = EntityMod.new(self, nil)
    end
    return self._queue
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Quota():list() / client:Quota():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SaladcloudSDK:Quota(data)
  local EntityMod = require("entity.quota_entity")
  if data == nil then
    if self._quota == nil then
      self._quota = EntityMod.new(self, nil)
    end
    return self._quota
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SystemLog():list() / client:SystemLog():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SaladcloudSDK:SystemLog(data)
  local EntityMod = require("entity.system_log_entity")
  if data == nil then
    if self._system_log == nil then
      self._system_log = EntityMod.new(self, nil)
    end
    return self._system_log
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WebhookSecretKey():list() / client:WebhookSecretKey():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SaladcloudSDK:WebhookSecretKey(data)
  local EntityMod = require("entity.webhook_secret_key_entity")
  if data == nil then
    if self._webhook_secret_key == nil then
      self._webhook_secret_key = EntityMod.new(self, nil)
    end
    return self._webhook_secret_key
  end
  return EntityMod.new(self, data)
end




function SaladcloudSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = SaladcloudSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return SaladcloudSDK
