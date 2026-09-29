# Saladcloud PHP SDK Reference

Complete API reference for the Saladcloud PHP SDK.


## SaladcloudSDK

### Constructor

```php
require_once __DIR__ . '/saladcloud_sdk.php';

$client = new SaladcloudSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SaladcloudSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = SaladcloudSDK::test();
```


### Instance Methods

#### `Container($data = null)`

Create a new `ContainerEntity` instance. Pass `null` for no initial data.

#### `ContainerGroup($data = null)`

Create a new `ContainerGroupEntity` instance. Pass `null` for no initial data.

#### `ContainerGroupInstance($data = null)`

Create a new `ContainerGroupInstanceEntity` instance. Pass `null` for no initial data.

#### `CpuAvailability($data = null)`

Create a new `CpuAvailabilityEntity` instance. Pass `null` for no initial data.

#### `GpuAvailability($data = null)`

Create a new `GpuAvailabilityEntity` instance. Pass `null` for no initial data.

#### `GpuClass($data = null)`

Create a new `GpuClassEntity` instance. Pass `null` for no initial data.

#### `InferenceEndpoint($data = null)`

Create a new `InferenceEndpointEntity` instance. Pass `null` for no initial data.

#### `InferenceEndpointJob($data = null)`

Create a new `InferenceEndpointJobEntity` instance. Pass `null` for no initial data.

#### `InferenceEndpointJobCollection($data = null)`

Create a new `InferenceEndpointJobCollectionEntity` instance. Pass `null` for no initial data.

#### `LogEntry($data = null)`

Create a new `LogEntryEntity` instance. Pass `null` for no initial data.

#### `Queue($data = null)`

Create a new `QueueEntity` instance. Pass `null` for no initial data.

#### `Quota($data = null)`

Create a new `QuotaEntity` instance. Pass `null` for no initial data.

#### `SystemLog($data = null)`

Create a new `SystemLogEntity` instance. Pass `null` for no initial data.

#### `WebhookSecretKey($data = null)`

Create a new `WebhookSecretKeyEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): SaladcloudUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ContainerEntity

```php
$container = $client->Container();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autostart_policy` | `bool` | Yes | Defines whether containers in this group should automatically start when deployed (true) or require manual starting (false) |
| `container` | `array` | Yes | Represents a container with its configuration and resource requirements. |
| `country_codes` | `array` | Yes | List of country codes where container instances are permitted to run. |
| `create_time` | `string` | Yes | ISO 8601 timestamp when this container group was initially created |
| `current_state` | `array` | Yes | Represents the operational state of a container group during its lifecycle, including timing information, status, and instance distribution metrics. |
| `display_name` | `string` | Yes | The display-friendly name of the resource. |
| `id` | `string` | Yes | The container group identifier. |
| `liveness_probe` | `mixed` | Yes | Defines a liveness probe for container groups that determines when to restart a container if it becomes unhealthy |
| `name` | `string` | Yes | The container group name. |
| `networking` | `array` | Yes | Network configuration for container groups that defines connectivity, routing, and access control settings |
| `organization_name` | `string` | Yes | The organization name. |
| `pending_change` | `bool` | Yes | Indicates whether a configuration change has been requested but not yet applied to all containers in the group |
| `priority` | `mixed` | Yes | Specifies the priority level for container group execution, which determines resource allocation and scheduling precedence. |
| `project_name` | `string` | Yes | The project name. |
| `queue_autoscaler` | `array` | Yes | Defines configuration for automatically scaling container instances based on queue length. |
| `queue_connection` | `array` | Yes | Configuration for connecting a container group to a message queue system, enabling asynchronous communication between services. |
| `readiness_probe` | `mixed` | Yes | Defines how to check if a container is ready to serve traffic. |
| `readme` | `string` | No |  |
| `replicas` | `int` | Yes | The container group replicas. |
| `restart_policy` | `string` | Yes | Specifies the policy for restarting containers when they exit or fail. |
| `scalingactions` | `array` | Yes | List of scaling actions configurations |
| `scheduledscalingenabled` | `bool` | Yes | Indicates if scheduled scaling is enabled |
| `startup_probe` | `mixed` | Yes | Defines a probe that checks if a container application has started successfully. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Container()->create([
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Container()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Container()->load(["id" => "container_id", "organization_name" => "organization_name", "project_id" => "project_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Container()->remove(["id" => "container_id", "organization_name" => "organization_name", "project_id" => "project_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Container()->update([
  "id" => "container_id",
  "organization_name" => "organization_name",
  "project_id" => "project_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ContainerEntity`

Create a new `ContainerEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ContainerGroupEntity

```php
$container_group = $client->ContainerGroup();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cpu_percent` | `float` | No | The percentage of CPU used by this container group instance. |
| `cpu_usage` | `int` | No | The total CPU usage in seconds for this container group instance. |
| `cpu_usage_total` | `int` | No | The total CPU usage in seconds for this container group instance since it was started. |
| `deletion_cost` | `int` | No | The cost of deleting the container group instance |
| `id` | `string` | Yes | The container group instance identifier. |
| `machine_id` | `string` | Yes | The container group machine identifier. |
| `memory_usage_mb` | `float` | No | The memory usage in MB for this container group instance. |
| `memory_usage_percent` | `float` | No | The percentage of memory used by this container group instance. |
| `pulling_progress` | `float` | No | The progress percentage of pulling the container image. |
| `ready` | `bool` | No | Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function. |
| `ssh_host_key_fingerprint` | `string` | No | The SSH host key fingerprint of the container group instance |
| `ssh_ip` | `string` | No | The SSH IP address of the container group instance |
| `ssh_port` | `int` | No | The SSH port of the container group instance |
| `started` | `bool` | No | Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes. |
| `state` | `string` | Yes | The state of the container group instance |
| `update_time` | `string` | Yes | The UTC timestamp when the container group instance last changed its state. |
| `version` | `int` | Yes | The version of the container group definition currently running on this instance. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->ContainerGroup()->create([
  "container_id" => null, // string
  "instance_id" => null, // string
  "organization_name" => null, // string
  "project_id" => null, // string
  "id" => null, // string
  "machine_id" => null, // string
  "state" => null, // string
  "update_time" => null, // string
  "version" => null, // int
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ContainerGroup()->load(["container_group_instance_id" => "container_group_instance_id", "container_id" => "container_id", "organization_name" => "organization_name", "project_id" => "project_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ContainerGroupEntity`

Create a new `ContainerGroupEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ContainerGroupInstanceEntity

```php
$container_group_instance = $client->ContainerGroupInstance();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cpu_percent` | `float` | No | The percentage of CPU used by this container group instance. |
| `cpu_usage` | `int` | No | The total CPU usage in seconds for this container group instance. |
| `cpu_usage_total` | `int` | No | The total CPU usage in seconds for this container group instance since it was started. |
| `deletion_cost` | `int` | No | The cost of deleting the container group instance |
| `id` | `string` | Yes | The container group instance identifier. |
| `machine_id` | `string` | Yes | The container group machine identifier. |
| `memory_usage_mb` | `float` | No | The memory usage in MB for this container group instance. |
| `memory_usage_percent` | `float` | No | The percentage of memory used by this container group instance. |
| `pulling_progress` | `float` | No | The progress percentage of pulling the container image. |
| `ready` | `bool` | No | Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function. |
| `ssh_host_key_fingerprint` | `string` | No | The SSH host key fingerprint of the container group instance |
| `ssh_ip` | `string` | No | The SSH IP address of the container group instance |
| `ssh_port` | `int` | No | The SSH port of the container group instance |
| `started` | `bool` | No | Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes. |
| `state` | `string` | Yes | The state of the container group instance |
| `update_time` | `string` | Yes | The UTC timestamp when the container group instance last changed its state. |
| `version` | `int` | Yes | The version of the container group definition currently running on this instance. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ContainerGroupInstance()->list();
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->ContainerGroupInstance()->update([
  "container_id" => "container_id",
  "id" => "id",
  "organization_name" => "organization_name",
  "project_id" => "project_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ContainerGroupInstanceEntity`

Create a new `ContainerGroupInstanceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CpuAvailabilityEntity

```php
$cpu_availability = $client->CpuAvailability();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_cpu_batch` | `int` | No | The number of available CPU cores |
| `country_codes` | `array` | No | A list of country codes where the resources are available |
| `cpu` | `int` | No | The number of available CPU cores |
| `memory` | `int` | No | The amount of available memory in MB |
| `on_call_cpu` | `int` | No | The amount of on-call CPU |
| `storage_amount` | `int` | No | The amount of available storage in bytes |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->CpuAvailability()->create([
  "organization_name" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CpuAvailabilityEntity`

Create a new `CpuAvailabilityEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GpuAvailabilityEntity

```php
$gpu_availability = $client->GpuAvailability();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_gpu_batch` | `int` | No | The number of available GPU batches |
| `available_gpu_high` | `int` | No | The number of available high-end GPUs |
| `available_gpu_low` | `int` | No | The number of available low-end GPUs |
| `available_gpu_medium` | `int` | No | The number of available medium-end GPUs |
| `country_codes` | `array` | No | A list of country codes where the resources are available |
| `cpu` | `int` | No | The number of available CPU cores |
| `gpu_classes` | `array` | Yes | A list of available GPU class names |
| `memory` | `int` | No | The amount of available memory in MB |
| `on_call_gpu` | `int` | No | The number of on-call GPUs available |
| `storage_amount` | `int` | No | The amount of available storage in bytes |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->GpuAvailability()->create([
  "organization_name" => null, // string
  "gpu_classes" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GpuAvailabilityEntity`

Create a new `GpuAvailabilityEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GpuClassEntity

```php
$gpu_class = $client->GpuClass();
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
| `prices` | `array` | Yes | The list of prices for each container group priority |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->GpuClass()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GpuClassEntity`

Create a new `GpuClassEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InferenceEndpointEntity

```php
$inference_endpoint = $client->InferenceEndpoint();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->InferenceEndpoint()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->InferenceEndpoint()->load(["id" => "inference_endpoint_id", "organization_name" => "organization_name"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->InferenceEndpoint()->remove(["inference_endpoint_id" => "inference_endpoint_id", "inference_endpoint_job_id" => "inference_endpoint_job_id", "organization_name" => "organization_name"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InferenceEndpointEntity`

Create a new `InferenceEndpointEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InferenceEndpointJobEntity

```php
$inference_endpoint_job = $client->InferenceEndpointJob();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `create_time` | `string` | Yes | The time the job was created. |
| `events` | `array` | Yes | The list of events. |
| `id` | `string` | Yes | The inference endpoint job identifier. |
| `inference_endpoint_name` | `string` | Yes | The inference endpoint name. |
| `input` | `mixed` | Yes | The job input. |
| `metadata` | `array` | No | The job metadata. |
| `organization_name` | `string` | Yes | The organization name. |
| `output` | `mixed` | No | The job output. |
| `status` | `string` | Yes | The current status. |
| `update_time` | `string` | Yes | The time the job was last updated. |
| `webhook` | `string` | No | The webhook URL called when the job completes. |
| `webhook_url` | `string` | No | The webhook URL called when the job completes. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->InferenceEndpointJob()->create([
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->InferenceEndpointJob()->load(["id" => "inference_endpoint_job_id", "inference_endpoint_id" => "inference_endpoint_id", "organization_name" => "organization_name"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InferenceEndpointJobEntity`

Create a new `InferenceEndpointJobEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InferenceEndpointJobCollectionEntity

```php
$inference_endpoint_job_collection = $client->InferenceEndpointJobCollection();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `create_time` | `string` | Yes | The time the job was created. |
| `events` | `array` | Yes | The list of events. |
| `id` | `string` | Yes | The inference endpoint job identifier. |
| `inference_endpoint_name` | `string` | Yes | The inference endpoint name. |
| `input` | `mixed` | Yes | The job input. |
| `metadata` | `array` | No | The job metadata. |
| `organization_name` | `string` | Yes | The organization name. |
| `output` | `mixed` | No | The job output. |
| `status` | `string` | Yes | The current status. |
| `update_time` | `string` | Yes | The time the job was last updated. |
| `webhook` | `string` | No | The webhook URL called when the job completes. |
| `webhook_url` | `string` | No | The webhook URL called when the job completes. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->InferenceEndpointJobCollection()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InferenceEndpointJobCollectionEntity`

Create a new `InferenceEndpointJobCollectionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LogEntryEntity

```php
$log_entry = $client->LogEntry();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_time` | `string` | Yes | The end time of the time range |
| `items` | `array` | Yes | A collection of log entries |
| `organization_name` | `string` | Yes | The organization name. |
| `page_max_time` | `string` | Yes | The maximum time page boundary. |
| `page_min_time` | `string` | Yes | The minimum time page boundary. |
| `page_size` | `int` | No | The maximum number of items per page. |
| `query` | `string` | Yes | The query string for filtering logs |
| `sort_order` | `string` | No | The sort order of the log entries. |
| `start_time` | `string` | Yes | The start time of the time range |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->LogEntry()->create([
  "organization_name" => null, // string
  "end_time" => null, // string
  "items" => null, // array
  "page_max_time" => null, // string
  "page_min_time" => null, // string
  "query" => null, // string
  "start_time" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LogEntryEntity`

Create a new `LogEntryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## QueueEntity

```php
$queue = $client->Queue();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `container_groups` | `array` | Yes | The container groups that are part of this queue. |
| `create_time` | `string` | Yes | The job creation time |
| `current_queue_length` | `int` | No | The current length of the queue |
| `description` | `string` | No | The description. |
| `display_name` | `string` | Yes | The display name. |
| `events` | `array` | Yes | The job events |
| `id` | `string` | Yes | The job identifier |
| `input` | `mixed` | Yes | The job input. |
| `metadata` | `array` | No | Additional metadata for the job |
| `name` | `string` | Yes | The queue name. |
| `output` | `mixed` | No | The job output. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Queue()->create([
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Queue()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Queue()->load(["id" => "queue_id", "organization_name" => "organization_name", "project_id" => "project_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Queue()->remove(["id" => "queue_id", "organization_name" => "organization_name", "project_id" => "project_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Queue()->update([
  "id" => "queue_id",
  "organization_name" => "organization_name",
  "project_id" => "project_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): QueueEntity`

Create a new `QueueEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## QuotaEntity

```php
$quota = $client->Quota();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `container_groups_quotas` | `array` | Yes | Represents the organization quotas for container groups |
| `create_time` | `string` | No | The time the resource was created |
| `update_time` | `string` | No | The time the resource was last updated |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Quota()->load(["organization_name" => "organization_name"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): QuotaEntity`

Create a new `QuotaEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SystemLogEntity

```php
$system_log = $client->SystemLog();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_name` | `string` | Yes | The name of the event |
| `event_time` | `string` | Yes | The UTC date & time when the log item was created |
| `instance_id` | `string` | No | The container group instance identifier. |
| `machine_id` | `string` | No | The container group machine identifier. |
| `resource_cpu` | `mixed` | Yes | The number of CPUs |
| `resource_gpu_class` | `string` | Yes | The GPU class name |
| `resource_memory` | `mixed` | Yes | The memory amount in MB |
| `resource_storage_amount` | `mixed` | Yes | The storage amount in bytes |
| `version` | `string` | Yes | The version instance ID |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->SystemLog()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SystemLogEntity`

Create a new `SystemLogEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WebhookSecretKeyEntity

```php
$webhook_secret_key = $client->WebhookSecretKey();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `secret_key` | `string` | Yes | The webhook secret key |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->WebhookSecretKey()->create([
  "organization_name" => null, // string
  "secret_key" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->WebhookSecretKey()->load(["organization_name" => "organization_name"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WebhookSecretKeyEntity`

Create a new `WebhookSecretKeyEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new SaladcloudSDK([
  "feature" => [
    "debug" => ["active" => true],
    "idempotency" => ["active" => true],
    "metrics" => ["active" => true],
    "paging" => ["active" => true],
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

