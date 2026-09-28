// Saladcloud Ts SDK

import { ContainerEntity } from './entity/ContainerEntity'
import { ContainerGroupEntity } from './entity/ContainerGroupEntity'
import { ContainerGroupInstanceEntity } from './entity/ContainerGroupInstanceEntity'
import { CpuAvailabilityEntity } from './entity/CpuAvailabilityEntity'
import { GpuAvailabilityEntity } from './entity/GpuAvailabilityEntity'
import { GpuClassEntity } from './entity/GpuClassEntity'
import { InferenceEndpointEntity } from './entity/InferenceEndpointEntity'
import { InferenceEndpointJobEntity } from './entity/InferenceEndpointJobEntity'
import { InferenceEndpointJobCollectionEntity } from './entity/InferenceEndpointJobCollectionEntity'
import { LogEntryEntity } from './entity/LogEntryEntity'
import { QueueEntity } from './entity/QueueEntity'
import { QuotaEntity } from './entity/QuotaEntity'
import { SystemLogEntity } from './entity/SystemLogEntity'
import { WebhookSecretKeyEntity } from './entity/WebhookSecretKeyEntity'

export type * from './SaladcloudTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { SaladcloudEntityBase } from './SaladcloudEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'



const stdutil = new Utility()


class SaladcloudSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context
  

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const extend = this._options.extend || []

    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        // An active name with no generated class is legal when an
        // extend-supplied instance carries that name (station's adopt
        // path): the instance is added below, positioned by its own
        // __after__ entry, so skip it here rather than fail construction.
        if (!this._rootctx.config.hasFeature(fname) &&
          extend.some((f: any) => fname === f.name)) {
          continue
        }
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    for (let f of extend) {
      featureAdd(this._rootctx, f)
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }

  


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    

    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any) {
    if (!this._options.allow.op.includes('direct')) {
      return {
        ok: false,
        err: new Error('SaladcloudSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any) {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!options.allow.op.includes('graphql')) {
      return {
        ok: false,
        err: new Error('SaladcloudSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    if (res instanceof Error) {
      return res
    }

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('SaladcloudSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.Container().list()` / `client.Container().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Container(entopts?: Record<string, any>) {
    const self = this
    return new ContainerEntity(self, entopts)
  }


  // Entity access: `client.ContainerGroup().list()` / `client.ContainerGroup().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ContainerGroup(entopts?: Record<string, any>) {
    const self = this
    return new ContainerGroupEntity(self, entopts)
  }


  // Entity access: `client.ContainerGroupInstance().list()` / `client.ContainerGroupInstance().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ContainerGroupInstance(entopts?: Record<string, any>) {
    const self = this
    return new ContainerGroupInstanceEntity(self, entopts)
  }


  // Entity access: `client.CpuAvailability().list()` / `client.CpuAvailability().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CpuAvailability(entopts?: Record<string, any>) {
    const self = this
    return new CpuAvailabilityEntity(self, entopts)
  }


  // Entity access: `client.GpuAvailability().list()` / `client.GpuAvailability().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GpuAvailability(entopts?: Record<string, any>) {
    const self = this
    return new GpuAvailabilityEntity(self, entopts)
  }


  // Entity access: `client.GpuClass().list()` / `client.GpuClass().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GpuClass(entopts?: Record<string, any>) {
    const self = this
    return new GpuClassEntity(self, entopts)
  }


  // Entity access: `client.InferenceEndpoint().list()` / `client.InferenceEndpoint().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  InferenceEndpoint(entopts?: Record<string, any>) {
    const self = this
    return new InferenceEndpointEntity(self, entopts)
  }


  // Entity access: `client.InferenceEndpointJob().list()` / `client.InferenceEndpointJob().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  InferenceEndpointJob(entopts?: Record<string, any>) {
    const self = this
    return new InferenceEndpointJobEntity(self, entopts)
  }


  // Entity access: `client.InferenceEndpointJobCollection().list()` / `client.InferenceEndpointJobCollection().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  InferenceEndpointJobCollection(entopts?: Record<string, any>) {
    const self = this
    return new InferenceEndpointJobCollectionEntity(self, entopts)
  }


  // Entity access: `client.LogEntry().list()` / `client.LogEntry().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LogEntry(entopts?: Record<string, any>) {
    const self = this
    return new LogEntryEntity(self, entopts)
  }


  // Entity access: `client.Queue().list()` / `client.Queue().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Queue(entopts?: Record<string, any>) {
    const self = this
    return new QueueEntity(self, entopts)
  }


  // Entity access: `client.Quota().list()` / `client.Quota().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Quota(entopts?: Record<string, any>) {
    const self = this
    return new QuotaEntity(self, entopts)
  }


  // Entity access: `client.SystemLog().list()` / `client.SystemLog().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SystemLog(entopts?: Record<string, any>) {
    const self = this
    return new SystemLogEntity(self, entopts)
  }


  // Entity access: `client.WebhookSecretKey().list()` / `client.WebhookSecretKey().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WebhookSecretKey(entopts?: Record<string, any>) {
    const self = this
    return new WebhookSecretKeyEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new SaladcloudSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return SaladcloudSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Saladcloud' }
  }

  toString() {
    return 'Saladcloud ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = SaladcloudSDK


export {
  stdutil,
  config,
  

  BaseFeature,
  SaladcloudEntityBase,

  SaladcloudSDK,
  SDK,
}


