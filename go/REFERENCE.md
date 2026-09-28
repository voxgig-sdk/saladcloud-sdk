# Saladcloud Golang SDK Reference

Complete API reference for the Saladcloud Golang SDK.


## SaladcloudSDK

### Constructor

```go
func NewSaladcloudSDK(options map[string]any) *SaladcloudSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *SaladcloudSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *SaladcloudSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Container(data map[string]any) SaladcloudEntity`

Create a new `Container` entity instance. Pass `nil` for no initial data.

#### `ContainerGroup(data map[string]any) SaladcloudEntity`

Create a new `ContainerGroup` entity instance. Pass `nil` for no initial data.

#### `ContainerGroupInstance(data map[string]any) SaladcloudEntity`

Create a new `ContainerGroupInstance` entity instance. Pass `nil` for no initial data.

#### `CpuAvailability(data map[string]any) SaladcloudEntity`

Create a new `CpuAvailability` entity instance. Pass `nil` for no initial data.

#### `GpuAvailability(data map[string]any) SaladcloudEntity`

Create a new `GpuAvailability` entity instance. Pass `nil` for no initial data.

#### `GpuClass(data map[string]any) SaladcloudEntity`

Create a new `GpuClass` entity instance. Pass `nil` for no initial data.

#### `InferenceEndpoint(data map[string]any) SaladcloudEntity`

Create a new `InferenceEndpoint` entity instance. Pass `nil` for no initial data.

#### `InferenceEndpointJob(data map[string]any) SaladcloudEntity`

Create a new `InferenceEndpointJob` entity instance. Pass `nil` for no initial data.

#### `InferenceEndpointJobCollection(data map[string]any) SaladcloudEntity`

Create a new `InferenceEndpointJobCollection` entity instance. Pass `nil` for no initial data.

#### `LogEntry(data map[string]any) SaladcloudEntity`

Create a new `LogEntry` entity instance. Pass `nil` for no initial data.

#### `Queue(data map[string]any) SaladcloudEntity`

Create a new `Queue` entity instance. Pass `nil` for no initial data.

#### `Quota(data map[string]any) SaladcloudEntity`

Create a new `Quota` entity instance. Pass `nil` for no initial data.

#### `SystemLog(data map[string]any) SaladcloudEntity`

Create a new `SystemLog` entity instance. Pass `nil` for no initial data.

#### `WebhookSecretKey(data map[string]any) SaladcloudEntity`

Create a new `WebhookSecretKey` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## ContainerEntity

```go
container := client.Container(nil)
fmt.Println(container.GetName()) // "container"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autostart_policy` | `bool` | Yes | Defines whether containers in this group should automatically start when deployed (true) or require manual starting (false) |
| `container` | `map[string]any` | Yes | Represents a container with its configuration and resource requirements. |
| `country_codes` | `[]any` | Yes | List of country codes where container instances are permitted to run. |
| `create_time` | `string` | Yes | ISO 8601 timestamp when this container group was initially created |
| `current_state` | `map[string]any` | Yes | Represents the operational state of a container group during its lifecycle, including timing information, status, and instance distribution metrics. |
| `display_name` | `string` | Yes | The display-friendly name of the resource. |
| `id` | `string` | Yes | The container group identifier. |
| `liveness_probe` | `any` | Yes | Defines a liveness probe for container groups that determines when to restart a container if it becomes unhealthy |
| `name` | `string` | Yes | The container group name. |
| `networking` | `map[string]any` | Yes | Network configuration for container groups that defines connectivity, routing, and access control settings |
| `organization_name` | `string` | Yes | The organization name. |
| `pending_change` | `bool` | Yes | Indicates whether a configuration change has been requested but not yet applied to all containers in the group |
| `priority` | `any` | Yes | Specifies the priority level for container group execution, which determines resource allocation and scheduling precedence. |
| `project_name` | `string` | Yes | The project name. |
| `queue_autoscaler` | `map[string]any` | Yes | Defines configuration for automatically scaling container instances based on queue length. |
| `queue_connection` | `map[string]any` | Yes | Configuration for connecting a container group to a message queue system, enabling asynchronous communication between services. |
| `readiness_probe` | `any` | Yes | Defines how to check if a container is ready to serve traffic. |
| `readme` | `string` | No |  |
| `replicas` | `int` | Yes | The container group replicas. |
| `restart_policy` | `string` | Yes | Specifies the policy for restarting containers when they exit or fail. |
| `scalingactions` | `[]any` | Yes | List of scaling actions configurations |
| `scheduledscalingenabled` | `bool` | Yes | Indicates if scheduled scaling is enabled |
| `startup_probe` | `any` | Yes | Defines a probe that checks if a container application has started successfully. |
| `update_time` | `string` | Yes | ISO 8601 timestamp when this container group was last updated |
| `version` | `int` | Yes | Incremental version number that increases with each configuration change to the container group |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Container(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Container(nil).Load(map[string]any{"id": "container_id", "organization_name": "organization_name", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Container(nil).Create(map[string]any{
    "organization_name": "example_organization_name",
    "project_name": "example_project_name",
    "autostart_policy": true,
    "container": map[string]any{},
    "country_codes": []any{},
    "create_time": "example_create_time",
    "current_state": map[string]any{},
    "display_name": "example_display_name",
    "id": "example_id",
    "liveness_probe": map[string]any{},
    "name": "example_name",
    "networking": map[string]any{},
    "pending_change": true,
    "priority": "example_priority",
    "queue_autoscaler": map[string]any{},
    "queue_connection": map[string]any{},
    "readiness_probe": map[string]any{},
    "replicas": 1,
    "restart_policy": "example_restart_policy",
    "scalingactions": []any{},
    "scheduledscalingenabled": true,
    "startup_probe": map[string]any{},
    "update_time": "example_update_time",
    "version": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Container(nil).Update(map[string]any{
    "id": "container_id",
    "organization_name": "organization_name",
    "project_id": "project_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Container(nil).Remove(map[string]any{"id": "container_id", "organization_name": "organization_name", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ContainerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ContainerGroupEntity

```go
containerGroup := client.ContainerGroup(nil)
fmt.Println(containerGroup.GetName()) // "container_group"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ContainerGroup(nil).Load(map[string]any{"container_group_instance_id": "container_group_instance_id", "container_id": "container_id", "organization_name": "organization_name", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.ContainerGroup(nil).Create(map[string]any{
    "container_id": "example_container_id",
    "instance_id": "example_instance_id",
    "organization_name": "example_organization_name",
    "project_id": "example_project_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ContainerGroupEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ContainerGroupInstanceEntity

```go
containerGroupInstance := client.ContainerGroupInstance(nil)
fmt.Println(containerGroupInstance.GetName()) // "container_group_instance"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cpu_percent` | `float64` | No | The percentage of CPU used by this container group instance. |
| `cpu_usage` | `int` | No | The total CPU usage in seconds for this container group instance. |
| `cpu_usage_total` | `int` | No | The total CPU usage in seconds for this container group instance since it was started. |
| `deletion_cost` | `int` | No | The cost of deleting the container group instance |
| `id` | `string` | Yes | The container group instance identifier. |
| `machine_id` | `string` | Yes | The container group machine identifier. |
| `memory_usage_mb` | `float64` | No | The memory usage in MB for this container group instance. |
| `memory_usage_percent` | `float64` | No | The percentage of memory used by this container group instance. |
| `pulling_progress` | `float64` | No | The progress percentage of pulling the container image. |
| `ready` | `bool` | No | Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function. |
| `ssh_host_key_fingerprint` | `string` | No | The SSH host key fingerprint of the container group instance |
| `ssh_ip` | `string` | No | The SSH IP address of the container group instance |
| `ssh_port` | `int` | No | The SSH port of the container group instance |
| `started` | `bool` | No | Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes. |
| `state` | `string` | Yes | The state of the container group instance |
| `update_time` | `string` | Yes | The UTC timestamp when the container group instance last changed its state. |
| `version` | `int` | Yes | The version of the container group definition currently running on this instance. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ContainerGroupInstance(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.ContainerGroupInstance(nil).Update(map[string]any{
    "container_id": "container_id",
    "id": "id",
    "organization_name": "organization_name",
    "project_id": "project_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ContainerGroupInstanceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CpuAvailabilityEntity

```go
cpuAvailability := client.CpuAvailability(nil)
fmt.Println(cpuAvailability.GetName()) // "cpu_availability"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_cpu_batch` | `int` | No | The number of available CPU cores |
| `country_codes` | `[]any` | No | A list of country codes where the resources are available |
| `cpu` | `int` | No | The number of available CPU cores |
| `memory` | `int` | No | The amount of available memory in MB |
| `on_call_cpu` | `int` | No | The amount of on-call CPU |
| `storage_amount` | `int` | No | The amount of available storage in bytes |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.CpuAvailability(nil).Create(map[string]any{
    "organization_name": "example_organization_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CpuAvailabilityEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GpuAvailabilityEntity

```go
gpuAvailability := client.GpuAvailability(nil)
fmt.Println(gpuAvailability.GetName()) // "gpu_availability"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_gpu_batch` | `int` | No | The number of available GPU batches |
| `available_gpu_high` | `int` | No | The number of available high-end GPUs |
| `available_gpu_low` | `int` | No | The number of available low-end GPUs |
| `available_gpu_medium` | `int` | No | The number of available medium-end GPUs |
| `country_codes` | `[]any` | No | A list of country codes where the resources are available |
| `cpu` | `int` | No | The number of available CPU cores |
| `gpu_classes` | `[]any` | Yes | A list of available GPU class names |
| `memory` | `int` | No | The amount of available memory in MB |
| `on_call_gpu` | `int` | No | The number of on-call GPUs available |
| `storage_amount` | `int` | No | The amount of available storage in bytes |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.GpuAvailability(nil).Create(map[string]any{
    "organization_name": "example_organization_name",
    "gpu_classes": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GpuAvailabilityEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GpuClassEntity

```go
gpuClass := client.GpuClass(nil)
fmt.Println(gpuClass.GetName()) // "gpu_class"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `gpu_class_type` | `string` | No | The type of GPU class |
| `gpu_count` | `int` | No | The number of GPUs in the cluster |
| `id` | `string` | Yes | The unique identifier |
| `is_high_demand` | `bool` | No | Whether the GPU class is in high demand |
| `max_ram` | `int` | No | The maximum RAM amount in MB |
| `max_storage` | `int` | No | The maximum storage amount in bytes |
| `max_vcpu` | `int` | No | The maximum vCPU count |
| `min_ram` | `int` | No | The minimum RAM amount in MB |
| `min_storage` | `int` | No | The minimum storage amount in bytes |
| `min_vcpu` | `int` | No | The minimum vCPU count |
| `name` | `string` | Yes | The GPU class name |
| `prices` | `[]any` | Yes | The list of prices for each container group priority |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.GpuClass(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GpuClassEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InferenceEndpointEntity

```go
inferenceEndpoint := client.InferenceEndpoint(nil)
fmt.Println(inferenceEndpoint.GetName()) // "inference_endpoint"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.InferenceEndpoint(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.InferenceEndpoint(nil).Load(map[string]any{"id": "inference_endpoint_id", "organization_name": "organization_name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.InferenceEndpoint(nil).Remove(map[string]any{"inference_endpoint_id": "inference_endpoint_id", "inference_endpoint_job_id": "inference_endpoint_job_id", "organization_name": "organization_name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InferenceEndpointEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InferenceEndpointJobEntity

```go
inferenceEndpointJob := client.InferenceEndpointJob(nil)
fmt.Println(inferenceEndpointJob.GetName()) // "inference_endpoint_job"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `create_time` | `string` | Yes | The time the job was created. |
| `events` | `[]any` | Yes | The list of events. |
| `id` | `string` | Yes | The inference endpoint job identifier. |
| `inference_endpoint_name` | `string` | Yes | The inference endpoint name. |
| `input` | `any` | Yes | The job input. |
| `metadata` | `map[string]any` | No | The job metadata. |
| `organization_name` | `string` | Yes | The organization name. |
| `output` | `any` | No | The job output. |
| `status` | `string` | Yes | The current status. |
| `update_time` | `string` | Yes | The time the job was last updated. |
| `webhook` | `string` | No | The webhook URL called when the job completes. |
| `webhook_url` | `string` | No | The webhook URL called when the job completes. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.InferenceEndpointJob(nil).Load(map[string]any{"id": "inference_endpoint_job_id", "inference_endpoint_id": "inference_endpoint_id", "organization_name": "organization_name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.InferenceEndpointJob(nil).Create(map[string]any{
    "inference_endpoint_name": "example_inference_endpoint_name",
    "organization_name": "example_organization_name",
    "create_time": "example_create_time",
    "events": []any{},
    "id": "example_id",
    "input": "example_input",
    "status": "example_status",
    "update_time": "example_update_time",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InferenceEndpointJobEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InferenceEndpointJobCollectionEntity

```go
inferenceEndpointJobCollection := client.InferenceEndpointJobCollection(nil)
fmt.Println(inferenceEndpointJobCollection.GetName()) // "inference_endpoint_job_collection"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `create_time` | `string` | Yes | The time the job was created. |
| `events` | `[]any` | Yes | The list of events. |
| `id` | `string` | Yes | The inference endpoint job identifier. |
| `inference_endpoint_name` | `string` | Yes | The inference endpoint name. |
| `input` | `any` | Yes | The job input. |
| `metadata` | `map[string]any` | No | The job metadata. |
| `organization_name` | `string` | Yes | The organization name. |
| `output` | `any` | No | The job output. |
| `status` | `string` | Yes | The current status. |
| `update_time` | `string` | Yes | The time the job was last updated. |
| `webhook` | `string` | No | The webhook URL called when the job completes. |
| `webhook_url` | `string` | No | The webhook URL called when the job completes. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.InferenceEndpointJobCollection(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InferenceEndpointJobCollectionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LogEntryEntity

```go
logEntry := client.LogEntry(nil)
fmt.Println(logEntry.GetName()) // "log_entry"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_time` | `string` | Yes | The end time of the time range |
| `items` | `[]any` | Yes | A collection of log entries |
| `organization_name` | `string` | Yes | The organization name. |
| `page_max_time` | `string` | Yes | The maximum time page boundary. |
| `page_min_time` | `string` | Yes | The minimum time page boundary. |
| `page_size` | `int` | No | The maximum number of items per page. |
| `query` | `string` | Yes | The query string for filtering logs |
| `sort_order` | `string` | No | The sort order of the log entries. |
| `start_time` | `string` | Yes | The start time of the time range |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.LogEntry(nil).Create(map[string]any{
    "organization_name": "example_organization_name",
    "end_time": "example_end_time",
    "items": []any{},
    "page_max_time": "example_page_max_time",
    "page_min_time": "example_page_min_time",
    "query": "example_query",
    "start_time": "example_start_time",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LogEntryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## QueueEntity

```go
queue := client.Queue(nil)
fmt.Println(queue.GetName()) // "queue"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `container_groups` | `[]any` | Yes | The container groups that are part of this queue. |
| `create_time` | `string` | Yes | The job creation time |
| `current_queue_length` | `int` | No | The current length of the queue |
| `description` | `string` | No | The description. |
| `display_name` | `string` | Yes | The display name. |
| `events` | `[]any` | Yes | The job events |
| `id` | `string` | Yes | The job identifier |
| `input` | `any` | Yes | The job input. |
| `metadata` | `map[string]any` | No | Additional metadata for the job |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Queue(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Queue(nil).Load(map[string]any{"id": "queue_id", "organization_name": "organization_name", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Queue(nil).Create(map[string]any{
    "organization_name": "example_organization_name",
    "project_name": "example_project_name",
    "container_groups": []any{},
    "create_time": "example_create_time",
    "display_name": "example_display_name",
    "events": []any{},
    "id": "example_id",
    "input": "example_input",
    "name": "example_name",
    "status": "example_status",
    "update_time": "example_update_time",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Queue(nil).Update(map[string]any{
    "id": "queue_id",
    "organization_name": "organization_name",
    "project_id": "project_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Queue(nil).Remove(map[string]any{"id": "queue_id", "organization_name": "organization_name", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `QueueEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## QuotaEntity

```go
quota := client.Quota(nil)
fmt.Println(quota.GetName()) // "quota"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `container_replicas_quota` | `int` | Yes | The maximum number of replicas that can be created for a container group |
| `container_replicas_used` | `int` | Yes | The number of replicas that are currently in use |
| `max_container_group_reallocations_per_minute` | `int` | No | The maximum number of container group reallocations per minute |
| `max_container_group_recreates_per_minute` | `int` | No | The maximum number of container group recreates per minute |
| `max_container_group_restarts_per_minute` | `int` | No | The maximum number of container group restarts per minute |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Quota(nil).Load(map[string]any{"organization_name": "organization_name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `QuotaEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SystemLogEntity

```go
systemLog := client.SystemLog(nil)
fmt.Println(systemLog.GetName()) // "system_log"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_name` | `string` | Yes | The name of the event |
| `event_time` | `string` | Yes | The UTC date & time when the log item was created |
| `instance_id` | `string` | No | The container group instance identifier. |
| `machine_id` | `string` | No | The container group machine identifier. |
| `resource_cpu` | `any` | Yes | The number of CPUs |
| `resource_gpu_class` | `string` | Yes | The GPU class name |
| `resource_memory` | `any` | Yes | The memory amount in MB |
| `resource_storage_amount` | `any` | Yes | The storage amount in bytes |
| `version` | `string` | Yes | The version instance ID |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.SystemLog(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SystemLogEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WebhookSecretKeyEntity

```go
webhookSecretKey := client.WebhookSecretKey(nil)
fmt.Println(webhookSecretKey.GetName()) // "webhook_secret_key"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `secret_key` | `string` | Yes | The webhook secret key |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.WebhookSecretKey(nil).Load(map[string]any{"organization_name": "organization_name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.WebhookSecretKey(nil).Create(map[string]any{
    "organization_name": "example_organization_name",
    "secret_key": "example_secret_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WebhookSecretKeyEntity` instance with the same client and
options.

#### `GetName() string`

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

```go
client := sdk.NewSaladcloudSDK(map[string]any{
    "feature": map[string]any{
        "debug": map[string]any{"active": true},
        "idempotency": map[string]any{"active": true},
        "metrics": map[string]any{"active": true},
        "paging": map[string]any{"active": true},
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
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

