# Saladcloud Lua SDK



The Lua SDK for the Saladcloud API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Container()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/saladcloud-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("saladcloud_sdk")

local client = sdk.new({
  apikey = os.getenv("SALADCLOUD_APIKEY"),
})
```

### 2. List container records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local containers, err = client:Container():list()
if err then error(err) end

for _, item in ipairs(containers) do
  print(item["id"])
end
```

### 3. Load a containergroup

ContainerGroup is nested under container_group_instance, so provide the `container_group_instance_id`.

```lua
local containergroup, err = client:ContainerGroup():load({ container_group_instance_id = "example_container_group_instance_id", container_id = "example_container_id", organization_name = "example_organization_name", project_id = "example_project_id" })
if err then error(err) end
print(containergroup)
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Container():create({ organization_name = "example_organization_name", project_name = "example_project_name", autostart_policy = true, container = {}, country_codes = {}, create_time = "example_create_time", current_state = {}, display_name = "example_display_name", id = "example_id", liveness_probe = {}, name = "example_name", networking = {}, pending_change = true, priority = "example_priority", queue_autoscaler = {}, queue_connection = {}, readiness_probe = {}, replicas = 1, restart_policy = "example_restart_policy", scalingactions = {}, scheduledscalingenabled = true, startup_probe = {}, update_time = "example_update_time", version = 1 })
if err then error(err) end

-- Update
client:Container():update({ id = created:data_get()["id"], organization_name = "example_organization_name", project_id = "example_project_id" })

-- Remove
client:Container():remove({ id = created:data_get()["id"], organization_name = "example_organization_name", project_id = "example_project_id" })
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local inferenceendpoints, err = client:InferenceEndpoint():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:InferenceEndpoint():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### SaladcloudSDK

```lua
local sdk = require("saladcloud_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### SaladcloudSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local container, err = client:Container():load({ id = "example_id" })
    if err then error(err) end
    -- container is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local container = client:Container(nil)`

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
| `container` | `table` | Represents a container with its configuration and resource requirements. |
| `country_codes` | `table` | List of country codes where container instances are permitted to run. |
| `create_time` | `string` | ISO 8601 timestamp when this container group was initially created |
| `current_state` | `table` | Represents the operational state of a container group during its lifecycle, including timing information, status, and instance distribution metrics. |
| `display_name` | `string` | The display-friendly name of the resource. |
| `id` | `string` | The container group identifier. |
| `liveness_probe` | `table|nil` | Defines a liveness probe for container groups that determines when to restart a container if it becomes unhealthy |
| `name` | `string` | The container group name. |
| `networking` | `table` | Network configuration for container groups that defines connectivity, routing, and access control settings |
| `organization_name` | `string` | The organization name. |
| `pending_change` | `boolean` | Indicates whether a configuration change has been requested but not yet applied to all containers in the group |
| `priority` | `string|nil` | Specifies the priority level for container group execution, which determines resource allocation and scheduling precedence. |
| `project_name` | `string` | The project name. |
| `queue_autoscaler` | `table` | Defines configuration for automatically scaling container instances based on queue length. |
| `queue_connection` | `table` | Configuration for connecting a container group to a message queue system, enabling asynchronous communication between services. |
| `readiness_probe` | `table|nil` | Defines how to check if a container is ready to serve traffic. |
| `readme` | `string` |  |
| `replicas` | `number` | The container group replicas. |
| `restart_policy` | `string` | Specifies the policy for restarting containers when they exit or fail. |
| `scalingactions` | `table` | List of scaling actions configurations |
| `scheduledscalingenabled` | `boolean` | Indicates if scheduled scaling is enabled |
| `startup_probe` | `table|nil` | Defines a probe that checks if a container application has started successfully. |
| `update_time` | `string` | ISO 8601 timestamp when this container group was last updated |
| `version` | `number` | Incremental version number that increases with each configuration change to the container group |

#### Example: Load

```lua
local container, err = client:Container():load({ id = "container_id", organization_name = "organization_name", project_id = "project_id" })
```

#### Example: List

```lua
local containers, err = client:Container():list()
```

#### Example: Create

```lua
local container, err = client:Container():create({
  organization_name = "example_organization_name", -- string
  project_name = "example_project_name", -- string
  autostart_policy = true, -- boolean
  container = {}, -- table
  country_codes = {}, -- table
  create_time = "example_create_time", -- string
  current_state = {}, -- table
  display_name = "example_display_name", -- string
  id = "example_id", -- string
  liveness_probe = {}, -- table|nil
  name = "example_name", -- string
  networking = {}, -- table
  pending_change = true, -- boolean
  priority = "example_priority", -- string|nil
  queue_autoscaler = {}, -- table
  queue_connection = {}, -- table
  readiness_probe = {}, -- table|nil
  replicas = 1, -- number
  restart_policy = "example_restart_policy", -- string
  scalingactions = {}, -- table
  scheduledscalingenabled = true, -- boolean
  startup_probe = {}, -- table|nil
  update_time = "example_update_time", -- string
  version = 1, -- number
})
```


### ContainerGroup

Create an instance: `local container_group = client:ContainerGroup(nil)`

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

```lua
local container_group, err = client:ContainerGroup():load({ container_group_instance_id = "container_group_instance_id", container_id = "container_id", organization_name = "organization_name", project_id = "project_id" })
```

#### Example: Create

```lua
local container_group, err = client:ContainerGroup():create({
  container_id = "example_container_id", -- string
  instance_id = "example_instance_id", -- string
  organization_name = "example_organization_name", -- string
  project_id = "example_project_id", -- string
  id = "example_id", -- string
  machine_id = "example_machine_id", -- string
  state = "example_state", -- string
  update_time = "example_update_time", -- string
  version = 1, -- number
})
```


### ContainerGroupInstance

Create an instance: `local container_group_instance = client:ContainerGroupInstance(nil)`

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

```lua
local container_group_instances, err = client:ContainerGroupInstance():list()
```


### CpuAvailability

Create an instance: `local cpu_availability = client:CpuAvailability(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_cpu_batch` | `number` | The number of available CPU cores |
| `country_codes` | `table` | A list of country codes where the resources are available |
| `cpu` | `number` | The number of available CPU cores |
| `memory` | `number` | The amount of available memory in MB |
| `on_call_cpu` | `number` | The amount of on-call CPU |
| `storage_amount` | `number` | The amount of available storage in bytes |

#### Example: Create

```lua
local cpu_availability, err = client:CpuAvailability():create({
  organization_name = "example_organization_name", -- string
})
```


### GpuAvailability

Create an instance: `local gpu_availability = client:GpuAvailability(nil)`

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
| `country_codes` | `table` | A list of country codes where the resources are available |
| `cpu` | `number` | The number of available CPU cores |
| `gpu_classes` | `table` | A list of available GPU class names |
| `memory` | `number` | The amount of available memory in MB |
| `on_call_gpu` | `number` | The number of on-call GPUs available |
| `storage_amount` | `number` | The amount of available storage in bytes |

#### Example: Create

```lua
local gpu_availability, err = client:GpuAvailability():create({
  organization_name = "example_organization_name", -- string
  gpu_classes = {}, -- table
})
```


### GpuClass

Create an instance: `local gpu_class = client:GpuClass(nil)`

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
| `prices` | `table` | The list of prices for each container group priority |

#### Example: List

```lua
local gpu_classs, err = client:GpuClass():list()
```


### InferenceEndpoint

Create an instance: `local inference_endpoint = client:InferenceEndpoint(nil)`

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

```lua
local inference_endpoint, err = client:InferenceEndpoint():load({ id = "inference_endpoint_id", organization_name = "organization_name" })
```

#### Example: List

```lua
local inference_endpoints, err = client:InferenceEndpoint():list()
```


### InferenceEndpointJob

Create an instance: `local inference_endpoint_job = client:InferenceEndpointJob(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `create_time` | `string` | The time the job was created. |
| `events` | `table` | The list of events. |
| `id` | `string` | The inference endpoint job identifier. |
| `inference_endpoint_name` | `string` | The inference endpoint name. |
| `input` | `any` | The job input. |
| `metadata` | `table` | The job metadata. |
| `organization_name` | `string` | The organization name. |
| `output` | `any` | The job output. |
| `status` | `string` | The current status. |
| `update_time` | `string` | The time the job was last updated. |
| `webhook` | `string` | The webhook URL called when the job completes. |
| `webhook_url` | `string` | The webhook URL called when the job completes. |

#### Example: Load

```lua
local inference_endpoint_job, err = client:InferenceEndpointJob():load({ id = "inference_endpoint_job_id", inference_endpoint_id = "inference_endpoint_id", organization_name = "organization_name" })
```

#### Example: Create

```lua
local inference_endpoint_job, err = client:InferenceEndpointJob():create({
  inference_endpoint_name = "example_inference_endpoint_name", -- string
  organization_name = "example_organization_name", -- string
  create_time = "example_create_time", -- string
  events = {}, -- table
  id = "example_id", -- string
  input = "example_input", -- any
  status = "example_status", -- string
  update_time = "example_update_time", -- string
})
```


### InferenceEndpointJobCollection

Create an instance: `local inference_endpoint_job_collection = client:InferenceEndpointJobCollection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `create_time` | `string` | The time the job was created. |
| `events` | `table` | The list of events. |
| `id` | `string` | The inference endpoint job identifier. |
| `inference_endpoint_name` | `string` | The inference endpoint name. |
| `input` | `any` | The job input. |
| `metadata` | `table` | The job metadata. |
| `organization_name` | `string` | The organization name. |
| `output` | `any` | The job output. |
| `status` | `string` | The current status. |
| `update_time` | `string` | The time the job was last updated. |
| `webhook` | `string` | The webhook URL called when the job completes. |
| `webhook_url` | `string` | The webhook URL called when the job completes. |

#### Example: List

```lua
local inference_endpoint_job_collections, err = client:InferenceEndpointJobCollection():list()
```


### LogEntry

Create an instance: `local log_entry = client:LogEntry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_time` | `string` | The end time of the time range |
| `items` | `table` | A collection of log entries |
| `organization_name` | `string` | The organization name. |
| `page_max_time` | `string` | The maximum time page boundary. |
| `page_min_time` | `string` | The minimum time page boundary. |
| `page_size` | `number` | The maximum number of items per page. |
| `query` | `string` | The query string for filtering logs |
| `sort_order` | `string` | The sort order of the log entries. |
| `start_time` | `string` | The start time of the time range |

#### Example: Create

```lua
local log_entry, err = client:LogEntry():create({
  organization_name = "example_organization_name", -- string
  end_time = "example_end_time", -- string
  items = {}, -- table
  page_max_time = "example_page_max_time", -- string
  page_min_time = "example_page_min_time", -- string
  query = "example_query", -- string
  start_time = "example_start_time", -- string
})
```


### Queue

Create an instance: `local queue = client:Queue(nil)`

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
| `container_groups` | `table` | The container groups that are part of this queue. |
| `create_time` | `string` | The job creation time |
| `current_queue_length` | `number` | The current length of the queue |
| `description` | `string` | The description. |
| `display_name` | `string` | The display name. |
| `events` | `table` | The job events |
| `id` | `string` | The job identifier |
| `input` | `any` | The job input. |
| `metadata` | `table` | Additional metadata for the job |
| `name` | `string` | The queue name. |
| `output` | `any` | The job output. |
| `status` | `string` | The job status |
| `update_time` | `string` | The job update time |
| `webhook` | `string` | The webhook URL to notify when the job completes |

#### Example: Load

```lua
local queue, err = client:Queue():load({ id = "queue_id", organization_name = "organization_name", project_id = "project_id" })
```

#### Example: List

```lua
local queues, err = client:Queue():list()
```

#### Example: Create

```lua
local queue, err = client:Queue():create({
  organization_name = "example_organization_name", -- string
  project_name = "example_project_name", -- string
  container_groups = {}, -- table
  create_time = "example_create_time", -- string
  display_name = "example_display_name", -- string
  events = {}, -- table
  id = "example_id", -- string
  input = "example_input", -- any
  name = "example_name", -- string
  status = "example_status", -- string
  update_time = "example_update_time", -- string
})
```


### Quota

Create an instance: `local quota = client:Quota(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `container_groups_quotas` | `table` | Represents the organization quotas for container groups |
| `create_time` | `string` | The time the resource was created |
| `update_time` | `string` | The time the resource was last updated |

#### Example: Load

```lua
local quota, err = client:Quota():load({ organization_name = "organization_name" })
```


### SystemLog

Create an instance: `local system_log = client:SystemLog(nil)`

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
| `resource_cpu` | `number|nil` | The number of CPUs |
| `resource_gpu_class` | `string` | The GPU class name |
| `resource_memory` | `number|nil` | The memory amount in MB |
| `resource_storage_amount` | `number|nil` | The storage amount in bytes |
| `version` | `string` | The version instance ID |

#### Example: List

```lua
local system_logs, err = client:SystemLog():list()
```


### WebhookSecretKey

Create an instance: `local webhook_secret_key = client:WebhookSecretKey(nil)`

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

```lua
local webhook_secret_key, err = client:WebhookSecretKey():load({ organization_name = "organization_name" })
```

#### Example: Create

```lua
local webhook_secret_key, err = client:WebhookSecretKey():create({
  organization_name = "example_organization_name", -- string
  secret_key = "example_secret_key", -- string
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

Features are the extension mechanism. A feature is a Lua table
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

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── saladcloud_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`saladcloud_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local inferenceendpoint = client:InferenceEndpoint()
inferenceendpoint:list()

-- inferenceendpoint:data_get() now returns the inferenceendpoint data from the last list
-- inferenceendpoint:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
