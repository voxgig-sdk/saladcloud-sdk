# Saladcloud TypeScript SDK



The TypeScript SDK for the Saladcloud API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Container()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/saladcloud-sdk/releases)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/saladcloud-sdk
npm install ./saladcloud-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { SaladcloudSDK } from '@voxgig-sdk/saladcloud-sdk'

const client = new SaladcloudSDK({
  apikey: process.env.SALADCLOUD_APIKEY,
})
```

### 2. List container records

`list()` resolves to an array of Container ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const containers = await client.Container().list({ organization_name: "example", project_name: "example" })

for (const container of containers) {
  console.log(container)
}
```

### 3. Load a containergroup

ContainerGroup is nested under container_group_instance, so provide the `container_group_instance_id`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const containergroup = await client.ContainerGroup().load({
    container_group_instance_id: 'example_container_group_instance_id',
    container_id: 'example_container_id',
    organization_name: 'example_organization_name',
    project_id: 'example_project_id',
  })
  console.log(containergroup)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Container ENTITY (.data() for the record)
const created = await client.Container().create({
  organization_name: 'example_organization_name',
  project_name: 'example_project_name',
  autostart_policy: true,
  container: {},
  country_codes: [],
  create_time: 'example_create_time',
  current_state: {},
  display_name: 'example_display_name',
  id: 'example_id',
  liveness_probe: {},
  name: 'example_name',
  networking: {},
  pending_change: true,
  priority: 'example_priority',
  queue_autoscaler: {},
  queue_connection: {},
  readiness_probe: {},
  replicas: 1,
  restart_policy: 'example_restart_policy',
  scalingactions: [],
  scheduledscalingenabled: true,
  startup_probe: {},
  update_time: 'example_update_time',
  version: 1,
})

// Update — the id comes off the returned entity's data()
const updated = await client.Container().update({
  id: created.data().id!,
  organization_name: 'example_organization_name',
  project_id: 'example_project_id',
})

// Remove
await client.Container().remove({
  id: created.data().id!,
  organization_name: 'example_organization_name',
  project_id: 'example_project_id',
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const inferenceendpoints = await client.InferenceEndpoint().list()
  console.log(inferenceendpoints)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = SaladcloudSDK.test()

const inferenceendpoint = await client.InferenceEndpoint().list()
// inferenceendpoint is the entity, populated with mock response data
// — call inferenceendpoint.data() for the record itself
console.log(inferenceendpoint)
```

You can also use the instance method:

```ts
const client = new SaladcloudSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.InferenceEndpoint()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new SaladcloudSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
SALADCLOUD_TEST_LIVE=TRUE
SALADCLOUD_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### SaladcloudSDK

#### Constructor

```ts
new SaladcloudSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Container(data?)` | `ContainerEntity` | Create a Container entity instance. |
| `ContainerGroup(data?)` | `ContainerGroupEntity` | Create a ContainerGroup entity instance. |
| `ContainerGroupInstance(data?)` | `ContainerGroupInstanceEntity` | Create a ContainerGroupInstance entity instance. |
| `CpuAvailability(data?)` | `CpuAvailabilityEntity` | Create a CpuAvailability entity instance. |
| `GpuAvailability(data?)` | `GpuAvailabilityEntity` | Create a GpuAvailability entity instance. |
| `GpuClass(data?)` | `GpuClassEntity` | Create a GpuClass entity instance. |
| `InferenceEndpoint(data?)` | `InferenceEndpointEntity` | Create an InferenceEndpoint entity instance. |
| `InferenceEndpointJob(data?)` | `InferenceEndpointJobEntity` | Create an InferenceEndpointJob entity instance. |
| `InferenceEndpointJobCollection(data?)` | `InferenceEndpointJobCollectionEntity` | Create an InferenceEndpointJobCollection entity instance. |
| `LogEntry(data?)` | `LogEntryEntity` | Create a LogEntry entity instance. |
| `Queue(data?)` | `QueueEntity` | Create a Queue entity instance. |
| `Quota(data?)` | `QuotaEntity` | Create a Quota entity instance. |
| `SystemLog(data?)` | `SystemLogEntity` | Create a SystemLog entity instance. |
| `WebhookSecretKey(data?)` | `WebhookSecretKeyEntity` | Create a WebhookSecretKey entity instance. |
| `tester(testopts?, sdkopts?)` | `SaladcloudSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `SaladcloudSDK.test(testopts?, sdkopts?)` | `SaladcloudSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): SaladcloudSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Container

| Field | Description |
| --- | --- |
| `autostart_policy` | Defines whether containers in this group should automatically start when deployed (true) or require manual starting (false) |
| `container` | Represents a container with its configuration and resource requirements. |
| `country_codes` | List of country codes where container instances are permitted to run. |
| `create_time` | ISO 8601 timestamp when this container group was initially created |
| `current_state` | Represents the operational state of a container group during its lifecycle, including timing information, status, and instance distribution metrics. |
| `display_name` | The display-friendly name of the resource. |
| `id` | The container group identifier. |
| `liveness_probe` | Defines a liveness probe for container groups that determines when to restart a container if it becomes unhealthy |
| `name` | The container group name. |
| `networking` | Network configuration for container groups that defines connectivity, routing, and access control settings |
| `organization_name` | The organization name. |
| `pending_change` | Indicates whether a configuration change has been requested but not yet applied to all containers in the group |
| `priority` | Specifies the priority level for container group execution, which determines resource allocation and scheduling precedence. |
| `project_name` | The project name. |
| `queue_autoscaler` | Defines configuration for automatically scaling container instances based on queue length. |
| `queue_connection` | Configuration for connecting a container group to a message queue system, enabling asynchronous communication between services. |
| `readiness_probe` | Defines how to check if a container is ready to serve traffic. |
| `readme` |  |
| `replicas` | The container group replicas. |
| `restart_policy` | Specifies the policy for restarting containers when they exit or fail. |
| `scalingactions` | List of scaling actions configurations |
| `scheduledscalingenabled` | Indicates if scheduled scaling is enabled |
| `startup_probe` | Defines a probe that checks if a container application has started successfully. |
| `update_time` | ISO 8601 timestamp when this container group was last updated |
| `version` | Incremental version number that increases with each configuration change to the container group |

Operations: create, list, load, remove, update.

API path: `/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/start`

#### ContainerGroup

| Field | Description |
| --- | --- |
| `cpu_percent` | The percentage of CPU used by this container group instance. |
| `cpu_usage` | The total CPU usage in seconds for this container group instance. |
| `cpu_usage_total` | The total CPU usage in seconds for this container group instance since it was started. |
| `deletion_cost` | The cost of deleting the container group instance |
| `id` | The container group instance identifier. |
| `machine_id` | The container group machine identifier. |
| `memory_usage_mb` | The memory usage in MB for this container group instance. |
| `memory_usage_percent` | The percentage of memory used by this container group instance. |
| `pulling_progress` | The progress percentage of pulling the container image. |
| `ready` | Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function. |
| `ssh_host_key_fingerprint` | The SSH host key fingerprint of the container group instance |
| `ssh_ip` | The SSH IP address of the container group instance |
| `ssh_port` | The SSH port of the container group instance |
| `started` | Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes. |
| `state` | The state of the container group instance |
| `update_time` | The UTC timestamp when the container group instance last changed its state. |
| `version` | The version of the container group definition currently running on this instance. |

Operations: create, load.

API path: `/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/reallocate`

#### ContainerGroupInstance

| Field | Description |
| --- | --- |
| `cpu_percent` | The percentage of CPU used by this container group instance. |
| `cpu_usage` | The total CPU usage in seconds for this container group instance. |
| `cpu_usage_total` | The total CPU usage in seconds for this container group instance since it was started. |
| `deletion_cost` | The cost of deleting the container group instance |
| `id` | The container group instance identifier. |
| `machine_id` | The container group machine identifier. |
| `memory_usage_mb` | The memory usage in MB for this container group instance. |
| `memory_usage_percent` | The percentage of memory used by this container group instance. |
| `pulling_progress` | The progress percentage of pulling the container image. |
| `ready` | Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function. |
| `ssh_host_key_fingerprint` | The SSH host key fingerprint of the container group instance |
| `ssh_ip` | The SSH IP address of the container group instance |
| `ssh_port` | The SSH port of the container group instance |
| `started` | Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes. |
| `state` | The state of the container group instance |
| `update_time` | The UTC timestamp when the container group instance last changed its state. |
| `version` | The version of the container group definition currently running on this instance. |

Operations: list, update.

API path: `/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances`

#### CpuAvailability

| Field | Description |
| --- | --- |
| `available_cpu_batch` | The number of available CPU cores |
| `country_codes` | A list of country codes where the resources are available |
| `cpu` | The number of available CPU cores |
| `memory` | The amount of available memory in MB |
| `on_call_cpu` | The amount of on-call CPU |
| `storage_amount` | The amount of available storage in bytes |

Operations: create.

API path: `/organizations/{organization_name}/availability/sce-cpu-availability`

#### GpuAvailability

| Field | Description |
| --- | --- |
| `available_gpu_batch` | The number of available GPU batches |
| `available_gpu_high` | The number of available high-end GPUs |
| `available_gpu_low` | The number of available low-end GPUs |
| `available_gpu_medium` | The number of available medium-end GPUs |
| `country_codes` | A list of country codes where the resources are available |
| `cpu` | The number of available CPU cores |
| `gpu_classes` | A list of available GPU class names |
| `memory` | The amount of available memory in MB |
| `on_call_gpu` | The number of on-call GPUs available |
| `storage_amount` | The amount of available storage in bytes |

Operations: create.

API path: `/organizations/{organization_name}/availability/sce-gpu-availability`

#### GpuClass

| Field | Description |
| --- | --- |
| `gpu_class_type` | The type of GPU class |
| `gpu_count` | The number of GPUs in the cluster |
| `id` | The unique identifier |
| `is_high_demand` | Whether the GPU class is in high demand |
| `max_ram` | The maximum RAM amount in MB |
| `max_storage` | The maximum storage amount in bytes |
| `max_vcpu` | The maximum vCPU count |
| `min_ram` | The minimum RAM amount in MB |
| `min_storage` | The minimum storage amount in bytes |
| `min_vcpu` | The minimum vCPU count |
| `name` | The GPU class name |
| `prices` | The list of prices for each container group priority |

Operations: list.

API path: `/organizations/{organization_name}/gpu-classes`

#### InferenceEndpoint

| Field | Description |
| --- | --- |
| `description` | The detailed description of the resource. |
| `display_name` | The display-friendly name of the resource. |
| `icon_url` | The URL of the icon image |
| `id` | The inference endpoint identifier. |
| `input_schema` | The input schema |
| `name` | The inference endpoint name. |
| `organization_name` | The organization name. |
| `output_schema` | The output schema |
| `price_description` | A description of the price |
| `readme` | A markdown file containing a detailed description of the inference endpoint |

Operations: list, load, remove.

API path: `/organizations/{organization_name}/inference-endpoints`

#### InferenceEndpointJob

| Field | Description |
| --- | --- |
| `create_time` | The time the job was created. |
| `events` | The list of events. |
| `id` | The inference endpoint job identifier. |
| `inference_endpoint_name` | The inference endpoint name. |
| `input` | The job input. |
| `metadata` | The job metadata. |
| `organization_name` | The organization name. |
| `output` | The job output. |
| `status` | The current status. |
| `update_time` | The time the job was last updated. |
| `webhook` | The webhook URL called when the job completes. |
| `webhook_url` | The webhook URL called when the job completes. |

Operations: create, load.

API path: `/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs`

#### InferenceEndpointJobCollection

| Field | Description |
| --- | --- |
| `create_time` | The time the job was created. |
| `events` | The list of events. |
| `id` | The inference endpoint job identifier. |
| `inference_endpoint_name` | The inference endpoint name. |
| `input` | The job input. |
| `metadata` | The job metadata. |
| `organization_name` | The organization name. |
| `output` | The job output. |
| `status` | The current status. |
| `update_time` | The time the job was last updated. |
| `webhook` | The webhook URL called when the job completes. |
| `webhook_url` | The webhook URL called when the job completes. |

Operations: list.

API path: `/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs`

#### LogEntry

| Field | Description |
| --- | --- |
| `end_time` | The end time of the time range |
| `items` | A collection of log entries |
| `organization_name` | The organization name. |
| `page_max_time` | The maximum time page boundary. |
| `page_min_time` | The minimum time page boundary. |
| `page_size` | The maximum number of items per page. |
| `query` | The query string for filtering logs |
| `sort_order` | The sort order of the log entries. |
| `start_time` | The start time of the time range |

Operations: create.

API path: `/organizations/{organization_name}/log-entries`

#### Queue

| Field | Description |
| --- | --- |
| `container_groups` | The container groups that are part of this queue. |
| `create_time` | The job creation time |
| `current_queue_length` | The current length of the queue |
| `description` | The description. |
| `display_name` | The display name. |
| `events` | The job events |
| `id` | The job identifier |
| `input` | The job input. |
| `metadata` | Additional metadata for the job |
| `name` | The queue name. |
| `output` | The job output. |
| `status` | The job status |
| `update_time` | The job update time |
| `webhook` | The webhook URL to notify when the job completes |

Operations: create, list, load, remove, update.

API path: `/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs`

#### Quota

| Field | Description |
| --- | --- |
| `container_groups_quotas` | Represents the organization quotas for container groups |
| `create_time` | The time the resource was created |
| `update_time` | The time the resource was last updated |

Operations: load.

API path: `/organizations/{organization_name}/quotas`

#### SystemLog

| Field | Description |
| --- | --- |
| `event_name` | The name of the event |
| `event_time` | The UTC date & time when the log item was created |
| `instance_id` | The container group instance identifier. |
| `machine_id` | The container group machine identifier. |
| `resource_cpu` | The number of CPUs |
| `resource_gpu_class` | The GPU class name |
| `resource_memory` | The memory amount in MB |
| `resource_storage_amount` | The storage amount in bytes |
| `version` | The version instance ID |

Operations: list.

API path: `/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/system-logs`

#### WebhookSecretKey

| Field | Description |
| --- | --- |
| `secret_key` | The webhook secret key |

Operations: create, load.

API path: `/organizations/{organization_name}/webhook-secret-key`



## Entities


### Container

Create an instance: `const container = client.Container()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autostart_policy` | `boolean` | Defines whether containers in this group should automatically start when deployed (true) or require manual starting (false) |
| `container` | `Record<string, any>` | Represents a container with its configuration and resource requirements. |
| `country_codes` | `any[]` | List of country codes where container instances are permitted to run. |
| `create_time` | `string` | ISO 8601 timestamp when this container group was initially created |
| `current_state` | `Record<string, any>` | Represents the operational state of a container group during its lifecycle, including timing information, status, and instance distribution metrics. |
| `display_name` | `string` | The display-friendly name of the resource. |
| `id` | `string` | The container group identifier. |
| `liveness_probe` | `Record<string, any> | null` | Defines a liveness probe for container groups that determines when to restart a container if it becomes unhealthy |
| `name` | `string` | The container group name. |
| `networking` | `Record<string, any>` | Network configuration for container groups that defines connectivity, routing, and access control settings |
| `organization_name` | `string` | The organization name. |
| `pending_change` | `boolean` | Indicates whether a configuration change has been requested but not yet applied to all containers in the group |
| `priority` | `string | null` | Specifies the priority level for container group execution, which determines resource allocation and scheduling precedence. |
| `project_name` | `string` | The project name. |
| `queue_autoscaler` | `Record<string, any>` | Defines configuration for automatically scaling container instances based on queue length. |
| `queue_connection` | `Record<string, any>` | Configuration for connecting a container group to a message queue system, enabling asynchronous communication between services. |
| `readiness_probe` | `Record<string, any> | null` | Defines how to check if a container is ready to serve traffic. |
| `readme` | `string` |  |
| `replicas` | `number` | The container group replicas. |
| `restart_policy` | `string` | Specifies the policy for restarting containers when they exit or fail. |
| `scalingactions` | `any[]` | List of scaling actions configurations |
| `scheduledscalingenabled` | `boolean` | Indicates if scheduled scaling is enabled |
| `startup_probe` | `Record<string, any> | null` | Defines a probe that checks if a container application has started successfully. |
| `update_time` | `string` | ISO 8601 timestamp when this container group was last updated |
| `version` | `number` | Incremental version number that increases with each configuration change to the container group |

#### Example: Load

```ts
const container = await client.Container().load({ id: 'container_id', organization_name: 'organization_name', project_id: 'project_id' })
```

#### Example: List

```ts
const containers = await client.Container().list({ organization_name: "example", project_name: "example" })
```

#### Example: Create

```ts
const container = await client.Container().create({
  organization_name: 'example_organization_name',
  project_name: 'example_project_name',
  autostart_policy: true,
  container: {},
  country_codes: [],
  create_time: 'example_create_time',
  current_state: {},
  display_name: 'example_display_name',
  id: 'example_id',
  liveness_probe: {},
  name: 'example_name',
  networking: {},
  pending_change: true,
  priority: 'example_priority',
  queue_autoscaler: {},
  queue_connection: {},
  readiness_probe: {},
  replicas: 1,
  restart_policy: 'example_restart_policy',
  scalingactions: [],
  scheduledscalingenabled: true,
  startup_probe: {},
  update_time: 'example_update_time',
  version: 1,
})
```


### ContainerGroup

Create an instance: `const container_group = client.ContainerGroup()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cpu_percent` | `number` | The percentage of CPU used by this container group instance. |
| `cpu_usage` | `number` | The total CPU usage in seconds for this container group instance. |
| `cpu_usage_total` | `number` | The total CPU usage in seconds for this container group instance since it was started. |
| `deletion_cost` | `number` | The cost of deleting the container group instance |
| `id` | `string` | The container group instance identifier. |
| `machine_id` | `string` | The container group machine identifier. |
| `memory_usage_mb` | `number` | The memory usage in MB for this container group instance. |
| `memory_usage_percent` | `number` | The percentage of memory used by this container group instance. |
| `pulling_progress` | `number` | The progress percentage of pulling the container image. |
| `ready` | `boolean` | Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function. |
| `ssh_host_key_fingerprint` | `string` | The SSH host key fingerprint of the container group instance |
| `ssh_ip` | `string` | The SSH IP address of the container group instance |
| `ssh_port` | `number` | The SSH port of the container group instance |
| `started` | `boolean` | Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes. |
| `state` | `string` | The state of the container group instance |
| `update_time` | `string` | The UTC timestamp when the container group instance last changed its state. |
| `version` | `number` | The version of the container group definition currently running on this instance. |

#### Example: Load

```ts
const container_group = await client.ContainerGroup().load({ container_group_instance_id: 'container_group_instance_id', container_id: 'container_id', organization_name: 'organization_name', project_id: 'project_id' })
```

#### Example: Create

```ts
const container_group = await client.ContainerGroup().create({
  container_id: 'example_container_id',
  instance_id: 'example_instance_id',
  organization_name: 'example_organization_name',
  project_id: 'example_project_id',
  id: 'example_id',
  machine_id: 'example_machine_id',
  state: 'example_state',
  update_time: 'example_update_time',
  version: 1,
})
```


### ContainerGroupInstance

Create an instance: `const container_group_instance = client.ContainerGroupInstance()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cpu_percent` | `number` | The percentage of CPU used by this container group instance. |
| `cpu_usage` | `number` | The total CPU usage in seconds for this container group instance. |
| `cpu_usage_total` | `number` | The total CPU usage in seconds for this container group instance since it was started. |
| `deletion_cost` | `number` | The cost of deleting the container group instance |
| `id` | `string` | The container group instance identifier. |
| `machine_id` | `string` | The container group machine identifier. |
| `memory_usage_mb` | `number` | The memory usage in MB for this container group instance. |
| `memory_usage_percent` | `number` | The percentage of memory used by this container group instance. |
| `pulling_progress` | `number` | The progress percentage of pulling the container image. |
| `ready` | `boolean` | Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function. |
| `ssh_host_key_fingerprint` | `string` | The SSH host key fingerprint of the container group instance |
| `ssh_ip` | `string` | The SSH IP address of the container group instance |
| `ssh_port` | `number` | The SSH port of the container group instance |
| `started` | `boolean` | Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes. |
| `state` | `string` | The state of the container group instance |
| `update_time` | `string` | The UTC timestamp when the container group instance last changed its state. |
| `version` | `number` | The version of the container group definition currently running on this instance. |

#### Example: List

```ts
const container_group_instances = await client.ContainerGroupInstance().list({ container_group_name: "example", organization_name: "example", project_id: "example" })
```


### CpuAvailability

Create an instance: `const cpu_availability = client.CpuAvailability()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_cpu_batch` | `number` | The number of available CPU cores |
| `country_codes` | `any[]` | A list of country codes where the resources are available |
| `cpu` | `number` | The number of available CPU cores |
| `memory` | `number` | The amount of available memory in MB |
| `on_call_cpu` | `number` | The amount of on-call CPU |
| `storage_amount` | `number` | The amount of available storage in bytes |

#### Example: Create

```ts
const cpu_availability = await client.CpuAvailability().create({
  organization_name: 'example_organization_name',
})
```


### GpuAvailability

Create an instance: `const gpu_availability = client.GpuAvailability()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_gpu_batch` | `number` | The number of available GPU batches |
| `available_gpu_high` | `number` | The number of available high-end GPUs |
| `available_gpu_low` | `number` | The number of available low-end GPUs |
| `available_gpu_medium` | `number` | The number of available medium-end GPUs |
| `country_codes` | `any[]` | A list of country codes where the resources are available |
| `cpu` | `number` | The number of available CPU cores |
| `gpu_classes` | `any[]` | A list of available GPU class names |
| `memory` | `number` | The amount of available memory in MB |
| `on_call_gpu` | `number` | The number of on-call GPUs available |
| `storage_amount` | `number` | The amount of available storage in bytes |

#### Example: Create

```ts
const gpu_availability = await client.GpuAvailability().create({
  organization_name: 'example_organization_name',
  gpu_classes: [],
})
```


### GpuClass

Create an instance: `const gpu_class = client.GpuClass()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `gpu_class_type` | `string` | The type of GPU class |
| `gpu_count` | `number` | The number of GPUs in the cluster |
| `id` | `string` | The unique identifier |
| `is_high_demand` | `boolean` | Whether the GPU class is in high demand |
| `max_ram` | `number` | The maximum RAM amount in MB |
| `max_storage` | `number` | The maximum storage amount in bytes |
| `max_vcpu` | `number` | The maximum vCPU count |
| `min_ram` | `number` | The minimum RAM amount in MB |
| `min_storage` | `number` | The minimum storage amount in bytes |
| `min_vcpu` | `number` | The minimum vCPU count |
| `name` | `string` | The GPU class name |
| `prices` | `any[]` | The list of prices for each container group priority |

#### Example: List

```ts
const gpu_classs = await client.GpuClass().list({ organization_name: "example" })
```


### InferenceEndpoint

Create an instance: `const inference_endpoint = client.InferenceEndpoint()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | The detailed description of the resource. |
| `display_name` | `string` | The display-friendly name of the resource. |
| `icon_url` | `string` | The URL of the icon image |
| `id` | `string` | The inference endpoint identifier. |
| `input_schema` | `string` | The input schema |
| `name` | `string` | The inference endpoint name. |
| `organization_name` | `string` | The organization name. |
| `output_schema` | `string` | The output schema |
| `price_description` | `string` | A description of the price |
| `readme` | `string` | A markdown file containing a detailed description of the inference endpoint |

#### Example: Load

```ts
const inference_endpoint = await client.InferenceEndpoint().load({ id: 'inference_endpoint_id', organization_name: 'organization_name' })
```

#### Example: List

```ts
const inference_endpoints = await client.InferenceEndpoint().list({ organization_name: "example" })
```


### InferenceEndpointJob

Create an instance: `const inference_endpoint_job = client.InferenceEndpointJob()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `create_time` | `string` | The time the job was created. |
| `events` | `any[]` | The list of events. |
| `id` | `string` | The inference endpoint job identifier. |
| `inference_endpoint_name` | `string` | The inference endpoint name. |
| `input` | `any` | The job input. |
| `metadata` | `Record<string, any>` | The job metadata. |
| `organization_name` | `string` | The organization name. |
| `output` | `any` | The job output. |
| `status` | `string` | The current status. |
| `update_time` | `string` | The time the job was last updated. |
| `webhook` | `string` | The webhook URL called when the job completes. |
| `webhook_url` | `string` | The webhook URL called when the job completes. |

#### Example: Load

```ts
const inference_endpoint_job = await client.InferenceEndpointJob().load({ id: 'inference_endpoint_job_id', inference_endpoint_id: 'inference_endpoint_id', organization_name: 'organization_name' })
```

#### Example: Create

```ts
const inference_endpoint_job = await client.InferenceEndpointJob().create({
  inference_endpoint_name: 'example_inference_endpoint_name',
  organization_name: 'example_organization_name',
  create_time: 'example_create_time',
  events: [],
  id: 'example_id',
  input: 'example_input',
  status: 'example_status',
  update_time: 'example_update_time',
})
```


### InferenceEndpointJobCollection

Create an instance: `const inference_endpoint_job_collection = client.InferenceEndpointJobCollection()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `create_time` | `string` | The time the job was created. |
| `events` | `any[]` | The list of events. |
| `id` | `string` | The inference endpoint job identifier. |
| `inference_endpoint_name` | `string` | The inference endpoint name. |
| `input` | `any` | The job input. |
| `metadata` | `Record<string, any>` | The job metadata. |
| `organization_name` | `string` | The organization name. |
| `output` | `any` | The job output. |
| `status` | `string` | The current status. |
| `update_time` | `string` | The time the job was last updated. |
| `webhook` | `string` | The webhook URL called when the job completes. |
| `webhook_url` | `string` | The webhook URL called when the job completes. |

#### Example: List

```ts
const inference_endpoint_job_collections = await client.InferenceEndpointJobCollection().list({ inference_endpoint_name: "example", organization_name: "example" })
```


### LogEntry

Create an instance: `const log_entry = client.LogEntry()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_time` | `string` | The end time of the time range |
| `items` | `any[]` | A collection of log entries |
| `organization_name` | `string` | The organization name. |
| `page_max_time` | `string` | The maximum time page boundary. |
| `page_min_time` | `string` | The minimum time page boundary. |
| `page_size` | `number` | The maximum number of items per page. |
| `query` | `string` | The query string for filtering logs |
| `sort_order` | `string` | The sort order of the log entries. |
| `start_time` | `string` | The start time of the time range |

#### Example: Create

```ts
const log_entry = await client.LogEntry().create({
  organization_name: 'example_organization_name',
  end_time: 'example_end_time',
  items: [],
  page_max_time: 'example_page_max_time',
  page_min_time: 'example_page_min_time',
  query: 'example_query',
  start_time: 'example_start_time',
})
```


### Queue

Create an instance: `const queue = client.Queue()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `container_groups` | `any[]` | The container groups that are part of this queue. |
| `create_time` | `string` | The job creation time |
| `current_queue_length` | `number` | The current length of the queue |
| `description` | `string` | The description. |
| `display_name` | `string` | The display name. |
| `events` | `any[]` | The job events |
| `id` | `string` | The job identifier |
| `input` | `any` | The job input. |
| `metadata` | `Record<string, any>` | Additional metadata for the job |
| `name` | `string` | The queue name. |
| `output` | `any` | The job output. |
| `status` | `string` | The job status |
| `update_time` | `string` | The job update time |
| `webhook` | `string` | The webhook URL to notify when the job completes |

#### Example: Load

```ts
const queue = await client.Queue().load({ id: 'queue_id', organization_name: 'organization_name', project_id: 'project_id' })
```

#### Example: List

```ts
const queues = await client.Queue().list({ organization_name: "example", project_name: "example" })
```

#### Example: Create

```ts
const queue = await client.Queue().create({
  organization_name: 'example_organization_name',
  project_name: 'example_project_name',
  container_groups: [],
  create_time: 'example_create_time',
  display_name: 'example_display_name',
  events: [],
  id: 'example_id',
  input: 'example_input',
  name: 'example_name',
  status: 'example_status',
  update_time: 'example_update_time',
})
```


### Quota

Create an instance: `const quota = client.Quota()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `container_groups_quotas` | `Record<string, any>` | Represents the organization quotas for container groups |
| `create_time` | `string` | The time the resource was created |
| `update_time` | `string` | The time the resource was last updated |

#### Example: Load

```ts
const quota = await client.Quota().load({ organization_name: 'organization_name' })
```


### SystemLog

Create an instance: `const system_log = client.SystemLog()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event_name` | `string` | The name of the event |
| `event_time` | `string` | The UTC date & time when the log item was created |
| `instance_id` | `string` | The container group instance identifier. |
| `machine_id` | `string` | The container group machine identifier. |
| `resource_cpu` | `number | null` | The number of CPUs |
| `resource_gpu_class` | `string` | The GPU class name |
| `resource_memory` | `number | null` | The memory amount in MB |
| `resource_storage_amount` | `number | null` | The storage amount in bytes |
| `version` | `string` | The version instance ID |

#### Example: List

```ts
const system_logs = await client.SystemLog().list({ container_group_name: "example", organization_name: "example", project_id: "example" })
```


### WebhookSecretKey

Create an instance: `const webhook_secret_key = client.WebhookSecretKey()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `secret_key` | `string` | The webhook secret key |

#### Example: Load

```ts
const webhook_secret_key = await client.WebhookSecretKey().load({ organization_name: 'organization_name' })
```

#### Example: Create

```ts
const webhook_secret_key = await client.WebhookSecretKey().create({
  organization_name: 'example_organization_name',
  secret_key: 'example_secret_key',
})
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
saladcloud/
├── src/
│   ├── SaladcloudSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { SaladcloudSDK } from '@voxgig-sdk/saladcloud-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const inferenceendpoint = client.InferenceEndpoint()
await inferenceendpoint.list()

// inferenceendpoint.data() now returns the inferenceendpoint data from the last `list`
// inferenceendpoint.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
