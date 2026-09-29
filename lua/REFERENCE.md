# Saladcloud Lua SDK Reference

Complete API reference for the Saladcloud Lua SDK.


## SaladcloudSDK

### Constructor

```lua
local sdk = require("saladcloud_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Container(data)`

Create a new `Container` entity instance. Pass `nil` for no initial data.

#### `ContainerGroup(data)`

Create a new `ContainerGroup` entity instance. Pass `nil` for no initial data.

#### `ContainerGroupInstance(data)`

Create a new `ContainerGroupInstance` entity instance. Pass `nil` for no initial data.

#### `CpuAvailability(data)`

Create a new `CpuAvailability` entity instance. Pass `nil` for no initial data.

#### `GpuAvailability(data)`

Create a new `GpuAvailability` entity instance. Pass `nil` for no initial data.

#### `GpuClass(data)`

Create a new `GpuClass` entity instance. Pass `nil` for no initial data.

#### `InferenceEndpoint(data)`

Create a new `InferenceEndpoint` entity instance. Pass `nil` for no initial data.

#### `InferenceEndpointJob(data)`

Create a new `InferenceEndpointJob` entity instance. Pass `nil` for no initial data.

#### `InferenceEndpointJobCollection(data)`

Create a new `InferenceEndpointJobCollection` entity instance. Pass `nil` for no initial data.

#### `LogEntry(data)`

Create a new `LogEntry` entity instance. Pass `nil` for no initial data.

#### `Queue(data)`

Create a new `Queue` entity instance. Pass `nil` for no initial data.

#### `Quota(data)`

Create a new `Quota` entity instance. Pass `nil` for no initial data.

#### `SystemLog(data)`

Create a new `SystemLog` entity instance. Pass `nil` for no initial data.

#### `WebhookSecretKey(data)`

Create a new `WebhookSecretKey` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## ContainerEntity

```lua
local container = client:Container(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autostart_policy` | `boolean` | Yes | Defines whether containers in this group should automatically start when deployed (true) or require manual starting (false) |
| `container` | `table` | Yes | Represents a container with its configuration and resource requirements. |
| `country_codes` | `table` | Yes | List of country codes where container instances are permitted to run. |
| `create_time` | `string` | Yes | ISO 8601 timestamp when this container group was initially created |
| `current_state` | `table` | Yes | Represents the operational state of a container group during its lifecycle, including timing information, status, and instance distribution metrics. |
| `display_name` | `string` | Yes | The display-friendly name of the resource. |
| `id` | `string` | Yes | The container group identifier. |
| `liveness_probe` | `table|nil` | Yes | Defines a liveness probe for container groups that determines when to restart a container if it becomes unhealthy |
| `name` | `string` | Yes | The container group name. |
| `networking` | `table` | Yes | Network configuration for container groups that defines connectivity, routing, and access control settings |
| `organization_name` | `string` | Yes | The organization name. |
| `pending_change` | `boolean` | Yes | Indicates whether a configuration change has been requested but not yet applied to all containers in the group |
| `priority` | `string|nil` | Yes | Specifies the priority level for container group execution, which determines resource allocation and scheduling precedence. |
| `project_name` | `string` | Yes | The project name. |
| `queue_autoscaler` | `table` | Yes | Defines configuration for automatically scaling container instances based on queue length. |
| `queue_connection` | `table` | Yes | Configuration for connecting a container group to a message queue system, enabling asynchronous communication between services. |
| `readiness_probe` | `table|nil` | Yes | Defines how to check if a container is ready to serve traffic. |
| `readme` | `string` | No |  |
| `replicas` | `number` | Yes | The container group replicas. |
| `restart_policy` | `string` | Yes | Specifies the policy for restarting containers when they exit or fail. |
| `scalingactions` | `table` | Yes | List of scaling actions configurations |
| `scheduledscalingenabled` | `boolean` | Yes | Indicates if scheduled scaling is enabled |
| `startup_probe` | `table|nil` | Yes | Defines a probe that checks if a container application has started successfully. |
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

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Container():create({
  organization_name = --[[ string ]],
  project_name = --[[ string ]],
  autostart_policy = --[[ boolean ]],
  container = --[[ table ]],
  country_codes = --[[ table ]],
  create_time = --[[ string ]],
  current_state = --[[ table ]],
  display_name = --[[ string ]],
  id = --[[ string ]],
  liveness_probe = --[[ table|nil ]],
  name = --[[ string ]],
  networking = --[[ table ]],
  pending_change = --[[ boolean ]],
  priority = --[[ string|nil ]],
  queue_autoscaler = --[[ table ]],
  queue_connection = --[[ table ]],
  readiness_probe = --[[ table|nil ]],
  replicas = --[[ number ]],
  restart_policy = --[[ string ]],
  scalingactions = --[[ table ]],
  scheduledscalingenabled = --[[ boolean ]],
  startup_probe = --[[ table|nil ]],
  update_time = --[[ string ]],
  version = --[[ number ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Container():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Container():load({ id = "container_id", organization_name = "organization_name", project_id = "project_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Container():remove({ id = "container_id", organization_name = "organization_name", project_id = "project_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Container():update({
  id = "container_id",
  organization_name = "organization_name",
  project_id = "project_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContainerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ContainerGroupEntity

```lua
local container_group = client:ContainerGroup(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:ContainerGroup():create({
  container_id = --[[ string ]],
  instance_id = --[[ string ]],
  organization_name = --[[ string ]],
  project_id = --[[ string ]],
  id = --[[ string ]],
  machine_id = --[[ string ]],
  state = --[[ string ]],
  update_time = --[[ string ]],
  version = --[[ number ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ContainerGroup():load({ container_group_instance_id = "container_group_instance_id", container_id = "container_id", organization_name = "organization_name", project_id = "project_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContainerGroupEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ContainerGroupInstanceEntity

```lua
local container_group_instance = client:ContainerGroupInstance(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ContainerGroupInstance():list()
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:ContainerGroupInstance():update({
  container_id = "container_id",
  id = "id",
  organization_name = "organization_name",
  project_id = "project_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContainerGroupInstanceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CpuAvailabilityEntity

```lua
local cpu_availability = client:CpuAvailability(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_cpu_batch` | `number` | No | The number of available CPU cores |
| `country_codes` | `table` | No | A list of country codes where the resources are available |
| `cpu` | `number` | No | The number of available CPU cores |
| `memory` | `number` | No | The amount of available memory in MB |
| `on_call_cpu` | `number` | No | The amount of on-call CPU |
| `storage_amount` | `number` | No | The amount of available storage in bytes |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:CpuAvailability():create({
  organization_name = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CpuAvailabilityEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GpuAvailabilityEntity

```lua
local gpu_availability = client:GpuAvailability(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_gpu_batch` | `number` | No | The number of available GPU batches |
| `available_gpu_high` | `number` | No | The number of available high-end GPUs |
| `available_gpu_low` | `number` | No | The number of available low-end GPUs |
| `available_gpu_medium` | `number` | No | The number of available medium-end GPUs |
| `country_codes` | `table` | No | A list of country codes where the resources are available |
| `cpu` | `number` | No | The number of available CPU cores |
| `gpu_classes` | `table` | Yes | A list of available GPU class names |
| `memory` | `number` | No | The amount of available memory in MB |
| `on_call_gpu` | `number` | No | The number of on-call GPUs available |
| `storage_amount` | `number` | No | The amount of available storage in bytes |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:GpuAvailability():create({
  organization_name = --[[ string ]],
  gpu_classes = --[[ table ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GpuAvailabilityEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GpuClassEntity

```lua
local gpu_class = client:GpuClass(nil)
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
| `prices` | `table` | Yes | The list of prices for each container group priority |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:GpuClass():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GpuClassEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InferenceEndpointEntity

```lua
local inference_endpoint = client:InferenceEndpoint(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:InferenceEndpoint():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:InferenceEndpoint():load({ id = "inference_endpoint_id", organization_name = "organization_name" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:InferenceEndpoint():remove({ inference_endpoint_id = "inference_endpoint_id", inference_endpoint_job_id = "inference_endpoint_job_id", organization_name = "organization_name" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InferenceEndpointEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InferenceEndpointJobEntity

```lua
local inference_endpoint_job = client:InferenceEndpointJob(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `create_time` | `string` | Yes | The time the job was created. |
| `events` | `table` | Yes | The list of events. |
| `id` | `string` | Yes | The inference endpoint job identifier. |
| `inference_endpoint_name` | `string` | Yes | The inference endpoint name. |
| `input` | `any` | Yes | The job input. |
| `metadata` | `table` | No | The job metadata. |
| `organization_name` | `string` | Yes | The organization name. |
| `output` | `any` | No | The job output. |
| `status` | `string` | Yes | The current status. |
| `update_time` | `string` | Yes | The time the job was last updated. |
| `webhook` | `string` | No | The webhook URL called when the job completes. |
| `webhook_url` | `string` | No | The webhook URL called when the job completes. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:InferenceEndpointJob():create({
  inference_endpoint_name = --[[ string ]],
  organization_name = --[[ string ]],
  create_time = --[[ string ]],
  events = --[[ table ]],
  id = --[[ string ]],
  input = --[[ any ]],
  status = --[[ string ]],
  update_time = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:InferenceEndpointJob():load({ id = "inference_endpoint_job_id", inference_endpoint_id = "inference_endpoint_id", organization_name = "organization_name" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InferenceEndpointJobEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InferenceEndpointJobCollectionEntity

```lua
local inference_endpoint_job_collection = client:InferenceEndpointJobCollection(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `create_time` | `string` | Yes | The time the job was created. |
| `events` | `table` | Yes | The list of events. |
| `id` | `string` | Yes | The inference endpoint job identifier. |
| `inference_endpoint_name` | `string` | Yes | The inference endpoint name. |
| `input` | `any` | Yes | The job input. |
| `metadata` | `table` | No | The job metadata. |
| `organization_name` | `string` | Yes | The organization name. |
| `output` | `any` | No | The job output. |
| `status` | `string` | Yes | The current status. |
| `update_time` | `string` | Yes | The time the job was last updated. |
| `webhook` | `string` | No | The webhook URL called when the job completes. |
| `webhook_url` | `string` | No | The webhook URL called when the job completes. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:InferenceEndpointJobCollection():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InferenceEndpointJobCollectionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LogEntryEntity

```lua
local log_entry = client:LogEntry(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_time` | `string` | Yes | The end time of the time range |
| `items` | `table` | Yes | A collection of log entries |
| `organization_name` | `string` | Yes | The organization name. |
| `page_max_time` | `string` | Yes | The maximum time page boundary. |
| `page_min_time` | `string` | Yes | The minimum time page boundary. |
| `page_size` | `number` | No | The maximum number of items per page. |
| `query` | `string` | Yes | The query string for filtering logs |
| `sort_order` | `string` | No | The sort order of the log entries. |
| `start_time` | `string` | Yes | The start time of the time range |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:LogEntry():create({
  organization_name = --[[ string ]],
  end_time = --[[ string ]],
  items = --[[ table ]],
  page_max_time = --[[ string ]],
  page_min_time = --[[ string ]],
  query = --[[ string ]],
  start_time = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LogEntryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## QueueEntity

```lua
local queue = client:Queue(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `container_groups` | `table` | Yes | The container groups that are part of this queue. |
| `create_time` | `string` | Yes | The job creation time |
| `current_queue_length` | `number` | No | The current length of the queue |
| `description` | `string` | No | The description. |
| `display_name` | `string` | Yes | The display name. |
| `events` | `table` | Yes | The job events |
| `id` | `string` | Yes | The job identifier |
| `input` | `any` | Yes | The job input. |
| `metadata` | `table` | No | Additional metadata for the job |
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

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Queue():create({
  organization_name = --[[ string ]],
  project_name = --[[ string ]],
  container_groups = --[[ table ]],
  create_time = --[[ string ]],
  display_name = --[[ string ]],
  events = --[[ table ]],
  id = --[[ string ]],
  input = --[[ any ]],
  name = --[[ string ]],
  status = --[[ string ]],
  update_time = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Queue():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Queue():load({ id = "queue_id", organization_name = "organization_name", project_id = "project_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Queue():remove({ id = "queue_id", organization_name = "organization_name", project_id = "project_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Queue():update({
  id = "queue_id",
  organization_name = "organization_name",
  project_id = "project_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QueueEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## QuotaEntity

```lua
local quota = client:Quota(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `container_groups_quotas` | `table` | Yes | Represents the organization quotas for container groups |
| `create_time` | `string` | No | The time the resource was created |
| `update_time` | `string` | No | The time the resource was last updated |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Quota():load({ organization_name = "organization_name" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QuotaEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SystemLogEntity

```lua
local system_log = client:SystemLog(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_name` | `string` | Yes | The name of the event |
| `event_time` | `string` | Yes | The UTC date & time when the log item was created |
| `instance_id` | `string` | No | The container group instance identifier. |
| `machine_id` | `string` | No | The container group machine identifier. |
| `resource_cpu` | `number|nil` | Yes | The number of CPUs |
| `resource_gpu_class` | `string` | Yes | The GPU class name |
| `resource_memory` | `number|nil` | Yes | The memory amount in MB |
| `resource_storage_amount` | `number|nil` | Yes | The storage amount in bytes |
| `version` | `string` | Yes | The version instance ID |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:SystemLog():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SystemLogEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WebhookSecretKeyEntity

```lua
local webhook_secret_key = client:WebhookSecretKey(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `secret_key` | `string` | Yes | The webhook secret key |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:WebhookSecretKey():create({
  organization_name = --[[ string ]],
  secret_key = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:WebhookSecretKey():load({ organization_name = "organization_name" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebhookSecretKeyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


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

```lua
local client = sdk.new({
  feature = {
    debug = { active = true },
    idempotency = { active = true },
    metrics = { active = true },
    paging = { active = true },
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
  },
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

