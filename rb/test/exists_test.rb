# Saladcloud SDK exists test

require "minitest/autorun"
require_relative "../Saladcloud_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = SaladcloudSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
