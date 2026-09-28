-- Saladcloud SDK error

local SaladcloudError = {}
SaladcloudError.__index = SaladcloudError


function SaladcloudError.new(code, msg, ctx)
  local self = setmetatable({}, SaladcloudError)
  self.is_sdk_error = true
  self.sdk = "Saladcloud"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function SaladcloudError:error()
  return self.msg
end


function SaladcloudError:__tostring()
  return self.msg
end


return SaladcloudError
