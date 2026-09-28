# Saladcloud SDK utility: make_context

from saladcloud_sdk.core.context import SaladcloudContext


def make_context_util(ctxmap, basectx):
    return SaladcloudContext(ctxmap, basectx)
