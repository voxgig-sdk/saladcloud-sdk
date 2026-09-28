export interface Container {
    autostart_policy: boolean;
    container: Record<string, any>;
    country_codes: any[];
    create_time: string;
    current_state: Record<string, any>;
    display_name: string;
    id: string;
    liveness_probe: Record<string, any> | null;
    name: string;
    networking: Record<string, any>;
    organization_name: string;
    pending_change: boolean;
    priority: string | null;
    project_name: string;
    queue_autoscaler: Record<string, any>;
    queue_connection: Record<string, any>;
    readiness_probe: Record<string, any> | null;
    readme?: string;
    replicas: number;
    restart_policy: string;
    scalingactions: any[];
    scheduledscalingenabled: boolean;
    startup_probe: Record<string, any> | null;
    update_time: string;
    version: number;
}
export interface ContainerLoadMatch {
    id: string;
    organization_name: string;
    project_id: string;
}
export interface ContainerListMatch {
    organization_name: string;
    project_name: string;
}
export interface ContainerCreateData {
    organization_name: string;
    project_name: string;
    autostart_policy: boolean;
    container: Record<string, any>;
    country_codes: any[];
    create_time: string;
    current_state: Record<string, any>;
    display_name: string;
    id: string;
    liveness_probe: Record<string, any> | null;
    name: string;
    networking: Record<string, any>;
    pending_change: boolean;
    priority: string | null;
    queue_autoscaler: Record<string, any>;
    queue_connection: Record<string, any>;
    readiness_probe: Record<string, any> | null;
    readme?: string;
    replicas: number;
    restart_policy: string;
    scalingactions: any[];
    scheduledscalingenabled: boolean;
    startup_probe: Record<string, any> | null;
    update_time: string;
    version: number;
    $action?: string;
    [action: string]: any;
}
export interface ContainerUpdateData {
    id: string;
    organization_name: string;
    project_id: string;
    autostart_policy?: boolean;
    container?: Record<string, any>;
    country_codes?: any[];
    create_time?: string;
    current_state?: Record<string, any>;
    display_name?: string;
    liveness_probe?: Record<string, any> | null;
    name?: string;
    networking?: Record<string, any>;
    pending_change?: boolean;
    priority?: string | null;
    project_name?: string;
    queue_autoscaler?: Record<string, any>;
    queue_connection?: Record<string, any>;
    readiness_probe?: Record<string, any> | null;
    readme?: string;
    replicas?: number;
    restart_policy?: string;
    scalingactions?: any[];
    scheduledscalingenabled?: boolean;
    startup_probe?: Record<string, any> | null;
    update_time?: string;
    version?: number;
}
export interface ContainerRemoveMatch {
    id: string;
    organization_name: string;
    project_id: string;
}
export interface ContainerGroup {
}
export interface ContainerGroupLoadMatch {
    container_group_instance_id: string;
    container_id: string;
    organization_name: string;
    project_id: string;
}
export interface ContainerGroupCreateData {
    container_id: string;
    instance_id: string;
    organization_name: string;
    project_id: string;
    $action?: string;
    [action: string]: any;
}
export interface ContainerGroupInstance {
    cpu_percent?: number;
    cpu_usage?: number;
    cpu_usage_total?: number;
    deletion_cost?: number;
    id: string;
    machine_id: string;
    memory_usage_mb?: number;
    memory_usage_percent?: number;
    pulling_progress?: number;
    ready?: boolean;
    ssh_host_key_fingerprint?: string;
    ssh_ip?: string;
    ssh_port?: number;
    started?: boolean;
    state: string;
    update_time: string;
    version: number;
}
export interface ContainerGroupInstanceListMatch {
    container_group_name: string;
    organization_name: string;
    project_id: string;
}
export interface ContainerGroupInstanceUpdateData {
    container_id: string;
    id: string;
    organization_name: string;
    project_id: string;
    cpu_percent?: number;
    cpu_usage?: number;
    cpu_usage_total?: number;
    deletion_cost?: number;
    machine_id?: string;
    memory_usage_mb?: number;
    memory_usage_percent?: number;
    pulling_progress?: number;
    ready?: boolean;
    ssh_host_key_fingerprint?: string;
    ssh_ip?: string;
    ssh_port?: number;
    started?: boolean;
    state?: string;
    update_time?: string;
    version?: number;
}
export interface CpuAvailability {
    available_cpu_batch?: number;
    country_codes?: any[];
    cpu?: number;
    memory?: number;
    on_call_cpu?: number;
    storage_amount?: number;
}
export interface CpuAvailabilityCreateData {
    organization_name: string;
    available_cpu_batch?: number;
    country_codes?: any[];
    cpu?: number;
    memory?: number;
    on_call_cpu?: number;
    storage_amount?: number;
}
export interface GpuAvailability {
    available_gpu_batch?: number;
    available_gpu_high?: number;
    available_gpu_low?: number;
    available_gpu_medium?: number;
    country_codes?: any[];
    cpu?: number;
    gpu_classes: any[];
    memory?: number;
    on_call_gpu?: number;
    storage_amount?: number;
}
export interface GpuAvailabilityCreateData {
    organization_name: string;
    available_gpu_batch?: number;
    available_gpu_high?: number;
    available_gpu_low?: number;
    available_gpu_medium?: number;
    country_codes?: any[];
    cpu?: number;
    gpu_classes: any[];
    memory?: number;
    on_call_gpu?: number;
    storage_amount?: number;
}
export interface GpuClass {
    gpu_class_type?: string;
    gpu_count?: number;
    id: string;
    is_high_demand?: boolean;
    max_ram?: number;
    max_storage?: number;
    max_vcpu?: number;
    min_ram?: number;
    min_storage?: number;
    min_vcpu?: number;
    name: string;
    prices: any[];
}
export interface GpuClassListMatch {
    organization_name: string;
}
export interface InferenceEndpoint {
    description: string;
    display_name: string;
    icon_url: string;
    id: string;
    input_schema: string;
    name: string;
    organization_name: string;
    output_schema: string;
    price_description: string;
    readme: string;
}
export interface InferenceEndpointLoadMatch {
    id: string;
    organization_name: string;
}
export interface InferenceEndpointListMatch {
    organization_name: string;
    page?: number;
    page_size?: number;
}
export interface InferenceEndpointRemoveMatch {
    inference_endpoint_id: string;
    inference_endpoint_job_id: string;
    organization_name: string;
}
export interface InferenceEndpointJob {
    create_time: string;
    events: any[];
    id: string;
    inference_endpoint_name: string;
    input: any;
    metadata?: Record<string, any>;
    organization_name: string;
    output?: any;
    status: string;
    update_time: string;
    webhook?: string;
    webhook_url?: string;
}
export interface InferenceEndpointJobLoadMatch {
    id: string;
    inference_endpoint_id: string;
    organization_name: string;
}
export interface InferenceEndpointJobCreateData {
    inference_endpoint_name: string;
    organization_name: string;
    create_time: string;
    events: any[];
    id: string;
    input: any;
    metadata?: Record<string, any>;
    output?: any;
    status: string;
    update_time: string;
    webhook?: string;
    webhook_url?: string;
}
export interface InferenceEndpointJobCollection {
    create_time: string;
    events: any[];
    id: string;
    inference_endpoint_name: string;
    input: any;
    metadata?: Record<string, any>;
    organization_name: string;
    output?: any;
    status: string;
    update_time: string;
    webhook?: string;
    webhook_url?: string;
}
export interface InferenceEndpointJobCollectionListMatch {
    inference_endpoint_name: string;
    organization_name: string;
    page?: number;
    page_size?: number;
}
export interface LogEntry {
    end_time: string;
    items: any[];
    organization_name: string;
    page_max_time: string;
    page_min_time: string;
    page_size?: number;
    query: string;
    sort_order?: string;
    start_time: string;
}
export interface LogEntryCreateData {
    organization_name: string;
    end_time: string;
    items: any[];
    page_max_time: string;
    page_min_time: string;
    page_size?: number;
    query: string;
    sort_order?: string;
    start_time: string;
}
export interface Queue {
    container_groups: any[];
    create_time: string;
    current_queue_length?: number;
    description?: string;
    display_name: string;
    events: any[];
    id: string;
    input: any;
    metadata?: Record<string, any>;
    name: string;
    output?: any;
    status: string;
    update_time: string;
    webhook?: string;
}
export interface QueueLoadMatch {
    organization_name: string;
    project_id: string;
    queue_id?: string;
    queue_job_id?: string;
    id?: string;
}
export interface QueueListMatch {
    organization_name: string;
    project_name: string;
    $action?: string;
    [action: string]: any;
}
export interface QueueCreateData {
    organization_name: string;
    project_name: string;
    container_groups: any[];
    create_time: string;
    current_queue_length?: number;
    description?: string;
    display_name: string;
    events: any[];
    id: string;
    input: any;
    metadata?: Record<string, any>;
    name: string;
    output?: any;
    status: string;
    update_time: string;
    webhook?: string;
    $action?: string;
    [action: string]: any;
}
export interface QueueUpdateData {
    id: string;
    organization_name: string;
    project_id: string;
    container_groups?: any[];
    create_time?: string;
    current_queue_length?: number;
    description?: string;
    display_name?: string;
    events?: any[];
    input?: any;
    metadata?: Record<string, any>;
    name?: string;
    output?: any;
    status?: string;
    update_time?: string;
    webhook?: string;
}
export interface QueueRemoveMatch {
    organization_name: string;
    project_id: string;
    queue_id?: string;
    queue_job_id?: string;
    id?: string;
}
export interface Quota {
    container_replicas_quota: number;
    container_replicas_used: number;
    max_container_group_reallocations_per_minute?: number;
    max_container_group_recreates_per_minute?: number;
    max_container_group_restarts_per_minute?: number;
}
export interface QuotaLoadMatch {
    organization_name: string;
}
export interface SystemLog {
    event_name: string;
    event_time: string;
    instance_id?: string;
    machine_id?: string;
    resource_cpu: number | null;
    resource_gpu_class: string;
    resource_memory: number | null;
    resource_storage_amount: number | null;
    version: string;
}
export interface SystemLogListMatch {
    container_group_name: string;
    organization_name: string;
    project_id: string;
}
export interface WebhookSecretKey {
    secret_key: string;
}
export interface WebhookSecretKeyLoadMatch {
    organization_name: string;
}
export interface WebhookSecretKeyCreateData {
    organization_name: string;
    secret_key: string;
}
