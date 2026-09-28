# Saladcloud TypeScript SDK Reference

Complete API reference for the Saladcloud TypeScript SDK.


## SaladcloudSDK

### Constructor

```ts
new SaladcloudSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SaladcloudSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = SaladcloudSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `SaladcloudSDK` instance in test mode.


### Instance Methods

#### `Container(data?: object)`

Create a new `Container` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContainerEntity` instance.

#### `ContainerGroup(data?: object)`

Create a new `ContainerGroup` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContainerGroupEntity` instance.

#### `ContainerGroupInstance(data?: object)`

Create a new `ContainerGroupInstance` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContainerGroupInstanceEntity` instance.

#### `CpuAvailability(data?: object)`

Create a new `CpuAvailability` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CpuAvailabilityEntity` instance.

#### `GpuAvailability(data?: object)`

Create a new `GpuAvailability` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GpuAvailabilityEntity` instance.

#### `GpuClass(data?: object)`

Create a new `GpuClass` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GpuClassEntity` instance.

#### `InferenceEndpoint(data?: object)`

Create a new `InferenceEndpoint` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InferenceEndpointEntity` instance.

#### `InferenceEndpointJob(data?: object)`

Create a new `InferenceEndpointJob` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InferenceEndpointJobEntity` instance.

#### `InferenceEndpointJobCollection(data?: object)`

Create a new `InferenceEndpointJobCollection` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InferenceEndpointJobCollectionEntity` instance.

#### `LogEntry(data?: object)`

Create a new `LogEntry` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LogEntryEntity` instance.

#### `Queue(data?: object)`

Create a new `Queue` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `QueueEntity` instance.

#### `Quota(data?: object)`

Create a new `Quota` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `QuotaEntity` instance.

#### `SystemLog(data?: object)`

Create a new `SystemLog` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SystemLogEntity` instance.

#### `WebhookSecretKey(data?: object)`

Create a new `WebhookSecretKey` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WebhookSecretKeyEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `SaladcloudSDK.test()`.

**Returns:** `SaladcloudSDK` instance in test mode.


---

## ContainerEntity

```ts
const container = client.Container()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autostart_policy` | `boolean` | Yes | Defines whether containers in this group should automatically start when deployed (true) or require manual starting (false) |
| `container` | `Record<string, any>` | Yes | Represents a container with its configuration and resource requirements. |
| `country_codes` | `any[]` | Yes | List of country codes where container instances are permitted to run. |
| `create_time` | `string` | Yes | ISO 8601 timestamp when this container group was initially created |
| `current_state` | `Record<string, any>` | Yes | Represents the operational state of a container group during its lifecycle, including timing information, status, and instance distribution metrics. |
| `display_name` | `string` | Yes | The display-friendly name of the resource. |
| `id` | `string` | Yes | The container group identifier. |
| `liveness_probe` | `Record<string, any> | null` | Yes | Defines a liveness probe for container groups that determines when to restart a container if it becomes unhealthy |
| `name` | `string` | Yes | The container group name. |
| `networking` | `Record<string, any>` | Yes | Network configuration for container groups that defines connectivity, routing, and access control settings |
| `organization_name` | `string` | Yes | The organization name. |
| `pending_change` | `boolean` | Yes | Indicates whether a configuration change has been requested but not yet applied to all containers in the group |
| `priority` | `string | null` | Yes | Specifies the priority level for container group execution, which determines resource allocation and scheduling precedence. |
| `project_name` | `string` | Yes | The project name. |
| `queue_autoscaler` | `Record<string, any>` | Yes | Defines configuration for automatically scaling container instances based on queue length. |
| `queue_connection` | `Record<string, any>` | Yes | Configuration for connecting a container group to a message queue system, enabling asynchronous communication between services. |
| `readiness_probe` | `Record<string, any> | null` | Yes | Defines how to check if a container is ready to serve traffic. |
| `readme` | `string` | No |  |
| `replicas` | `number` | Yes | The container group replicas. |
| `restart_policy` | `string` | Yes | Specifies the policy for restarting containers when they exit or fail. |
| `scalingactions` | `any[]` | Yes | List of scaling actions configurations |
| `scheduledscalingenabled` | `boolean` | Yes | Indicates if scheduled scaling is enabled |
| `startup_probe` | `Record<string, any> | null` | Yes | Defines a probe that checks if a container application has started successfully. |
| `update_time` | `string` | Yes | ISO 8601 timestamp when this container group was last updated |
| `version` | `number` | Yes | Incremental version number that increases with each configuration change to the container group |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `autostart_policy` | - | - | - | - | - |
| `container` | - | - | - | - | - |
| `country_codes` | - | - | Yes | - | - |
| `create_time` | - | - | - | - | - |
| `current_state` | - | - | - | - | - |
| `display_name` | - | - | Yes | - | - |
| `id` | - | - | - | - | - |
| `liveness_probe` | - | - | - | - | - |
| `name` | - | - | - | - | - |
| `networking` | - | - | - | - | - |
| `organization_name` | - | - | - | - | - |
| `pending_change` | - | - | - | - | - |
| `priority` | - | - | - | - | - |
| `project_name` | - | - | - | - | - |
| `queue_autoscaler` | - | - | - | - | - |
| `queue_connection` | - | - | - | - | - |
| `readiness_probe` | - | - | - | - | - |
| `readme` | - | - | - | - | - |
| `replicas` | - | - | - | - | - |
| `restart_policy` | - | - | - | - | - |
| `scalingactions` | - | - | Yes | - | - |
| `scheduledscalingenabled` | - | - | Yes | - | - |
| `startup_probe` | - | - | - | - | - |
| `update_time` | - | - | - | - | - |
| `version` | - | - | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `start` | `/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/start` | `client.Container().create({ $action: 'start', ... })` |
| `stop` | `/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/stop` | `client.Container().create({ $action: 'stop', ... })` |

An action returns that action's OWN response, which is not necessarily a
Container record — check the API definition for its shape.

```ts
const result = await client.Container().create({
  $action: 'start',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Container().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Container().list({ organization_name: "example", project_name: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Container().load({ id: 'container_id', organization_name: 'organization_name', project_id: 'project_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Container().remove({ id: 'container_id', organization_name: 'organization_name', project_id: 'project_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Container().update({
  id: 'container_id',
  organization_name: 'organization_name',
  project_id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContainerEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaladcloudSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ContainerGroupEntity

```ts
const container_group = client.ContainerGroup()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `reallocate` | `/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/reallocate` | `client.ContainerGroup().create({ $action: 'reallocate', ... })` |
| `recreate` | `/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/recreate` | `client.ContainerGroup().create({ $action: 'recreate', ... })` |
| `restart` | `/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/restart` | `client.ContainerGroup().create({ $action: 'restart', ... })` |

An action returns that action's OWN response, which is not necessarily a
ContainerGroup record — check the API definition for its shape.

```ts
const result = await client.ContainerGroup().create({
  $action: 'reallocate',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ContainerGroup().create({
  container_id: 'example_container_id',
  instance_id: 'example_instance_id',
  organization_name: 'example_organization_name',
  project_id: 'example_project_id',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ContainerGroup().load({ container_group_instance_id: 'container_group_instance_id', container_id: 'container_id', organization_name: 'organization_name', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContainerGroupEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaladcloudSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ContainerGroupInstanceEntity

```ts
const container_group_instance = client.ContainerGroupInstance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cpu_percent` | `number` | No | The percentage of CPU used by this container group instance. |
| `cpu_usage` | `number` | No | The total CPU usage in seconds for this container group instance. |
| `cpu_usage_total` | `number` | No | The total CPU usage in seconds for this container group instance since it was started. |
| `deletion_cost` | `number` | No | The cost of deleting the container group instance |
| `id` | `string` | Yes | The container group instance identifier. |
| `machine_id` | `string` | Yes | The container group machine identifier. |
| `memory_usage_mb` | `number` | No | The memory usage in MB for this container group instance. |
| `memory_usage_percent` | `number` | No | The percentage of memory used by this container group instance. |
| `pulling_progress` | `number` | No | The progress percentage of pulling the container image. |
| `ready` | `boolean` | No | Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function. |
| `ssh_host_key_fingerprint` | `string` | No | The SSH host key fingerprint of the container group instance |
| `ssh_ip` | `string` | No | The SSH IP address of the container group instance |
| `ssh_port` | `number` | No | The SSH port of the container group instance |
| `started` | `boolean` | No | Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes. |
| `state` | `string` | Yes | The state of the container group instance |
| `update_time` | `string` | Yes | The UTC timestamp when the container group instance last changed its state. |
| `version` | `number` | Yes | The version of the container group definition currently running on this instance. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ContainerGroupInstance().list({ container_group_name: "example", organization_name: "example", project_id: "example" })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ContainerGroupInstance().update({
  container_id: 'container_id',
  id: 'id',
  organization_name: 'organization_name',
  project_id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContainerGroupInstanceEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaladcloudSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CpuAvailabilityEntity

```ts
const cpu_availability = client.CpuAvailability()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_cpu_batch` | `number` | No | The number of available CPU cores |
| `country_codes` | `any[]` | No | A list of country codes where the resources are available |
| `cpu` | `number` | No | The number of available CPU cores |
| `memory` | `number` | No | The amount of available memory in MB |
| `on_call_cpu` | `number` | No | The amount of on-call CPU |
| `storage_amount` | `number` | No | The amount of available storage in bytes |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CpuAvailability().create({
  organization_name: 'example_organization_name',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CpuAvailabilityEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaladcloudSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GpuAvailabilityEntity

```ts
const gpu_availability = client.GpuAvailability()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_gpu_batch` | `number` | No | The number of available GPU batches |
| `available_gpu_high` | `number` | No | The number of available high-end GPUs |
| `available_gpu_low` | `number` | No | The number of available low-end GPUs |
| `available_gpu_medium` | `number` | No | The number of available medium-end GPUs |
| `country_codes` | `any[]` | No | A list of country codes where the resources are available |
| `cpu` | `number` | No | The number of available CPU cores |
| `gpu_classes` | `any[]` | Yes | A list of available GPU class names |
| `memory` | `number` | No | The amount of available memory in MB |
| `on_call_gpu` | `number` | No | The number of on-call GPUs available |
| `storage_amount` | `number` | No | The amount of available storage in bytes |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.GpuAvailability().create({
  organization_name: 'example_organization_name',
  gpu_classes: [],
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GpuAvailabilityEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaladcloudSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GpuClassEntity

```ts
const gpu_class = client.GpuClass()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `gpu_class_type` | `string` | No | The type of GPU class |
| `gpu_count` | `number` | No | The number of GPUs in the cluster |
| `id` | `string` | Yes | The unique identifier |
| `is_high_demand` | `boolean` | No | Whether the GPU class is in high demand |
| `max_ram` | `number` | No | The maximum RAM amount in MB |
| `max_storage` | `number` | No | The maximum storage amount in bytes |
| `max_vcpu` | `number` | No | The maximum vCPU count |
| `min_ram` | `number` | No | The minimum RAM amount in MB |
| `min_storage` | `number` | No | The minimum storage amount in bytes |
| `min_vcpu` | `number` | No | The minimum vCPU count |
| `name` | `string` | Yes | The GPU class name |
| `prices` | `any[]` | Yes | The list of prices for each container group priority |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.GpuClass().list({ organization_name: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GpuClassEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaladcloudSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InferenceEndpointEntity

```ts
const inference_endpoint = client.InferenceEndpoint()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes | The detailed description of the resource. |
| `display_name` | `string` | Yes | The display-friendly name of the resource. |
| `icon_url` | `string` | Yes | The URL of the icon image |
| `id` | `string` | Yes | The inference endpoint identifier. |
| `input_schema` | `string` | Yes | The input schema |
| `name` | `string` | Yes | The inference endpoint name. |
| `organization_name` | `string` | Yes | The organization name. |
| `output_schema` | `string` | Yes | The output schema |
| `price_description` | `string` | Yes | A description of the price |
| `readme` | `string` | Yes | A markdown file containing a detailed description of the inference endpoint |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.InferenceEndpoint().list({ organization_name: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.InferenceEndpoint().load({ id: 'inference_endpoint_id', organization_name: 'organization_name' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.InferenceEndpoint().remove({ inference_endpoint_id: 'inference_endpoint_id', inference_endpoint_job_id: 'inference_endpoint_job_id', organization_name: 'organization_name' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InferenceEndpointEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaladcloudSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InferenceEndpointJobEntity

```ts
const inference_endpoint_job = client.InferenceEndpointJob()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `create_time` | `string` | Yes | The time the job was created. |
| `events` | `any[]` | Yes | The list of events. |
| `id` | `string` | Yes | The inference endpoint job identifier. |
| `inference_endpoint_name` | `string` | Yes | The inference endpoint name. |
| `input` | `any` | Yes | The job input. |
| `metadata` | `Record<string, any>` | No | The job metadata. |
| `organization_name` | `string` | Yes | The organization name. |
| `output` | `any` | No | The job output. |
| `status` | `string` | Yes | The current status. |
| `update_time` | `string` | Yes | The time the job was last updated. |
| `webhook` | `string` | No | The webhook URL called when the job completes. |
| `webhook_url` | `string` | No | The webhook URL called when the job completes. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.InferenceEndpointJob().create({
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.InferenceEndpointJob().load({ id: 'inference_endpoint_job_id', inference_endpoint_id: 'inference_endpoint_id', organization_name: 'organization_name' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InferenceEndpointJobEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaladcloudSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InferenceEndpointJobCollectionEntity

```ts
const inference_endpoint_job_collection = client.InferenceEndpointJobCollection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `create_time` | `string` | Yes | The time the job was created. |
| `events` | `any[]` | Yes | The list of events. |
| `id` | `string` | Yes | The inference endpoint job identifier. |
| `inference_endpoint_name` | `string` | Yes | The inference endpoint name. |
| `input` | `any` | Yes | The job input. |
| `metadata` | `Record<string, any>` | No | The job metadata. |
| `organization_name` | `string` | Yes | The organization name. |
| `output` | `any` | No | The job output. |
| `status` | `string` | Yes | The current status. |
| `update_time` | `string` | Yes | The time the job was last updated. |
| `webhook` | `string` | No | The webhook URL called when the job completes. |
| `webhook_url` | `string` | No | The webhook URL called when the job completes. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.InferenceEndpointJobCollection().list({ inference_endpoint_name: "example", organization_name: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InferenceEndpointJobCollectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaladcloudSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LogEntryEntity

```ts
const log_entry = client.LogEntry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_time` | `string` | Yes | The end time of the time range |
| `items` | `any[]` | Yes | A collection of log entries |
| `organization_name` | `string` | Yes | The organization name. |
| `page_max_time` | `string` | Yes | The maximum time page boundary. |
| `page_min_time` | `string` | Yes | The minimum time page boundary. |
| `page_size` | `number` | No | The maximum number of items per page. |
| `query` | `string` | Yes | The query string for filtering logs |
| `sort_order` | `string` | No | The sort order of the log entries. |
| `start_time` | `string` | Yes | The start time of the time range |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.LogEntry().create({
  organization_name: 'example_organization_name',
  end_time: 'example_end_time',
  items: [],
  page_max_time: 'example_page_max_time',
  page_min_time: 'example_page_min_time',
  query: 'example_query',
  start_time: 'example_start_time',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LogEntryEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaladcloudSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## QueueEntity

```ts
const queue = client.Queue()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `container_groups` | `any[]` | Yes | The container groups that are part of this queue. |
| `create_time` | `string` | Yes | The job creation time |
| `current_queue_length` | `number` | No | The current length of the queue |
| `description` | `string` | No | The description. |
| `display_name` | `string` | Yes | The display name. |
| `events` | `any[]` | Yes | The job events |
| `id` | `string` | Yes | The job identifier |
| `input` | `any` | Yes | The job input. |
| `metadata` | `Record<string, any>` | No | Additional metadata for the job |
| `name` | `string` | Yes | The queue name. |
| `output` | `any` | No | The job output. |
| `status` | `string` | Yes | The job status |
| `update_time` | `string` | Yes | The job update time |
| `webhook` | `string` | No | The webhook URL to notify when the job completes |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `container_groups` | - | - | - | - | - |
| `create_time` | - | - | - | - | - |
| `current_queue_length` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `display_name` | - | - | Yes | - | - |
| `events` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `input` | - | - | - | - | - |
| `metadata` | - | - | - | - | - |
| `name` | - | - | - | - | - |
| `output` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `update_time` | - | - | - | - | - |
| `webhook` | - | - | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `job` | `/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs` | `client.Queue().create({ $action: 'job', ... })` |
| `job` | `/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs` | `client.Queue().list({ $action: 'job', ... })` |

An action returns that action's OWN response, which is not necessarily a
Queue record — check the API definition for its shape.

```ts
const result = await client.Queue().create({
  $action: 'job',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Queue().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Queue().list({ organization_name: "example", project_name: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Queue().load({ id: 'queue_id', organization_name: 'organization_name', project_id: 'project_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Queue().remove({ id: 'queue_id', organization_name: 'organization_name', project_id: 'project_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Queue().update({
  id: 'queue_id',
  organization_name: 'organization_name',
  project_id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `QueueEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaladcloudSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## QuotaEntity

```ts
const quota = client.Quota()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `container_replicas_quota` | `number` | Yes | The maximum number of replicas that can be created for a container group |
| `container_replicas_used` | `number` | Yes | The number of replicas that are currently in use |
| `max_container_group_reallocations_per_minute` | `number` | No | The maximum number of container group reallocations per minute |
| `max_container_group_recreates_per_minute` | `number` | No | The maximum number of container group recreates per minute |
| `max_container_group_restarts_per_minute` | `number` | No | The maximum number of container group restarts per minute |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Quota().load({ organization_name: 'organization_name' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `QuotaEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaladcloudSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SystemLogEntity

```ts
const system_log = client.SystemLog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_name` | `string` | Yes | The name of the event |
| `event_time` | `string` | Yes | The UTC date & time when the log item was created |
| `instance_id` | `string` | No | The container group instance identifier. |
| `machine_id` | `string` | No | The container group machine identifier. |
| `resource_cpu` | `number | null` | Yes | The number of CPUs |
| `resource_gpu_class` | `string` | Yes | The GPU class name |
| `resource_memory` | `number | null` | Yes | The memory amount in MB |
| `resource_storage_amount` | `number | null` | Yes | The storage amount in bytes |
| `version` | `string` | Yes | The version instance ID |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.SystemLog().list({ container_group_name: "example", organization_name: "example", project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SystemLogEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaladcloudSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WebhookSecretKeyEntity

```ts
const webhook_secret_key = client.WebhookSecretKey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `secret_key` | `string` | Yes | The webhook secret key |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.WebhookSecretKey().create({
  organization_name: 'example_organization_name',
  secret_key: 'example_secret_key',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.WebhookSecretKey().load({ organization_name: 'organization_name' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WebhookSecretKeyEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaladcloudSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ts
const client = new SaladcloudSDK({
  feature: {
    debug: { active: true },
    idempotency: { active: true },
    metrics: { active: true },
    paging: { active: true },
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Debug capture.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Metrics.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Paging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

