# SaladCloud: the Voxgig SDK and the liblab SDK compared

Vergleich: liblab. Compared with SaladTechnologies/salad-cloud-sdk-javascript 0.9.0-alpha.17 (liblab 2.25.53). Spec: salad-cloud-docs api-specs/salad-cloud.yaml at 795066d, the same version, OAS 3.1.0, 24 paths / 36 ops, MIT. Added 2026-09-28. Rebuilt 2026-09-29 on sdkgen 4.32.1 and apidef 8.22.0.

This repository is on the admin **vergleich** list. It is built only to be compared, and it is not published.

## Scorecard

| | Voxgig | liblab |
|---|---|---|
| SDK | this repository, commit `a81166f`: eight targets (go, go-cli, go-mcp, ts, py, rb, lua, php) | `@saladtechnologies-oss/salad-cloud-sdk@0.9.0-alpha.17` (TypeScript) |
| Input | `saladcloud-openapi.yaml`: OAS 3.1.0, `info.version` 0.9.0-alpha.17, 24 paths, 36 operations | the vendor's own generation; the note above names the definition version it came from |
| Operations callable | 36 of 36 | 36 operation methods |
| Entities | 14 | not applicable |
| ts package | 1.47 MB, 300 files | 1.20 MB, 6 files |
| Runtime dependencies | 0 | 1 |
| Generated tests | ts 309 pass / 0 fail / 8 skipped; py 268 pass / 57 skipped; rb 292 runs / 0 fail; lua 266 pass / 0 fail; php 292 tests / 0 fail; go, go-cli, go-mcp build, vet and test | not run: a published package |
| Determinism | a second generation on the same toolchain is byte-identical | not measured |
| Scenario against a mock | 4 of 4 steps right, 0 returned wrong data, 0 request violations (static) | 1 of 4 steps right, 2 request violations (dynamic) |

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

- **Voxgig, static:** 4 of 4 steps right, 0 request violations.
  - ✓ `list`
  - ✓ `load`
  - ✓ `create`
  - ✓ `remove`
- **Voxgig, dynamic:** 4 of 4 steps right, 0 request violations.
  - ✓ `list`
  - ✓ `load`
  - ✓ `create`
  - ✓ `remove`
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

- **Y1-Y4** (@tabnas/yaml, used by apidef). Four YAML parser defects: a quote inside a block scalar, comment or plain scalar inverted the flow scanner's quote parity (Lob failed at line 14557); a digit-first plain scalar was cut at its first colon (Novu's `09:00 AM`); scalars resolve by YAML 1.1 rules, so SaladCloud's country code `no` becomes `false`; and a `#` straight after a leading number ended the scalar, so Lob's buckslip weight `80#` read as the number 80 and was typed as an integer. Y1 and Y2 are fixed in the published parser (apidef 8.18.0 requires @tabnas/yaml 0.5.12, and 0.5.13 parses Lob and Novu), and Y4 in 0.5.14 (tabnas/yaml#95), so this rebuild uses no overlay. Y3 is the parser's documented YAML 1.1 leniency, and SaladCloud's SDK comes out the same with and without a patched parser.
- **UNWRAP** (@voxgig/apidef). The response transform that says where an operation's data sits was inferred wrongly for several resources in the first build. Here: the container group's load read `body.container`, the group's inner container spec, and create wrapped the request in `{ container }`. Fixed in apidef 8.19.0 (voxgig/apidef#102): load and create read the group.
- **EMPTY-202** (@voxgig/sdkgen, Response). An empty 202, SaladCloud's asynchronous delete, has a non-null empty body stream, so the TypeScript SDK threw `Unexpected end of JSON input` although the server had accepted the call. Fixed in voxgig/sdkgen#228 (issue #219), released in 4.32.1: the rebuild's remove succeeds.
- **QUERY-ECHO** (@voxgig/sdkgen, PrepareQuery). Every match field, path parameters included, was also sent as a query parameter, such as `?id=` on a load. Fixed in voxgig/sdkgen#222, released in 4.31.0: query parameters go out under the definition's names, and the rebuild's scenario requests carry no echoed parameter.
- **ERGONOMICS** (@voxgig/apidef). The container operations call the same path parameter `project_name` in list and create but `project_id` in load, update and remove (open: voxgig/apidef#98). The container group instance splits across two entities, ContainerGroup and ContainerGroupInstance, because its read answers only a 202 and is named from its tag (open: voxgig/apidef#111).

## liblab SDK notes

- Validates every response with zod. The mock's responses violate the definition's own schema in both Prism modes (Prism reports the violations itself), so the scenario could not complete: a mock limit, not an SDK defect. Its error classes are declared in the .d.ts but missing from the runtime exports.

## How this was measured

- Operations: the definition's operations are counted over its paths. Voxgig's are the generated model's points, less those under an op no target generates. The compared SDK's are the operation methods in its published package, counted per generator (method declarations, request-builder verbs, or functions per operation).
- Package size and file count: `npm pack --dry-run` for the Voxgig ts target, and the registry's `dist.unpackedSize` and `dist.fileCount` for the compared package.
- Tests: `admin/scripts/cedar-test-all.sh` runs each target's generated suite.
- Features: read from the code of the published package, crediting a feature only for a mechanism, not a word in the API's own models.
- Rebuild: 2026-09-29, on create-sdkgen 0.30.4, sdkgen 4.32.1, apidef 8.22.0, model 12.0.0 and @tabnas/yaml 0.5.14, all as published, with no overlay.
- Tests on the rebuild: all eight targets, the lua suite under Lua 5.4 with busted 2.2.0.
- Scenario on the rebuild: the Voxgig side was re-run on 2026-09-29; the compared SDK's run is from 2026-09-28, and its package is unchanged. The generated create input honours the definition's minimums, which the first run did not.
