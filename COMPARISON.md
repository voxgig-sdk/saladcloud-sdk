# SaladCloud: the Voxgig SDK and the liblab SDK compared

Vergleich: liblab. Compared with SaladTechnologies/salad-cloud-sdk-javascript 0.9.0-alpha.17 (liblab 2.25.53). Spec: salad-cloud-docs api-specs/salad-cloud.yaml at 795066d, the same version, OAS 3.1.0, 24 paths / 36 ops, MIT. Added 2026-09-28.

This repository is on the admin **vergleich** list. It is built only to be compared, and it is not published.

## Scorecard

| | Voxgig | liblab |
|---|---|---|
| SDK | this repository, commit `27bcd22`: eight targets (go, go-cli, go-mcp, ts, py, rb, lua, php) | `@saladtechnologies-oss/salad-cloud-sdk@0.9.0-alpha.17` (TypeScript) |
| Input | `saladcloud-openapi.yaml`: OAS 3.1.0, `info.version` 0.9.0-alpha.17, 24 paths, 36 operations | the vendor's own generation; the note above names the definition version it came from |
| Operations callable | 36 of 36 | 36 operation methods |
| Entities | 14 | not applicable |
| ts package | 1.44 MB, 300 files | 1.20 MB, 6 files |
| Runtime dependencies | 0 | 1 |
| Generated tests | ts 268 pass / 0 fail; py 268 pass; rb 292 runs / 0 fail; lua 266 pass / 0 fail; php 292 tests, 0 fail; go, go-cli, go-mcp build, vet and test | not run: a published package |
| Determinism | a second generation on the same toolchain is byte-identical | not measured |
| Scenario against a mock | 1 of 4 steps right, 1 returned wrong data, 1 request violations (static) | 1 of 4 steps right, 2 request violations (dynamic) |

## Features

Voxgig's features are opt-in; these builds enable the standard set. The liblab column is read from the published package, with the evidence below.

| Feature | Voxgig | liblab |
|---|---|---|
| Retries | yes | yes |
| Timeouts | yes | yes |
| Pagination helper | partial | no |
| Idempotency keys | yes | no |
| Rate-limit handling | yes | partial |
| Logging / debug | yes | no |
| Built-in offline test mode | yes | no |
| Metrics / telemetry | partial | no |
| Cancellation | yes | no |
| Hooks / middleware | yes | partial |

**Evidence, liblab.**

- Retries: RetryHandler (dist/index.js): attempts 3 (=2 retries), fixed 150 ms delay, set in RequestBuilder; retries HttpError 5xx/408/429, not network errors/timeouts; SdkConfig/RequestConfig.retry
- Timeouts: SdkConfig.timeoutMs (or sdk.timeoutMs setter), client-wide, applied as AbortSignal.timeout in RequestFetchAdapter.setTimeout; no default, no per-call value; README's `timeout` key is not read
- Pagination helper: No operation uses it: HttpClient.callPaginated/callCursorPaginated and Request.nextPage exist in dist/index.js, but no service calls setPagination (0 of 36 ops); no iterator
- Idempotency keys: Searched 'idempot' in dist/index.js and dist/index.d.ts: no key generated or sent, no option
- Rate-limit handling: 429 is in RetryHandler.shouldRetry (fixed 150 ms, no Retry-After), but all 36 ops map a JSON 429 to ProblemDetails, not an HttpError, so it is thrown without retry
- Logging / debug: No logger, log level, env var or console use in dist/index.js; searched logger/debug/console/process.env. 'logs'/'systemLogs' are API resources
- Built-in offline test mode: No mock or test mode; searched mock/fake/stub/testmode/msw/nock in dist/index.js and dist/index.d.ts
- Metrics / telemetry: No tracing or metrics hooks; searched telemetry/opentelemetry/otel/trace/metric in dist/index.js
- Cancellation: RequestConfig has only retry/validation/baseUrl; fetch gets only AbortSignal.timeout(timeoutMs); Hook's HttpRequest.abortSignal is declared in index.d.ts but never set or read
- Hooks / middleware: Hook/CustomHook (beforeRequest/afterResponse/onError) in dist/index.js is a no-op build-time hook; HookHandler.handle makes a new CustomHook and HttpClient isn't exported, so not pluggable
- Auth: API key: SdkConfig.apiKey (or the sdk.apiKey setter), sent as the Salad-Api-Key header by addApiKeyAuth. An apiKeyHeader option exists, but all 36 operations hardcode 'Salad-Api-Key', so it has no effect.
- Errors: Partly: each operation maps its declared statuses (400/401/403/404/429, JSON content type) to one ProblemDetails class (RFC 7807 fields), not a class per status; other statuses throw HttpError. Both are declared in dist/index.d.ts but missing from the runtime exports of dist/index.js and dist/index.mjs, so they cannot be imported as values.

**Evidence, Voxgig.**

- Retries: retry feature: 408, 425, 429 and 5xx, honouring Retry-After.
- Timeouts: timeout feature: 30 s per attempt by default.
- Pagination helper: paging feature: page and cursor state carried between calls (ctrl.paging); no iterator.
- Idempotency keys: idempotency feature: generates an Idempotency-Key for mutating calls, stable across retries.
- Rate-limit handling: ratelimit feature: client-side token bucket; retry honours Retry-After on 429.
- Logging / debug: debug feature: request and response logging with auth headers redacted.
- Built-in offline test mode: test feature: an offline mock transport; every generated suite runs on it.
- Metrics / telemetry: metrics feature: per-operation counts and timings; no OpenTelemetry.
- Cancellation: an AbortSignal per call (callopts.signal).
- Hooks / middleware: extend: custom features hook every pipeline stage.

## Scenario

✓ right, ⚠ returned without error but with the wrong data, ✗ failed.

Each SDK lists one resource, loads and removes the first item it listed, and creates one from the definition's own example or required fields, against a mock built from the same vendor definition. The mock is Prism: static mode answers with the definition's examples, and dynamic mode generates schema-valid data. Each SDK is credited with its better mode. Request violations are Prism's verdicts on what the SDK sent.

- **Voxgig, static:** 1 of 4 steps right, 1 request violations.
  - ✓ `list`
  - ⚠ `load`: returned the group's inner container spec (command, image, ...), not the group
  - ✗ `create`: SaladcloudSDK: create: request: 400: Bad Request
  - ✗ `remove`: SaladcloudSDK: remove: Unexpected end of JSON input
- **Voxgig, dynamic:** 1 of 4 steps right, 1 request violations.
  - ✓ `list`
  - ⚠ `load`: returned the group's inner container spec (command, image, ...), not the group
  - ✗ `create`: SaladcloudSDK: create: request: 400: Bad Request
  - ✗ `remove`: SaladcloudSDK: remove: Unexpected end of JSON input
- **liblab, static:** 0 of 4 steps right, 2 request violations.
  - ✗ `list`: [
  - ✗ `load`: Unexpected response body for error status.
  - ✗ `create`: [
  - ✗ `remove`: Unexpected response body for error status.
- **liblab, dynamic:** 1 of 4 steps right, 2 request violations.
  - ✗ `list`: [
  - ✗ `load`: Unexpected response body for error status.
  - ✓ `create`
  - ✗ `remove`: Unexpected response body for error status.

## Voxgig toolchain findings

- **Y1-Y3** (@tabnas/yaml 0.5.11 (used by apidef)). Three YAML parser defects. A quote inside a block scalar, comment or plain scalar inverts the flow scanner's quote parity (Lob fails at line 14557). A digit-first plain scalar is cut at its first colon (Novu's `09:00 AM`). Scalars resolve by YAML 1.1 rules, so SaladCloud's country code NO becomes false. Patch written and verified: all eight specs parse identically to js-yaml, 0 regressions over 259 local YAML files. Not applied: attaching tabnas/yaml with push access was refused. The three SDKs were built on the patched parser.
- **UNWRAP** (@voxgig/apidef 8.17.2). The response transform that says where an operation's data sits is inferred wrongly for several resources, in both directions. A schema whose one object-valued property is ordinary data is taken for an envelope (Apicurio's `labels`, SaladCloud's `container`), and a real envelope is missed when it is composed with allOf (Lob) or sits beside another property (Neon's `projects` beside `pagination`). The SDKs' own tests cannot see it, because they mock from the same model; a mock built from the vendor definition does. Here: saladcloud container load: `body.container`, the group's inner container spec, not the group. Create wraps the request in `{ container: ... }` too, with the path parameters in the body. Reported, not changed: heuristic design in apidef.
- **EMPTY-202** (@voxgig/sdkgen 4.30.2 (ResultBody)). The result body is JSON-parsed whenever response.body is non-null. An empty 202 (SaladCloud's asynchronous delete) has a non-null empty stream, so the call throws `Unexpected end of JSON input` although the server accepted it. Reported, not changed: the same logic exists per target.
- **QUERY-ECHO** (@voxgig/sdkgen 4.30.2 (PrepareQuery: ts, js and rb read the field; other targets not checked)). Every match field, path parameters included, is also sent as a query parameter: GET /video/v1/assets/a1?id=a1 (Mux), GET /assistant/asst_1?id=asst_1 (Vapi), DELETE .../containers/web?id=web&organization_name=acme&project_id=demo (SaladCloud). prepareQuery excludes names in point.params, but the generated config carries path parameters in point.args.params (which prepareParams reads), so nothing is excluded. Harmless to a lenient server, rejected by a strict one. Prism logs paths without query strings, so its runs did not show it. Reported, not changed: the same exclusion exists per target.
- **ERGONOMICS** (@voxgig/apidef 8.17.2). Mux's assets are listed through a separate ListAsset entity (named after the list response) but loaded, created and removed through Asset. SaladCloud's container operations call the same path parameter project_name in list and create but project_id in load, update and remove. Reported.

## liblab SDK notes

- Validates every response with zod. The mock's responses violate the definition's own schema in both Prism modes (Prism reports the violations itself), so the scenario could not complete: a mock limit, not an SDK defect. Its error classes are declared in the .d.ts but missing from the runtime exports.

## How this was measured

- Operations: the definition's operations are counted over its paths. Voxgig's are the generated model's points, less those under an op no target generates. The compared SDK's are the operation methods in its published package, counted per generator (method declarations, request-builder verbs, or functions per operation).
- Package size and file count: `npm pack --dry-run` for the Voxgig ts target, and the registry's `dist.unpackedSize` and `dist.fileCount` for the compared package.
- Tests: `admin/scripts/cedar-test-all.sh` runs each target's generated suite.
- Features: read from the code of the published package, crediting a feature only for a mechanism, not a word in the API's own models.

