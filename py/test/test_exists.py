# Saladcloud SDK exists test

import pytest
from saladcloud_sdk import SaladcloudSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = SaladcloudSDK.test(None, None)
        assert testsdk is not None
