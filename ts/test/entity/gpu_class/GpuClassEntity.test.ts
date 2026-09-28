

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


describe('GpuClassEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SALADCLOUD_TEST_LIVE=TRUE.
  afterEach(liveDelay('SALADCLOUD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SaladcloudSDK.test()
    const ent = testsdk.GpuClass()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SALADCLOUD_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'gpu_class.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"gpu_class_type":{"a":true,"h":"Gpu Class Type","n":"gpu_class_type","r":false,"sh":"The type of GPU class","t":"`$STRING`","key$":"gpu_class_type","index$":0},"gpu_count":{"a":true,"fo":"int32","h":"Gpu Count","n":"gpu_count","r":false,"sh":"The number of GPUs in the cluster","t":"`$INTEGER`","key$":"gpu_count","index$":1},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":true,"sh":"The unique identifier","t":"`$STRING`","key$":"id","index$":2},"is_high_demand":{"a":true,"h":"Is High Demand","n":"is_high_demand","r":false,"sh":"Whether the GPU class is in high demand","t":"`$BOOLEAN`","key$":"is_high_demand","index$":3},"max_ram":{"a":true,"fo":"int32","h":"Max Ram","n":"max_ram","r":false,"sh":"The maximum RAM amount in MB","t":"`$INTEGER`","key$":"max_ram","index$":4},"max_storage":{"a":true,"fo":"int64","h":"Max Storage","n":"max_storage","r":false,"sh":"The maximum storage amount in bytes","t":"`$INTEGER`","key$":"max_storage","index$":5},"max_vcpu":{"a":true,"fo":"int32","h":"Max Vcpu","n":"max_vcpu","r":false,"sh":"The maximum vCPU count","t":"`$INTEGER`","key$":"max_vcpu","index$":6},"min_ram":{"a":true,"fo":"int32","h":"Min Ram","n":"min_ram","r":false,"sh":"The minimum RAM amount in MB","t":"`$INTEGER`","key$":"min_ram","index$":7},"min_storage":{"a":true,"fo":"int64","h":"Min Storage","n":"min_storage","r":false,"sh":"The minimum storage amount in bytes","t":"`$INTEGER`","key$":"min_storage","index$":8},"min_vcpu":{"a":true,"fo":"int32","h":"Min Vcpu","n":"min_vcpu","r":false,"sh":"The minimum vCPU count","t":"`$INTEGER`","key$":"min_vcpu","index$":9},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The GPU class name","t":"`$STRING`","key$":"name","index$":10},"prices":{"a":true,"h":"Prices","n":"prices","r":true,"sh":"The list of prices for each container group priority","t":"`$ARRAY`","key$":"prices","index$":11}},"id":{"field":"id","name":"id"},"name":"gpu_class","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /organizations/{organization_name}/gpu-classes","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_name","or":"organization_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/organizations/{organization_name}/gpu-classes","q":{"exist":["organization_name"]},"r":{},"s":[{"lit":"organizations"},{"var":"organization_name"},{"lit":"gpu-classes"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"gpu_class","name__orig":"gpu_class","Name":"GpuClass","name_":"gpu_class","name-":"gpu-class","NAME":"GPU_CLASS","index$":5}, {"active":true,"entity":"gpu_class","key$":"BasicGpuClassFlow","kind":"basic","name":"BasicGpuClassFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_name":"organization_name01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"gpu_class_ref01"}}],"index$":0}]}, 'GpuClass', {"GET /organizations/{organization_name}/gpu-classes":{"protocol":"http","parameters":[{"name":"organization_name","in":"path","description":"Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.","required":true,"schema":{"description":"The organization name.","type":"string","examples":["acme-corp"],"maxLength":63,"minLength":2,"pattern":"^[a-z][a-z0-9-]{0,61}[a-z0-9]$","title":"Organization Name","x-ref":"#/components/schemas/OrganizationName"},"x-ref":"#/components/parameters/organization_name","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let gpu_class_ref01_data = Object.values(setup.data.existing.gpu_class)[0] as any

    // LIST
    const gpu_class_ref01_ent = client.GpuClass()
    const gpu_class_ref01_match: any = {}
    gpu_class_ref01_match['organization_name'] = setup.idmap['organization_name01']

    const gpu_class_ref01_list = (await gpu_class_ref01_ent.list(gpu_class_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/gpu_class/GpuClassTestData.json')

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
    ['gpu_class01','gpu_class02','gpu_class03','organization_name01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SALADCLOUD_TEST_GPU_CLASS_ENTID': idmap,
    'SALADCLOUD_TEST_LIVE': 'FALSE',
    'SALADCLOUD_TEST_EXPLAIN': 'FALSE',
    'SALADCLOUD_APIKEY': '',
  })

  idmap = env['SALADCLOUD_TEST_GPU_CLASS_ENTID']

  const live = 'TRUE' === env.SALADCLOUD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SALADCLOUD_TEST_GPU_CLASS_ENTID']
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
  
