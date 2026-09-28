

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


describe('CpuAvailabilityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SALADCLOUD_TEST_LIVE=TRUE.
  afterEach(liveDelay('SALADCLOUD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SaladcloudSDK.test()
    const ent = testsdk.CpuAvailability()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SALADCLOUD_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'cpu_availability.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"available_cpu_batch":{"a":true,"fo":"int32","h":"Available Cpu Batch","n":"available_cpu_batch","r":false,"sh":"The number of available CPU cores","t":"`$INTEGER`","key$":"available_cpu_batch","index$":0},"country_codes":{"a":true,"h":"Country Codes","n":"country_codes","r":false,"sh":"A list of country codes where the resources are available","t":"`$ARRAY`","key$":"country_codes","index$":1},"cpu":{"a":true,"fo":"int32","h":"Cpu","n":"cpu","r":false,"sh":"The number of available CPU cores","t":"`$INTEGER`","key$":"cpu","index$":2},"memory":{"a":true,"fo":"int64","h":"Memory","n":"memory","r":false,"sh":"The amount of available memory in MB","t":"`$INTEGER`","key$":"memory","index$":3},"on_call_cpu":{"a":true,"fo":"int32","h":"On Call Cpu","n":"on_call_cpu","r":false,"sh":"The amount of on-call CPU","t":"`$INTEGER`","key$":"on_call_cpu","index$":4},"storage_amount":{"a":true,"fo":"int64","h":"Storage Amount","n":"storage_amount","r":false,"sh":"The amount of available storage in bytes","t":"`$INTEGER`","key$":"storage_amount","index$":5}},"name":"cpu_availability","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /organizations/{organization_name}/availability/sce-cpu-availability","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_name","or":"organization_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/organizations/{organization_name}/availability/sce-cpu-availability","q":{"exist":["organization_name"]},"r":{},"s":[{"lit":"organizations"},{"var":"organization_name"},{"lit":"availability"},{"lit":"sce-cpu-availability"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"cpu_availability","name__orig":"cpu_availability","Name":"CpuAvailability","name_":"cpu_availability","name-":"cpu-availability","NAME":"CPU_AVAILABILITY","index$":3}, {"active":true,"entity":"cpu_availability","key$":"BasicCpuAvailabilityFlow","kind":"basic","name":"BasicCpuAvailabilityFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"cpu_availability_ref01"},"m":{"organization_name":"organization_name01"},"o":"create","s":[],"v":[],"index$":0}]}, 'CpuAvailability', {"POST /organizations/{organization_name}/availability/sce-cpu-availability":{"protocol":"http","requestBody":{"description":"Represents a request to check CPU availability","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"country_codes":{"description":"A list of country codes where the resources are available","type":"array","items":{"description":"ISO 3166-1 alpha-2 country code","type":"string","example":"us","enum":["af","al","dz","as","ad","ao","ai","aq","ag","ar","am","aw","au","at","az","bs","bh","bd","bb","by","be","bz","bj","bm","bt","bo","bq","ba","bw","bv","br","io","bn","bg","bf","bi","cv","kh","cm","ca","ky","cf","td","cl","cn","cx","cc","co","km","cd","cg","ck","cr","hr","cu","cw","cy","cz","ci","dk","dj","dm","do","ec","eg","sv","gq","er","ee","sz","et","fk","fo","fj","fi","fr","gf","pf","tf","ga","gm","ge","de","gh","gi","gr","gl","gd","gp","gu","gt","gg","gn","gw","gy","ht","hm","va","hn","hk","hu","is","in","id","ir","iq","ie","im","il","it","jm","jp","je","jo","kz","ke","ki","kp","kr","kw","kg","la","lv","lb","ls","lr","ly","li","lt","lu","mo","mg","mw","my","mv","ml","mt","mh","mq","mr","mu","yt","mx","fm","md","mc","mn","me","ms","ma","mz","mm","na","nr","np","nl","nc","nz","ni","ne","ng","nu","nf","mp","no","om","pk","pw","ps","pa","pg","py","pe","ph","pn","pl","pt","pr","qa","mk","ro","ru","rw","re","bl","sh","kn","lc","mf","pm","vc","ws","sm","st","sa","sn","rs","sc","sl","sg","sx","sk","si","sb","so","za","gs","ss","es","lk","sd","sr","sj","se","ch","sy","tw","tj","tz","th","tl","tg","tk","to","tt","tn","tr","tm","tc","tv","ug","ua","ae","gb","um","us","uy","uz","vu","ve","vn","vg","vi","wf","eh","ye","zm","zw","ax"],"title":"Country Code","x-ref":"#/components/schemas/CountryCode"},"example":["us","ca"],"key$":"country_codes"},"cpu":{"description":"The number of available CPU cores","type":"integer","format":"int32","example":4,"nullable":true,"key$":"cpu"},"memory":{"description":"The amount of available memory in MB","type":"integer","format":"int64","example":8192,"nullable":true,"key$":"memory"},"storage_amount":{"description":"The amount of available storage in bytes","type":"integer","format":"int64","example":1000000000,"nullable":true,"key$":"storage_amount"}},"x-ref":"#/components/schemas/CpuAvailabilityPrototype","index$":1}}},"x-ref":"#/components/requestBodies/GetCpuAvailability"},"parameters":[{"name":"organization_name","in":"path","description":"Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.","required":true,"schema":{"description":"The organization name.","type":"string","examples":["acme-corp"],"maxLength":63,"minLength":2,"pattern":"^[a-z][a-z0-9-]{0,61}[a-z0-9]$","title":"Organization Name","x-ref":"#/components/schemas/OrganizationName"},"x-ref":"#/components/parameters/organization_name","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const cpu_availability_ref01_ent = client.CpuAvailability()
    let cpu_availability_ref01_data = setup.data.new.cpu_availability['cpu_availability_ref01']
    cpu_availability_ref01_data['organization_name'] = setup.idmap['organization_name01']

    cpu_availability_ref01_data = (await cpu_availability_ref01_ent.create(cpu_availability_ref01_data)).data()
    assert(null != cpu_availability_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/cpu_availability/CpuAvailabilityTestData.json')

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
    ['cpu_availability01','cpu_availability02','cpu_availability03','organization_name01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SALADCLOUD_TEST_CPU_AVAILABILITY_ENTID': idmap,
    'SALADCLOUD_TEST_LIVE': 'FALSE',
    'SALADCLOUD_TEST_EXPLAIN': 'FALSE',
    'SALADCLOUD_APIKEY': '',
  })

  idmap = env['SALADCLOUD_TEST_CPU_AVAILABILITY_ENTID']

  const live = 'TRUE' === env.SALADCLOUD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SALADCLOUD_TEST_CPU_AVAILABILITY_ENTID']
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
  
