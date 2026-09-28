

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


describe('WebhookSecretKeyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SALADCLOUD_TEST_LIVE=TRUE.
  afterEach(liveDelay('SALADCLOUD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SaladcloudSDK.test()
    const ent = testsdk.WebhookSecretKey()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SALADCLOUD_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'webhook_secret_key.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"secret_key":{"a":true,"h":"Secret Key","n":"secret_key","r":true,"sh":"The webhook secret key","t":"`$STRING`","key$":"secret_key","index$":0}},"name":"webhook_secret_key","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /organizations/{organization_name}/webhook-secret-key","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_name","or":"organization_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/organizations/{organization_name}/webhook-secret-key","q":{"exist":["organization_name"]},"r":{},"s":[{"lit":"organizations"},{"var":"organization_name"},{"lit":"webhook-secret-key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /organizations/{organization_name}/webhook-secret-key","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_name","or":"organization_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/organizations/{organization_name}/webhook-secret-key","q":{"exist":["organization_name"]},"r":{},"s":[{"lit":"organizations"},{"var":"organization_name"},{"lit":"webhook-secret-key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"webhook_secret_key","name__orig":"webhook_secret_key","Name":"WebhookSecretKey","name_":"webhook_secret_key","name-":"webhook-secret-key","NAME":"WEBHOOK_SECRET_KEY","index$":13}, {"active":true,"entity":"webhook_secret_key","key$":"BasicWebhookSecretKeyFlow","kind":"basic","name":"BasicWebhookSecretKeyFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"webhook_secret_key_ref01"},"m":{"organization_name":"organization_name01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"webhook_secret_key_ref01","srcdatavar":"webhook_secret_key_ref01_data","suffix":"_dt0"},"m":{"id":"webhook_secret_key01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-webhook_secret_key_ref01"}}],"index$":1}]}, 'WebhookSecretKey', {"POST /organizations/{organization_name}/webhook-secret-key":{"protocol":"http","parameters":[{"name":"organization_name","in":"path","description":"Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.","required":true,"schema":{"description":"The organization name.","type":"string","examples":["acme-corp"],"maxLength":63,"minLength":2,"pattern":"^[a-z][a-z0-9-]{0,61}[a-z0-9]$","title":"Organization Name","x-ref":"#/components/schemas/OrganizationName"},"x-ref":"#/components/parameters/organization_name","index$":0}]},"GET /organizations/{organization_name}/webhook-secret-key":{"protocol":"http","parameters":[{"name":"organization_name","in":"path","description":"Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.","required":true,"schema":{"description":"The organization name.","type":"string","examples":["acme-corp"],"maxLength":63,"minLength":2,"pattern":"^[a-z][a-z0-9-]{0,61}[a-z0-9]$","title":"Organization Name","x-ref":"#/components/schemas/OrganizationName"},"x-ref":"#/components/parameters/organization_name","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const webhook_secret_key_ref01_ent = client.WebhookSecretKey()
    let webhook_secret_key_ref01_data = setup.data.new.webhook_secret_key['webhook_secret_key_ref01']
    webhook_secret_key_ref01_data['organization_name'] = setup.idmap['organization_name01']

    webhook_secret_key_ref01_data = (await webhook_secret_key_ref01_ent.create(webhook_secret_key_ref01_data)).data()
    assert(null != webhook_secret_key_ref01_data)



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/webhook_secret_key/WebhookSecretKeyTestData.json')

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
    ['webhook_secret_key01','webhook_secret_key02','webhook_secret_key03','organization_name01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SALADCLOUD_TEST_WEBHOOK_SECRET_KEY_ENTID': idmap,
    'SALADCLOUD_TEST_LIVE': 'FALSE',
    'SALADCLOUD_TEST_EXPLAIN': 'FALSE',
    'SALADCLOUD_APIKEY': '',
  })

  idmap = env['SALADCLOUD_TEST_WEBHOOK_SECRET_KEY_ENTID']

  const live = 'TRUE' === env.SALADCLOUD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SALADCLOUD_TEST_WEBHOOK_SECRET_KEY_ENTID']
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
  
