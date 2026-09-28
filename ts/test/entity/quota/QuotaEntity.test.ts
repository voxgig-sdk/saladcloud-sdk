

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


describe('QuotaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SALADCLOUD_TEST_LIVE=TRUE.
  afterEach(liveDelay('SALADCLOUD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SaladcloudSDK.test()
    const ent = testsdk.Quota()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SALADCLOUD_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'quota.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"container_replicas_quota":{"a":true,"fo":"int32","h":"Container Replicas Quota","n":"container_replicas_quota","r":true,"sh":"The maximum number of replicas that can be created for a container group","t":"`$INTEGER`","key$":"container_replicas_quota","index$":0},"container_replicas_used":{"a":true,"fo":"int32","h":"Container Replicas Used","n":"container_replicas_used","r":true,"sh":"The number of replicas that are currently in use","t":"`$INTEGER`","key$":"container_replicas_used","index$":1},"max_container_group_reallocations_per_minute":{"a":true,"fo":"int32","h":"Max Container Group Reallocations Per Minute","n":"max_container_group_reallocations_per_minute","r":false,"sh":"The maximum number of container group reallocations per minute","t":"`$INTEGER`","key$":"max_container_group_reallocations_per_minute","index$":2},"max_container_group_recreates_per_minute":{"a":true,"fo":"int32","h":"Max Container Group Recreates Per Minute","n":"max_container_group_recreates_per_minute","r":false,"sh":"The maximum number of container group recreates per minute","t":"`$INTEGER`","key$":"max_container_group_recreates_per_minute","index$":3},"max_container_group_restarts_per_minute":{"a":true,"fo":"int32","h":"Max Container Group Restarts Per Minute","n":"max_container_group_restarts_per_minute","r":false,"sh":"The maximum number of container group restarts per minute","t":"`$INTEGER`","key$":"max_container_group_restarts_per_minute","index$":4}},"name":"quota","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /organizations/{organization_name}/quotas","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_name","or":"organization_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/organizations/{organization_name}/quotas","q":{"exist":["organization_name"]},"r":{},"s":[{"lit":"organizations"},{"var":"organization_name"},{"lit":"quotas"}],"t":{"req":"`reqdata`","res":"`body.container_groups_quotas`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"quota","name__orig":"quota","Name":"Quota","name_":"quota","name-":"quota","NAME":"QUOTA","index$":11}, {"active":true,"entity":"quota","key$":"BasicQuotaFlow","kind":"basic","name":"BasicQuotaFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"quota_ref01","srcdatavar":"quota_ref01_data","suffix":"_dt0"},"m":{"id":"quota01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-quota_ref01"}}],"index$":0}]}, 'Quota', {"GET /organizations/{organization_name}/quotas":{"protocol":"http","parameters":[{"name":"organization_name","in":"path","description":"Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.","required":true,"schema":{"description":"The organization name.","type":"string","examples":["acme-corp"],"maxLength":63,"minLength":2,"pattern":"^[a-z][a-z0-9-]{0,61}[a-z0-9]$","title":"Organization Name","x-ref":"#/components/schemas/OrganizationName"},"x-ref":"#/components/parameters/organization_name","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let quota_ref01_data = Object.values(setup.data.existing.quota)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const quota_ref01_ent = client.Quota()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/quota/QuotaTestData.json')

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
    ['quota01','quota02','quota03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SALADCLOUD_TEST_QUOTA_ENTID': idmap,
    'SALADCLOUD_TEST_LIVE': 'FALSE',
    'SALADCLOUD_TEST_EXPLAIN': 'FALSE',
    'SALADCLOUD_APIKEY': '',
  })

  idmap = env['SALADCLOUD_TEST_QUOTA_ENTID']

  const live = 'TRUE' === env.SALADCLOUD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SALADCLOUD_TEST_QUOTA_ENTID']
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
  
