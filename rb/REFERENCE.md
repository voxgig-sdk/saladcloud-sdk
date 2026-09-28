# Saladcloud Ruby SDK Reference

Complete API reference for the Saladcloud Ruby SDK.


## SaladcloudSDK

### Constructor

```ruby
require_relative 'Saladcloud_sdk'

client = SaladcloudSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SaladcloudSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = SaladcloudSDK.test
```


### Instance Methods

#### `Container(data = nil)`

Create a new `Container` entity instance. Pass `nil` for no initial data.

#### `ContainerGroup(data = nil)`

Create a new `ContainerGroup` entity instance. Pass `nil` for no initial data.

#### `ContainerGroupInstance(data = nil)`

Create a new `ContainerGroupInstance` entity instance. Pass `nil` for no initial data.

#### `CpuAvailability(data = nil)`

Create a new `CpuAvailability` entity instance. Pass `nil` for no initial data.

#### `GpuAvailability(data = nil)`

Create a new `GpuAvailability` entity instance. Pass `nil` for no initial data.

#### `GpuClass(data = nil)`

Create a new `GpuClass` entity instance. Pass `nil` for no initial data.

#### `InferenceEndpoint(data = nil)`

Create a new `InferenceEndpoint` entity instance. Pass `nil` for no initial data.

#### `InferenceEndpointJob(data = nil)`

Create a new `InferenceEndpointJob` entity instance. Pass `nil` for no initial data.

#### `InferenceEndpointJobCollection(data = nil)`

Create a new `InferenceEndpointJobCollection` entity instance. Pass `nil` for no initial data.

#### `LogEntry(data = nil)`

Create a new `LogEntry` entity instance. Pass `nil` for no initial data.

#### `Queue(data = nil)`

Create a new `Queue` entity instance. Pass `nil` for no initial data.

#### `Quota(data = nil)`

Create a new `Quota` entity instance. Pass `nil` for no initial data.

#### `SystemLog(data = nil)`

Create a new `SystemLog` entity instance. Pass `nil` for no initial data.

#### `WebhookSecretKey(data = nil)`

Create a new `WebhookSecretKey` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## ContainerEntity

```ruby
container = client.Container
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autostart_policy` | `Boolean` | Yes | Defines whether containers in this group should automatically start when deployed (true) or require manual starting (false) |
| `container` | `Hash` | Yes | Represents a container with its configuration and resource requirements. |
| `country_codes` | `Array` | Yes | List of country codes where container instances are permitted to run. |
| `create_time` | `String` | Yes | ISO 8601 timestamp when this container group was initially created |
| `current_state` | `Hash` | Yes | Represents the operational state of a container group during its lifecycle, including timing information, status, and instance distribution metrics. |
| `display_name` | `String` | Yes | The display-friendly name of the resource. |
| `id` | `String` | Yes | The container group identifier. |
| `liveness_probe` | `Object` | Yes | Defines a liveness probe for container groups that determines when to restart a container if it becomes unhealthy |
| `name` | `String` | Yes | The container group name. |
| `networking` | `Hash` | Yes | Network configuration for container groups that defines connectivity, routing, and access control settings |
| `organization_name` | `String` | Yes | The organization name. |
| `pending_change` | `Boolean` | Yes | Indicates whether a configuration change has been requested but not yet applied to all containers in the group |
| `priority` | `Object` | Yes | Specifies the priority level for container group execution, which determines resource allocation and scheduling precedence. |
| `project_name` | `String` | Yes | The project name. |
| `queue_autoscaler` | `Hash` | Yes | Defines configuration for automatically scaling container instances based on queue length. |
| `queue_connection` | `Hash` | Yes | Configuration for connecting a container group to a message queue system, enabling asynchronous communication between services. |
| `readiness_probe` | `Object` | Yes | Defines how to check if a container is ready to serve traffic. |
| `readme` | `String` | No |  |
| `replicas` | `Integer` | Yes | The container group replicas. |
| `restart_policy` | `String` | Yes | Specifies the policy for restarting containers when they exit or fail. |
| `scalingactions` | `Array` | Yes | List of scaling actions configurations |
| `scheduledscalingenabled` | `Boolean` | Yes | Indicates if scheduled scaling is enabled |
| `startup_probe` | `Object` | Yes | Defines a probe that checks if a container application has started successfully. |
| `update_time` | `String` | Yes | ISO 8601 timestamp when this container group was last updated |
| `version` | `Integer` | Yes | Incremental version number that increases with each configuration change to the container group |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Container.create({
  "organization_name" => "example_organization_name", # String
  "project_name" => "example_project_name", # String
  "autostart_policy" => true, # Boolean
  "container" => {}, # Hash
  "country_codes" => [], # Array
  "create_time" => "example_create_time", # String
  "current_state" => {}, # Hash
  "display_name" => "example_display_name", # String
  "id" => "example_id", # String
  "liveness_probe" => {}, # Object
  "name" => "example_name", # String
  "networking" => {}, # Hash
  "pending_change" => true, # Boolean
  "priority" => "example_priority", # Object
  "queue_autoscaler" => {}, # Hash
  "queue_connection" => {}, # Hash
  "readiness_probe" => {}, # Object
  "replicas" => 1, # Integer
  "restart_policy" => "example_restart_policy", # String
  "scalingactions" => [], # Array
  "scheduledscalingenabled" => true, # Boolean
  "startup_probe" => {}, # Object
  "update_time" => "example_update_time", # String
  "version" => 1, # Integer
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Container.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Container.load({ "id" => "container_id", "organization_name" => "organization_name", "project_id" => "project_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Container.remove({ "id" => "container_id", "organization_name" => "organization_name", "project_id" => "project_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Container.update({
  "id" => "container_id",
  "organization_name" => "organization_name",
  "project_id" => "project_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ContainerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ContainerGroupEntity

```ruby
container_group = client.ContainerGroup
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.ContainerGroup.create({
  "container_id" => "example_container_id", # String
  "instance_id" => "example_instance_id", # String
  "organization_name" => "example_organization_name", # String
  "project_id" => "example_project_id", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ContainerGroup.load({ "container_group_instance_id" => "container_group_instance_id", "container_id" => "container_id", "organization_name" => "organization_name", "project_id" => "project_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ContainerGroupEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ContainerGroupInstanceEntity

```ruby
container_group_instance = client.ContainerGroupInstance
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cpu_percent` | `Float` | No | The percentage of CPU used by this container group instance. |
| `cpu_usage` | `Integer` | No | The total CPU usage in seconds for this container group instance. |
| `cpu_usage_total` | `Integer` | No | The total CPU usage in seconds for this container group instance since it was started. |
| `deletion_cost` | `Integer` | No | The cost of deleting the container group instance |
| `id` | `String` | Yes | The container group instance identifier. |
| `machine_id` | `String` | Yes | The container group machine identifier. |
| `memory_usage_mb` | `Float` | No | The memory usage in MB for this container group instance. |
| `memory_usage_percent` | `Float` | No | The percentage of memory used by this container group instance. |
| `pulling_progress` | `Float` | No | The progress percentage of pulling the container image. |
| `ready` | `Boolean` | No | Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function. |
| `ssh_host_key_fingerprint` | `String` | No | The SSH host key fingerprint of the container group instance |
| `ssh_ip` | `String` | No | The SSH IP address of the container group instance |
| `ssh_port` | `Integer` | No | The SSH port of the container group instance |
| `started` | `Boolean` | No | Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes. |
| `state` | `String` | Yes | The state of the container group instance |
| `update_time` | `String` | Yes | The UTC timestamp when the container group instance last changed its state. |
| `version` | `Integer` | Yes | The version of the container group definition currently running on this instance. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ContainerGroupInstance.list
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.ContainerGroupInstance.update({
  "container_id" => "container_id",
  "id" => "id",
  "organization_name" => "organization_name",
  "project_id" => "project_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ContainerGroupInstanceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CpuAvailabilityEntity

```ruby
cpu_availability = client.CpuAvailability
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_cpu_batch` | `Integer` | No | The number of available CPU cores |
| `country_codes` | `Array` | No | A list of country codes where the resources are available |
| `cpu` | `Integer` | No | The number of available CPU cores |
| `memory` | `Integer` | No | The amount of available memory in MB |
| `on_call_cpu` | `Integer` | No | The amount of on-call CPU |
| `storage_amount` | `Integer` | No | The amount of available storage in bytes |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.CpuAvailability.create({
  "organization_name" => "example_organization_name", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CpuAvailabilityEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GpuAvailabilityEntity

```ruby
gpu_availability = client.GpuAvailability
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_gpu_batch` | `Integer` | No | The number of available GPU batches |
| `available_gpu_high` | `Integer` | No | The number of available high-end GPUs |
| `available_gpu_low` | `Integer` | No | The number of available low-end GPUs |
| `available_gpu_medium` | `Integer` | No | The number of available medium-end GPUs |
| `country_codes` | `Array` | No | A list of country codes where the resources are available |
| `cpu` | `Integer` | No | The number of available CPU cores |
| `gpu_classes` | `Array` | Yes | A list of available GPU class names |
| `memory` | `Integer` | No | The amount of available memory in MB |
| `on_call_gpu` | `Integer` | No | The number of on-call GPUs available |
| `storage_amount` | `Integer` | No | The amount of available storage in bytes |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.GpuAvailability.create({
  "organization_name" => "example_organization_name", # String
  "gpu_classes" => [], # Array
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GpuAvailabilityEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GpuClassEntity

```ruby
gpu_class = client.GpuClass
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `gpu_class_type` | `String` | No | The type of GPU class |
| `gpu_count` | `Integer` | No | The number of GPUs in the cluster |
| `id` | `String` | Yes | The unique identifier |
| `is_high_demand` | `Boolean` | No | Whether the GPU class is in high demand |
| `max_ram` | `Integer` | No | The maximum RAM amount in MB |
| `max_storage` | `Integer` | No | The maximum storage amount in bytes |
| `max_vcpu` | `Integer` | No | The maximum vCPU count |
| `min_ram` | `Integer` | No | The minimum RAM amount in MB |
| `min_storage` | `Integer` | No | The minimum storage amount in bytes |
| `min_vcpu` | `Integer` | No | The minimum vCPU count |
| `name` | `String` | Yes | The GPU class name |
| `prices` | `Array` | Yes | The list of prices for each container group priority |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.GpuClass.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GpuClassEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InferenceEndpointEntity

```ruby
inference_endpoint = client.InferenceEndpoint
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | Yes | The detailed description of the resource. |
| `display_name` | `String` | Yes | The display-friendly name of the resource. |
| `icon_url` | `String` | Yes | The URL of the icon image |
| `id` | `String` | Yes | The inference endpoint identifier. |
| `input_schema` | `String` | Yes | The input schema |
| `name` | `String` | Yes | The inference endpoint name. |
| `organization_name` | `String` | Yes | The organization name. |
| `output_schema` | `String` | Yes | The output schema |
| `price_description` | `String` | Yes | A description of the price |
| `readme` | `String` | Yes | A markdown file containing a detailed description of the inference endpoint |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.InferenceEndpoint.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.InferenceEndpoint.load({ "id" => "inference_endpoint_id", "organization_name" => "organization_name" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.InferenceEndpoint.remove({ "inference_endpoint_id" => "inference_endpoint_id", "inference_endpoint_job_id" => "inference_endpoint_job_id", "organization_name" => "organization_name" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InferenceEndpointEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InferenceEndpointJobEntity

```ruby
inference_endpoint_job = client.InferenceEndpointJob
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `create_time` | `String` | Yes | The time the job was created. |
| `events` | `Array` | Yes | The list of events. |
| `id` | `String` | Yes | The inference endpoint job identifier. |
| `inference_endpoint_name` | `String` | Yes | The inference endpoint name. |
| `input` | `Object` | Yes | The job input. |
| `metadata` | `Hash` | No | The job metadata. |
| `organization_name` | `String` | Yes | The organization name. |
| `output` | `Object` | No | The job output. |
| `status` | `String` | Yes | The current status. |
| `update_time` | `String` | Yes | The time the job was last updated. |
| `webhook` | `String` | No | The webhook URL called when the job completes. |
| `webhook_url` | `String` | No | The webhook URL called when the job completes. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.InferenceEndpointJob.create({
  "inference_endpoint_name" => "example_inference_endpoint_name", # String
  "organization_name" => "example_organization_name", # String
  "create_time" => "example_create_time", # String
  "events" => [], # Array
  "id" => "example_id", # String
  "input" => "example_input", # Object
  "status" => "example_status", # String
  "update_time" => "example_update_time", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.InferenceEndpointJob.load({ "id" => "inference_endpoint_job_id", "inference_endpoint_id" => "inference_endpoint_id", "organization_name" => "organization_name" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InferenceEndpointJobEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InferenceEndpointJobCollectionEntity

```ruby
inference_endpoint_job_collection = client.InferenceEndpointJobCollection
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `create_time` | `String` | Yes | The time the job was created. |
| `events` | `Array` | Yes | The list of events. |
| `id` | `String` | Yes | The inference endpoint job identifier. |
| `inference_endpoint_name` | `String` | Yes | The inference endpoint name. |
| `input` | `Object` | Yes | The job input. |
| `metadata` | `Hash` | No | The job metadata. |
| `organization_name` | `String` | Yes | The organization name. |
| `output` | `Object` | No | The job output. |
| `status` | `String` | Yes | The current status. |
| `update_time` | `String` | Yes | The time the job was last updated. |
| `webhook` | `String` | No | The webhook URL called when the job completes. |
| `webhook_url` | `String` | No | The webhook URL called when the job completes. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.InferenceEndpointJobCollection.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InferenceEndpointJobCollectionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LogEntryEntity

```ruby
log_entry = client.LogEntry
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_time` | `String` | Yes | The end time of the time range |
| `items` | `Array` | Yes | A collection of log entries |
| `organization_name` | `String` | Yes | The organization name. |
| `page_max_time` | `String` | Yes | The maximum time page boundary. |
| `page_min_time` | `String` | Yes | The minimum time page boundary. |
| `page_size` | `Integer` | No | The maximum number of items per page. |
| `query` | `String` | Yes | The query string for filtering logs |
| `sort_order` | `String` | No | The sort order of the log entries. |
| `start_time` | `String` | Yes | The start time of the time range |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.LogEntry.create({
  "organization_name" => "example_organization_name", # String
  "end_time" => "example_end_time", # String
  "items" => [], # Array
  "page_max_time" => "example_page_max_time", # String
  "page_min_time" => "example_page_min_time", # String
  "query" => "example_query", # String
  "start_time" => "example_start_time", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LogEntryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## QueueEntity

```ruby
queue = client.Queue
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `container_groups` | `Array` | Yes | The container groups that are part of this queue. |
| `create_time` | `String` | Yes | The job creation time |
| `current_queue_length` | `Integer` | No | The current length of the queue |
| `description` | `String` | No | The description. |
| `display_name` | `String` | Yes | The display name. |
| `events` | `Array` | Yes | The job events |
| `id` | `String` | Yes | The job identifier |
| `input` | `Object` | Yes | The job input. |
| `metadata` | `Hash` | No | Additional metadata for the job |
| `name` | `String` | Yes | The queue name. |
| `output` | `Object` | No | The job output. |
| `status` | `String` | Yes | The job status |
| `update_time` | `String` | Yes | The job update time |
| `webhook` | `String` | No | The webhook URL to notify when the job completes |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Queue.create({
  "organization_name" => "example_organization_name", # String
  "project_name" => "example_project_name", # String
  "container_groups" => [], # Array
  "create_time" => "example_create_time", # String
  "display_name" => "example_display_name", # String
  "events" => [], # Array
  "id" => "example_id", # String
  "input" => "example_input", # Object
  "name" => "example_name", # String
  "status" => "example_status", # String
  "update_time" => "example_update_time", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Queue.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Queue.load({ "id" => "queue_id", "organization_name" => "organization_name", "project_id" => "project_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Queue.remove({ "id" => "queue_id", "organization_name" => "organization_name", "project_id" => "project_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Queue.update({
  "id" => "queue_id",
  "organization_name" => "organization_name",
  "project_id" => "project_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `QueueEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## QuotaEntity

```ruby
quota = client.Quota
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `container_replicas_quota` | `Integer` | Yes | The maximum number of replicas that can be created for a container group |
| `container_replicas_used` | `Integer` | Yes | The number of replicas that are currently in use |
| `max_container_group_reallocations_per_minute` | `Integer` | No | The maximum number of container group reallocations per minute |
| `max_container_group_recreates_per_minute` | `Integer` | No | The maximum number of container group recreates per minute |
| `max_container_group_restarts_per_minute` | `Integer` | No | The maximum number of container group restarts per minute |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Quota.load({ "organization_name" => "organization_name" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `QuotaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SystemLogEntity

```ruby
system_log = client.SystemLog
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_name` | `String` | Yes | The name of the event |
| `event_time` | `String` | Yes | The UTC date & time when the log item was created |
| `instance_id` | `String` | No | The container group instance identifier. |
| `machine_id` | `String` | No | The container group machine identifier. |
| `resource_cpu` | `Object` | Yes | The number of CPUs |
| `resource_gpu_class` | `String` | Yes | The GPU class name |
| `resource_memory` | `Object` | Yes | The memory amount in MB |
| `resource_storage_amount` | `Object` | Yes | The storage amount in bytes |
| `version` | `String` | Yes | The version instance ID |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.SystemLog.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SystemLogEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WebhookSecretKeyEntity

```ruby
webhook_secret_key = client.WebhookSecretKey
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `secret_key` | `String` | Yes | The webhook secret key |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.WebhookSecretKey.create({
  "organization_name" => "example_organization_name", # String
  "secret_key" => "example_secret_key", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.WebhookSecretKey.load({ "organization_name" => "organization_name" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WebhookSecretKeyEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = SaladcloudSDK.new({
  "feature" => {
    "debug" => { "active" => true },
    "idempotency" => { "active" => true },
    "metrics" => { "active" => true },
    "paging" => { "active" => true },
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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

