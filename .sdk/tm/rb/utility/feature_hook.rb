# Saladcloud SDK utility: feature_hook
module SaladcloudUtilities
  FeatureHook = ->(ctx, name) {
    return unless ctx.client
    features = ctx.client.features
    return unless features
    features.each do |f|
      f.send(name, ctx) if f.respond_to?(name)
    end
  }
end
