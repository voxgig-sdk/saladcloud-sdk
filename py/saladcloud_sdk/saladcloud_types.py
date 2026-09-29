# Typed models for the Saladcloud SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class ContainerRequired(TypedDict):
    autostart_policy: bool
    container: dict
    country_codes: list
    create_time: str
    current_state: dict
    display_name: str
    id: str
    liveness_probe: dict | None
    name: str
    networking: dict
    organization_name: str
    pending_change: bool
    priority: str | None
    project_name: str
    queue_autoscaler: dict
    queue_connection: dict
    readiness_probe: dict | None
    replicas: int
    restart_policy: str
    scalingactions: list
    scheduledscalingenabled: bool
    startup_probe: dict | None
    update_time: str
    version: int


class Container(ContainerRequired, total=False):
    readme: str


class ContainerLoadMatch(TypedDict):
    id: str
    organization_name: str
    project_id: str


class ContainerListMatch(TypedDict):
    organization_name: str
    project_name: str


class ContainerCreateDataRequired(TypedDict):
    organization_name: str
    project_name: str
    autostart_policy: bool
    container: dict
    country_codes: list
    create_time: str
    current_state: dict
    display_name: str
    id: str
    liveness_probe: dict | None
    name: str
    networking: dict
    pending_change: bool
    priority: str | None
    queue_autoscaler: dict
    queue_connection: dict
    readiness_probe: dict | None
    replicas: int
    restart_policy: str
    scalingactions: list
    scheduledscalingenabled: bool
    startup_probe: dict | None
    update_time: str
    version: int


class ContainerCreateData(ContainerCreateDataRequired, total=False):
    readme: str


class ContainerUpdateDataRequired(TypedDict):
    id: str
    organization_name: str
    project_id: str


class ContainerUpdateData(ContainerUpdateDataRequired, total=False):
    autostart_policy: bool
    container: dict
    country_codes: list
    create_time: str
    current_state: dict
    display_name: str
    liveness_probe: dict | None
    name: str
    networking: dict
    pending_change: bool
    priority: str | None
    project_name: str
    queue_autoscaler: dict
    queue_connection: dict
    readiness_probe: dict | None
    readme: str
    replicas: int
    restart_policy: str
    scalingactions: list
    scheduledscalingenabled: bool
    startup_probe: dict | None
    update_time: str
    version: int


class ContainerRemoveMatch(TypedDict):
    id: str
    organization_name: str
    project_id: str


class ContainerGroupRequired(TypedDict):
    id: str
    machine_id: str
    state: str
    update_time: str
    version: int


class ContainerGroup(ContainerGroupRequired, total=False):
    cpu_percent: float
    cpu_usage: int
    cpu_usage_total: int
    deletion_cost: int
    memory_usage_mb: float
    memory_usage_percent: float
    pulling_progress: float
    ready: bool
    ssh_host_key_fingerprint: str
    ssh_ip: str
    ssh_port: int
    started: bool


class ContainerGroupLoadMatch(TypedDict):
    container_group_instance_id: str
    container_id: str
    organization_name: str
    project_id: str


class ContainerGroupCreateDataRequired(TypedDict):
    container_id: str
    instance_id: str
    organization_name: str
    project_id: str
    id: str
    machine_id: str
    state: str
    update_time: str
    version: int


class ContainerGroupCreateData(ContainerGroupCreateDataRequired, total=False):
    cpu_percent: float
    cpu_usage: int
    cpu_usage_total: int
    deletion_cost: int
    memory_usage_mb: float
    memory_usage_percent: float
    pulling_progress: float
    ready: bool
    ssh_host_key_fingerprint: str
    ssh_ip: str
    ssh_port: int
    started: bool


class ContainerGroupInstanceRequired(TypedDict):
    id: str
    machine_id: str
    state: str
    update_time: str
    version: int


class ContainerGroupInstance(ContainerGroupInstanceRequired, total=False):
    cpu_percent: float
    cpu_usage: int
    cpu_usage_total: int
    deletion_cost: int
    memory_usage_mb: float
    memory_usage_percent: float
    pulling_progress: float
    ready: bool
    ssh_host_key_fingerprint: str
    ssh_ip: str
    ssh_port: int
    started: bool


class ContainerGroupInstanceListMatch(TypedDict):
    container_group_name: str
    organization_name: str
    project_id: str


class ContainerGroupInstanceUpdateDataRequired(TypedDict):
    container_id: str
    id: str
    organization_name: str
    project_id: str


class ContainerGroupInstanceUpdateData(ContainerGroupInstanceUpdateDataRequired, total=False):
    cpu_percent: float
    cpu_usage: int
    cpu_usage_total: int
    deletion_cost: int
    machine_id: str
    memory_usage_mb: float
    memory_usage_percent: float
    pulling_progress: float
    ready: bool
    ssh_host_key_fingerprint: str
    ssh_ip: str
    ssh_port: int
    started: bool
    state: str
    update_time: str
    version: int


class CpuAvailability(TypedDict, total=False):
    available_cpu_batch: int
    country_codes: list
    cpu: int
    memory: int
    on_call_cpu: int
    storage_amount: int


class CpuAvailabilityCreateDataRequired(TypedDict):
    organization_name: str


class CpuAvailabilityCreateData(CpuAvailabilityCreateDataRequired, total=False):
    available_cpu_batch: int
    country_codes: list
    cpu: int
    memory: int
    on_call_cpu: int
    storage_amount: int


class GpuAvailabilityRequired(TypedDict):
    gpu_classes: list


class GpuAvailability(GpuAvailabilityRequired, total=False):
    available_gpu_batch: int
    available_gpu_high: int
    available_gpu_low: int
    available_gpu_medium: int
    country_codes: list
    cpu: int
    memory: int
    on_call_gpu: int
    storage_amount: int


class GpuAvailabilityCreateDataRequired(TypedDict):
    organization_name: str
    gpu_classes: list


class GpuAvailabilityCreateData(GpuAvailabilityCreateDataRequired, total=False):
    available_gpu_batch: int
    available_gpu_high: int
    available_gpu_low: int
    available_gpu_medium: int
    country_codes: list
    cpu: int
    memory: int
    on_call_gpu: int
    storage_amount: int


class GpuClassRequired(TypedDict):
    id: str
    name: str
    prices: list


class GpuClass(GpuClassRequired, total=False):
    gpu_class_type: str
    gpu_count: int
    is_high_demand: bool
    max_ram: int
    max_storage: int
    max_vcpu: int
    min_ram: int
    min_storage: int
    min_vcpu: int


class GpuClassListMatch(TypedDict):
    organization_name: str


class InferenceEndpoint(TypedDict):
    description: str
    display_name: str
    icon_url: str
    id: str
    input_schema: str
    name: str
    organization_name: str
    output_schema: str
    price_description: str
    readme: str


class InferenceEndpointLoadMatch(TypedDict):
    id: str
    organization_name: str


class InferenceEndpointListMatchRequired(TypedDict):
    organization_name: str


class InferenceEndpointListMatch(InferenceEndpointListMatchRequired, total=False):
    page: int
    page_size: int


class InferenceEndpointRemoveMatch(TypedDict):
    inference_endpoint_id: str
    inference_endpoint_job_id: str
    organization_name: str


class InferenceEndpointJobRequired(TypedDict):
    create_time: str
    events: list
    id: str
    inference_endpoint_name: str
    input: Any
    organization_name: str
    status: str
    update_time: str


class InferenceEndpointJob(InferenceEndpointJobRequired, total=False):
    metadata: dict
    output: Any
    webhook: str
    webhook_url: str


class InferenceEndpointJobLoadMatch(TypedDict):
    id: str
    inference_endpoint_id: str
    organization_name: str


class InferenceEndpointJobCreateDataRequired(TypedDict):
    inference_endpoint_name: str
    organization_name: str
    create_time: str
    events: list
    id: str
    input: Any
    status: str
    update_time: str


class InferenceEndpointJobCreateData(InferenceEndpointJobCreateDataRequired, total=False):
    metadata: dict
    output: Any
    webhook: str
    webhook_url: str


class InferenceEndpointJobCollectionRequired(TypedDict):
    create_time: str
    events: list
    id: str
    inference_endpoint_name: str
    input: Any
    organization_name: str
    status: str
    update_time: str


class InferenceEndpointJobCollection(InferenceEndpointJobCollectionRequired, total=False):
    metadata: dict
    output: Any
    webhook: str
    webhook_url: str


class InferenceEndpointJobCollectionListMatchRequired(TypedDict):
    inference_endpoint_name: str
    organization_name: str


class InferenceEndpointJobCollectionListMatch(InferenceEndpointJobCollectionListMatchRequired, total=False):
    page: int
    page_size: int


class LogEntryRequired(TypedDict):
    end_time: str
    items: list
    organization_name: str
    page_max_time: str
    page_min_time: str
    query: str
    start_time: str


class LogEntry(LogEntryRequired, total=False):
    page_size: int
    sort_order: str


class LogEntryCreateDataRequired(TypedDict):
    organization_name: str
    end_time: str
    items: list
    page_max_time: str
    page_min_time: str
    query: str
    start_time: str


class LogEntryCreateData(LogEntryCreateDataRequired, total=False):
    page_size: int
    sort_order: str


class QueueRequired(TypedDict):
    container_groups: list
    create_time: str
    display_name: str
    events: list
    id: str
    input: Any
    name: str
    status: str
    update_time: str


class Queue(QueueRequired, total=False):
    current_queue_length: int
    description: str
    metadata: dict
    output: Any
    webhook: str


class QueueLoadMatchRequired(TypedDict):
    organization_name: str
    project_id: str


class QueueLoadMatch(QueueLoadMatchRequired, total=False):
    queue_id: str
    queue_job_id: str
    id: str


class QueueListMatch(TypedDict):
    organization_name: str
    project_name: str


class QueueCreateDataRequired(TypedDict):
    organization_name: str
    project_name: str
    container_groups: list
    create_time: str
    display_name: str
    events: list
    id: str
    input: Any
    name: str
    status: str
    update_time: str


class QueueCreateData(QueueCreateDataRequired, total=False):
    current_queue_length: int
    description: str
    metadata: dict
    output: Any
    webhook: str


class QueueUpdateDataRequired(TypedDict):
    id: str
    organization_name: str
    project_id: str


class QueueUpdateData(QueueUpdateDataRequired, total=False):
    container_groups: list
    create_time: str
    current_queue_length: int
    description: str
    display_name: str
    events: list
    input: Any
    metadata: dict
    name: str
    output: Any
    status: str
    update_time: str
    webhook: str


class QueueRemoveMatchRequired(TypedDict):
    organization_name: str
    project_id: str


class QueueRemoveMatch(QueueRemoveMatchRequired, total=False):
    queue_id: str
    queue_job_id: str
    id: str


class QuotaRequired(TypedDict):
    container_groups_quotas: dict


class Quota(QuotaRequired, total=False):
    create_time: str
    update_time: str


class QuotaLoadMatch(TypedDict):
    organization_name: str


class SystemLogRequired(TypedDict):
    event_name: str
    event_time: str
    resource_cpu: int | None
    resource_gpu_class: str
    resource_memory: int | None
    resource_storage_amount: int | None
    version: str


class SystemLog(SystemLogRequired, total=False):
    instance_id: str
    machine_id: str


class SystemLogListMatch(TypedDict):
    container_group_name: str
    organization_name: str
    project_id: str


class WebhookSecretKey(TypedDict):
    secret_key: str


class WebhookSecretKeyLoadMatch(TypedDict):
    organization_name: str


class WebhookSecretKeyCreateData(TypedDict):
    organization_name: str
    secret_key: str
