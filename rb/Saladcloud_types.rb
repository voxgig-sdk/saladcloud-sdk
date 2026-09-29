# frozen_string_literal: true

# Typed models for the Saladcloud SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Container entity data model.
#
# @!attribute [rw] autostart_policy
#   @return [Boolean]
#
# @!attribute [rw] container
#   @return [Hash]
#
# @!attribute [rw] country_codes
#   @return [Array]
#
# @!attribute [rw] create_time
#   @return [String]
#
# @!attribute [rw] current_state
#   @return [Hash]
#
# @!attribute [rw] display_name
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] liveness_probe
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] networking
#   @return [Hash]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] pending_change
#   @return [Boolean]
#
# @!attribute [rw] priority
#   @return [Object]
#
# @!attribute [rw] project_name
#   @return [String]
#
# @!attribute [rw] queue_autoscaler
#   @return [Hash]
#
# @!attribute [rw] queue_connection
#   @return [Hash]
#
# @!attribute [rw] readiness_probe
#   @return [Object]
#
# @!attribute [rw] readme
#   @return [String, nil]
#
# @!attribute [rw] replicas
#   @return [Integer]
#
# @!attribute [rw] restart_policy
#   @return [String]
#
# @!attribute [rw] scalingactions
#   @return [Array]
#
# @!attribute [rw] scheduledscalingenabled
#   @return [Boolean]
#
# @!attribute [rw] startup_probe
#   @return [Object]
#
# @!attribute [rw] update_time
#   @return [String]
#
# @!attribute [rw] version
#   @return [Integer]
Container = Struct.new(
  :autostart_policy,
  :container,
  :country_codes,
  :create_time,
  :current_state,
  :display_name,
  :id,
  :liveness_probe,
  :name,
  :networking,
  :organization_name,
  :pending_change,
  :priority,
  :project_name,
  :queue_autoscaler,
  :queue_connection,
  :readiness_probe,
  :readme,
  :replicas,
  :restart_policy,
  :scalingactions,
  :scheduledscalingenabled,
  :startup_probe,
  :update_time,
  :version,
  keyword_init: true
)

# Request payload for Container#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ContainerLoadMatch = Struct.new(
  :id,
  :organization_name,
  :project_id,
  keyword_init: true
)

# Request payload for Container#list.
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] project_name
#   @return [String]
ContainerListMatch = Struct.new(
  :organization_name,
  :project_name,
  keyword_init: true
)

# Request payload for Container#create.
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] project_name
#   @return [String]
#
# @!attribute [rw] autostart_policy
#   @return [Boolean]
#
# @!attribute [rw] container
#   @return [Hash]
#
# @!attribute [rw] country_codes
#   @return [Array]
#
# @!attribute [rw] create_time
#   @return [String]
#
# @!attribute [rw] current_state
#   @return [Hash]
#
# @!attribute [rw] display_name
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] liveness_probe
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] networking
#   @return [Hash]
#
# @!attribute [rw] pending_change
#   @return [Boolean]
#
# @!attribute [rw] priority
#   @return [Object]
#
# @!attribute [rw] queue_autoscaler
#   @return [Hash]
#
# @!attribute [rw] queue_connection
#   @return [Hash]
#
# @!attribute [rw] readiness_probe
#   @return [Object]
#
# @!attribute [rw] readme
#   @return [String, nil]
#
# @!attribute [rw] replicas
#   @return [Integer]
#
# @!attribute [rw] restart_policy
#   @return [String]
#
# @!attribute [rw] scalingactions
#   @return [Array]
#
# @!attribute [rw] scheduledscalingenabled
#   @return [Boolean]
#
# @!attribute [rw] startup_probe
#   @return [Object]
#
# @!attribute [rw] update_time
#   @return [String]
#
# @!attribute [rw] version
#   @return [Integer]
ContainerCreateData = Struct.new(
  :organization_name,
  :project_name,
  :autostart_policy,
  :container,
  :country_codes,
  :create_time,
  :current_state,
  :display_name,
  :id,
  :liveness_probe,
  :name,
  :networking,
  :pending_change,
  :priority,
  :queue_autoscaler,
  :queue_connection,
  :readiness_probe,
  :readme,
  :replicas,
  :restart_policy,
  :scalingactions,
  :scheduledscalingenabled,
  :startup_probe,
  :update_time,
  :version,
  keyword_init: true
)

# Request payload for Container#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] autostart_policy
#   @return [Boolean, nil]
#
# @!attribute [rw] container
#   @return [Hash, nil]
#
# @!attribute [rw] country_codes
#   @return [Array, nil]
#
# @!attribute [rw] create_time
#   @return [String, nil]
#
# @!attribute [rw] current_state
#   @return [Hash, nil]
#
# @!attribute [rw] display_name
#   @return [String, nil]
#
# @!attribute [rw] liveness_probe
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] networking
#   @return [Hash, nil]
#
# @!attribute [rw] pending_change
#   @return [Boolean, nil]
#
# @!attribute [rw] priority
#   @return [Object, nil]
#
# @!attribute [rw] project_name
#   @return [String, nil]
#
# @!attribute [rw] queue_autoscaler
#   @return [Hash, nil]
#
# @!attribute [rw] queue_connection
#   @return [Hash, nil]
#
# @!attribute [rw] readiness_probe
#   @return [Object, nil]
#
# @!attribute [rw] readme
#   @return [String, nil]
#
# @!attribute [rw] replicas
#   @return [Integer, nil]
#
# @!attribute [rw] restart_policy
#   @return [String, nil]
#
# @!attribute [rw] scalingactions
#   @return [Array, nil]
#
# @!attribute [rw] scheduledscalingenabled
#   @return [Boolean, nil]
#
# @!attribute [rw] startup_probe
#   @return [Object, nil]
#
# @!attribute [rw] update_time
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
ContainerUpdateData = Struct.new(
  :id,
  :organization_name,
  :project_id,
  :autostart_policy,
  :container,
  :country_codes,
  :create_time,
  :current_state,
  :display_name,
  :liveness_probe,
  :name,
  :networking,
  :pending_change,
  :priority,
  :project_name,
  :queue_autoscaler,
  :queue_connection,
  :readiness_probe,
  :readme,
  :replicas,
  :restart_policy,
  :scalingactions,
  :scheduledscalingenabled,
  :startup_probe,
  :update_time,
  :version,
  keyword_init: true
)

# Request payload for Container#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ContainerRemoveMatch = Struct.new(
  :id,
  :organization_name,
  :project_id,
  keyword_init: true
)

# ContainerGroup entity data model.
#
# @!attribute [rw] cpu_percent
#   @return [Float, nil]
#
# @!attribute [rw] cpu_usage
#   @return [Integer, nil]
#
# @!attribute [rw] cpu_usage_total
#   @return [Integer, nil]
#
# @!attribute [rw] deletion_cost
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] machine_id
#   @return [String]
#
# @!attribute [rw] memory_usage_mb
#   @return [Float, nil]
#
# @!attribute [rw] memory_usage_percent
#   @return [Float, nil]
#
# @!attribute [rw] pulling_progress
#   @return [Float, nil]
#
# @!attribute [rw] ready
#   @return [Boolean, nil]
#
# @!attribute [rw] ssh_host_key_fingerprint
#   @return [String, nil]
#
# @!attribute [rw] ssh_ip
#   @return [String, nil]
#
# @!attribute [rw] ssh_port
#   @return [Integer, nil]
#
# @!attribute [rw] started
#   @return [Boolean, nil]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] update_time
#   @return [String]
#
# @!attribute [rw] version
#   @return [Integer]
ContainerGroup = Struct.new(
  :cpu_percent,
  :cpu_usage,
  :cpu_usage_total,
  :deletion_cost,
  :id,
  :machine_id,
  :memory_usage_mb,
  :memory_usage_percent,
  :pulling_progress,
  :ready,
  :ssh_host_key_fingerprint,
  :ssh_ip,
  :ssh_port,
  :started,
  :state,
  :update_time,
  :version,
  keyword_init: true
)

# Request payload for ContainerGroup#load.
#
# @!attribute [rw] container_group_instance_id
#   @return [String]
#
# @!attribute [rw] container_id
#   @return [String]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ContainerGroupLoadMatch = Struct.new(
  :container_group_instance_id,
  :container_id,
  :organization_name,
  :project_id,
  keyword_init: true
)

# Request payload for ContainerGroup#create.
#
# @!attribute [rw] container_id
#   @return [String]
#
# @!attribute [rw] instance_id
#   @return [String]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] cpu_percent
#   @return [Float, nil]
#
# @!attribute [rw] cpu_usage
#   @return [Integer, nil]
#
# @!attribute [rw] cpu_usage_total
#   @return [Integer, nil]
#
# @!attribute [rw] deletion_cost
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] machine_id
#   @return [String]
#
# @!attribute [rw] memory_usage_mb
#   @return [Float, nil]
#
# @!attribute [rw] memory_usage_percent
#   @return [Float, nil]
#
# @!attribute [rw] pulling_progress
#   @return [Float, nil]
#
# @!attribute [rw] ready
#   @return [Boolean, nil]
#
# @!attribute [rw] ssh_host_key_fingerprint
#   @return [String, nil]
#
# @!attribute [rw] ssh_ip
#   @return [String, nil]
#
# @!attribute [rw] ssh_port
#   @return [Integer, nil]
#
# @!attribute [rw] started
#   @return [Boolean, nil]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] update_time
#   @return [String]
#
# @!attribute [rw] version
#   @return [Integer]
ContainerGroupCreateData = Struct.new(
  :container_id,
  :instance_id,
  :organization_name,
  :project_id,
  :cpu_percent,
  :cpu_usage,
  :cpu_usage_total,
  :deletion_cost,
  :id,
  :machine_id,
  :memory_usage_mb,
  :memory_usage_percent,
  :pulling_progress,
  :ready,
  :ssh_host_key_fingerprint,
  :ssh_ip,
  :ssh_port,
  :started,
  :state,
  :update_time,
  :version,
  keyword_init: true
)

# ContainerGroupInstance entity data model.
#
# @!attribute [rw] cpu_percent
#   @return [Float, nil]
#
# @!attribute [rw] cpu_usage
#   @return [Integer, nil]
#
# @!attribute [rw] cpu_usage_total
#   @return [Integer, nil]
#
# @!attribute [rw] deletion_cost
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] machine_id
#   @return [String]
#
# @!attribute [rw] memory_usage_mb
#   @return [Float, nil]
#
# @!attribute [rw] memory_usage_percent
#   @return [Float, nil]
#
# @!attribute [rw] pulling_progress
#   @return [Float, nil]
#
# @!attribute [rw] ready
#   @return [Boolean, nil]
#
# @!attribute [rw] ssh_host_key_fingerprint
#   @return [String, nil]
#
# @!attribute [rw] ssh_ip
#   @return [String, nil]
#
# @!attribute [rw] ssh_port
#   @return [Integer, nil]
#
# @!attribute [rw] started
#   @return [Boolean, nil]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] update_time
#   @return [String]
#
# @!attribute [rw] version
#   @return [Integer]
ContainerGroupInstance = Struct.new(
  :cpu_percent,
  :cpu_usage,
  :cpu_usage_total,
  :deletion_cost,
  :id,
  :machine_id,
  :memory_usage_mb,
  :memory_usage_percent,
  :pulling_progress,
  :ready,
  :ssh_host_key_fingerprint,
  :ssh_ip,
  :ssh_port,
  :started,
  :state,
  :update_time,
  :version,
  keyword_init: true
)

# Request payload for ContainerGroupInstance#list.
#
# @!attribute [rw] container_group_name
#   @return [String]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
ContainerGroupInstanceListMatch = Struct.new(
  :container_group_name,
  :organization_name,
  :project_id,
  keyword_init: true
)

# Request payload for ContainerGroupInstance#update.
#
# @!attribute [rw] container_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] cpu_percent
#   @return [Float, nil]
#
# @!attribute [rw] cpu_usage
#   @return [Integer, nil]
#
# @!attribute [rw] cpu_usage_total
#   @return [Integer, nil]
#
# @!attribute [rw] deletion_cost
#   @return [Integer, nil]
#
# @!attribute [rw] machine_id
#   @return [String, nil]
#
# @!attribute [rw] memory_usage_mb
#   @return [Float, nil]
#
# @!attribute [rw] memory_usage_percent
#   @return [Float, nil]
#
# @!attribute [rw] pulling_progress
#   @return [Float, nil]
#
# @!attribute [rw] ready
#   @return [Boolean, nil]
#
# @!attribute [rw] ssh_host_key_fingerprint
#   @return [String, nil]
#
# @!attribute [rw] ssh_ip
#   @return [String, nil]
#
# @!attribute [rw] ssh_port
#   @return [Integer, nil]
#
# @!attribute [rw] started
#   @return [Boolean, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] update_time
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
ContainerGroupInstanceUpdateData = Struct.new(
  :container_id,
  :id,
  :organization_name,
  :project_id,
  :cpu_percent,
  :cpu_usage,
  :cpu_usage_total,
  :deletion_cost,
  :machine_id,
  :memory_usage_mb,
  :memory_usage_percent,
  :pulling_progress,
  :ready,
  :ssh_host_key_fingerprint,
  :ssh_ip,
  :ssh_port,
  :started,
  :state,
  :update_time,
  :version,
  keyword_init: true
)

# CpuAvailability entity data model.
#
# @!attribute [rw] available_cpu_batch
#   @return [Integer, nil]
#
# @!attribute [rw] country_codes
#   @return [Array, nil]
#
# @!attribute [rw] cpu
#   @return [Integer, nil]
#
# @!attribute [rw] memory
#   @return [Integer, nil]
#
# @!attribute [rw] on_call_cpu
#   @return [Integer, nil]
#
# @!attribute [rw] storage_amount
#   @return [Integer, nil]
CpuAvailability = Struct.new(
  :available_cpu_batch,
  :country_codes,
  :cpu,
  :memory,
  :on_call_cpu,
  :storage_amount,
  keyword_init: true
)

# Request payload for CpuAvailability#create.
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] available_cpu_batch
#   @return [Integer, nil]
#
# @!attribute [rw] country_codes
#   @return [Array, nil]
#
# @!attribute [rw] cpu
#   @return [Integer, nil]
#
# @!attribute [rw] memory
#   @return [Integer, nil]
#
# @!attribute [rw] on_call_cpu
#   @return [Integer, nil]
#
# @!attribute [rw] storage_amount
#   @return [Integer, nil]
CpuAvailabilityCreateData = Struct.new(
  :organization_name,
  :available_cpu_batch,
  :country_codes,
  :cpu,
  :memory,
  :on_call_cpu,
  :storage_amount,
  keyword_init: true
)

# GpuAvailability entity data model.
#
# @!attribute [rw] available_gpu_batch
#   @return [Integer, nil]
#
# @!attribute [rw] available_gpu_high
#   @return [Integer, nil]
#
# @!attribute [rw] available_gpu_low
#   @return [Integer, nil]
#
# @!attribute [rw] available_gpu_medium
#   @return [Integer, nil]
#
# @!attribute [rw] country_codes
#   @return [Array, nil]
#
# @!attribute [rw] cpu
#   @return [Integer, nil]
#
# @!attribute [rw] gpu_classes
#   @return [Array]
#
# @!attribute [rw] memory
#   @return [Integer, nil]
#
# @!attribute [rw] on_call_gpu
#   @return [Integer, nil]
#
# @!attribute [rw] storage_amount
#   @return [Integer, nil]
GpuAvailability = Struct.new(
  :available_gpu_batch,
  :available_gpu_high,
  :available_gpu_low,
  :available_gpu_medium,
  :country_codes,
  :cpu,
  :gpu_classes,
  :memory,
  :on_call_gpu,
  :storage_amount,
  keyword_init: true
)

# Request payload for GpuAvailability#create.
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] available_gpu_batch
#   @return [Integer, nil]
#
# @!attribute [rw] available_gpu_high
#   @return [Integer, nil]
#
# @!attribute [rw] available_gpu_low
#   @return [Integer, nil]
#
# @!attribute [rw] available_gpu_medium
#   @return [Integer, nil]
#
# @!attribute [rw] country_codes
#   @return [Array, nil]
#
# @!attribute [rw] cpu
#   @return [Integer, nil]
#
# @!attribute [rw] gpu_classes
#   @return [Array]
#
# @!attribute [rw] memory
#   @return [Integer, nil]
#
# @!attribute [rw] on_call_gpu
#   @return [Integer, nil]
#
# @!attribute [rw] storage_amount
#   @return [Integer, nil]
GpuAvailabilityCreateData = Struct.new(
  :organization_name,
  :available_gpu_batch,
  :available_gpu_high,
  :available_gpu_low,
  :available_gpu_medium,
  :country_codes,
  :cpu,
  :gpu_classes,
  :memory,
  :on_call_gpu,
  :storage_amount,
  keyword_init: true
)

# GpuClass entity data model.
#
# @!attribute [rw] gpu_class_type
#   @return [String, nil]
#
# @!attribute [rw] gpu_count
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] is_high_demand
#   @return [Boolean, nil]
#
# @!attribute [rw] max_ram
#   @return [Integer, nil]
#
# @!attribute [rw] max_storage
#   @return [Integer, nil]
#
# @!attribute [rw] max_vcpu
#   @return [Integer, nil]
#
# @!attribute [rw] min_ram
#   @return [Integer, nil]
#
# @!attribute [rw] min_storage
#   @return [Integer, nil]
#
# @!attribute [rw] min_vcpu
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] prices
#   @return [Array]
GpuClass = Struct.new(
  :gpu_class_type,
  :gpu_count,
  :id,
  :is_high_demand,
  :max_ram,
  :max_storage,
  :max_vcpu,
  :min_ram,
  :min_storage,
  :min_vcpu,
  :name,
  :prices,
  keyword_init: true
)

# Request payload for GpuClass#list.
#
# @!attribute [rw] organization_name
#   @return [String]
GpuClassListMatch = Struct.new(
  :organization_name,
  keyword_init: true
)

# InferenceEndpoint entity data model.
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] display_name
#   @return [String]
#
# @!attribute [rw] icon_url
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] input_schema
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] output_schema
#   @return [String]
#
# @!attribute [rw] price_description
#   @return [String]
#
# @!attribute [rw] readme
#   @return [String]
InferenceEndpoint = Struct.new(
  :description,
  :display_name,
  :icon_url,
  :id,
  :input_schema,
  :name,
  :organization_name,
  :output_schema,
  :price_description,
  :readme,
  keyword_init: true
)

# Request payload for InferenceEndpoint#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_name
#   @return [String]
InferenceEndpointLoadMatch = Struct.new(
  :id,
  :organization_name,
  keyword_init: true
)

# Request payload for InferenceEndpoint#list.
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
InferenceEndpointListMatch = Struct.new(
  :organization_name,
  :page,
  :page_size,
  keyword_init: true
)

# Request payload for InferenceEndpoint#remove.
#
# @!attribute [rw] inference_endpoint_id
#   @return [String]
#
# @!attribute [rw] inference_endpoint_job_id
#   @return [String]
#
# @!attribute [rw] organization_name
#   @return [String]
InferenceEndpointRemoveMatch = Struct.new(
  :inference_endpoint_id,
  :inference_endpoint_job_id,
  :organization_name,
  keyword_init: true
)

# InferenceEndpointJob entity data model.
#
# @!attribute [rw] create_time
#   @return [String]
#
# @!attribute [rw] events
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] inference_endpoint_name
#   @return [String]
#
# @!attribute [rw] input
#   @return [Object]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] output
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] update_time
#   @return [String]
#
# @!attribute [rw] webhook
#   @return [String, nil]
#
# @!attribute [rw] webhook_url
#   @return [String, nil]
InferenceEndpointJob = Struct.new(
  :create_time,
  :events,
  :id,
  :inference_endpoint_name,
  :input,
  :metadata,
  :organization_name,
  :output,
  :status,
  :update_time,
  :webhook,
  :webhook_url,
  keyword_init: true
)

# Request payload for InferenceEndpointJob#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] inference_endpoint_id
#   @return [String]
#
# @!attribute [rw] organization_name
#   @return [String]
InferenceEndpointJobLoadMatch = Struct.new(
  :id,
  :inference_endpoint_id,
  :organization_name,
  keyword_init: true
)

# Request payload for InferenceEndpointJob#create.
#
# @!attribute [rw] inference_endpoint_name
#   @return [String]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] create_time
#   @return [String]
#
# @!attribute [rw] events
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] input
#   @return [Object]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] output
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] update_time
#   @return [String]
#
# @!attribute [rw] webhook
#   @return [String, nil]
#
# @!attribute [rw] webhook_url
#   @return [String, nil]
InferenceEndpointJobCreateData = Struct.new(
  :inference_endpoint_name,
  :organization_name,
  :create_time,
  :events,
  :id,
  :input,
  :metadata,
  :output,
  :status,
  :update_time,
  :webhook,
  :webhook_url,
  keyword_init: true
)

# InferenceEndpointJobCollection entity data model.
#
# @!attribute [rw] create_time
#   @return [String]
#
# @!attribute [rw] events
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] inference_endpoint_name
#   @return [String]
#
# @!attribute [rw] input
#   @return [Object]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] output
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] update_time
#   @return [String]
#
# @!attribute [rw] webhook
#   @return [String, nil]
#
# @!attribute [rw] webhook_url
#   @return [String, nil]
InferenceEndpointJobCollection = Struct.new(
  :create_time,
  :events,
  :id,
  :inference_endpoint_name,
  :input,
  :metadata,
  :organization_name,
  :output,
  :status,
  :update_time,
  :webhook,
  :webhook_url,
  keyword_init: true
)

# Request payload for InferenceEndpointJobCollection#list.
#
# @!attribute [rw] inference_endpoint_name
#   @return [String]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
InferenceEndpointJobCollectionListMatch = Struct.new(
  :inference_endpoint_name,
  :organization_name,
  :page,
  :page_size,
  keyword_init: true
)

# LogEntry entity data model.
#
# @!attribute [rw] end_time
#   @return [String]
#
# @!attribute [rw] items
#   @return [Array]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] page_max_time
#   @return [String]
#
# @!attribute [rw] page_min_time
#   @return [String]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
#
# @!attribute [rw] query
#   @return [String]
#
# @!attribute [rw] sort_order
#   @return [String, nil]
#
# @!attribute [rw] start_time
#   @return [String]
LogEntry = Struct.new(
  :end_time,
  :items,
  :organization_name,
  :page_max_time,
  :page_min_time,
  :page_size,
  :query,
  :sort_order,
  :start_time,
  keyword_init: true
)

# Request payload for LogEntry#create.
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] end_time
#   @return [String]
#
# @!attribute [rw] items
#   @return [Array]
#
# @!attribute [rw] page_max_time
#   @return [String]
#
# @!attribute [rw] page_min_time
#   @return [String]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
#
# @!attribute [rw] query
#   @return [String]
#
# @!attribute [rw] sort_order
#   @return [String, nil]
#
# @!attribute [rw] start_time
#   @return [String]
LogEntryCreateData = Struct.new(
  :organization_name,
  :end_time,
  :items,
  :page_max_time,
  :page_min_time,
  :page_size,
  :query,
  :sort_order,
  :start_time,
  keyword_init: true
)

# Queue entity data model.
#
# @!attribute [rw] container_groups
#   @return [Array]
#
# @!attribute [rw] create_time
#   @return [String]
#
# @!attribute [rw] current_queue_length
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] display_name
#   @return [String]
#
# @!attribute [rw] events
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] input
#   @return [Object]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] output
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] update_time
#   @return [String]
#
# @!attribute [rw] webhook
#   @return [String, nil]
QueueType = Struct.new(
  :container_groups,
  :create_time,
  :current_queue_length,
  :description,
  :display_name,
  :events,
  :id,
  :input,
  :metadata,
  :name,
  :output,
  :status,
  :update_time,
  :webhook,
  keyword_init: true
)

# Request payload for Queue#load.
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] queue_id
#   @return [String, nil]
#
# @!attribute [rw] queue_job_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
QueueLoadMatch = Struct.new(
  :organization_name,
  :project_id,
  :queue_id,
  :queue_job_id,
  :id,
  keyword_init: true
)

# Request payload for Queue#list.
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] project_name
#   @return [String]
QueueListMatch = Struct.new(
  :organization_name,
  :project_name,
  keyword_init: true
)

# Request payload for Queue#create.
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] project_name
#   @return [String]
#
# @!attribute [rw] container_groups
#   @return [Array]
#
# @!attribute [rw] create_time
#   @return [String]
#
# @!attribute [rw] current_queue_length
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] display_name
#   @return [String]
#
# @!attribute [rw] events
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] input
#   @return [Object]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] output
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] update_time
#   @return [String]
#
# @!attribute [rw] webhook
#   @return [String, nil]
QueueCreateData = Struct.new(
  :organization_name,
  :project_name,
  :container_groups,
  :create_time,
  :current_queue_length,
  :description,
  :display_name,
  :events,
  :id,
  :input,
  :metadata,
  :name,
  :output,
  :status,
  :update_time,
  :webhook,
  keyword_init: true
)

# Request payload for Queue#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] container_groups
#   @return [Array, nil]
#
# @!attribute [rw] create_time
#   @return [String, nil]
#
# @!attribute [rw] current_queue_length
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] display_name
#   @return [String, nil]
#
# @!attribute [rw] events
#   @return [Array, nil]
#
# @!attribute [rw] input
#   @return [Object, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] output
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] update_time
#   @return [String, nil]
#
# @!attribute [rw] webhook
#   @return [String, nil]
QueueUpdateData = Struct.new(
  :id,
  :organization_name,
  :project_id,
  :container_groups,
  :create_time,
  :current_queue_length,
  :description,
  :display_name,
  :events,
  :input,
  :metadata,
  :name,
  :output,
  :status,
  :update_time,
  :webhook,
  keyword_init: true
)

# Request payload for Queue#remove.
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] queue_id
#   @return [String, nil]
#
# @!attribute [rw] queue_job_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
QueueRemoveMatch = Struct.new(
  :organization_name,
  :project_id,
  :queue_id,
  :queue_job_id,
  :id,
  keyword_init: true
)

# Quota entity data model.
#
# @!attribute [rw] container_groups_quotas
#   @return [Hash]
#
# @!attribute [rw] create_time
#   @return [String, nil]
#
# @!attribute [rw] update_time
#   @return [String, nil]
Quota = Struct.new(
  :container_groups_quotas,
  :create_time,
  :update_time,
  keyword_init: true
)

# Request payload for Quota#load.
#
# @!attribute [rw] organization_name
#   @return [String]
QuotaLoadMatch = Struct.new(
  :organization_name,
  keyword_init: true
)

# SystemLog entity data model.
#
# @!attribute [rw] event_name
#   @return [String]
#
# @!attribute [rw] event_time
#   @return [String]
#
# @!attribute [rw] instance_id
#   @return [String, nil]
#
# @!attribute [rw] machine_id
#   @return [String, nil]
#
# @!attribute [rw] resource_cpu
#   @return [Object]
#
# @!attribute [rw] resource_gpu_class
#   @return [String]
#
# @!attribute [rw] resource_memory
#   @return [Object]
#
# @!attribute [rw] resource_storage_amount
#   @return [Object]
#
# @!attribute [rw] version
#   @return [String]
SystemLog = Struct.new(
  :event_name,
  :event_time,
  :instance_id,
  :machine_id,
  :resource_cpu,
  :resource_gpu_class,
  :resource_memory,
  :resource_storage_amount,
  :version,
  keyword_init: true
)

# Request payload for SystemLog#list.
#
# @!attribute [rw] container_group_name
#   @return [String]
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
SystemLogListMatch = Struct.new(
  :container_group_name,
  :organization_name,
  :project_id,
  keyword_init: true
)

# WebhookSecretKey entity data model.
#
# @!attribute [rw] secret_key
#   @return [String]
WebhookSecretKey = Struct.new(
  :secret_key,
  keyword_init: true
)

# Request payload for WebhookSecretKey#load.
#
# @!attribute [rw] organization_name
#   @return [String]
WebhookSecretKeyLoadMatch = Struct.new(
  :organization_name,
  keyword_init: true
)

# Request payload for WebhookSecretKey#create.
#
# @!attribute [rw] organization_name
#   @return [String]
#
# @!attribute [rw] secret_key
#   @return [String]
WebhookSecretKeyCreateData = Struct.new(
  :organization_name,
  :secret_key,
  keyword_init: true
)

