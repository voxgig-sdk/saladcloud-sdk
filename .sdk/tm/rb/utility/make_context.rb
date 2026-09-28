# Saladcloud SDK utility: make_context
require_relative '../core/context'
module SaladcloudUtilities
  MakeContext = ->(ctxmap, basectx) {
    SaladcloudContext.new(ctxmap, basectx)
  }
end
