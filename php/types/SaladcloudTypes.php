<?php
declare(strict_types=1);

// Typed models for the Saladcloud SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Container entity data model. */
class Container
{
    public bool $autostart_policy;
    public array $container;
    public array $country_codes;
    public string $create_time;
    public array $current_state;
    public string $display_name;
    public string $id;
    public mixed $liveness_probe;
    public string $name;
    public array $networking;
    public string $organization_name;
    public bool $pending_change;
    public mixed $priority;
    public string $project_name;
    public array $queue_autoscaler;
    public array $queue_connection;
    public mixed $readiness_probe;
    public ?string $readme = null;
    public int $replicas;
    public string $restart_policy;
    public array $scalingactions;
    public bool $scheduledscalingenabled;
    public mixed $startup_probe;
    public string $update_time;
    public int $version;
}

/** Request payload for Container#load. */
class ContainerLoadMatch
{
    public string $id;
    public string $organization_name;
    public string $project_id;
}

/** Request payload for Container#list. */
class ContainerListMatch
{
    public string $organization_name;
    public string $project_name;
}

/** Request payload for Container#create. */
class ContainerCreateData
{
    public string $organization_name;
    public string $project_name;
    public bool $autostart_policy;
    public array $container;
    public array $country_codes;
    public string $create_time;
    public array $current_state;
    public string $display_name;
    public string $id;
    public mixed $liveness_probe;
    public string $name;
    public array $networking;
    public bool $pending_change;
    public mixed $priority;
    public array $queue_autoscaler;
    public array $queue_connection;
    public mixed $readiness_probe;
    public ?string $readme = null;
    public int $replicas;
    public string $restart_policy;
    public array $scalingactions;
    public bool $scheduledscalingenabled;
    public mixed $startup_probe;
    public string $update_time;
    public int $version;
}

/** Request payload for Container#update. */
class ContainerUpdateData
{
    public string $id;
    public string $organization_name;
    public string $project_id;
    public ?bool $autostart_policy = null;
    public ?array $container = null;
    public ?array $country_codes = null;
    public ?string $create_time = null;
    public ?array $current_state = null;
    public ?string $display_name = null;
    public mixed $liveness_probe = null;
    public ?string $name = null;
    public ?array $networking = null;
    public ?bool $pending_change = null;
    public mixed $priority = null;
    public ?string $project_name = null;
    public ?array $queue_autoscaler = null;
    public ?array $queue_connection = null;
    public mixed $readiness_probe = null;
    public ?string $readme = null;
    public ?int $replicas = null;
    public ?string $restart_policy = null;
    public ?array $scalingactions = null;
    public ?bool $scheduledscalingenabled = null;
    public mixed $startup_probe = null;
    public ?string $update_time = null;
    public ?int $version = null;
}

/** Request payload for Container#remove. */
class ContainerRemoveMatch
{
    public string $id;
    public string $organization_name;
    public string $project_id;
}

/** ContainerGroup entity data model. */
class ContainerGroup
{
}

/** Request payload for ContainerGroup#load. */
class ContainerGroupLoadMatch
{
    public string $container_group_instance_id;
    public string $container_id;
    public string $organization_name;
    public string $project_id;
}

/** Request payload for ContainerGroup#create. */
class ContainerGroupCreateData
{
    public string $container_id;
    public string $instance_id;
    public string $organization_name;
    public string $project_id;
}

/** ContainerGroupInstance entity data model. */
class ContainerGroupInstance
{
    public ?float $cpu_percent = null;
    public ?int $cpu_usage = null;
    public ?int $cpu_usage_total = null;
    public ?int $deletion_cost = null;
    public string $id;
    public string $machine_id;
    public ?float $memory_usage_mb = null;
    public ?float $memory_usage_percent = null;
    public ?float $pulling_progress = null;
    public ?bool $ready = null;
    public ?string $ssh_host_key_fingerprint = null;
    public ?string $ssh_ip = null;
    public ?int $ssh_port = null;
    public ?bool $started = null;
    public string $state;
    public string $update_time;
    public int $version;
}

/** Request payload for ContainerGroupInstance#list. */
class ContainerGroupInstanceListMatch
{
    public string $container_group_name;
    public string $organization_name;
    public string $project_id;
}

/** Request payload for ContainerGroupInstance#update. */
class ContainerGroupInstanceUpdateData
{
    public string $container_id;
    public string $id;
    public string $organization_name;
    public string $project_id;
    public ?float $cpu_percent = null;
    public ?int $cpu_usage = null;
    public ?int $cpu_usage_total = null;
    public ?int $deletion_cost = null;
    public ?string $machine_id = null;
    public ?float $memory_usage_mb = null;
    public ?float $memory_usage_percent = null;
    public ?float $pulling_progress = null;
    public ?bool $ready = null;
    public ?string $ssh_host_key_fingerprint = null;
    public ?string $ssh_ip = null;
    public ?int $ssh_port = null;
    public ?bool $started = null;
    public ?string $state = null;
    public ?string $update_time = null;
    public ?int $version = null;
}

/** CpuAvailability entity data model. */
class CpuAvailability
{
    public ?int $available_cpu_batch = null;
    public ?array $country_codes = null;
    public ?int $cpu = null;
    public ?int $memory = null;
    public ?int $on_call_cpu = null;
    public ?int $storage_amount = null;
}

/** Request payload for CpuAvailability#create. */
class CpuAvailabilityCreateData
{
    public string $organization_name;
    public ?int $available_cpu_batch = null;
    public ?array $country_codes = null;
    public ?int $cpu = null;
    public ?int $memory = null;
    public ?int $on_call_cpu = null;
    public ?int $storage_amount = null;
}

/** GpuAvailability entity data model. */
class GpuAvailability
{
    public ?int $available_gpu_batch = null;
    public ?int $available_gpu_high = null;
    public ?int $available_gpu_low = null;
    public ?int $available_gpu_medium = null;
    public ?array $country_codes = null;
    public ?int $cpu = null;
    public array $gpu_classes;
    public ?int $memory = null;
    public ?int $on_call_gpu = null;
    public ?int $storage_amount = null;
}

/** Request payload for GpuAvailability#create. */
class GpuAvailabilityCreateData
{
    public string $organization_name;
    public ?int $available_gpu_batch = null;
    public ?int $available_gpu_high = null;
    public ?int $available_gpu_low = null;
    public ?int $available_gpu_medium = null;
    public ?array $country_codes = null;
    public ?int $cpu = null;
    public array $gpu_classes;
    public ?int $memory = null;
    public ?int $on_call_gpu = null;
    public ?int $storage_amount = null;
}

/** GpuClass entity data model. */
class GpuClass
{
    public ?string $gpu_class_type = null;
    public ?int $gpu_count = null;
    public string $id;
    public ?bool $is_high_demand = null;
    public ?int $max_ram = null;
    public ?int $max_storage = null;
    public ?int $max_vcpu = null;
    public ?int $min_ram = null;
    public ?int $min_storage = null;
    public ?int $min_vcpu = null;
    public string $name;
    public array $prices;
}

/** Request payload for GpuClass#list. */
class GpuClassListMatch
{
    public string $organization_name;
}

/** InferenceEndpoint entity data model. */
class InferenceEndpoint
{
    public string $description;
    public string $display_name;
    public string $icon_url;
    public string $id;
    public string $input_schema;
    public string $name;
    public string $organization_name;
    public string $output_schema;
    public string $price_description;
    public string $readme;
}

/** Request payload for InferenceEndpoint#load. */
class InferenceEndpointLoadMatch
{
    public string $id;
    public string $organization_name;
}

/** Request payload for InferenceEndpoint#list. */
class InferenceEndpointListMatch
{
    public string $organization_name;
    public ?int $page = null;
    public ?int $page_size = null;
}

/** Request payload for InferenceEndpoint#remove. */
class InferenceEndpointRemoveMatch
{
    public string $inference_endpoint_id;
    public string $inference_endpoint_job_id;
    public string $organization_name;
}

/** InferenceEndpointJob entity data model. */
class InferenceEndpointJob
{
    public string $create_time;
    public array $events;
    public string $id;
    public string $inference_endpoint_name;
    public mixed $input;
    public ?array $metadata = null;
    public string $organization_name;
    public mixed $output = null;
    public string $status;
    public string $update_time;
    public ?string $webhook = null;
    public ?string $webhook_url = null;
}

/** Request payload for InferenceEndpointJob#load. */
class InferenceEndpointJobLoadMatch
{
    public string $id;
    public string $inference_endpoint_id;
    public string $organization_name;
}

/** Request payload for InferenceEndpointJob#create. */
class InferenceEndpointJobCreateData
{
    public string $inference_endpoint_name;
    public string $organization_name;
    public string $create_time;
    public array $events;
    public string $id;
    public mixed $input;
    public ?array $metadata = null;
    public mixed $output = null;
    public string $status;
    public string $update_time;
    public ?string $webhook = null;
    public ?string $webhook_url = null;
}

/** InferenceEndpointJobCollection entity data model. */
class InferenceEndpointJobCollection
{
    public string $create_time;
    public array $events;
    public string $id;
    public string $inference_endpoint_name;
    public mixed $input;
    public ?array $metadata = null;
    public string $organization_name;
    public mixed $output = null;
    public string $status;
    public string $update_time;
    public ?string $webhook = null;
    public ?string $webhook_url = null;
}

/** Request payload for InferenceEndpointJobCollection#list. */
class InferenceEndpointJobCollectionListMatch
{
    public string $inference_endpoint_name;
    public string $organization_name;
    public ?int $page = null;
    public ?int $page_size = null;
}

/** LogEntry entity data model. */
class LogEntry
{
    public string $end_time;
    public array $items;
    public string $organization_name;
    public string $page_max_time;
    public string $page_min_time;
    public ?int $page_size = null;
    public string $query;
    public ?string $sort_order = null;
    public string $start_time;
}

/** Request payload for LogEntry#create. */
class LogEntryCreateData
{
    public string $organization_name;
    public string $end_time;
    public array $items;
    public string $page_max_time;
    public string $page_min_time;
    public ?int $page_size = null;
    public string $query;
    public ?string $sort_order = null;
    public string $start_time;
}

/** Queue entity data model. */
class Queue
{
    public array $container_groups;
    public string $create_time;
    public ?int $current_queue_length = null;
    public ?string $description = null;
    public string $display_name;
    public array $events;
    public string $id;
    public mixed $input;
    public ?array $metadata = null;
    public string $name;
    public mixed $output = null;
    public string $status;
    public string $update_time;
    public ?string $webhook = null;
}

/** Request payload for Queue#load. */
class QueueLoadMatch
{
    public string $organization_name;
    public string $project_id;
    public ?string $queue_id = null;
    public ?string $queue_job_id = null;
    public ?string $id = null;
}

/** Request payload for Queue#list. */
class QueueListMatch
{
    public string $organization_name;
    public string $project_name;
}

/** Request payload for Queue#create. */
class QueueCreateData
{
    public string $organization_name;
    public string $project_name;
    public array $container_groups;
    public string $create_time;
    public ?int $current_queue_length = null;
    public ?string $description = null;
    public string $display_name;
    public array $events;
    public string $id;
    public mixed $input;
    public ?array $metadata = null;
    public string $name;
    public mixed $output = null;
    public string $status;
    public string $update_time;
    public ?string $webhook = null;
}

/** Request payload for Queue#update. */
class QueueUpdateData
{
    public string $id;
    public string $organization_name;
    public string $project_id;
    public ?array $container_groups = null;
    public ?string $create_time = null;
    public ?int $current_queue_length = null;
    public ?string $description = null;
    public ?string $display_name = null;
    public ?array $events = null;
    public mixed $input = null;
    public ?array $metadata = null;
    public ?string $name = null;
    public mixed $output = null;
    public ?string $status = null;
    public ?string $update_time = null;
    public ?string $webhook = null;
}

/** Request payload for Queue#remove. */
class QueueRemoveMatch
{
    public string $organization_name;
    public string $project_id;
    public ?string $queue_id = null;
    public ?string $queue_job_id = null;
    public ?string $id = null;
}

/** Quota entity data model. */
class Quota
{
    public int $container_replicas_quota;
    public int $container_replicas_used;
    public ?int $max_container_group_reallocations_per_minute = null;
    public ?int $max_container_group_recreates_per_minute = null;
    public ?int $max_container_group_restarts_per_minute = null;
}

/** Request payload for Quota#load. */
class QuotaLoadMatch
{
    public string $organization_name;
}

/** SystemLog entity data model. */
class SystemLog
{
    public string $event_name;
    public string $event_time;
    public ?string $instance_id = null;
    public ?string $machine_id = null;
    public mixed $resource_cpu;
    public string $resource_gpu_class;
    public mixed $resource_memory;
    public mixed $resource_storage_amount;
    public string $version;
}

/** Request payload for SystemLog#list. */
class SystemLogListMatch
{
    public string $container_group_name;
    public string $organization_name;
    public string $project_id;
}

/** WebhookSecretKey entity data model. */
class WebhookSecretKey
{
    public string $secret_key;
}

/** Request payload for WebhookSecretKey#load. */
class WebhookSecretKeyLoadMatch
{
    public string $organization_name;
}

/** Request payload for WebhookSecretKey#create. */
class WebhookSecretKeyCreateData
{
    public string $organization_name;
    public string $secret_key;
}

