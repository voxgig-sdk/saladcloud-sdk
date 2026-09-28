# Saladcloud SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/debug_feature'
require_relative 'feature/idempotency_feature'
require_relative 'feature/metrics_feature'
require_relative 'feature/paging_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module SaladcloudFeatures
  def self.make_feature(name)
    case name
    when "base"
      SaladcloudBaseFeature.new
    when "debug"
      SaladcloudDebugFeature.new
    when "idempotency"
      SaladcloudIdempotencyFeature.new
    when "metrics"
      SaladcloudMetricsFeature.new
    when "paging"
      SaladcloudPagingFeature.new
    when "ratelimit"
      SaladcloudRatelimitFeature.new
    when "retry"
      SaladcloudRetryFeature.new
    when "test"
      SaladcloudTestFeature.new
    when "timeout"
      SaladcloudTimeoutFeature.new
    else
      SaladcloudBaseFeature.new
    end
  end
end
