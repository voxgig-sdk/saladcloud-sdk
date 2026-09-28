package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewContainerEntityFunc func(client *SaladcloudSDK, entopts map[string]any) SaladcloudEntity

var NewContainerGroupEntityFunc func(client *SaladcloudSDK, entopts map[string]any) SaladcloudEntity

var NewContainerGroupInstanceEntityFunc func(client *SaladcloudSDK, entopts map[string]any) SaladcloudEntity

var NewCpuAvailabilityEntityFunc func(client *SaladcloudSDK, entopts map[string]any) SaladcloudEntity

var NewGpuAvailabilityEntityFunc func(client *SaladcloudSDK, entopts map[string]any) SaladcloudEntity

var NewGpuClassEntityFunc func(client *SaladcloudSDK, entopts map[string]any) SaladcloudEntity

var NewInferenceEndpointEntityFunc func(client *SaladcloudSDK, entopts map[string]any) SaladcloudEntity

var NewInferenceEndpointJobEntityFunc func(client *SaladcloudSDK, entopts map[string]any) SaladcloudEntity

var NewInferenceEndpointJobCollectionEntityFunc func(client *SaladcloudSDK, entopts map[string]any) SaladcloudEntity

var NewLogEntryEntityFunc func(client *SaladcloudSDK, entopts map[string]any) SaladcloudEntity

var NewQueueEntityFunc func(client *SaladcloudSDK, entopts map[string]any) SaladcloudEntity

var NewQuotaEntityFunc func(client *SaladcloudSDK, entopts map[string]any) SaladcloudEntity

var NewSystemLogEntityFunc func(client *SaladcloudSDK, entopts map[string]any) SaladcloudEntity

var NewWebhookSecretKeyEntityFunc func(client *SaladcloudSDK, entopts map[string]any) SaladcloudEntity

