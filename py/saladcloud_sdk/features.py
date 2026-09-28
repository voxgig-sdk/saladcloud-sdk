# Saladcloud SDK feature factory

from saladcloud_sdk.feature.base_feature import SaladcloudBaseFeature
from saladcloud_sdk.feature.debug_feature import SaladcloudDebugFeature
from saladcloud_sdk.feature.idempotency_feature import SaladcloudIdempotencyFeature
from saladcloud_sdk.feature.metrics_feature import SaladcloudMetricsFeature
from saladcloud_sdk.feature.paging_feature import SaladcloudPagingFeature
from saladcloud_sdk.feature.ratelimit_feature import SaladcloudRatelimitFeature
from saladcloud_sdk.feature.retry_feature import SaladcloudRetryFeature
from saladcloud_sdk.feature.test_feature import SaladcloudTestFeature
from saladcloud_sdk.feature.timeout_feature import SaladcloudTimeoutFeature


_FEATURES = {
    "base": lambda: SaladcloudBaseFeature(),
    "debug": lambda: SaladcloudDebugFeature(),
    "idempotency": lambda: SaladcloudIdempotencyFeature(),
    "metrics": lambda: SaladcloudMetricsFeature(),
    "paging": lambda: SaladcloudPagingFeature(),
    "ratelimit": lambda: SaladcloudRatelimitFeature(),
    "retry": lambda: SaladcloudRetryFeature(),
    "test": lambda: SaladcloudTestFeature(),
    "timeout": lambda: SaladcloudTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
