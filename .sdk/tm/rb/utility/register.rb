# Saladcloud SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

SaladcloudUtility.registrar = ->(u) {
  u.clean = SaladcloudUtilities::Clean
  u.done = SaladcloudUtilities::Done
  u.make_error = SaladcloudUtilities::MakeError
  u.feature_add = SaladcloudUtilities::FeatureAdd
  u.feature_hook = SaladcloudUtilities::FeatureHook
  u.feature_init = SaladcloudUtilities::FeatureInit
  u.fetcher = SaladcloudUtilities::Fetcher
  u.make_fetch_def = SaladcloudUtilities::MakeFetchDef
  u.make_context = SaladcloudUtilities::MakeContext
  u.make_options = SaladcloudUtilities::MakeOptions
  u.make_request = SaladcloudUtilities::MakeRequest
  u.make_response = SaladcloudUtilities::MakeResponse
  u.make_result = SaladcloudUtilities::MakeResult
  u.make_point = SaladcloudUtilities::MakePoint
  u.make_spec = SaladcloudUtilities::MakeSpec
  u.make_url = SaladcloudUtilities::MakeUrl
  u.param = SaladcloudUtilities::Param
  u.prepare_auth = SaladcloudUtilities::PrepareAuth
  u.prepare_body = SaladcloudUtilities::PrepareBody
  u.prepare_headers = SaladcloudUtilities::PrepareHeaders
  u.prepare_method = SaladcloudUtilities::PrepareMethod
  u.prepare_params = SaladcloudUtilities::PrepareParams
  u.prepare_path = SaladcloudUtilities::PreparePath
  u.prepare_query = SaladcloudUtilities::PrepareQuery
  u.graphql_body = SaladcloudUtilities::GraphqlBody
  u.graphql_errors = SaladcloudUtilities::GraphqlErrors
  u.result_basic = SaladcloudUtilities::ResultBasic
  u.result_body = SaladcloudUtilities::ResultBody
  u.result_headers = SaladcloudUtilities::ResultHeaders
  u.transform_request = SaladcloudUtilities::TransformRequest
  u.transform_response = SaladcloudUtilities::TransformResponse
}
