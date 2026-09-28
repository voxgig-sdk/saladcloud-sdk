

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { SaladcloudSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('InferenceEndpointEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SALADCLOUD_TEST_LIVE=TRUE.
  afterEach(liveDelay('SALADCLOUD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SaladcloudSDK.test()
    const ent = testsdk.InferenceEndpoint()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SALADCLOUD_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'inference_endpoint.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":true,"sh":"The detailed description of the resource.","t":"`$STRING`","key$":"description","index$":0},"display_name":{"a":true,"h":"Display Name","n":"display_name","r":true,"sh":"The display-friendly name of the resource.","t":"`$STRING`","key$":"display_name","index$":1},"icon_url":{"a":true,"fo":"url","h":"Icon Url","n":"icon_url","r":true,"sh":"The URL of the icon image","t":"`$STRING`","key$":"icon_url","index$":2},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":true,"sh":"The inference endpoint identifier.","t":"`$STRING`","key$":"id","index$":3},"input_schema":{"a":true,"h":"Input Schema","n":"input_schema","r":true,"sh":"The input schema","t":"`$STRING`","key$":"input_schema","index$":4},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The inference endpoint name.","t":"`$STRING`","key$":"name","index$":5},"organization_name":{"a":true,"h":"Organization Name","n":"organization_name","r":true,"sh":"The organization name.","t":"`$STRING`","key$":"organization_name","index$":6},"output_schema":{"a":true,"h":"Output Schema","n":"output_schema","r":true,"sh":"The output schema","t":"`$STRING`","key$":"output_schema","index$":7},"price_description":{"a":true,"h":"Price Description","n":"price_description","r":true,"sh":"A description of the price","t":"`$STRING`","key$":"price_description","index$":8},"readme":{"a":true,"h":"Readme","n":"readme","r":true,"sh":"A markdown file containing a detailed description of the inference endpoint","t":"`$STRING`","key$":"readme","index$":9}},"id":{"field":"id","name":"id"},"name":"inference_endpoint","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /organizations/{organization_name}/inference-endpoints","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_name","or":"organization_name","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/organizations/{organization_name}/inference-endpoints","q":{"exist":["organization_name","page","page_size"]},"r":{},"s":[{"lit":"organizations"},{"var":"organization_name"},{"lit":"inference-endpoints"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"inference_endpoint_name","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_name","or":"organization_name","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}","q":{"exist":["id","organization_name"]},"r":{"param":{"inference_endpoint_name":"id"}},"s":[{"lit":"organizations"},{"var":"organization_name"},{"lit":"inference-endpoints"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs/{inference_endpoint_job_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"inference_endpoint_id","or":"inference_endpoint_name","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"inference_endpoint_job_id","or":"inference_endpoint_job_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_name","or":"organization_name","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"DELETE","o":"/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs/{inference_endpoint_job_id}","q":{"exist":["inference_endpoint_id","inference_endpoint_job_id","organization_name"]},"r":{"param":{"inference_endpoint_name":"inference_endpoint_id"}},"s":[{"lit":"organizations"},{"var":"organization_name"},{"lit":"inference-endpoints"},{"var":"inference_endpoint_id"},{"lit":"jobs"},{"var":"inference_endpoint_job_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"inference_endpoint","name__orig":"inference_endpoint","Name":"InferenceEndpoint","name_":"inference_endpoint","name-":"inference-endpoint","NAME":"INFERENCE_ENDPOINT","index$":6}, {"active":true,"entity":"inference_endpoint","key$":"BasicInferenceEndpointFlow","kind":"basic","name":"BasicInferenceEndpointFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_name":"organization_name01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"inference_endpoint_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"inference_endpoint_ref01","srcdatavar":"inference_endpoint_ref01_data","suffix":"_dt0"},"m":{"id":"inference_endpoint01","organization_name":"organization_name01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-inference_endpoint_ref01"}}],"index$":1}]}, 'InferenceEndpoint', {"GET /organizations/{organization_name}/inference-endpoints":{"protocol":"http","parameters":[{"name":"organization_name","in":"path","description":"Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.","required":true,"schema":{"description":"The organization name.","type":"string","examples":["acme-corp"],"maxLength":63,"minLength":2,"pattern":"^[a-z][a-z0-9-]{0,61}[a-z0-9]$","title":"Organization Name","x-ref":"#/components/schemas/OrganizationName"},"x-ref":"#/components/parameters/organization_name","index$":0},{"in":"query","name":"page","description":"The page number.","schema":{"description":"The page number.","type":"integer","format":"int32","examples":[1],"maximum":2147483647,"minimum":1,"x-ref":"#/components/schemas/Page"},"x-ref":"#/components/parameters/Page","index$":1},{"in":"query","name":"page_size","description":"The maximum number of items per page.","schema":{"description":"The maximum number of items per page.","type":"integer","format":"int32","examples":[1],"maximum":100,"minimum":1,"x-ref":"#/components/schemas/PageSize"},"x-ref":"#/components/parameters/PageSize","index$":2}]},"GET /organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}":{"protocol":"http","parameters":[{"name":"organization_name","in":"path","description":"Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.","required":true,"schema":{"description":"The organization name.","type":"string","examples":["acme-corp"],"maxLength":63,"minLength":2,"pattern":"^[a-z][a-z0-9-]{0,61}[a-z0-9]$","title":"Organization Name","x-ref":"#/components/schemas/OrganizationName"},"x-ref":"#/components/parameters/organization_name","index$":0},{"name":"inference_endpoint_name","in":"path","description":"The inference endpoint name.","required":true,"schema":{"description":"The inference endpoint name.","type":"string","examples":["transcribe"],"maxLength":63,"minLength":2,"pattern":"^[a-z][a-z0-9-]{0,61}[a-z0-9]$","title":"Inference Endpoint Name","x-ref":"#/components/schemas/InferenceEndpointName"},"x-ref":"#/components/parameters/inference_endpoint_name","index$":1}]},"DELETE /organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs/{inference_endpoint_job_id}":{"protocol":"http","parameters":[{"name":"organization_name","in":"path","description":"Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.","required":true,"schema":{"description":"The organization name.","type":"string","examples":["acme-corp"],"maxLength":63,"minLength":2,"pattern":"^[a-z][a-z0-9-]{0,61}[a-z0-9]$","title":"Organization Name","x-ref":"#/components/schemas/OrganizationName"},"x-ref":"#/components/parameters/organization_name","index$":0},{"name":"inference_endpoint_name","in":"path","description":"The inference endpoint name.","required":true,"schema":{"description":"The inference endpoint name.","type":"string","examples":["transcribe"],"maxLength":63,"minLength":2,"pattern":"^[a-z][a-z0-9-]{0,61}[a-z0-9]$","title":"Inference Endpoint Name","x-ref":"#/components/schemas/InferenceEndpointName"},"x-ref":"#/components/parameters/inference_endpoint_name","index$":1},{"name":"inference_endpoint_job_id","description":"The inference endpoint job identifier.","in":"path","required":true,"schema":{"description":"The inference endpoint job identifier.","type":"string","format":"uuid","examples":["2fc459a1-1c09-4a34-ade7-54d03fc51d6a"],"title":"Inference Endpoint Job ID","x-ref":"#/components/schemas/InferenceEndpointJobId"},"x-ref":"#/components/parameters/inference_endpoint_job_id","index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let inference_endpoint_ref01_data = Object.values(setup.data.existing.inference_endpoint)[0] as any

    // LIST
    const inference_endpoint_ref01_ent = client.InferenceEndpoint()
    const inference_endpoint_ref01_match: any = {}
    inference_endpoint_ref01_match['organization_name'] = setup.idmap['organization_name01']

    const inference_endpoint_ref01_list = (await inference_endpoint_ref01_ent.list(inference_endpoint_ref01_match)).map((e: any) => e.data())


    // LOAD
    const inference_endpoint_ref01_match_dt0: any = {}
    inference_endpoint_ref01_match_dt0.id = inference_endpoint_ref01_data.id
    const inference_endpoint_ref01_data_dt0 = (await inference_endpoint_ref01_ent.load(inference_endpoint_ref01_match_dt0)).data()
    assert(inference_endpoint_ref01_data_dt0.id === inference_endpoint_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/inference_endpoint/InferenceEndpointTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = SaladcloudSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['inference_endpoint01','inference_endpoint02','inference_endpoint03','organization_name01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SALADCLOUD_TEST_INFERENCE_ENDPOINT_ENTID': idmap,
    'SALADCLOUD_TEST_LIVE': 'FALSE',
    'SALADCLOUD_TEST_EXPLAIN': 'FALSE',
    'SALADCLOUD_APIKEY': '',
  })

  idmap = env['SALADCLOUD_TEST_INFERENCE_ENDPOINT_ENTID']

  const live = 'TRUE' === env.SALADCLOUD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SALADCLOUD_TEST_INFERENCE_ENDPOINT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new SaladcloudSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.SALADCLOUD_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.SALADCLOUD_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
