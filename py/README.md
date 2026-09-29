# Saladcloud Python SDK



The Python SDK for the Saladcloud API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Container()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/saladcloud-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from saladcloud_sdk import SaladcloudSDK

client = SaladcloudSDK({
    "apikey": os.environ.get("SALADCLOUD_APIKEY"),
})
```

### 2. List container records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    containers = client.Container().list({"organization_name": "example", "project_name": "example"})
    for container in containers:
        print(container)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a containergroup

ContainerGroup is nested under container_group_instance, so provide the `container_group_instance_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    containergroup = client.ContainerGroup().load({"container_group_instance_id": "example_container_group_instance_id", "container_id": "example_container_id", "organization_name": "example_organization_name", "project_id": "example_project_id"})
    print(containergroup)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Container().create({"organization_name": "example_organization_name", "project_name": "example_project_name", "autostart_policy": True, "container": {}, "country_codes": [], "create_time": "example_create_time", "current_state": {}, "display_name": "example_display_name", "id": "example_id", "liveness_probe": {}, "name": "example_name", "networking": {}, "pending_change": True, "priority": "example_priority", "queue_autoscaler": {}, "queue_connection": {}, "readiness_probe": {}, "replicas": 1, "restart_policy": "example_restart_policy", "scalingactions": [], "scheduledscalingenabled": True, "startup_probe": {}, "update_time": "example_update_time", "version": 1})

# Update — the created record's id is a plain dict key
client.Container().update({"id": created.data_get()["id"], "organization_name": "example_organization_name", "project_id": "example_project_id"})

# Remove
client.Container().remove({"id": created.data_get()["id"], "organization_name": "example_organization_name", "project_id": "example_project_id"})
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    inferenceendpoints = client.InferenceEndpoint().list()
    print(inferenceendpoints)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = SaladcloudSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
inferenceendpoint = client.InferenceEndpoint().list()
# inferenceendpoint contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = SaladcloudSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### SaladcloudSDK

```python
from saladcloud_sdk import SaladcloudSDK

client = SaladcloudSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = SaladcloudSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### SaladcloudSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `container = client.Container()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autostart_policy` | `bool` | Defines whether containers in this group should automatically start when deployed (true) or require manual starting (false) |
| `container` | `dict` | Represents a container with its configuration and resource requirements. |
| `country_codes` | `list` | List of country codes where container instances are permitted to run. |
| `create_time` | `str` | ISO 8601 timestamp when this container group was initially created |
| `current_state` | `dict` | Represents the operational state of a container group during its lifecycle, including timing information, status, and instance distribution metrics. |
| `display_name` | `str` | The display-friendly name of the resource. |
| `id` | `str` | The container group identifier. |
| `liveness_probe` | `dict | None` | Defines a liveness probe for container groups that determines when to restart a container if it becomes unhealthy |
| `name` | `str` | The container group name. |
| `networking` | `dict` | Network configuration for container groups that defines connectivity, routing, and access control settings |
| `organization_name` | `str` | The organization name. |
| `pending_change` | `bool` | Indicates whether a configuration change has been requested but not yet applied to all containers in the group |
| `priority` | `str | None` | Specifies the priority level for container group execution, which determines resource allocation and scheduling precedence. |
| `project_name` | `str` | The project name. |
| `queue_autoscaler` | `dict` | Defines configuration for automatically scaling container instances based on queue length. |
| `queue_connection` | `dict` | Configuration for connecting a container group to a message queue system, enabling asynchronous communication between services. |
| `readiness_probe` | `dict | None` | Defines how to check if a container is ready to serve traffic. |
| `readme` | `str` |  |
| `replicas` | `int` | The container group replicas. |
| `restart_policy` | `str` | Specifies the policy for restarting containers when they exit or fail. |
| `scalingactions` | `list` | List of scaling actions configurations |
| `scheduledscalingenabled` | `bool` | Indicates if scheduled scaling is enabled |
| `startup_probe` | `dict | None` | Defines a probe that checks if a container application has started successfully. |
| `update_time` | `str` | ISO 8601 timestamp when this container group was last updated |
| `version` | `int` | Incremental version number that increases with each configuration change to the container group |

#### Example: Load

```python
container = client.Container().load({"id": "container_id", "organization_name": "organization_name", "project_id": "project_id"})
```

#### Example: List

```python
containers = client.Container().list({"organization_name": "example", "project_name": "example"})
```

#### Example: Create

```python
container = client.Container().create({
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


### ContainerGroup

Create an instance: `container_group = client.ContainerGroup()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cpu_percent` | `float` | The percentage of CPU used by this container group instance. |
| `cpu_usage` | `int` | The total CPU usage in seconds for this container group instance. |
| `cpu_usage_total` | `int` | The total CPU usage in seconds for this container group instance since it was started. |
| `deletion_cost` | `int` | The cost of deleting the container group instance |
| `id` | `str` | The container group instance identifier. |
| `machine_id` | `str` | The container group machine identifier. |
| `memory_usage_mb` | `float` | The memory usage in MB for this container group instance. |
| `memory_usage_percent` | `float` | The percentage of memory used by this container group instance. |
| `pulling_progress` | `float` | The progress percentage of pulling the container image. |
| `ready` | `bool` | Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function. |
| `ssh_host_key_fingerprint` | `str` | The SSH host key fingerprint of the container group instance |
| `ssh_ip` | `str` | The SSH IP address of the container group instance |
| `ssh_port` | `int` | The SSH port of the container group instance |
| `started` | `bool` | Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes. |
| `state` | `str` | The state of the container group instance |
| `update_time` | `str` | The UTC timestamp when the container group instance last changed its state. |
| `version` | `int` | The version of the container group definition currently running on this instance. |

#### Example: Load

```python
container_group = client.ContainerGroup().load({"container_group_instance_id": "container_group_instance_id", "container_id": "container_id", "organization_name": "organization_name", "project_id": "project_id"})
```

#### Example: Create

```python
container_group = client.ContainerGroup().create({
    "container_id": "example_container_id",  # str
    "instance_id": "example_instance_id",  # str
    "organization_name": "example_organization_name",  # str
    "project_id": "example_project_id",  # str
    "id": "example_id",  # str
    "machine_id": "example_machine_id",  # str
    "state": "example_state",  # str
    "update_time": "example_update_time",  # str
    "version": 1,  # int
})
```


### ContainerGroupInstance

Create an instance: `container_group_instance = client.ContainerGroupInstance()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cpu_percent` | `float` | The percentage of CPU used by this container group instance. |
| `cpu_usage` | `int` | The total CPU usage in seconds for this container group instance. |
| `cpu_usage_total` | `int` | The total CPU usage in seconds for this container group instance since it was started. |
| `deletion_cost` | `int` | The cost of deleting the container group instance |
| `id` | `str` | The container group instance identifier. |
| `machine_id` | `str` | The container group machine identifier. |
| `memory_usage_mb` | `float` | The memory usage in MB for this container group instance. |
| `memory_usage_percent` | `float` | The percentage of memory used by this container group instance. |
| `pulling_progress` | `float` | The progress percentage of pulling the container image. |
| `ready` | `bool` | Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function. |
| `ssh_host_key_fingerprint` | `str` | The SSH host key fingerprint of the container group instance |
| `ssh_ip` | `str` | The SSH IP address of the container group instance |
| `ssh_port` | `int` | The SSH port of the container group instance |
| `started` | `bool` | Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes. |
| `state` | `str` | The state of the container group instance |
| `update_time` | `str` | The UTC timestamp when the container group instance last changed its state. |
| `version` | `int` | The version of the container group definition currently running on this instance. |

#### Example: List

```python
container_group_instances = client.ContainerGroupInstance().list({"container_group_name": "example", "organization_name": "example", "project_id": "example"})
```


### CpuAvailability

Create an instance: `cpu_availability = client.CpuAvailability()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_cpu_batch` | `int` | The number of available CPU cores |
| `country_codes` | `list` | A list of country codes where the resources are available |
| `cpu` | `int` | The number of available CPU cores |
| `memory` | `int` | The amount of available memory in MB |
| `on_call_cpu` | `int` | The amount of on-call CPU |
| `storage_amount` | `int` | The amount of available storage in bytes |

#### Example: Create

```python
cpu_availability = client.CpuAvailability().create({
    "organization_name": "example_organization_name",  # str
})
```


### GpuAvailability

Create an instance: `gpu_availability = client.GpuAvailability()`

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
| `country_codes` | `list` | A list of country codes where the resources are available |
| `cpu` | `int` | The number of available CPU cores |
| `gpu_classes` | `list` | A list of available GPU class names |
| `memory` | `int` | The amount of available memory in MB |
| `on_call_gpu` | `int` | The number of on-call GPUs available |
| `storage_amount` | `int` | The amount of available storage in bytes |

#### Example: Create

```python
gpu_availability = client.GpuAvailability().create({
    "organization_name": "example_organization_name",  # str
    "gpu_classes": [],  # list
})
```


### GpuClass

Create an instance: `gpu_class = client.GpuClass()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `gpu_class_type` | `str` | The type of GPU class |
| `gpu_count` | `int` | The number of GPUs in the cluster |
| `id` | `str` | The unique identifier |
| `is_high_demand` | `bool` | Whether the GPU class is in high demand |
| `max_ram` | `int` | The maximum RAM amount in MB |
| `max_storage` | `int` | The maximum storage amount in bytes |
| `max_vcpu` | `int` | The maximum vCPU count |
| `min_ram` | `int` | The minimum RAM amount in MB |
| `min_storage` | `int` | The minimum storage amount in bytes |
| `min_vcpu` | `int` | The minimum vCPU count |
| `name` | `str` | The GPU class name |
| `prices` | `list` | The list of prices for each container group priority |

#### Example: List

```python
gpu_classs = client.GpuClass().list({"organization_name": "example"})
```


### InferenceEndpoint

Create an instance: `inference_endpoint = client.InferenceEndpoint()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | The detailed description of the resource. |
| `display_name` | `str` | The display-friendly name of the resource. |
| `icon_url` | `str` | The URL of the icon image |
| `id` | `str` | The inference endpoint identifier. |
| `input_schema` | `str` | The input schema |
| `name` | `str` | The inference endpoint name. |
| `organization_name` | `str` | The organization name. |
| `output_schema` | `str` | The output schema |
| `price_description` | `str` | A description of the price |
| `readme` | `str` | A markdown file containing a detailed description of the inference endpoint |

#### Example: Load

```python
inference_endpoint = client.InferenceEndpoint().load({"id": "inference_endpoint_id", "organization_name": "organization_name"})
```

#### Example: List

```python
inference_endpoints = client.InferenceEndpoint().list({"organization_name": "example"})
```


### InferenceEndpointJob

Create an instance: `inference_endpoint_job = client.InferenceEndpointJob()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `create_time` | `str` | The time the job was created. |
| `events` | `list` | The list of events. |
| `id` | `str` | The inference endpoint job identifier. |
| `inference_endpoint_name` | `str` | The inference endpoint name. |
| `input` | `Any` | The job input. |
| `metadata` | `dict` | The job metadata. |
| `organization_name` | `str` | The organization name. |
| `output` | `Any` | The job output. |
| `status` | `str` | The current status. |
| `update_time` | `str` | The time the job was last updated. |
| `webhook` | `str` | The webhook URL called when the job completes. |
| `webhook_url` | `str` | The webhook URL called when the job completes. |

#### Example: Load

```python
inference_endpoint_job = client.InferenceEndpointJob().load({"id": "inference_endpoint_job_id", "inference_endpoint_id": "inference_endpoint_id", "organization_name": "organization_name"})
```

#### Example: Create

```python
inference_endpoint_job = client.InferenceEndpointJob().create({
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


### InferenceEndpointJobCollection

Create an instance: `inference_endpoint_job_collection = client.InferenceEndpointJobCollection()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `create_time` | `str` | The time the job was created. |
| `events` | `list` | The list of events. |
| `id` | `str` | The inference endpoint job identifier. |
| `inference_endpoint_name` | `str` | The inference endpoint name. |
| `input` | `Any` | The job input. |
| `metadata` | `dict` | The job metadata. |
| `organization_name` | `str` | The organization name. |
| `output` | `Any` | The job output. |
| `status` | `str` | The current status. |
| `update_time` | `str` | The time the job was last updated. |
| `webhook` | `str` | The webhook URL called when the job completes. |
| `webhook_url` | `str` | The webhook URL called when the job completes. |

#### Example: List

```python
inference_endpoint_job_collections = client.InferenceEndpointJobCollection().list({"inference_endpoint_name": "example", "organization_name": "example"})
```


### LogEntry

Create an instance: `log_entry = client.LogEntry()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_time` | `str` | The end time of the time range |
| `items` | `list` | A collection of log entries |
| `organization_name` | `str` | The organization name. |
| `page_max_time` | `str` | The maximum time page boundary. |
| `page_min_time` | `str` | The minimum time page boundary. |
| `page_size` | `int` | The maximum number of items per page. |
| `query` | `str` | The query string for filtering logs |
| `sort_order` | `str` | The sort order of the log entries. |
| `start_time` | `str` | The start time of the time range |

#### Example: Create

```python
log_entry = client.LogEntry().create({
    "organization_name": "example_organization_name",  # str
    "end_time": "example_end_time",  # str
    "items": [],  # list
    "page_max_time": "example_page_max_time",  # str
    "page_min_time": "example_page_min_time",  # str
    "query": "example_query",  # str
    "start_time": "example_start_time",  # str
})
```


### Queue

Create an instance: `queue = client.Queue()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `container_groups` | `list` | The container groups that are part of this queue. |
| `create_time` | `str` | The job creation time |
| `current_queue_length` | `int` | The current length of the queue |
| `description` | `str` | The description. |
| `display_name` | `str` | The display name. |
| `events` | `list` | The job events |
| `id` | `str` | The job identifier |
| `input` | `Any` | The job input. |
| `metadata` | `dict` | Additional metadata for the job |
| `name` | `str` | The queue name. |
| `output` | `Any` | The job output. |
| `status` | `str` | The job status |
| `update_time` | `str` | The job update time |
| `webhook` | `str` | The webhook URL to notify when the job completes |

#### Example: Load

```python
queue = client.Queue().load({"id": "queue_id", "organization_name": "organization_name", "project_id": "project_id"})
```

#### Example: List

```python
queues = client.Queue().list({"organization_name": "example", "project_name": "example"})
```

#### Example: Create

```python
queue = client.Queue().create({
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


### Quota

Create an instance: `quota = client.Quota()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `container_groups_quotas` | `dict` | Represents the organization quotas for container groups |
| `create_time` | `str` | The time the resource was created |
| `update_time` | `str` | The time the resource was last updated |

#### Example: Load

```python
quota = client.Quota().load({"organization_name": "organization_name"})
```


### SystemLog

Create an instance: `system_log = client.SystemLog()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event_name` | `str` | The name of the event |
| `event_time` | `str` | The UTC date & time when the log item was created |
| `instance_id` | `str` | The container group instance identifier. |
| `machine_id` | `str` | The container group machine identifier. |
| `resource_cpu` | `int | None` | The number of CPUs |
| `resource_gpu_class` | `str` | The GPU class name |
| `resource_memory` | `int | None` | The memory amount in MB |
| `resource_storage_amount` | `int | None` | The storage amount in bytes |
| `version` | `str` | The version instance ID |

#### Example: List

```python
system_logs = client.SystemLog().list({"container_group_name": "example", "organization_name": "example", "project_id": "example"})
```


### WebhookSecretKey

Create an instance: `webhook_secret_key = client.WebhookSecretKey()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `secret_key` | `str` | The webhook secret key |

#### Example: Load

```python
webhook_secret_key = client.WebhookSecretKey().load({"organization_name": "organization_name"})
```

#### Example: Create

```python
webhook_secret_key = client.WebhookSecretKey().create({
    "organization_name": "example_organization_name",  # str
    "secret_key": "example_secret_key",  # str
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

Features are the extension mechanism. A feature is a Python class
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

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── saladcloud_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`saladcloud_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
inferenceendpoint = client.InferenceEndpoint()
inferenceendpoint.list()

# inferenceendpoint.data_get() now returns the inferenceendpoint data from the last list
# inferenceendpoint.match_get() returns the last match criteria
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
