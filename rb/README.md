# Saladcloud Ruby SDK



The Ruby SDK for the Saladcloud API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Container` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/saladcloud-sdk/releases)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/saladcloud-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-saladcloud-sdk", path: "./saladcloud-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Saladcloud_sdk"

client = SaladcloudSDK.new({
  "apikey" => ENV["SALADCLOUD_APIKEY"],
})
```

### 2. List container records

```ruby
begin
  # list returns an Array of Container records — iterate directly.
  containers = client.Container.list
  containers.each do |item|
    puts "#{item["id"]} #{item["autostart_policy"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a containergroup

ContainerGroup is nested under container_group_instance, so provide the `container_group_instance_id`.

```ruby
begin
  # load returns the ENTITY — call data_get for the ContainerGroup record (raises on error).
  containergroup = client.ContainerGroup.load({ "container_group_instance_id" => "example_container_group_instance_id", "container_id" => "example_container_id", "organization_name" => "example_organization_name", "project_id" => "example_project_id" })
  puts containergroup
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created Container record.
created = client.Container.create({ "organization_name" => "example_organization_name", "project_name" => "example_project_name", "autostart_policy" => true, "container" => {}, "country_codes" => [], "create_time" => "example_create_time", "current_state" => {}, "display_name" => "example_display_name", "id" => "example_id", "liveness_probe" => {}, "name" => "example_name", "networking" => {}, "pending_change" => true, "priority" => "example_priority", "queue_autoscaler" => {}, "queue_connection" => {}, "readiness_probe" => {}, "replicas" => 1, "restart_policy" => "example_restart_policy", "scalingactions" => [], "scheduledscalingenabled" => true, "startup_probe" => {}, "update_time" => "example_update_time", "version" => 1 })

# Update — index the record via data_get (created.data_get["id"]).
client.Container.update({ "id" => created.data_get["id"], "organization_name" => "example_organization_name", "project_id" => "example_project_id" })

# Remove
client.Container.remove({ "id" => created.data_get["id"], "organization_name" => "example_organization_name", "project_id" => "example_project_id" })
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  inferenceendpoints = client.InferenceEndpoint.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = SaladcloudSDK.test({
  "entity" => { "inferenceendpoint" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
inferenceendpoint = client.InferenceEndpoint.list()
puts inferenceendpoint
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = SaladcloudSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### SaladcloudSDK

```ruby
require_relative "Saladcloud_sdk"
client = SaladcloudSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = SaladcloudSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### SaladcloudSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Container` | `(data) -> ContainerEntity` | Create a Container entity instance. |
| `ContainerGroup` | `(data) -> ContainerGroupEntity` | Create a ContainerGroup entity instance. |
| `ContainerGroupInstance` | `(data) -> ContainerGroupInstanceEntity` | Create a ContainerGroupInstance entity instance. |
| `CpuAvailability` | `(data) -> CpuAvailabilityEntity` | Create a CpuAvailability entity instance. |
| `GpuAvailability` | `(data) -> GpuAvailabilityEntity` | Create a GpuAvailability entity instance. |
| `GpuClass` | `(data) -> GpuClassEntity` | Create a GpuClass entity instance. |
| `InferenceEndpoint` | `(data) -> InferenceEndpointEntity` | Create an InferenceEndpoint entity instance. |
| `InferenceEndpointJob` | `(data) -> InferenceEndpointJobEntity` | Create an InferenceEndpointJob entity instance. |
| `InferenceEndpointJobCollection` | `(data) -> InferenceEndpointJobCollectionEntity` | Create an InferenceEndpointJobCollection entity instance. |
| `LogEntry` | `(data) -> LogEntryEntity` | Create a LogEntry entity instance. |
| `Queue` | `(data) -> QueueEntity` | Create a Queue entity instance. |
| `Quota` | `(data) -> QuotaEntity` | Create a Quota entity instance. |
| `SystemLog` | `(data) -> SystemLogEntity` | Create a SystemLog entity instance. |
| `WebhookSecretKey` | `(data) -> WebhookSecretKeyEntity` | Create a WebhookSecretKey entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `SaladcloudError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create, Load.

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

Operations: List, Update.

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

Operations: Create.

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

Operations: Create.

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

Operations: List.

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

Operations: List, Load, Remove.

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

Operations: Create, Load.

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

Operations: List.

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

Operations: Create.

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

Operations: Create, List, Load, Remove, Update.

API path: `/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs`

#### Quota

| Field | Description |
| --- | --- |
| `container_groups_quotas` | Represents the organization quotas for container groups |
| `create_time` | The time the resource was created |
| `update_time` | The time the resource was last updated |

Operations: Load.

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

Operations: List.

API path: `/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/system-logs`

#### WebhookSecretKey

| Field | Description |
| --- | --- |
| `secret_key` | The webhook secret key |

Operations: Create, Load.

API path: `/organizations/{organization_name}/webhook-secret-key`



## Entities


### Container

Create an instance: `container = client.Container`

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
| `autostart_policy` | `Boolean` | Defines whether containers in this group should automatically start when deployed (true) or require manual starting (false) |
| `container` | `Hash` | Represents a container with its configuration and resource requirements. |
| `country_codes` | `Array` | List of country codes where container instances are permitted to run. |
| `create_time` | `String` | ISO 8601 timestamp when this container group was initially created |
| `current_state` | `Hash` | Represents the operational state of a container group during its lifecycle, including timing information, status, and instance distribution metrics. |
| `display_name` | `String` | The display-friendly name of the resource. |
| `id` | `String` | The container group identifier. |
| `liveness_probe` | `Object` | Defines a liveness probe for container groups that determines when to restart a container if it becomes unhealthy |
| `name` | `String` | The container group name. |
| `networking` | `Hash` | Network configuration for container groups that defines connectivity, routing, and access control settings |
| `organization_name` | `String` | The organization name. |
| `pending_change` | `Boolean` | Indicates whether a configuration change has been requested but not yet applied to all containers in the group |
| `priority` | `Object` | Specifies the priority level for container group execution, which determines resource allocation and scheduling precedence. |
| `project_name` | `String` | The project name. |
| `queue_autoscaler` | `Hash` | Defines configuration for automatically scaling container instances based on queue length. |
| `queue_connection` | `Hash` | Configuration for connecting a container group to a message queue system, enabling asynchronous communication between services. |
| `readiness_probe` | `Object` | Defines how to check if a container is ready to serve traffic. |
| `readme` | `String` |  |
| `replicas` | `Integer` | The container group replicas. |
| `restart_policy` | `String` | Specifies the policy for restarting containers when they exit or fail. |
| `scalingactions` | `Array` | List of scaling actions configurations |
| `scheduledscalingenabled` | `Boolean` | Indicates if scheduled scaling is enabled |
| `startup_probe` | `Object` | Defines a probe that checks if a container application has started successfully. |
| `update_time` | `String` | ISO 8601 timestamp when this container group was last updated |
| `version` | `Integer` | Incremental version number that increases with each configuration change to the container group |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Container record (raises on error).
container = client.Container.load({ "id" => "container_id", "organization_name" => "organization_name", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of Container records (raises on error).
containers = client.Container.list
```

#### Example: Create

```ruby
container = client.Container.create({
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


### ContainerGroup

Create an instance: `container_group = client.ContainerGroup`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cpu_percent` | `Float` | The percentage of CPU used by this container group instance. |
| `cpu_usage` | `Integer` | The total CPU usage in seconds for this container group instance. |
| `cpu_usage_total` | `Integer` | The total CPU usage in seconds for this container group instance since it was started. |
| `deletion_cost` | `Integer` | The cost of deleting the container group instance |
| `id` | `String` | The container group instance identifier. |
| `machine_id` | `String` | The container group machine identifier. |
| `memory_usage_mb` | `Float` | The memory usage in MB for this container group instance. |
| `memory_usage_percent` | `Float` | The percentage of memory used by this container group instance. |
| `pulling_progress` | `Float` | The progress percentage of pulling the container image. |
| `ready` | `Boolean` | Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function. |
| `ssh_host_key_fingerprint` | `String` | The SSH host key fingerprint of the container group instance |
| `ssh_ip` | `String` | The SSH IP address of the container group instance |
| `ssh_port` | `Integer` | The SSH port of the container group instance |
| `started` | `Boolean` | Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes. |
| `state` | `String` | The state of the container group instance |
| `update_time` | `String` | The UTC timestamp when the container group instance last changed its state. |
| `version` | `Integer` | The version of the container group definition currently running on this instance. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ContainerGroup record (raises on error).
container_group = client.ContainerGroup.load({ "container_group_instance_id" => "container_group_instance_id", "container_id" => "container_id", "organization_name" => "organization_name", "project_id" => "project_id" })
```

#### Example: Create

```ruby
container_group = client.ContainerGroup.create({
  "container_id" => "example_container_id", # String
  "instance_id" => "example_instance_id", # String
  "organization_name" => "example_organization_name", # String
  "project_id" => "example_project_id", # String
  "id" => "example_id", # String
  "machine_id" => "example_machine_id", # String
  "state" => "example_state", # String
  "update_time" => "example_update_time", # String
  "version" => 1, # Integer
})
```


### ContainerGroupInstance

Create an instance: `container_group_instance = client.ContainerGroupInstance`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cpu_percent` | `Float` | The percentage of CPU used by this container group instance. |
| `cpu_usage` | `Integer` | The total CPU usage in seconds for this container group instance. |
| `cpu_usage_total` | `Integer` | The total CPU usage in seconds for this container group instance since it was started. |
| `deletion_cost` | `Integer` | The cost of deleting the container group instance |
| `id` | `String` | The container group instance identifier. |
| `machine_id` | `String` | The container group machine identifier. |
| `memory_usage_mb` | `Float` | The memory usage in MB for this container group instance. |
| `memory_usage_percent` | `Float` | The percentage of memory used by this container group instance. |
| `pulling_progress` | `Float` | The progress percentage of pulling the container image. |
| `ready` | `Boolean` | Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function. |
| `ssh_host_key_fingerprint` | `String` | The SSH host key fingerprint of the container group instance |
| `ssh_ip` | `String` | The SSH IP address of the container group instance |
| `ssh_port` | `Integer` | The SSH port of the container group instance |
| `started` | `Boolean` | Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes. |
| `state` | `String` | The state of the container group instance |
| `update_time` | `String` | The UTC timestamp when the container group instance last changed its state. |
| `version` | `Integer` | The version of the container group definition currently running on this instance. |

#### Example: List

```ruby
# list returns an Array of ContainerGroupInstance records (raises on error).
container_group_instances = client.ContainerGroupInstance.list
```


### CpuAvailability

Create an instance: `cpu_availability = client.CpuAvailability`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_cpu_batch` | `Integer` | The number of available CPU cores |
| `country_codes` | `Array` | A list of country codes where the resources are available |
| `cpu` | `Integer` | The number of available CPU cores |
| `memory` | `Integer` | The amount of available memory in MB |
| `on_call_cpu` | `Integer` | The amount of on-call CPU |
| `storage_amount` | `Integer` | The amount of available storage in bytes |

#### Example: Create

```ruby
cpu_availability = client.CpuAvailability.create({
  "organization_name" => "example_organization_name", # String
})
```


### GpuAvailability

Create an instance: `gpu_availability = client.GpuAvailability`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_gpu_batch` | `Integer` | The number of available GPU batches |
| `available_gpu_high` | `Integer` | The number of available high-end GPUs |
| `available_gpu_low` | `Integer` | The number of available low-end GPUs |
| `available_gpu_medium` | `Integer` | The number of available medium-end GPUs |
| `country_codes` | `Array` | A list of country codes where the resources are available |
| `cpu` | `Integer` | The number of available CPU cores |
| `gpu_classes` | `Array` | A list of available GPU class names |
| `memory` | `Integer` | The amount of available memory in MB |
| `on_call_gpu` | `Integer` | The number of on-call GPUs available |
| `storage_amount` | `Integer` | The amount of available storage in bytes |

#### Example: Create

```ruby
gpu_availability = client.GpuAvailability.create({
  "organization_name" => "example_organization_name", # String
  "gpu_classes" => [], # Array
})
```


### GpuClass

Create an instance: `gpu_class = client.GpuClass`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `gpu_class_type` | `String` | The type of GPU class |
| `gpu_count` | `Integer` | The number of GPUs in the cluster |
| `id` | `String` | The unique identifier |
| `is_high_demand` | `Boolean` | Whether the GPU class is in high demand |
| `max_ram` | `Integer` | The maximum RAM amount in MB |
| `max_storage` | `Integer` | The maximum storage amount in bytes |
| `max_vcpu` | `Integer` | The maximum vCPU count |
| `min_ram` | `Integer` | The minimum RAM amount in MB |
| `min_storage` | `Integer` | The minimum storage amount in bytes |
| `min_vcpu` | `Integer` | The minimum vCPU count |
| `name` | `String` | The GPU class name |
| `prices` | `Array` | The list of prices for each container group priority |

#### Example: List

```ruby
# list returns an Array of GpuClass records (raises on error).
gpu_classs = client.GpuClass.list
```


### InferenceEndpoint

Create an instance: `inference_endpoint = client.InferenceEndpoint`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` | The detailed description of the resource. |
| `display_name` | `String` | The display-friendly name of the resource. |
| `icon_url` | `String` | The URL of the icon image |
| `id` | `String` | The inference endpoint identifier. |
| `input_schema` | `String` | The input schema |
| `name` | `String` | The inference endpoint name. |
| `organization_name` | `String` | The organization name. |
| `output_schema` | `String` | The output schema |
| `price_description` | `String` | A description of the price |
| `readme` | `String` | A markdown file containing a detailed description of the inference endpoint |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the InferenceEndpoint record (raises on error).
inference_endpoint = client.InferenceEndpoint.load({ "id" => "inference_endpoint_id", "organization_name" => "organization_name" })
```

#### Example: List

```ruby
# list returns an Array of InferenceEndpoint records (raises on error).
inference_endpoints = client.InferenceEndpoint.list
```


### InferenceEndpointJob

Create an instance: `inference_endpoint_job = client.InferenceEndpointJob`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `create_time` | `String` | The time the job was created. |
| `events` | `Array` | The list of events. |
| `id` | `String` | The inference endpoint job identifier. |
| `inference_endpoint_name` | `String` | The inference endpoint name. |
| `input` | `Object` | The job input. |
| `metadata` | `Hash` | The job metadata. |
| `organization_name` | `String` | The organization name. |
| `output` | `Object` | The job output. |
| `status` | `String` | The current status. |
| `update_time` | `String` | The time the job was last updated. |
| `webhook` | `String` | The webhook URL called when the job completes. |
| `webhook_url` | `String` | The webhook URL called when the job completes. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the InferenceEndpointJob record (raises on error).
inference_endpoint_job = client.InferenceEndpointJob.load({ "id" => "inference_endpoint_job_id", "inference_endpoint_id" => "inference_endpoint_id", "organization_name" => "organization_name" })
```

#### Example: Create

```ruby
inference_endpoint_job = client.InferenceEndpointJob.create({
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


### InferenceEndpointJobCollection

Create an instance: `inference_endpoint_job_collection = client.InferenceEndpointJobCollection`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `create_time` | `String` | The time the job was created. |
| `events` | `Array` | The list of events. |
| `id` | `String` | The inference endpoint job identifier. |
| `inference_endpoint_name` | `String` | The inference endpoint name. |
| `input` | `Object` | The job input. |
| `metadata` | `Hash` | The job metadata. |
| `organization_name` | `String` | The organization name. |
| `output` | `Object` | The job output. |
| `status` | `String` | The current status. |
| `update_time` | `String` | The time the job was last updated. |
| `webhook` | `String` | The webhook URL called when the job completes. |
| `webhook_url` | `String` | The webhook URL called when the job completes. |

#### Example: List

```ruby
# list returns an Array of InferenceEndpointJobCollection records (raises on error).
inference_endpoint_job_collections = client.InferenceEndpointJobCollection.list
```


### LogEntry

Create an instance: `log_entry = client.LogEntry`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_time` | `String` | The end time of the time range |
| `items` | `Array` | A collection of log entries |
| `organization_name` | `String` | The organization name. |
| `page_max_time` | `String` | The maximum time page boundary. |
| `page_min_time` | `String` | The minimum time page boundary. |
| `page_size` | `Integer` | The maximum number of items per page. |
| `query` | `String` | The query string for filtering logs |
| `sort_order` | `String` | The sort order of the log entries. |
| `start_time` | `String` | The start time of the time range |

#### Example: Create

```ruby
log_entry = client.LogEntry.create({
  "organization_name" => "example_organization_name", # String
  "end_time" => "example_end_time", # String
  "items" => [], # Array
  "page_max_time" => "example_page_max_time", # String
  "page_min_time" => "example_page_min_time", # String
  "query" => "example_query", # String
  "start_time" => "example_start_time", # String
})
```


### Queue

Create an instance: `queue = client.Queue`

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
| `container_groups` | `Array` | The container groups that are part of this queue. |
| `create_time` | `String` | The job creation time |
| `current_queue_length` | `Integer` | The current length of the queue |
| `description` | `String` | The description. |
| `display_name` | `String` | The display name. |
| `events` | `Array` | The job events |
| `id` | `String` | The job identifier |
| `input` | `Object` | The job input. |
| `metadata` | `Hash` | Additional metadata for the job |
| `name` | `String` | The queue name. |
| `output` | `Object` | The job output. |
| `status` | `String` | The job status |
| `update_time` | `String` | The job update time |
| `webhook` | `String` | The webhook URL to notify when the job completes |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Queue record (raises on error).
queue = client.Queue.load({ "id" => "queue_id", "organization_name" => "organization_name", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of Queue records (raises on error).
queues = client.Queue.list
```

#### Example: Create

```ruby
queue = client.Queue.create({
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


### Quota

Create an instance: `quota = client.Quota`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `container_groups_quotas` | `Hash` | Represents the organization quotas for container groups |
| `create_time` | `String` | The time the resource was created |
| `update_time` | `String` | The time the resource was last updated |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Quota record (raises on error).
quota = client.Quota.load({ "organization_name" => "organization_name" })
```


### SystemLog

Create an instance: `system_log = client.SystemLog`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event_name` | `String` | The name of the event |
| `event_time` | `String` | The UTC date & time when the log item was created |
| `instance_id` | `String` | The container group instance identifier. |
| `machine_id` | `String` | The container group machine identifier. |
| `resource_cpu` | `Object` | The number of CPUs |
| `resource_gpu_class` | `String` | The GPU class name |
| `resource_memory` | `Object` | The memory amount in MB |
| `resource_storage_amount` | `Object` | The storage amount in bytes |
| `version` | `String` | The version instance ID |

#### Example: List

```ruby
# list returns an Array of SystemLog records (raises on error).
system_logs = client.SystemLog.list
```


### WebhookSecretKey

Create an instance: `webhook_secret_key = client.WebhookSecretKey`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `secret_key` | `String` | The webhook secret key |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the WebhookSecretKey record (raises on error).
webhook_secret_key = client.WebhookSecretKey.load({ "organization_name" => "organization_name" })
```

#### Example: Create

```ruby
webhook_secret_key = client.WebhookSecretKey.create({
  "organization_name" => "example_organization_name", # String
  "secret_key" => "example_secret_key", # String
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

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

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Saladcloud_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Saladcloud_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
inferenceendpoint = client.InferenceEndpoint
inferenceendpoint.list()

# inferenceendpoint.data_get now returns the inferenceendpoint data from the last list
# inferenceendpoint.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
