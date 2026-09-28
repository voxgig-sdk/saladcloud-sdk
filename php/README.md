# Saladcloud PHP SDK



The PHP SDK for the Saladcloud API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Container()` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/saladcloud-sdk/releases](https://github.com/voxgig-sdk/saladcloud-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'saladcloud_sdk.php';

$client = new SaladcloudSDK([
    "apikey" => getenv("SALADCLOUD_APIKEY"),
]);
```

### 2. List container records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $containers = $client->Container()->list();
    foreach ($containers as $record) {
        $item = $record->data_get();
        echo $item["id"] . " " . $item["autostart_policy"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a containergroup

ContainerGroup is nested under container_group_instance, so provide the `container_group_instance_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the ContainerGroup record (throws on error).
    $containergroup = $client->ContainerGroup()->load(["container_group_instance_id" => "example_container_group_instance_id", "container_id" => "example_container_id", "organization_name" => "example_organization_name", "project_id" => "example_project_id"]);
    print_r($containergroup->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Container record.
$created = $client->Container()->create(["organization_name" => "example_organization_name", "project_name" => "example_project_name", "autostart_policy" => true, "container" => [], "country_codes" => [], "create_time" => "example_create_time", "current_state" => [], "display_name" => "example_display_name", "id" => "example_id", "liveness_probe" => [], "name" => "example_name", "networking" => [], "pending_change" => true, "priority" => "example_priority", "queue_autoscaler" => [], "queue_connection" => [], "readiness_probe" => [], "replicas" => 1, "restart_policy" => "example_restart_policy", "scalingactions" => [], "scheduledscalingenabled" => true, "startup_probe" => [], "update_time" => "example_update_time", "version" => 1]);

// Update — index the record via data_get() ($created->data_get()["id"]).
$client->Container()->update(["id" => $created->data_get()["id"], "organization_name" => "example_organization_name", "project_id" => "example_project_id"]);

// Remove
$client->Container()->remove(["id" => $created->data_get()["id"], "organization_name" => "example_organization_name", "project_id" => "example_project_id"]);
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $inferenceendpoints = $client->InferenceEndpoint()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = SaladcloudSDK::test([
    "entity" => ["inferenceendpoint" => ["test01" => ["id" => "test01"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$inferenceendpoint = $client->InferenceEndpoint()->list();
print_r(array_map(fn($item) => $item->data_get(), $inferenceendpoint));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new SaladcloudSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
SALADCLOUD_TEST_LIVE=TRUE
SALADCLOUD_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### SaladcloudSDK

```php
require_once 'saladcloud_sdk.php';
$client = new SaladcloudSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = SaladcloudSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### SaladcloudSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Container` | `($data): ContainerEntity` | Create a Container entity instance. |
| `ContainerGroup` | `($data): ContainerGroupEntity` | Create a ContainerGroup entity instance. |
| `ContainerGroupInstance` | `($data): ContainerGroupInstanceEntity` | Create a ContainerGroupInstance entity instance. |
| `CpuAvailability` | `($data): CpuAvailabilityEntity` | Create a CpuAvailability entity instance. |
| `GpuAvailability` | `($data): GpuAvailabilityEntity` | Create a GpuAvailability entity instance. |
| `GpuClass` | `($data): GpuClassEntity` | Create a GpuClass entity instance. |
| `InferenceEndpoint` | `($data): InferenceEndpointEntity` | Create an InferenceEndpoint entity instance. |
| `InferenceEndpointJob` | `($data): InferenceEndpointJobEntity` | Create an InferenceEndpointJob entity instance. |
| `InferenceEndpointJobCollection` | `($data): InferenceEndpointJobCollectionEntity` | Create an InferenceEndpointJobCollection entity instance. |
| `LogEntry` | `($data): LogEntryEntity` | Create a LogEntry entity instance. |
| `Queue` | `($data): QueueEntity` | Create a Queue entity instance. |
| `Quota` | `($data): QuotaEntity` | Create a Quota entity instance. |
| `SystemLog` | `($data): SystemLogEntity` | Create a SystemLog entity instance. |
| `WebhookSecretKey` | `($data): WebhookSecretKeyEntity` | Create a WebhookSecretKey entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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
| `container_replicas_quota` | The maximum number of replicas that can be created for a container group |
| `container_replicas_used` | The number of replicas that are currently in use |
| `max_container_group_reallocations_per_minute` | The maximum number of container group reallocations per minute |
| `max_container_group_recreates_per_minute` | The maximum number of container group recreates per minute |
| `max_container_group_restarts_per_minute` | The maximum number of container group restarts per minute |

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

Create an instance: `$container = $client->Container();`

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
| `autostart_policy` | `bool` | Defines whether containers in this group should automatically start when deployed (true) or require manual starting (false) |
| `container` | `array` | Represents a container with its configuration and resource requirements. |
| `country_codes` | `array` | List of country codes where container instances are permitted to run. |
| `create_time` | `string` | ISO 8601 timestamp when this container group was initially created |
| `current_state` | `array` | Represents the operational state of a container group during its lifecycle, including timing information, status, and instance distribution metrics. |
| `display_name` | `string` | The display-friendly name of the resource. |
| `id` | `string` | The container group identifier. |
| `liveness_probe` | `mixed` | Defines a liveness probe for container groups that determines when to restart a container if it becomes unhealthy |
| `name` | `string` | The container group name. |
| `networking` | `array` | Network configuration for container groups that defines connectivity, routing, and access control settings |
| `organization_name` | `string` | The organization name. |
| `pending_change` | `bool` | Indicates whether a configuration change has been requested but not yet applied to all containers in the group |
| `priority` | `mixed` | Specifies the priority level for container group execution, which determines resource allocation and scheduling precedence. |
| `project_name` | `string` | The project name. |
| `queue_autoscaler` | `array` | Defines configuration for automatically scaling container instances based on queue length. |
| `queue_connection` | `array` | Configuration for connecting a container group to a message queue system, enabling asynchronous communication between services. |
| `readiness_probe` | `mixed` | Defines how to check if a container is ready to serve traffic. |
| `readme` | `string` |  |
| `replicas` | `int` | The container group replicas. |
| `restart_policy` | `string` | Specifies the policy for restarting containers when they exit or fail. |
| `scalingactions` | `array` | List of scaling actions configurations |
| `scheduledscalingenabled` | `bool` | Indicates if scheduled scaling is enabled |
| `startup_probe` | `mixed` | Defines a probe that checks if a container application has started successfully. |
| `update_time` | `string` | ISO 8601 timestamp when this container group was last updated |
| `version` | `int` | Incremental version number that increases with each configuration change to the container group |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Container record (throws on error).
$container = $client->Container()->load(["id" => "container_id", "organization_name" => "organization_name", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of Container records (throws on error).
$containers = $client->Container()->list();
```

#### Example: Create

```php
$container = $client->Container()->create([
    "organization_name" => null, // string
    "project_name" => null, // string
    "autostart_policy" => null, // bool
    "container" => null, // array
    "country_codes" => null, // array
    "create_time" => null, // string
    "current_state" => null, // array
    "display_name" => null, // string
    "id" => null, // string
    "liveness_probe" => null, // mixed
    "name" => null, // string
    "networking" => null, // array
    "pending_change" => null, // bool
    "priority" => null, // mixed
    "queue_autoscaler" => null, // array
    "queue_connection" => null, // array
    "readiness_probe" => null, // mixed
    "replicas" => null, // int
    "restart_policy" => null, // string
    "scalingactions" => null, // array
    "scheduledscalingenabled" => null, // bool
    "startup_probe" => null, // mixed
    "update_time" => null, // string
    "version" => null, // int
]);
```


### ContainerGroup

Create an instance: `$container_group = $client->ContainerGroup();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ContainerGroup record (throws on error).
$container_group = $client->ContainerGroup()->load(["container_group_instance_id" => "container_group_instance_id", "container_id" => "container_id", "organization_name" => "organization_name", "project_id" => "project_id"]);
```

#### Example: Create

```php
$container_group = $client->ContainerGroup()->create([
    "container_id" => null, // string
    "instance_id" => null, // string
    "organization_name" => null, // string
    "project_id" => null, // string
]);
```


### ContainerGroupInstance

Create an instance: `$container_group_instance = $client->ContainerGroupInstance();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cpu_percent` | `float` | The percentage of CPU used by this container group instance. |
| `cpu_usage` | `int` | The total CPU usage in seconds for this container group instance. |
| `cpu_usage_total` | `int` | The total CPU usage in seconds for this container group instance since it was started. |
| `deletion_cost` | `int` | The cost of deleting the container group instance |
| `id` | `string` | The container group instance identifier. |
| `machine_id` | `string` | The container group machine identifier. |
| `memory_usage_mb` | `float` | The memory usage in MB for this container group instance. |
| `memory_usage_percent` | `float` | The percentage of memory used by this container group instance. |
| `pulling_progress` | `float` | The progress percentage of pulling the container image. |
| `ready` | `bool` | Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function. |
| `ssh_host_key_fingerprint` | `string` | The SSH host key fingerprint of the container group instance |
| `ssh_ip` | `string` | The SSH IP address of the container group instance |
| `ssh_port` | `int` | The SSH port of the container group instance |
| `started` | `bool` | Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes. |
| `state` | `string` | The state of the container group instance |
| `update_time` | `string` | The UTC timestamp when the container group instance last changed its state. |
| `version` | `int` | The version of the container group definition currently running on this instance. |

#### Example: List

```php
// list() returns an array of ContainerGroupInstance records (throws on error).
$container_group_instances = $client->ContainerGroupInstance()->list();
```


### CpuAvailability

Create an instance: `$cpu_availability = $client->CpuAvailability();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_cpu_batch` | `int` | The number of available CPU cores |
| `country_codes` | `array` | A list of country codes where the resources are available |
| `cpu` | `int` | The number of available CPU cores |
| `memory` | `int` | The amount of available memory in MB |
| `on_call_cpu` | `int` | The amount of on-call CPU |
| `storage_amount` | `int` | The amount of available storage in bytes |

#### Example: Create

```php
$cpu_availability = $client->CpuAvailability()->create([
    "organization_name" => null, // string
]);
```


### GpuAvailability

Create an instance: `$gpu_availability = $client->GpuAvailability();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_gpu_batch` | `int` | The number of available GPU batches |
| `available_gpu_high` | `int` | The number of available high-end GPUs |
| `available_gpu_low` | `int` | The number of available low-end GPUs |
| `available_gpu_medium` | `int` | The number of available medium-end GPUs |
| `country_codes` | `array` | A list of country codes where the resources are available |
| `cpu` | `int` | The number of available CPU cores |
| `gpu_classes` | `array` | A list of available GPU class names |
| `memory` | `int` | The amount of available memory in MB |
| `on_call_gpu` | `int` | The number of on-call GPUs available |
| `storage_amount` | `int` | The amount of available storage in bytes |

#### Example: Create

```php
$gpu_availability = $client->GpuAvailability()->create([
    "organization_name" => null, // string
    "gpu_classes" => null, // array
]);
```


### GpuClass

Create an instance: `$gpu_class = $client->GpuClass();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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
| `prices` | `array` | The list of prices for each container group priority |

#### Example: List

```php
// list() returns an array of GpuClass records (throws on error).
$gpu_classs = $client->GpuClass()->list();
```


### InferenceEndpoint

Create an instance: `$inference_endpoint = $client->InferenceEndpoint();`

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

```php
// load() returns the ENTITY — call data_get() for the InferenceEndpoint record (throws on error).
$inference_endpoint = $client->InferenceEndpoint()->load(["id" => "inference_endpoint_id", "organization_name" => "organization_name"]);
```

#### Example: List

```php
// list() returns an array of InferenceEndpoint records (throws on error).
$inference_endpoints = $client->InferenceEndpoint()->list();
```


### InferenceEndpointJob

Create an instance: `$inference_endpoint_job = $client->InferenceEndpointJob();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `create_time` | `string` | The time the job was created. |
| `events` | `array` | The list of events. |
| `id` | `string` | The inference endpoint job identifier. |
| `inference_endpoint_name` | `string` | The inference endpoint name. |
| `input` | `mixed` | The job input. |
| `metadata` | `array` | The job metadata. |
| `organization_name` | `string` | The organization name. |
| `output` | `mixed` | The job output. |
| `status` | `string` | The current status. |
| `update_time` | `string` | The time the job was last updated. |
| `webhook` | `string` | The webhook URL called when the job completes. |
| `webhook_url` | `string` | The webhook URL called when the job completes. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the InferenceEndpointJob record (throws on error).
$inference_endpoint_job = $client->InferenceEndpointJob()->load(["id" => "inference_endpoint_job_id", "inference_endpoint_id" => "inference_endpoint_id", "organization_name" => "organization_name"]);
```

#### Example: Create

```php
$inference_endpoint_job = $client->InferenceEndpointJob()->create([
    "inference_endpoint_name" => null, // string
    "organization_name" => null, // string
    "create_time" => null, // string
    "events" => null, // array
    "id" => null, // string
    "input" => null, // mixed
    "status" => null, // string
    "update_time" => null, // string
]);
```


### InferenceEndpointJobCollection

Create an instance: `$inference_endpoint_job_collection = $client->InferenceEndpointJobCollection();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `create_time` | `string` | The time the job was created. |
| `events` | `array` | The list of events. |
| `id` | `string` | The inference endpoint job identifier. |
| `inference_endpoint_name` | `string` | The inference endpoint name. |
| `input` | `mixed` | The job input. |
| `metadata` | `array` | The job metadata. |
| `organization_name` | `string` | The organization name. |
| `output` | `mixed` | The job output. |
| `status` | `string` | The current status. |
| `update_time` | `string` | The time the job was last updated. |
| `webhook` | `string` | The webhook URL called when the job completes. |
| `webhook_url` | `string` | The webhook URL called when the job completes. |

#### Example: List

```php
// list() returns an array of InferenceEndpointJobCollection records (throws on error).
$inference_endpoint_job_collections = $client->InferenceEndpointJobCollection()->list();
```


### LogEntry

Create an instance: `$log_entry = $client->LogEntry();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_time` | `string` | The end time of the time range |
| `items` | `array` | A collection of log entries |
| `organization_name` | `string` | The organization name. |
| `page_max_time` | `string` | The maximum time page boundary. |
| `page_min_time` | `string` | The minimum time page boundary. |
| `page_size` | `int` | The maximum number of items per page. |
| `query` | `string` | The query string for filtering logs |
| `sort_order` | `string` | The sort order of the log entries. |
| `start_time` | `string` | The start time of the time range |

#### Example: Create

```php
$log_entry = $client->LogEntry()->create([
    "organization_name" => null, // string
    "end_time" => null, // string
    "items" => null, // array
    "page_max_time" => null, // string
    "page_min_time" => null, // string
    "query" => null, // string
    "start_time" => null, // string
]);
```


### Queue

Create an instance: `$queue = $client->Queue();`

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
| `container_groups` | `array` | The container groups that are part of this queue. |
| `create_time` | `string` | The job creation time |
| `current_queue_length` | `int` | The current length of the queue |
| `description` | `string` | The description. |
| `display_name` | `string` | The display name. |
| `events` | `array` | The job events |
| `id` | `string` | The job identifier |
| `input` | `mixed` | The job input. |
| `metadata` | `array` | Additional metadata for the job |
| `name` | `string` | The queue name. |
| `output` | `mixed` | The job output. |
| `status` | `string` | The job status |
| `update_time` | `string` | The job update time |
| `webhook` | `string` | The webhook URL to notify when the job completes |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Queue record (throws on error).
$queue = $client->Queue()->load(["id" => "queue_id", "organization_name" => "organization_name", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of Queue records (throws on error).
$queues = $client->Queue()->list();
```

#### Example: Create

```php
$queue = $client->Queue()->create([
    "organization_name" => null, // string
    "project_name" => null, // string
    "container_groups" => null, // array
    "create_time" => null, // string
    "display_name" => null, // string
    "events" => null, // array
    "id" => null, // string
    "input" => null, // mixed
    "name" => null, // string
    "status" => null, // string
    "update_time" => null, // string
]);
```


### Quota

Create an instance: `$quota = $client->Quota();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `container_replicas_quota` | `int` | The maximum number of replicas that can be created for a container group |
| `container_replicas_used` | `int` | The number of replicas that are currently in use |
| `max_container_group_reallocations_per_minute` | `int` | The maximum number of container group reallocations per minute |
| `max_container_group_recreates_per_minute` | `int` | The maximum number of container group recreates per minute |
| `max_container_group_restarts_per_minute` | `int` | The maximum number of container group restarts per minute |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Quota record (throws on error).
$quota = $client->Quota()->load(["organization_name" => "organization_name"]);
```


### SystemLog

Create an instance: `$system_log = $client->SystemLog();`

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
| `resource_cpu` | `mixed` | The number of CPUs |
| `resource_gpu_class` | `string` | The GPU class name |
| `resource_memory` | `mixed` | The memory amount in MB |
| `resource_storage_amount` | `mixed` | The storage amount in bytes |
| `version` | `string` | The version instance ID |

#### Example: List

```php
// list() returns an array of SystemLog records (throws on error).
$system_logs = $client->SystemLog()->list();
```


### WebhookSecretKey

Create an instance: `$webhook_secret_key = $client->WebhookSecretKey();`

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

```php
// load() returns the ENTITY — call data_get() for the WebhookSecretKey record (throws on error).
$webhook_secret_key = $client->WebhookSecretKey()->load(["organization_name" => "organization_name"]);
```

#### Example: Create

```php
$webhook_secret_key = $client->WebhookSecretKey()->create([
    "organization_name" => null, // string
    "secret_key" => null, // string
]);
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

Features are the extension mechanism. A feature is a PHP class
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

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── saladcloud_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`saladcloud_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$inferenceendpoint = $client->InferenceEndpoint();
$inferenceendpoint->list();

// $inferenceendpoint->data_get() now returns the inferenceendpoint data from the last list
// $inferenceendpoint->match_get() returns the last match criteria
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
