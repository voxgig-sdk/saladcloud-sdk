

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


describe('InferenceEndpointJobEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SALADCLOUD_TEST_LIVE=TRUE.
  afterEach(liveDelay('SALADCLOUD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SaladcloudSDK.test()
    const ent = testsdk.InferenceEndpointJob()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SALADCLOUD_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'inference_endpoint_job.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"create_time":{"a":true,"fo":"date-time","h":"Create Time","n":"create_time","r":true,"sh":"The time the job was created.","t":"`$STRING`","key$":"create_time","index$":0},"events":{"a":true,"h":"Events","n":"events","r":true,"sh":"The list of events.","t":"`$ARRAY`","key$":"events","index$":1},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":true,"sh":"The inference endpoint job identifier.","t":"`$STRING`","key$":"id","index$":2},"inference_endpoint_name":{"a":true,"h":"Inference Endpoint Name","n":"inference_endpoint_name","r":true,"sh":"The inference endpoint name.","t":"`$STRING`","key$":"inference_endpoint_name","index$":3},"input":{"a":true,"h":"Input","n":"input","r":true,"sh":"The job input.","t":"`$ANY`","key$":"input","index$":4},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"sh":"The job metadata.","t":"`$OBJECT`","key$":"metadata","index$":5},"organization_name":{"a":true,"h":"Organization Name","n":"organization_name","r":true,"sh":"The organization name.","t":"`$STRING`","key$":"organization_name","index$":6},"output":{"a":true,"h":"Output","n":"output","r":false,"sh":"The job output.","t":"`$ANY`","key$":"output","index$":7},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"The current status.","t":"`$STRING`","key$":"status","index$":8},"update_time":{"a":true,"fo":"date-time","h":"Update Time","n":"update_time","r":true,"sh":"The time the job was last updated.","t":"`$STRING`","key$":"update_time","index$":9},"webhook":{"a":true,"de":true,"fo":"url","h":"Webhook","n":"webhook","r":false,"sh":"The webhook URL called when the job completes.","t":"`$STRING`","key$":"webhook","index$":10},"webhook_url":{"a":true,"fo":"url","h":"Webhook Url","n":"webhook_url","r":false,"sh":"The webhook URL called when the job completes.","t":"`$STRING`","key$":"webhook_url","index$":11}},"id":{"field":"id","name":"id"},"name":"inference_endpoint_job","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"inference_endpoint_name","or":"inference_endpoint_name","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_name","or":"organization_name","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs","q":{"exist":["inference_endpoint_name","organization_name"]},"r":{},"s":[{"lit":"organizations"},{"var":"organization_name"},{"lit":"inference-endpoints"},{"var":"inference_endpoint_name"},{"lit":"jobs"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs/{inference_endpoint_job_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"inference_endpoint_job_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"inference_endpoint_id","or":"inference_endpoint_name","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_name","or":"organization_name","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs/{inference_endpoint_job_id}","q":{"exist":["id","inference_endpoint_id","organization_name"]},"r":{"param":{"inference_endpoint_job_id":"id","inference_endpoint_name":"inference_endpoint_id"}},"s":[{"lit":"organizations"},{"var":"organization_name"},{"lit":"inference-endpoints"},{"var":"inference_endpoint_id"},{"lit":"jobs"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.inference_endpoint"]]},"key$":"inference_endpoint_job","name__orig":"inference_endpoint_job","Name":"InferenceEndpointJob","name_":"inference_endpoint_job","name-":"inference-endpoint-job","NAME":"INFERENCE_ENDPOINT_JOB","index$":7}, {"active":true,"entity":"inference_endpoint_job","key$":"BasicInferenceEndpointJobFlow","kind":"basic","name":"BasicInferenceEndpointJobFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"inference_endpoint_job_ref01"},"m":{"inference_endpoint_id":"inference_endpoint01","inference_endpoint_name":"inference_endpoint_name01","organization_name":"organization_name01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"inference_endpoint_job_ref01","srcdatavar":"inference_endpoint_job_ref01_data","suffix":"_dt0"},"m":{"id":"inference_endpoint_job01","inference_endpoint_id":"inference_endpoint01","organization_name":"organization_name01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-inference_endpoint_job_ref01"}}],"index$":1}]}, 'InferenceEndpointJob', {"POST /organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"description":"Represents a request to create a inference endpoint job","type":"object","properties":{"input":{"description":"The job input. May be any valid JSON.","title":"Input","x-ref":"#/components/schemas/InferenceEndpointJobInput","key$":"input"},"metadata":{"description":"The job metadata. May be any valid JSON.","type":"object","maxProperties":20,"title":"Metadata","x-ref":"#/components/schemas/InferenceEndpointJobMetadata","key$":"metadata"},"webhook":{"description":"The webhook URL to which the job results will be POSTed.","type":"string","format":"url","deprecated":true,"maxLength":2048,"minLength":1,"key$":"webhook"},"webhook_url":{"description":"The webhook URL to which the job results will be POSTed.","type":"string","format":"url","examples":["https://webhook.example.com/events"],"maxLength":2048,"minLength":1,"key$":"webhook_url"}},"required":["input"],"x-ref":"#/components/schemas/InferenceEndpointJobPrototype","index$":1}}},"x-ref":"#/components/requestBodies/CreateInferenceEndpointJob"},"parameters":[{"name":"organization_name","in":"path","description":"Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.","required":true,"schema":{"description":"The organization name.","type":"string","examples":["acme-corp"],"maxLength":63,"minLength":2,"pattern":"^[a-z][a-z0-9-]{0,61}[a-z0-9]$","title":"Organization Name","x-ref":"#/components/schemas/OrganizationName"},"x-ref":"#/components/parameters/organization_name","index$":0},{"name":"inference_endpoint_name","in":"path","description":"The inference endpoint name.","required":true,"schema":{"description":"The inference endpoint name.","type":"string","examples":["transcribe"],"maxLength":63,"minLength":2,"pattern":"^[a-z][a-z0-9-]{0,61}[a-z0-9]$","title":"Inference Endpoint Name","x-ref":"#/components/schemas/InferenceEndpointName"},"x-ref":"#/components/parameters/inference_endpoint_name","index$":1}]},"GET /organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs/{inference_endpoint_job_id}":{"protocol":"http","parameters":[{"name":"organization_name","in":"path","description":"Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.","required":true,"schema":{"description":"The organization name.","type":"string","examples":["acme-corp"],"maxLength":63,"minLength":2,"pattern":"^[a-z][a-z0-9-]{0,61}[a-z0-9]$","title":"Organization Name","x-ref":"#/components/schemas/OrganizationName"},"x-ref":"#/components/parameters/organization_name","index$":0},{"name":"inference_endpoint_name","in":"path","description":"The inference endpoint name.","required":true,"schema":{"description":"The inference endpoint name.","type":"string","examples":["transcribe"],"maxLength":63,"minLength":2,"pattern":"^[a-z][a-z0-9-]{0,61}[a-z0-9]$","title":"Inference Endpoint Name","x-ref":"#/components/schemas/InferenceEndpointName"},"x-ref":"#/components/parameters/inference_endpoint_name","index$":1},{"name":"inference_endpoint_job_id","description":"The inference endpoint job identifier.","in":"path","required":true,"schema":{"description":"The inference endpoint job identifier.","type":"string","format":"uuid","examples":["2fc459a1-1c09-4a34-ade7-54d03fc51d6a"],"title":"Inference Endpoint Job ID","x-ref":"#/components/schemas/InferenceEndpointJobId"},"x-ref":"#/components/parameters/inference_endpoint_job_id","index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const inference_endpoint_job_ref01_ent = client.InferenceEndpointJob()
    let inference_endpoint_job_ref01_data = setup.data.new.inference_endpoint_job['inference_endpoint_job_ref01']
    inference_endpoint_job_ref01_data['inference_endpoint_id'] = setup.idmap['inference_endpoint01']
    inference_endpoint_job_ref01_data['inference_endpoint_name'] = setup.idmap['inference_endpoint_name01']
    inference_endpoint_job_ref01_data['organization_name'] = setup.idmap['organization_name01']

    inference_endpoint_job_ref01_data = (await inference_endpoint_job_ref01_ent.create(inference_endpoint_job_ref01_data)).data()
    assert(null != inference_endpoint_job_ref01_data.id)


    // LOAD
    const inference_endpoint_job_ref01_match_dt0: any = {}
    inference_endpoint_job_ref01_match_dt0.id = inference_endpoint_job_ref01_data.id
    const inference_endpoint_job_ref01_data_dt0 = (await inference_endpoint_job_ref01_ent.load(inference_endpoint_job_ref01_match_dt0)).data()
    assert(inference_endpoint_job_ref01_data_dt0.id === inference_endpoint_job_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/inference_endpoint_job/InferenceEndpointJobTestData.json')

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
    ['inference_endpoint_job01','inference_endpoint_job02','inference_endpoint_job03','inference_endpoint01','inference_endpoint02','inference_endpoint03','inference_endpoint_name01','organization_name01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_ENTID': idmap,
    'SALADCLOUD_TEST_LIVE': 'FALSE',
    'SALADCLOUD_TEST_EXPLAIN': 'FALSE',
    'SALADCLOUD_APIKEY': '',
  })

  idmap = env['SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_ENTID']

  const live = 'TRUE' === env.SALADCLOUD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_ENTID']
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
  
