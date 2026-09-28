# SaladCloud API

The SaladCloud REST API. Please refer to the [SaladCloud API Documentation](https://docs.salad.com/api-reference) for more details.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 14 entities and 36 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Container](docs/api/container.html)

Results: Accepted; Created; OK.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `autostart_policy`: Defines whether containers in this group should automatically start when deployed (true) or require manual starting (false)
- `container`: Represents a container with its configuration and resource requirements.
- `country_codes`: List of country codes where container instances are permitted to run. When not specified or empty, containers may run in any available region.
- `create_time`: ISO 8601 timestamp when this container group was initially created
- `current_state`: Represents the operational state of a container group during its lifecycle, including timing information, status, and instance distribution metrics. This state captures the current execution status, start and finish times, and provides visibility into the operational health across instances.

### [ContainerGroup](docs/api/container_group.html)

Results: Accepted; OK.

SDK operations: `create`, `load`.

### [ContainerGroupInstance](docs/api/container_group_instance.html)

Results: OK.

SDK operations: `list`, `update`.

Key fields to recognise:

- `cpu_percent`: The percentage of CPU used by this container group instance. This is updated every minute.
- `cpu_usage`: The total CPU usage in seconds for this container group instance. This is updated every minute.
- `cpu_usage_total`: The total CPU usage in seconds for this container group instance since it was started. This is updated every minute.
- `deletion_cost`: The cost of deleting the container group instance
- `id`: The container group instance identifier.

### [CpuAvailability](docs/api/cpu_availability.html)

Results: Successfully retrieved CPU availability.

SDK operations: `create`.

Key fields to recognise:

- `available_cpu_batch`: The number of available CPU cores
- `country_codes`: A list of country codes where the resources are available
- `cpu`: The number of available CPU cores
- `memory`: The amount of available memory in MB
- `on_call_cpu`: The amount of on-call CPU

### [GpuAvailability](docs/api/gpu_availability.html)

Results: Successfully retrieved GPU availability.

SDK operations: `create`.

Key fields to recognise:

- `available_gpu_batch`: The number of available GPU batches
- `available_gpu_high`: The number of available high-end GPUs
- `available_gpu_low`: The number of available low-end GPUs
- `available_gpu_medium`: The number of available medium-end GPUs
- `country_codes`: A list of country codes where the resources are available

### [GpuClass](docs/api/gpu_class.html)

Results: OK.

SDK operations: `list`.

Key fields to recognise:

- `gpu_class_type`: The type of GPU class
- `gpu_count`: The number of GPUs in the cluster
- `id`: The unique identifier
- `is_high_demand`: Whether the GPU class is in high demand
- `max_ram`: The maximum RAM amount in MB

### [InferenceEndpoint](docs/api/inference_endpoint.html)

Results: OK; Accepted.

SDK operations: `list`, `load`, `remove`.

Key fields to recognise:

- `description`: The detailed description of the resource.
- `display_name`: The display-friendly name of the resource.
- `icon_url`: The URL of the icon image
- `id`: The inference endpoint identifier.
- `input_schema`: The input schema

### [InferenceEndpointJob](docs/api/inference_endpoint_job.html)

Results: Created; OK.

SDK operations: `create`, `load`.

Key fields to recognise:

- `create_time`: The time the job was created.
- `events`: The list of events.
- `id`: The inference endpoint job identifier.
- `inference_endpoint_name`: The inference endpoint name.
- `input`: The job input. May be any valid JSON.

### [InferenceEndpointJobCollection](docs/api/inference_endpoint_job_collection.html)

Results: OK.

SDK operations: `list`.

Key fields to recognise:

- `create_time`: The time the job was created.
- `events`: The list of events.
- `id`: The inference endpoint job identifier.
- `inference_endpoint_name`: The inference endpoint name.
- `input`: The job input. May be any valid JSON.

### [LogEntry](docs/api/log_entry.html)

Results: OK.

SDK operations: `create`.

Key fields to recognise:

- `end_time`: The end time of the time range
- `items`: A collection of log entries
- `organization_name`: The organization name.
- `page_max_time`: The maximum time page boundary. This may be used when getting paginated results.
- `page_min_time`: The minimum time page boundary. This may be used when getting paginated results.

### [Queue](docs/api/queue.html)

Results: Created; OK; Accepted.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `container_groups`: The container groups that are part of this queue. Each container group represents a scalable set of identical containers running as a distributed service.
- `create_time`: The job creation time
- `current_queue_length`: The current length of the queue
- `description`: The description. This may be used as a space for notes or other information about the queue.
- `display_name`: The display name. This may be used as a more human-readable name.

### [Quota](docs/api/quota.html)

Results: OK.

SDK operations: `load`.

Key fields to recognise:

- `container_replicas_quota`: The maximum number of replicas that can be created for a container group
- `container_replicas_used`: The number of replicas that are currently in use
- `max_container_group_reallocations_per_minute`: The maximum number of container group reallocations per minute
- `max_container_group_recreates_per_minute`: The maximum number of container group recreates per minute
- `max_container_group_restarts_per_minute`: The maximum number of container group restarts per minute

### [SystemLog](docs/api/system_log.html)

Results: OK.

SDK operations: `list`.

Key fields to recognise:

- `event_name`: The name of the event
- `event_time`: The UTC date &amp; time when the log item was created
- `instance_id`: The container group instance identifier.
- `machine_id`: The container group machine identifier.
- `resource_cpu`: The number of CPUs

### [WebhookSecretKey](docs/api/webhook_secret_key.html)

Results: OK.

SDK operations: `create`, `load`.

Key fields to recognise:

- `secret_key`: The webhook secret key

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Container](docs/api/container.html) | `create` | `POST /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/start` | Required |
| [Container](docs/api/container.html) | `create` | `POST /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/stop` | Required |
| [Container](docs/api/container.html) | `create` | `POST /organizations/{organization_name}/projects/{project_name}/containers` | Required |
| [Container](docs/api/container.html) | `list` | `GET /organizations/{organization_name}/projects/{project_name}/containers` | Required |
| [Container](docs/api/container.html) | `load` | `GET /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}` | Required |
| [Container](docs/api/container.html) | `remove` | `DELETE /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}` | Required |
| [Container](docs/api/container.html) | `update` | `PATCH /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}` | Required |
| [ContainerGroup](docs/api/container_group.html) | `create` | `POST /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/reallocate` | Required |
| [ContainerGroup](docs/api/container_group.html) | `create` | `POST /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/recreate` | Required |
| [ContainerGroup](docs/api/container_group.html) | `create` | `POST /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/restart` | Required |
| [ContainerGroup](docs/api/container_group.html) | `load` | `GET /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}` | Required |
| [ContainerGroupInstance](docs/api/container_group_instance.html) | `list` | `GET /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances` | Required |
| [ContainerGroupInstance](docs/api/container_group_instance.html) | `update` | `PATCH /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}` | Required |
| [CpuAvailability](docs/api/cpu_availability.html) | `create` | `POST /organizations/{organization_name}/availability/sce-cpu-availability` | Required |
| [GpuAvailability](docs/api/gpu_availability.html) | `create` | `POST /organizations/{organization_name}/availability/sce-gpu-availability` | Required |
| [GpuClass](docs/api/gpu_class.html) | `list` | `GET /organizations/{organization_name}/gpu-classes` | Required |
| [InferenceEndpoint](docs/api/inference_endpoint.html) | `list` | `GET /organizations/{organization_name}/inference-endpoints` | Required |
| [InferenceEndpoint](docs/api/inference_endpoint.html) | `load` | `GET /organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}` | Required |
| [InferenceEndpoint](docs/api/inference_endpoint.html) | `remove` | `DELETE /organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs/{inference_endpoint_job_id}` | Required |
| [InferenceEndpointJob](docs/api/inference_endpoint_job.html) | `create` | `POST /organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs` | Required |
| [InferenceEndpointJob](docs/api/inference_endpoint_job.html) | `load` | `GET /organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs/{inference_endpoint_job_id}` | Required |
| [InferenceEndpointJobCollection](docs/api/inference_endpoint_job_collection.html) | `list` | `GET /organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs` | Required |
| [LogEntry](docs/api/log_entry.html) | `create` | `POST /organizations/{organization_name}/log-entries` | Required |
| [Queue](docs/api/queue.html) | `create` | `POST /organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs` | Required |
| [Queue](docs/api/queue.html) | `create` | `POST /organizations/{organization_name}/projects/{project_name}/queues` | Required |
| [Queue](docs/api/queue.html) | `list` | `GET /organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs` | Required |
| [Queue](docs/api/queue.html) | `list` | `GET /organizations/{organization_name}/projects/{project_name}/queues` | Required |
| [Queue](docs/api/queue.html) | `load` | `GET /organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs/{queue_job_id}` | Required |
| [Queue](docs/api/queue.html) | `load` | `GET /organizations/{organization_name}/projects/{project_name}/queues/{queue_name}` | Required |
| [Queue](docs/api/queue.html) | `remove` | `DELETE /organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs/{queue_job_id}` | Required |
| [Queue](docs/api/queue.html) | `remove` | `DELETE /organizations/{organization_name}/projects/{project_name}/queues/{queue_name}` | Required |
| [Queue](docs/api/queue.html) | `update` | `PATCH /organizations/{organization_name}/projects/{project_name}/queues/{queue_name}` | Required |
| [Quota](docs/api/quota.html) | `load` | `GET /organizations/{organization_name}/quotas` | Required |
| [SystemLog](docs/api/system_log.html) | `list` | `GET /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/system-logs` | Required |
| [WebhookSecretKey](docs/api/webhook_secret_key.html) | `create` | `POST /organizations/{organization_name}/webhook-secret-key` | Required |
| [WebhookSecretKey](docs/api/webhook_secret_key.html) | `load` | `GET /organizations/{organization_name}/webhook-secret-key` | Required |

## Connect to the API

- API server: `https://api.salad.com/api/public`

The default credential is sent in the `Salad-Api-Key` header.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [Ruby](docs/sdks/rb.html) | `rb/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `saladcloud_list`: List records for an entity. Supported entities: `container`, `container_group_instance`, `gpu_class`, `inference_endpoint`, `inference_endpoint_job_collection`, `queue`, `system_log`.
- `saladcloud_load`: Load one record for an entity. Supported entities: `container`, `container_group`, `inference_endpoint`, `inference_endpoint_job`, `queue`, `quota`, `webhook_secret_key`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

