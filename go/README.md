# Saladcloud Golang SDK



The Golang SDK for the Saladcloud API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Container(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/saladcloud-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/saladcloud-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/saladcloud-sdk/go=../saladcloud-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/saladcloud-sdk/go"
)

func main() {
    client := sdk.NewSaladcloudSDK(map[string]any{
        "apikey": os.Getenv("SALADCLOUD_APIKEY"),
    })

    // List container records — the value is the array of records itself.
    containers, err := client.Container(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range containers.([]any) {
        fmt.Println(item)
    }

    // Load a single container — the value is the loaded record.
    container, err := client.Container(nil).Load(map[string]any{"id": "example_id", "organization_name": "example_organization_name", "project_id": "example_project_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(container)

    // Create a container.
    created, err := client.Container(nil).Create(map[string]any{"organization_name": "example_organization_name", "project_name": "example_project_name", "autostart_policy": true, "container": map[string]any{}, "country_codes": []any{}, "create_time": "example_create_time", "current_state": map[string]any{}, "display_name": "example_display_name", "id": "example_id", "liveness_probe": map[string]any{}, "name": "example_name", "networking": map[string]any{}, "pending_change": true, "priority": "example_priority", "queue_autoscaler": map[string]any{}, "queue_connection": map[string]any{}, "readiness_probe": map[string]any{}, "replicas": 1, "restart_policy": "example_restart_policy", "scalingactions": []any{}, "scheduledscalingenabled": true, "startup_probe": map[string]any{}, "update_time": "example_update_time", "version": 1}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)

    // Update a container.
    updated, err := client.Container(nil).Update(map[string]any{"id": "example_id", "organization_name": "example_organization_name", "project_id": "example_project_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(updated)

    // Remove a container.
    removed, err := client.Container(nil).Remove(map[string]any{"id": "example_id", "organization_name": "example_organization_name", "project_id": "example_project_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(removed)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
inferenceendpoints, err := client.InferenceEndpoint(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = inferenceendpoints
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

inferenceEndpoint, err := client.InferenceEndpoint(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(inferenceEndpoint) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewSaladcloudSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewSaladcloudSDK

```go
func NewSaladcloudSDK(options map[string]any) *SaladcloudSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *SaladcloudSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### SaladcloudSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Container` | `(data map[string]any) SaladcloudEntity` | Create a Container entity instance. |
| `ContainerGroup` | `(data map[string]any) SaladcloudEntity` | Create a ContainerGroup entity instance. |
| `ContainerGroupInstance` | `(data map[string]any) SaladcloudEntity` | Create a ContainerGroupInstance entity instance. |
| `CpuAvailability` | `(data map[string]any) SaladcloudEntity` | Create a CpuAvailability entity instance. |
| `GpuAvailability` | `(data map[string]any) SaladcloudEntity` | Create a GpuAvailability entity instance. |
| `GpuClass` | `(data map[string]any) SaladcloudEntity` | Create a GpuClass entity instance. |
| `InferenceEndpoint` | `(data map[string]any) SaladcloudEntity` | Create an InferenceEndpoint entity instance. |
| `InferenceEndpointJob` | `(data map[string]any) SaladcloudEntity` | Create an InferenceEndpointJob entity instance. |
| `InferenceEndpointJobCollection` | `(data map[string]any) SaladcloudEntity` | Create an InferenceEndpointJobCollection entity instance. |
| `LogEntry` | `(data map[string]any) SaladcloudEntity` | Create a LogEntry entity instance. |
| `Queue` | `(data map[string]any) SaladcloudEntity` | Create a Queue entity instance. |
| `Quota` | `(data map[string]any) SaladcloudEntity` | Create a Quota entity instance. |
| `SystemLog` | `(data map[string]any) SaladcloudEntity` | Create a SystemLog entity instance. |
| `WebhookSecretKey` | `(data map[string]any) SaladcloudEntity` | Create a WebhookSecretKey entity instance. |

### Entity interface (SaladcloudEntity)

All entities implement the `SaladcloudEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    container, err := client.Container(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // container is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Container

| Field | Description |
| --- | --- |
| `"autostart_policy"` | Defines whether containers in this group should automatically start when deployed (true) or require manual starting (false) |
| `"container"` | Represents a container with its configuration and resource requirements. |
| `"country_codes"` | List of country codes where container instances are permitted to run. |
| `"create_time"` | ISO 8601 timestamp when this container group was initially created |
| `"current_state"` | Represents the operational state of a container group during its lifecycle, including timing information, status, and instance distribution metrics. |
| `"display_name"` | The display-friendly name of the resource. |
| `"id"` | The container group identifier. |
| `"liveness_probe"` | Defines a liveness probe for container groups that determines when to restart a container if it becomes unhealthy |
| `"name"` | The container group name. |
| `"networking"` | Network configuration for container groups that defines connectivity, routing, and access control settings |
| `"organization_name"` | The organization name. |
| `"pending_change"` | Indicates whether a configuration change has been requested but not yet applied to all containers in the group |
| `"priority"` | Specifies the priority level for container group execution, which determines resource allocation and scheduling precedence. |
| `"project_name"` | The project name. |
| `"queue_autoscaler"` | Defines configuration for automatically scaling container instances based on queue length. |
| `"queue_connection"` | Configuration for connecting a container group to a message queue system, enabling asynchronous communication between services. |
| `"readiness_probe"` | Defines how to check if a container is ready to serve traffic. |
| `"readme"` |  |
| `"replicas"` | The container group replicas. |
| `"restart_policy"` | Specifies the policy for restarting containers when they exit or fail. |
| `"scalingactions"` | List of scaling actions configurations |
| `"scheduledscalingenabled"` | Indicates if scheduled scaling is enabled |
| `"startup_probe"` | Defines a probe that checks if a container application has started successfully. |
| `"update_time"` | ISO 8601 timestamp when this container group was last updated |
| `"version"` | Incremental version number that increases with each configuration change to the container group |

Operations: Create, List, Load, Remove, Update.

API path: `/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/start`

#### ContainerGroup

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/reallocate`

#### ContainerGroupInstance

| Field | Description |
| --- | --- |
| `"cpu_percent"` | The percentage of CPU used by this container group instance. |
| `"cpu_usage"` | The total CPU usage in seconds for this container group instance. |
| `"cpu_usage_total"` | The total CPU usage in seconds for this container group instance since it was started. |
| `"deletion_cost"` | The cost of deleting the container group instance |
| `"id"` | The container group instance identifier. |
| `"machine_id"` | The container group machine identifier. |
| `"memory_usage_mb"` | The memory usage in MB for this container group instance. |
| `"memory_usage_percent"` | The percentage of memory used by this container group instance. |
| `"pulling_progress"` | The progress percentage of pulling the container image. |
| `"ready"` | Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function. |
| `"ssh_host_key_fingerprint"` | The SSH host key fingerprint of the container group instance |
| `"ssh_ip"` | The SSH IP address of the container group instance |
| `"ssh_port"` | The SSH port of the container group instance |
| `"started"` | Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes. |
| `"state"` | The state of the container group instance |
| `"update_time"` | The UTC timestamp when the container group instance last changed its state. |
| `"version"` | The version of the container group definition currently running on this instance. |

Operations: List, Update.

API path: `/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances`

#### CpuAvailability

| Field | Description |
| --- | --- |
| `"available_cpu_batch"` | The number of available CPU cores |
| `"country_codes"` | A list of country codes where the resources are available |
| `"cpu"` | The number of available CPU cores |
| `"memory"` | The amount of available memory in MB |
| `"on_call_cpu"` | The amount of on-call CPU |
| `"storage_amount"` | The amount of available storage in bytes |

Operations: Create.

API path: `/organizations/{organization_name}/availability/sce-cpu-availability`

#### GpuAvailability

| Field | Description |
| --- | --- |
| `"available_gpu_batch"` | The number of available GPU batches |
| `"available_gpu_high"` | The number of available high-end GPUs |
| `"available_gpu_low"` | The number of available low-end GPUs |
| `"available_gpu_medium"` | The number of available medium-end GPUs |
| `"country_codes"` | A list of country codes where the resources are available |
| `"cpu"` | The number of available CPU cores |
| `"gpu_classes"` | A list of available GPU class names |
| `"memory"` | The amount of available memory in MB |
| `"on_call_gpu"` | The number of on-call GPUs available |
| `"storage_amount"` | The amount of available storage in bytes |

Operations: Create.

API path: `/organizations/{organization_name}/availability/sce-gpu-availability`

#### GpuClass

| Field | Description |
| --- | --- |
| `"gpu_class_type"` | The type of GPU class |
| `"gpu_count"` | The number of GPUs in the cluster |
| `"id"` | The unique identifier |
| `"is_high_demand"` | Whether the GPU class is in high demand |
| `"max_ram"` | The maximum RAM amount in MB |
| `"max_storage"` | The maximum storage amount in bytes |
| `"max_vcpu"` | The maximum vCPU count |
| `"min_ram"` | The minimum RAM amount in MB |
| `"min_storage"` | The minimum storage amount in bytes |
| `"min_vcpu"` | The minimum vCPU count |
| `"name"` | The GPU class name |
| `"prices"` | The list of prices for each container group priority |

Operations: List.

API path: `/organizations/{organization_name}/gpu-classes`

#### InferenceEndpoint

| Field | Description |
| --- | --- |
| `"description"` | The detailed description of the resource. |
| `"display_name"` | The display-friendly name of the resource. |
| `"icon_url"` | The URL of the icon image |
| `"id"` | The inference endpoint identifier. |
| `"input_schema"` | The input schema |
| `"name"` | The inference endpoint name. |
| `"organization_name"` | The organization name. |
| `"output_schema"` | The output schema |
| `"price_description"` | A description of the price |
| `"readme"` | A markdown file containing a detailed description of the inference endpoint |

Operations: List, Load, Remove.

API path: `/organizations/{organization_name}/inference-endpoints`

#### InferenceEndpointJob

| Field | Description |
| --- | --- |
| `"create_time"` | The time the job was created. |
| `"events"` | The list of events. |
| `"id"` | The inference endpoint job identifier. |
| `"inference_endpoint_name"` | The inference endpoint name. |
| `"input"` | The job input. |
| `"metadata"` | The job metadata. |
| `"organization_name"` | The organization name. |
| `"output"` | The job output. |
| `"status"` | The current status. |
| `"update_time"` | The time the job was last updated. |
| `"webhook"` | The webhook URL called when the job completes. |
| `"webhook_url"` | The webhook URL called when the job completes. |

Operations: Create, Load.

API path: `/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs`

#### InferenceEndpointJobCollection

| Field | Description |
| --- | --- |
| `"create_time"` | The time the job was created. |
| `"events"` | The list of events. |
| `"id"` | The inference endpoint job identifier. |
| `"inference_endpoint_name"` | The inference endpoint name. |
| `"input"` | The job input. |
| `"metadata"` | The job metadata. |
| `"organization_name"` | The organization name. |
| `"output"` | The job output. |
| `"status"` | The current status. |
| `"update_time"` | The time the job was last updated. |
| `"webhook"` | The webhook URL called when the job completes. |
| `"webhook_url"` | The webhook URL called when the job completes. |

Operations: List.

API path: `/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs`

#### LogEntry

| Field | Description |
| --- | --- |
| `"end_time"` | The end time of the time range |
| `"items"` | A collection of log entries |
| `"organization_name"` | The organization name. |
| `"page_max_time"` | The maximum time page boundary. |
| `"page_min_time"` | The minimum time page boundary. |
| `"page_size"` | The maximum number of items per page. |
| `"query"` | The query string for filtering logs |
| `"sort_order"` | The sort order of the log entries. |
| `"start_time"` | The start time of the time range |

Operations: Create.

API path: `/organizations/{organization_name}/log-entries`

#### Queue

| Field | Description |
| --- | --- |
| `"container_groups"` | The container groups that are part of this queue. |
| `"create_time"` | The job creation time |
| `"current_queue_length"` | The current length of the queue |
| `"description"` | The description. |
| `"display_name"` | The display name. |
| `"events"` | The job events |
| `"id"` | The job identifier |
| `"input"` | The job input. |
| `"metadata"` | Additional metadata for the job |
| `"name"` | The queue name. |
| `"output"` | The job output. |
| `"status"` | The job status |
| `"update_time"` | The job update time |
| `"webhook"` | The webhook URL to notify when the job completes |

Operations: Create, List, Load, Remove, Update.

API path: `/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs`

#### Quota

| Field | Description |
| --- | --- |
| `"container_replicas_quota"` | The maximum number of replicas that can be created for a container group |
| `"container_replicas_used"` | The number of replicas that are currently in use |
| `"max_container_group_reallocations_per_minute"` | The maximum number of container group reallocations per minute |
| `"max_container_group_recreates_per_minute"` | The maximum number of container group recreates per minute |
| `"max_container_group_restarts_per_minute"` | The maximum number of container group restarts per minute |

Operations: Load.

API path: `/organizations/{organization_name}/quotas`

#### SystemLog

| Field | Description |
| --- | --- |
| `"event_name"` | The name of the event |
| `"event_time"` | The UTC date & time when the log item was created |
| `"instance_id"` | The container group instance identifier. |
| `"machine_id"` | The container group machine identifier. |
| `"resource_cpu"` | The number of CPUs |
| `"resource_gpu_class"` | The GPU class name |
| `"resource_memory"` | The memory amount in MB |
| `"resource_storage_amount"` | The storage amount in bytes |
| `"version"` | The version instance ID |

Operations: List.

API path: `/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/system-logs`

#### WebhookSecretKey

| Field | Description |
| --- | --- |
| `"secret_key"` | The webhook secret key |

Operations: Create, Load.

API path: `/organizations/{organization_name}/webhook-secret-key`



## Entities


### Container

Create an instance: `container := client.Container(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autostart_policy` | `bool` | Defines whether containers in this group should automatically start when deployed (true) or require manual starting (false) |
| `container` | `map[string]any` | Represents a container with its configuration and resource requirements. |
| `country_codes` | `[]any` | List of country codes where container instances are permitted to run. |
| `create_time` | `string` | ISO 8601 timestamp when this container group was initially created |
| `current_state` | `map[string]any` | Represents the operational state of a container group during its lifecycle, including timing information, status, and instance distribution metrics. |
| `display_name` | `string` | The display-friendly name of the resource. |
| `id` | `string` | The container group identifier. |
| `liveness_probe` | `any` | Defines a liveness probe for container groups that determines when to restart a container if it becomes unhealthy |
| `name` | `string` | The container group name. |
| `networking` | `map[string]any` | Network configuration for container groups that defines connectivity, routing, and access control settings |
| `organization_name` | `string` | The organization name. |
| `pending_change` | `bool` | Indicates whether a configuration change has been requested but not yet applied to all containers in the group |
| `priority` | `any` | Specifies the priority level for container group execution, which determines resource allocation and scheduling precedence. |
| `project_name` | `string` | The project name. |
| `queue_autoscaler` | `map[string]any` | Defines configuration for automatically scaling container instances based on queue length. |
| `queue_connection` | `map[string]any` | Configuration for connecting a container group to a message queue system, enabling asynchronous communication between services. |
| `readiness_probe` | `any` | Defines how to check if a container is ready to serve traffic. |
| `readme` | `string` |  |
| `replicas` | `int` | The container group replicas. |
| `restart_policy` | `string` | Specifies the policy for restarting containers when they exit or fail. |
| `scalingactions` | `[]any` | List of scaling actions configurations |
| `scheduledscalingenabled` | `bool` | Indicates if scheduled scaling is enabled |
| `startup_probe` | `any` | Defines a probe that checks if a container application has started successfully. |
| `update_time` | `string` | ISO 8601 timestamp when this container group was last updated |
| `version` | `int` | Incremental version number that increases with each configuration change to the container group |

#### Example: Load

```go
container, err := client.Container(nil).Load(map[string]any{"id": "container_id", "organization_name": "organization_name", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(container) // the loaded record
```

#### Example: List

```go
containers, err := client.Container(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(containers) // the array of records
```

#### Example: Create

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


### ContainerGroup

Create an instance: `containerGroup := client.ContainerGroup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Load

```go
containerGroup, err := client.ContainerGroup(nil).Load(map[string]any{"container_group_instance_id": "container_group_instance_id", "container_id": "container_id", "organization_name": "organization_name", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(containerGroup) // the loaded record
```

#### Example: Create

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


### ContainerGroupInstance

Create an instance: `containerGroupInstance := client.ContainerGroupInstance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cpu_percent` | `float64` | The percentage of CPU used by this container group instance. |
| `cpu_usage` | `int` | The total CPU usage in seconds for this container group instance. |
| `cpu_usage_total` | `int` | The total CPU usage in seconds for this container group instance since it was started. |
| `deletion_cost` | `int` | The cost of deleting the container group instance |
| `id` | `string` | The container group instance identifier. |
| `machine_id` | `string` | The container group machine identifier. |
| `memory_usage_mb` | `float64` | The memory usage in MB for this container group instance. |
| `memory_usage_percent` | `float64` | The percentage of memory used by this container group instance. |
| `pulling_progress` | `float64` | The progress percentage of pulling the container image. |
| `ready` | `bool` | Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function. |
| `ssh_host_key_fingerprint` | `string` | The SSH host key fingerprint of the container group instance |
| `ssh_ip` | `string` | The SSH IP address of the container group instance |
| `ssh_port` | `int` | The SSH port of the container group instance |
| `started` | `bool` | Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes. |
| `state` | `string` | The state of the container group instance |
| `update_time` | `string` | The UTC timestamp when the container group instance last changed its state. |
| `version` | `int` | The version of the container group definition currently running on this instance. |

#### Example: List

```go
containerGroupInstances, err := client.ContainerGroupInstance(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(containerGroupInstances) // the array of records
```


### CpuAvailability

Create an instance: `cpuAvailability := client.CpuAvailability(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_cpu_batch` | `int` | The number of available CPU cores |
| `country_codes` | `[]any` | A list of country codes where the resources are available |
| `cpu` | `int` | The number of available CPU cores |
| `memory` | `int` | The amount of available memory in MB |
| `on_call_cpu` | `int` | The amount of on-call CPU |
| `storage_amount` | `int` | The amount of available storage in bytes |

#### Example: Create

```go
result, err := client.CpuAvailability(nil).Create(map[string]any{
    "organization_name": "example_organization_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### GpuAvailability

Create an instance: `gpuAvailability := client.GpuAvailability(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_gpu_batch` | `int` | The number of available GPU batches |
| `available_gpu_high` | `int` | The number of available high-end GPUs |
| `available_gpu_low` | `int` | The number of available low-end GPUs |
| `available_gpu_medium` | `int` | The number of available medium-end GPUs |
| `country_codes` | `[]any` | A list of country codes where the resources are available |
| `cpu` | `int` | The number of available CPU cores |
| `gpu_classes` | `[]any` | A list of available GPU class names |
| `memory` | `int` | The amount of available memory in MB |
| `on_call_gpu` | `int` | The number of on-call GPUs available |
| `storage_amount` | `int` | The amount of available storage in bytes |

#### Example: Create

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


### GpuClass

Create an instance: `gpuClass := client.GpuClass(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `gpu_class_type` | `string` | The type of GPU class |
| `gpu_count` | `int` | The number of GPUs in the cluster |
| `id` | `string` | The unique identifier |
| `is_high_demand` | `bool` | Whether the GPU class is in high demand |
| `max_ram` | `int` | The maximum RAM amount in MB |
| `max_storage` | `int` | The maximum storage amount in bytes |
| `max_vcpu` | `int` | The maximum vCPU count |
| `min_ram` | `int` | The minimum RAM amount in MB |
| `min_storage` | `int` | The minimum storage amount in bytes |
| `min_vcpu` | `int` | The minimum vCPU count |
| `name` | `string` | The GPU class name |
| `prices` | `[]any` | The list of prices for each container group priority |

#### Example: List

```go
gpuClasss, err := client.GpuClass(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(gpuClasss) // the array of records
```


### InferenceEndpoint

Create an instance: `inferenceEndpoint := client.InferenceEndpoint(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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

```go
inferenceEndpoint, err := client.InferenceEndpoint(nil).Load(map[string]any{"id": "inference_endpoint_id", "organization_name": "organization_name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(inferenceEndpoint) // the loaded record
```

#### Example: List

```go
inferenceEndpoints, err := client.InferenceEndpoint(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(inferenceEndpoints) // the array of records
```


### InferenceEndpointJob

Create an instance: `inferenceEndpointJob := client.InferenceEndpointJob(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `create_time` | `string` | The time the job was created. |
| `events` | `[]any` | The list of events. |
| `id` | `string` | The inference endpoint job identifier. |
| `inference_endpoint_name` | `string` | The inference endpoint name. |
| `input` | `any` | The job input. |
| `metadata` | `map[string]any` | The job metadata. |
| `organization_name` | `string` | The organization name. |
| `output` | `any` | The job output. |
| `status` | `string` | The current status. |
| `update_time` | `string` | The time the job was last updated. |
| `webhook` | `string` | The webhook URL called when the job completes. |
| `webhook_url` | `string` | The webhook URL called when the job completes. |

#### Example: Load

```go
inferenceEndpointJob, err := client.InferenceEndpointJob(nil).Load(map[string]any{"id": "inference_endpoint_job_id", "inference_endpoint_id": "inference_endpoint_id", "organization_name": "organization_name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(inferenceEndpointJob) // the loaded record
```

#### Example: Create

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


### InferenceEndpointJobCollection

Create an instance: `inferenceEndpointJobCollection := client.InferenceEndpointJobCollection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `create_time` | `string` | The time the job was created. |
| `events` | `[]any` | The list of events. |
| `id` | `string` | The inference endpoint job identifier. |
| `inference_endpoint_name` | `string` | The inference endpoint name. |
| `input` | `any` | The job input. |
| `metadata` | `map[string]any` | The job metadata. |
| `organization_name` | `string` | The organization name. |
| `output` | `any` | The job output. |
| `status` | `string` | The current status. |
| `update_time` | `string` | The time the job was last updated. |
| `webhook` | `string` | The webhook URL called when the job completes. |
| `webhook_url` | `string` | The webhook URL called when the job completes. |

#### Example: List

```go
inferenceEndpointJobCollections, err := client.InferenceEndpointJobCollection(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(inferenceEndpointJobCollections) // the array of records
```


### LogEntry

Create an instance: `logEntry := client.LogEntry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_time` | `string` | The end time of the time range |
| `items` | `[]any` | A collection of log entries |
| `organization_name` | `string` | The organization name. |
| `page_max_time` | `string` | The maximum time page boundary. |
| `page_min_time` | `string` | The minimum time page boundary. |
| `page_size` | `int` | The maximum number of items per page. |
| `query` | `string` | The query string for filtering logs |
| `sort_order` | `string` | The sort order of the log entries. |
| `start_time` | `string` | The start time of the time range |

#### Example: Create

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


### Queue

Create an instance: `queue := client.Queue(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `container_groups` | `[]any` | The container groups that are part of this queue. |
| `create_time` | `string` | The job creation time |
| `current_queue_length` | `int` | The current length of the queue |
| `description` | `string` | The description. |
| `display_name` | `string` | The display name. |
| `events` | `[]any` | The job events |
| `id` | `string` | The job identifier |
| `input` | `any` | The job input. |
| `metadata` | `map[string]any` | Additional metadata for the job |
| `name` | `string` | The queue name. |
| `output` | `any` | The job output. |
| `status` | `string` | The job status |
| `update_time` | `string` | The job update time |
| `webhook` | `string` | The webhook URL to notify when the job completes |

#### Example: Load

```go
queue, err := client.Queue(nil).Load(map[string]any{"id": "queue_id", "organization_name": "organization_name", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(queue) // the loaded record
```

#### Example: List

```go
queues, err := client.Queue(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(queues) // the array of records
```

#### Example: Create

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


### Quota

Create an instance: `quota := client.Quota(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `container_replicas_quota` | `int` | The maximum number of replicas that can be created for a container group |
| `container_replicas_used` | `int` | The number of replicas that are currently in use |
| `max_container_group_reallocations_per_minute` | `int` | The maximum number of container group reallocations per minute |
| `max_container_group_recreates_per_minute` | `int` | The maximum number of container group recreates per minute |
| `max_container_group_restarts_per_minute` | `int` | The maximum number of container group restarts per minute |

#### Example: Load

```go
quota, err := client.Quota(nil).Load(map[string]any{"organization_name": "organization_name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(quota) // the loaded record
```


### SystemLog

Create an instance: `systemLog := client.SystemLog(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event_name` | `string` | The name of the event |
| `event_time` | `string` | The UTC date & time when the log item was created |
| `instance_id` | `string` | The container group instance identifier. |
| `machine_id` | `string` | The container group machine identifier. |
| `resource_cpu` | `any` | The number of CPUs |
| `resource_gpu_class` | `string` | The GPU class name |
| `resource_memory` | `any` | The memory amount in MB |
| `resource_storage_amount` | `any` | The storage amount in bytes |
| `version` | `string` | The version instance ID |

#### Example: List

```go
systemLogs, err := client.SystemLog(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(systemLogs) // the array of records
```


### WebhookSecretKey

Create an instance: `webhookSecretKey := client.WebhookSecretKey(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `secret_key` | `string` | The webhook secret key |

#### Example: Load

```go
webhookSecretKey, err := client.WebhookSecretKey(nil).Load(map[string]any{"organization_name": "organization_name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(webhookSecretKey) // the loaded record
```

#### Example: Create

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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

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

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/saladcloud-sdk/go/
├── saladcloud.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/saladcloud-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
inferenceendpoint := client.InferenceEndpoint(nil)
inferenceendpoint.List(nil, nil)

// inferenceendpoint.Data() now returns the inferenceendpoint data from the last list
// inferenceendpoint.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
