-- Typed models for the Saladcloud SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Container
---@field autostart_policy boolean
---@field container table
---@field country_codes table
---@field create_time string
---@field current_state table
---@field display_name string
---@field id string
---@field liveness_probe table|nil
---@field name string
---@field networking table
---@field organization_name string
---@field pending_change boolean
---@field priority string|nil
---@field project_name string
---@field queue_autoscaler table
---@field queue_connection table
---@field readiness_probe table|nil
---@field readme? string
---@field replicas number
---@field restart_policy string
---@field scalingactions table
---@field scheduledscalingenabled boolean
---@field startup_probe table|nil
---@field update_time string
---@field version number

---@class ContainerLoadMatch
---@field id string
---@field organization_name string
---@field project_id string

---@class ContainerListMatch
---@field organization_name string
---@field project_name string

---@class ContainerCreateData
---@field organization_name string
---@field project_name string
---@field autostart_policy boolean
---@field container table
---@field country_codes table
---@field create_time string
---@field current_state table
---@field display_name string
---@field id string
---@field liveness_probe table|nil
---@field name string
---@field networking table
---@field pending_change boolean
---@field priority string|nil
---@field queue_autoscaler table
---@field queue_connection table
---@field readiness_probe table|nil
---@field readme? string
---@field replicas number
---@field restart_policy string
---@field scalingactions table
---@field scheduledscalingenabled boolean
---@field startup_probe table|nil
---@field update_time string
---@field version number

---@class ContainerUpdateData
---@field id string
---@field organization_name string
---@field project_id string
---@field autostart_policy? boolean
---@field container? table
---@field country_codes? table
---@field create_time? string
---@field current_state? table
---@field display_name? string
---@field liveness_probe? table|nil
---@field name? string
---@field networking? table
---@field pending_change? boolean
---@field priority? string|nil
---@field project_name? string
---@field queue_autoscaler? table
---@field queue_connection? table
---@field readiness_probe? table|nil
---@field readme? string
---@field replicas? number
---@field restart_policy? string
---@field scalingactions? table
---@field scheduledscalingenabled? boolean
---@field startup_probe? table|nil
---@field update_time? string
---@field version? number

---@class ContainerRemoveMatch
---@field id string
---@field organization_name string
---@field project_id string

---@class ContainerGroup

---@class ContainerGroupLoadMatch
---@field container_group_instance_id string
---@field container_id string
---@field organization_name string
---@field project_id string

---@class ContainerGroupCreateData
---@field container_id string
---@field instance_id string
---@field organization_name string
---@field project_id string

---@class ContainerGroupInstance
---@field cpu_percent? number
---@field cpu_usage? number
---@field cpu_usage_total? number
---@field deletion_cost? number
---@field id string
---@field machine_id string
---@field memory_usage_mb? number
---@field memory_usage_percent? number
---@field pulling_progress? number
---@field ready? boolean
---@field ssh_host_key_fingerprint? string
---@field ssh_ip? string
---@field ssh_port? number
---@field started? boolean
---@field state string
---@field update_time string
---@field version number

---@class ContainerGroupInstanceListMatch
---@field container_group_name string
---@field organization_name string
---@field project_id string

---@class ContainerGroupInstanceUpdateData
---@field container_id string
---@field id string
---@field organization_name string
---@field project_id string
---@field cpu_percent? number
---@field cpu_usage? number
---@field cpu_usage_total? number
---@field deletion_cost? number
---@field machine_id? string
---@field memory_usage_mb? number
---@field memory_usage_percent? number
---@field pulling_progress? number
---@field ready? boolean
---@field ssh_host_key_fingerprint? string
---@field ssh_ip? string
---@field ssh_port? number
---@field started? boolean
---@field state? string
---@field update_time? string
---@field version? number

---@class CpuAvailability
---@field available_cpu_batch? number
---@field country_codes? table
---@field cpu? number
---@field memory? number
---@field on_call_cpu? number
---@field storage_amount? number

---@class CpuAvailabilityCreateData
---@field organization_name string
---@field available_cpu_batch? number
---@field country_codes? table
---@field cpu? number
---@field memory? number
---@field on_call_cpu? number
---@field storage_amount? number

---@class GpuAvailability
---@field available_gpu_batch? number
---@field available_gpu_high? number
---@field available_gpu_low? number
---@field available_gpu_medium? number
---@field country_codes? table
---@field cpu? number
---@field gpu_classes table
---@field memory? number
---@field on_call_gpu? number
---@field storage_amount? number

---@class GpuAvailabilityCreateData
---@field organization_name string
---@field available_gpu_batch? number
---@field available_gpu_high? number
---@field available_gpu_low? number
---@field available_gpu_medium? number
---@field country_codes? table
---@field cpu? number
---@field gpu_classes table
---@field memory? number
---@field on_call_gpu? number
---@field storage_amount? number

---@class GpuClass
---@field gpu_class_type? string
---@field gpu_count? number
---@field id string
---@field is_high_demand? boolean
---@field max_ram? number
---@field max_storage? number
---@field max_vcpu? number
---@field min_ram? number
---@field min_storage? number
---@field min_vcpu? number
---@field name string
---@field prices table

---@class GpuClassListMatch
---@field organization_name string

---@class InferenceEndpoint
---@field description string
---@field display_name string
---@field icon_url string
---@field id string
---@field input_schema string
---@field name string
---@field organization_name string
---@field output_schema string
---@field price_description string
---@field readme string

---@class InferenceEndpointLoadMatch
---@field id string
---@field organization_name string

---@class InferenceEndpointListMatch
---@field organization_name string
---@field page? number
---@field page_size? number

---@class InferenceEndpointRemoveMatch
---@field inference_endpoint_id string
---@field inference_endpoint_job_id string
---@field organization_name string

---@class InferenceEndpointJob
---@field create_time string
---@field events table
---@field id string
---@field inference_endpoint_name string
---@field input any
---@field metadata? table
---@field organization_name string
---@field output? any
---@field status string
---@field update_time string
---@field webhook? string
---@field webhook_url? string

---@class InferenceEndpointJobLoadMatch
---@field id string
---@field inference_endpoint_id string
---@field organization_name string

---@class InferenceEndpointJobCreateData
---@field inference_endpoint_name string
---@field organization_name string
---@field create_time string
---@field events table
---@field id string
---@field input any
---@field metadata? table
---@field output? any
---@field status string
---@field update_time string
---@field webhook? string
---@field webhook_url? string

---@class InferenceEndpointJobCollection
---@field create_time string
---@field events table
---@field id string
---@field inference_endpoint_name string
---@field input any
---@field metadata? table
---@field organization_name string
---@field output? any
---@field status string
---@field update_time string
---@field webhook? string
---@field webhook_url? string

---@class InferenceEndpointJobCollectionListMatch
---@field inference_endpoint_name string
---@field organization_name string
---@field page? number
---@field page_size? number

---@class LogEntry
---@field end_time string
---@field items table
---@field organization_name string
---@field page_max_time string
---@field page_min_time string
---@field page_size? number
---@field query string
---@field sort_order? string
---@field start_time string

---@class LogEntryCreateData
---@field organization_name string
---@field end_time string
---@field items table
---@field page_max_time string
---@field page_min_time string
---@field page_size? number
---@field query string
---@field sort_order? string
---@field start_time string

---@class Queue
---@field container_groups table
---@field create_time string
---@field current_queue_length? number
---@field description? string
---@field display_name string
---@field events table
---@field id string
---@field input any
---@field metadata? table
---@field name string
---@field output? any
---@field status string
---@field update_time string
---@field webhook? string

---@class QueueLoadMatch
---@field organization_name string
---@field project_id string
---@field queue_id? string
---@field queue_job_id? string
---@field id? string

---@class QueueListMatch
---@field organization_name string
---@field project_name string

---@class QueueCreateData
---@field organization_name string
---@field project_name string
---@field container_groups table
---@field create_time string
---@field current_queue_length? number
---@field description? string
---@field display_name string
---@field events table
---@field id string
---@field input any
---@field metadata? table
---@field name string
---@field output? any
---@field status string
---@field update_time string
---@field webhook? string

---@class QueueUpdateData
---@field id string
---@field organization_name string
---@field project_id string
---@field container_groups? table
---@field create_time? string
---@field current_queue_length? number
---@field description? string
---@field display_name? string
---@field events? table
---@field input? any
---@field metadata? table
---@field name? string
---@field output? any
---@field status? string
---@field update_time? string
---@field webhook? string

---@class QueueRemoveMatch
---@field organization_name string
---@field project_id string
---@field queue_id? string
---@field queue_job_id? string
---@field id? string

---@class Quota
---@field container_replicas_quota number
---@field container_replicas_used number
---@field max_container_group_reallocations_per_minute? number
---@field max_container_group_recreates_per_minute? number
---@field max_container_group_restarts_per_minute? number

---@class QuotaLoadMatch
---@field organization_name string

---@class SystemLog
---@field event_name string
---@field event_time string
---@field instance_id? string
---@field machine_id? string
---@field resource_cpu number|nil
---@field resource_gpu_class string
---@field resource_memory number|nil
---@field resource_storage_amount number|nil
---@field version string

---@class SystemLogListMatch
---@field container_group_name string
---@field organization_name string
---@field project_id string

---@class WebhookSecretKey
---@field secret_key string

---@class WebhookSecretKeyLoadMatch
---@field organization_name string

---@class WebhookSecretKeyCreateData
---@field organization_name string
---@field secret_key string

local M = {}

return M
