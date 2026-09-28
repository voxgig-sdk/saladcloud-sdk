# Saladcloud Python SDK Reference

Complete API reference for the Saladcloud Python SDK.


## SaladcloudSDK

### Constructor

```python
from saladcloud_sdk import SaladcloudSDK

client = SaladcloudSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SaladcloudSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = SaladcloudSDK.test()
```


### Instance Methods

#### `Container(data=None)`

Create a new `ContainerEntity` instance. Pass `None` for no initial data.

#### `ContainerGroup(data=None)`

Create a new `ContainerGroupEntity` instance. Pass `None` for no initial data.

#### `ContainerGroupInstance(data=None)`

Create a new `ContainerGroupInstanceEntity` instance. Pass `None` for no initial data.

#### `CpuAvailability(data=None)`

Create a new `CpuAvailabilityEntity` instance. Pass `None` for no initial data.

#### `GpuAvailability(data=None)`

Create a new `GpuAvailabilityEntity` instance. Pass `None` for no initial data.

#### `GpuClass(data=None)`

Create a new `GpuClassEntity` instance. Pass `None` for no initial data.

#### `InferenceEndpoint(data=None)`

Create a new `InferenceEndpointEntity` instance. Pass `None` for no initial data.

#### `InferenceEndpointJob(data=None)`

Create a new `InferenceEndpointJobEntity` instance. Pass `None` for no initial data.

#### `InferenceEndpointJobCollection(data=None)`

Create a new `InferenceEndpointJobCollectionEntity` instance. Pass `None` for no initial data.

#### `LogEntry(data=None)`

Create a new `LogEntryEntity` instance. Pass `None` for no initial data.

#### `Queue(data=None)`

Create a new `QueueEntity` instance. Pass `None` for no initial data.

#### `Quota(data=None)`

Create a new `QuotaEntity` instance. Pass `None` for no initial data.

#### `SystemLog(data=None)`

Create a new `SystemLogEntity` instance. Pass `None` for no initial data.

#### `WebhookSecretKey(data=None)`

Create a new `WebhookSecretKeyEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ContainerEntity

```python
container = client.Container()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autostart_policy` | `bool` | Yes | Defines whether containers in this group should automatically start when deployed (true) or require manual starting (false) |
| `container` | `dict` | Yes | Represents a container with its configuration and resource requirements. |
| `country_codes` | `list` | Yes | List of country codes where container instances are permitted to run. |
| `create_time` | `str` | Yes | ISO 8601 timestamp when this container group was initially created |
| `current_state` | `dict` | Yes | Represents the operational state of a container group during its lifecycle, including timing information, status, and instance distribution metrics. |
| `display_name` | `str` | Yes | The display-friendly name of the resource. |
| `id` | `str` | Yes | The container group identifier. |
| `liveness_probe` | `dict | None` | Yes | Defines a liveness probe for container groups that determines when to restart a container if it becomes unhealthy |
| `name` | `str` | Yes | The container group name. |
| `networking` | `dict` | Yes | Network configuration for container groups that defines connectivity, routing, and access control settings |
| `organization_name` | `str` | Yes | The organization name. |
| `pending_change` | `bool` | Yes | Indicates whether a configuration change has been requested but not yet applied to all containers in the group |
| `priority` | `str | None` | Yes | Specifies the priority level for container group execution, which determines resource allocation and scheduling precedence. |
| `project_name` | `str` | Yes | The project name. |
| `queue_autoscaler` | `dict` | Yes | Defines configuration for automatically scaling container instances based on queue length. |
| `queue_connection` | `dict` | Yes | Configuration for connecting a container group to a message queue system, enabling asynchronous communication between services. |
| `readiness_probe` | `dict | None` | Yes | Defines how to check if a container is ready to serve traffic. |
| `readme` | `str` | No |  |
| `replicas` | `int` | Yes | The container group replicas. |
| `restart_policy` | `str` | Yes | Specifies the policy for restarting containers when they exit or fail. |
| `scalingactions` | `list` | Yes | List of scaling actions configurations |
| `scheduledscalingenabled` | `bool` | Yes | Indicates if scheduled scaling is enabled |
| `startup_probe` | `dict | None` | Yes | Defines a probe that checks if a container application has started successfully. |
| `update_time` | `str` | Yes | ISO 8601 timestamp when this container group was last updated |
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Container().create({
    "organization_name": "example_organization_name",  # str
    "project_name": "example_project_name",  # str
    "autostart_policy": True,  # bool
    "container": {},  # dict
    "country_codes": [],  # list
    "create_time": "example_create_time",  # str
    "current_state": {},  # dict
    "display_name": "example_display_name",  # str
    "id": "example_id",  # str
    "liveness_probe": {},  # dict | None
    "name": "example_name",  # str
    "networking": {},  # dict
    "pending_change": True,  # bool
    "priority": "example_priority",  # str | None
    "queue_autoscaler": {},  # dict
    "queue_connection": {},  # dict
    "readiness_probe": {},  # dict | None
    "replicas": 1,  # int
    "restart_policy": "example_restart_policy",  # str
    "scalingactions": [],  # list
    "scheduledscalingenabled": True,  # bool
    "startup_probe": {},  # dict | None
    "update_time": "example_update_time",  # str
    "version": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Container().list({"organization_name": "example", "project_name": "example"})
for container in results:
    print(container)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Container().load({"id": "container_id", "organization_name": "organization_name", "project_id": "project_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Container().remove({"id": "container_id", "organization_name": "organization_name", "project_id": "project_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Container().update({
    "id": "container_id",
    "organization_name": "organization_name",
    "project_id": "project_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContainerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ContainerGroupEntity

```python
container_group = client.ContainerGroup()
```

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ContainerGroup().create({
    "container_id": "example_container_id",  # str
    "instance_id": "example_instance_id",  # str
    "organization_name": "example_organization_name",  # str
    "project_id": "example_project_id",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ContainerGroup().load({"container_group_instance_id": "container_group_instance_id", "container_id": "container_id", "organization_name": "organization_name", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContainerGroupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ContainerGroupInstanceEntity

```python
container_group_instance = client.ContainerGroupInstance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cpu_percent` | `float` | No | The percentage of CPU used by this container group instance. |
| `cpu_usage` | `int` | No | The total CPU usage in seconds for this container group instance. |
| `cpu_usage_total` | `int` | No | The total CPU usage in seconds for this container group instance since it was started. |
| `deletion_cost` | `int` | No | The cost of deleting the container group instance |
| `id` | `str` | Yes | The container group instance identifier. |
| `machine_id` | `str` | Yes | The container group machine identifier. |
| `memory_usage_mb` | `float` | No | The memory usage in MB for this container group instance. |
| `memory_usage_percent` | `float` | No | The percentage of memory used by this container group instance. |
| `pulling_progress` | `float` | No | The progress percentage of pulling the container image. |
| `ready` | `bool` | No | Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function. |
| `ssh_host_key_fingerprint` | `str` | No | The SSH host key fingerprint of the container group instance |
| `ssh_ip` | `str` | No | The SSH IP address of the container group instance |
| `ssh_port` | `int` | No | The SSH port of the container group instance |
| `started` | `bool` | No | Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes. |
| `state` | `str` | Yes | The state of the container group instance |
| `update_time` | `str` | Yes | The UTC timestamp when the container group instance last changed its state. |
| `version` | `int` | Yes | The version of the container group definition currently running on this instance. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ContainerGroupInstance().list({"container_group_name": "example", "organization_name": "example", "project_id": "example"})
for container_group_instance in results:
    print(container_group_instance)
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ContainerGroupInstance().update({
    "container_id": "container_id",
    "id": "id",
    "organization_name": "organization_name",
    "project_id": "project_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContainerGroupInstanceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CpuAvailabilityEntity

```python
cpu_availability = client.CpuAvailability()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_cpu_batch` | `int` | No | The number of available CPU cores |
| `country_codes` | `list` | No | A list of country codes where the resources are available |
| `cpu` | `int` | No | The number of available CPU cores |
| `memory` | `int` | No | The amount of available memory in MB |
| `on_call_cpu` | `int` | No | The amount of on-call CPU |
| `storage_amount` | `int` | No | The amount of available storage in bytes |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.CpuAvailability().create({
    "organization_name": "example_organization_name",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CpuAvailabilityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GpuAvailabilityEntity

```python
gpu_availability = client.GpuAvailability()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_gpu_batch` | `int` | No | The number of available GPU batches |
| `available_gpu_high` | `int` | No | The number of available high-end GPUs |
| `available_gpu_low` | `int` | No | The number of available low-end GPUs |
| `available_gpu_medium` | `int` | No | The number of available medium-end GPUs |
| `country_codes` | `list` | No | A list of country codes where the resources are available |
| `cpu` | `int` | No | The number of available CPU cores |
| `gpu_classes` | `list` | Yes | A list of available GPU class names |
| `memory` | `int` | No | The amount of available memory in MB |
| `on_call_gpu` | `int` | No | The number of on-call GPUs available |
| `storage_amount` | `int` | No | The amount of available storage in bytes |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.GpuAvailability().create({
    "organization_name": "example_organization_name",  # str
    "gpu_classes": [],  # list
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GpuAvailabilityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GpuClassEntity

```python
gpu_class = client.GpuClass()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `gpu_class_type` | `str` | No | The type of GPU class |
| `gpu_count` | `int` | No | The number of GPUs in the cluster |
| `id` | `str` | Yes | The unique identifier |
| `is_high_demand` | `bool` | No | Whether the GPU class is in high demand |
| `max_ram` | `int` | No | The maximum RAM amount in MB |
| `max_storage` | `int` | No | The maximum storage amount in bytes |
| `max_vcpu` | `int` | No | The maximum vCPU count |
| `min_ram` | `int` | No | The minimum RAM amount in MB |
| `min_storage` | `int` | No | The minimum storage amount in bytes |
| `min_vcpu` | `int` | No | The minimum vCPU count |
| `name` | `str` | Yes | The GPU class name |
| `prices` | `list` | Yes | The list of prices for each container group priority |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.GpuClass().list({"organization_name": "example"})
for gpu_class in results:
    print(gpu_class)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GpuClassEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InferenceEndpointEntity

```python
inference_endpoint = client.InferenceEndpoint()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | Yes | The detailed description of the resource. |
| `display_name` | `str` | Yes | The display-friendly name of the resource. |
| `icon_url` | `str` | Yes | The URL of the icon image |
| `id` | `str` | Yes | The inference endpoint identifier. |
| `input_schema` | `str` | Yes | The input schema |
| `name` | `str` | Yes | The inference endpoint name. |
| `organization_name` | `str` | Yes | The organization name. |
| `output_schema` | `str` | Yes | The output schema |
| `price_description` | `str` | Yes | A description of the price |
| `readme` | `str` | Yes | A markdown file containing a detailed description of the inference endpoint |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.InferenceEndpoint().list({"organization_name": "example"})
for inference_endpoint in results:
    print(inference_endpoint)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.InferenceEndpoint().load({"id": "inference_endpoint_id", "organization_name": "organization_name"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.InferenceEndpoint().remove({"inference_endpoint_id": "inference_endpoint_id", "inference_endpoint_job_id": "inference_endpoint_job_id", "organization_name": "organization_name"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InferenceEndpointEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InferenceEndpointJobEntity

```python
inference_endpoint_job = client.InferenceEndpointJob()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `create_time` | `str` | Yes | The time the job was created. |
| `events` | `list` | Yes | The list of events. |
| `id` | `str` | Yes | The inference endpoint job identifier. |
| `inference_endpoint_name` | `str` | Yes | The inference endpoint name. |
| `input` | `Any` | Yes | The job input. |
| `metadata` | `dict` | No | The job metadata. |
| `organization_name` | `str` | Yes | The organization name. |
| `output` | `Any` | No | The job output. |
| `status` | `str` | Yes | The current status. |
| `update_time` | `str` | Yes | The time the job was last updated. |
| `webhook` | `str` | No | The webhook URL called when the job completes. |
| `webhook_url` | `str` | No | The webhook URL called when the job completes. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.InferenceEndpointJob().create({
    "inference_endpoint_name": "example_inference_endpoint_name",  # str
    "organization_name": "example_organization_name",  # str
    "create_time": "example_create_time",  # str
    "events": [],  # list
    "id": "example_id",  # str
    "input": "example_input",  # Any
    "status": "example_status",  # str
    "update_time": "example_update_time",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.InferenceEndpointJob().load({"id": "inference_endpoint_job_id", "inference_endpoint_id": "inference_endpoint_id", "organization_name": "organization_name"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InferenceEndpointJobEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InferenceEndpointJobCollectionEntity

```python
inference_endpoint_job_collection = client.InferenceEndpointJobCollection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `create_time` | `str` | Yes | The time the job was created. |
| `events` | `list` | Yes | The list of events. |
| `id` | `str` | Yes | The inference endpoint job identifier. |
| `inference_endpoint_name` | `str` | Yes | The inference endpoint name. |
| `input` | `Any` | Yes | The job input. |
| `metadata` | `dict` | No | The job metadata. |
| `organization_name` | `str` | Yes | The organization name. |
| `output` | `Any` | No | The job output. |
| `status` | `str` | Yes | The current status. |
| `update_time` | `str` | Yes | The time the job was last updated. |
| `webhook` | `str` | No | The webhook URL called when the job completes. |
| `webhook_url` | `str` | No | The webhook URL called when the job completes. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.InferenceEndpointJobCollection().list({"inference_endpoint_name": "example", "organization_name": "example"})
for inference_endpoint_job_collection in results:
    print(inference_endpoint_job_collection)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InferenceEndpointJobCollectionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LogEntryEntity

```python
log_entry = client.LogEntry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_time` | `str` | Yes | The end time of the time range |
| `items` | `list` | Yes | A collection of log entries |
| `organization_name` | `str` | Yes | The organization name. |
| `page_max_time` | `str` | Yes | The maximum time page boundary. |
| `page_min_time` | `str` | Yes | The minimum time page boundary. |
| `page_size` | `int` | No | The maximum number of items per page. |
| `query` | `str` | Yes | The query string for filtering logs |
| `sort_order` | `str` | No | The sort order of the log entries. |
| `start_time` | `str` | Yes | The start time of the time range |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.LogEntry().create({
    "organization_name": "example_organization_name",  # str
    "end_time": "example_end_time",  # str
    "items": [],  # list
    "page_max_time": "example_page_max_time",  # str
    "page_min_time": "example_page_min_time",  # str
    "query": "example_query",  # str
    "start_time": "example_start_time",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LogEntryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## QueueEntity

```python
queue = client.Queue()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `container_groups` | `list` | Yes | The container groups that are part of this queue. |
| `create_time` | `str` | Yes | The job creation time |
| `current_queue_length` | `int` | No | The current length of the queue |
| `description` | `str` | No | The description. |
| `display_name` | `str` | Yes | The display name. |
| `events` | `list` | Yes | The job events |
| `id` | `str` | Yes | The job identifier |
| `input` | `Any` | Yes | The job input. |
| `metadata` | `dict` | No | Additional metadata for the job |
| `name` | `str` | Yes | The queue name. |
| `output` | `Any` | No | The job output. |
| `status` | `str` | Yes | The job status |
| `update_time` | `str` | Yes | The job update time |
| `webhook` | `str` | No | The webhook URL to notify when the job completes |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Queue().create({
    "organization_name": "example_organization_name",  # str
    "project_name": "example_project_name",  # str
    "container_groups": [],  # list
    "create_time": "example_create_time",  # str
    "display_name": "example_display_name",  # str
    "events": [],  # list
    "id": "example_id",  # str
    "input": "example_input",  # Any
    "name": "example_name",  # str
    "status": "example_status",  # str
    "update_time": "example_update_time",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Queue().list({"organization_name": "example", "project_name": "example"})
for queue in results:
    print(queue)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Queue().load({"id": "queue_id", "organization_name": "organization_name", "project_id": "project_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Queue().remove({"id": "queue_id", "organization_name": "organization_name", "project_id": "project_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Queue().update({
    "id": "queue_id",
    "organization_name": "organization_name",
    "project_id": "project_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QueueEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## QuotaEntity

```python
quota = client.Quota()
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

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Quota().load({"organization_name": "organization_name"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QuotaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SystemLogEntity

```python
system_log = client.SystemLog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_name` | `str` | Yes | The name of the event |
| `event_time` | `str` | Yes | The UTC date & time when the log item was created |
| `instance_id` | `str` | No | The container group instance identifier. |
| `machine_id` | `str` | No | The container group machine identifier. |
| `resource_cpu` | `int | None` | Yes | The number of CPUs |
| `resource_gpu_class` | `str` | Yes | The GPU class name |
| `resource_memory` | `int | None` | Yes | The memory amount in MB |
| `resource_storage_amount` | `int | None` | Yes | The storage amount in bytes |
| `version` | `str` | Yes | The version instance ID |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.SystemLog().list({"container_group_name": "example", "organization_name": "example", "project_id": "example"})
for system_log in results:
    print(system_log)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SystemLogEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WebhookSecretKeyEntity

```python
webhook_secret_key = client.WebhookSecretKey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `secret_key` | `str` | Yes | The webhook secret key |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.WebhookSecretKey().create({
    "organization_name": "example_organization_name",  # str
    "secret_key": "example_secret_key",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.WebhookSecretKey().load({"organization_name": "organization_name"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebhookSecretKeyEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = SaladcloudSDK({
    "feature": {
        "debug": {"active": True},
        "idempotency": {"active": True},
        "metrics": {"active": True},
        "paging": {"active": True},
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

