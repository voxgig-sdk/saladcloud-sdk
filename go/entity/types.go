// Typed models for the Saladcloud SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/saladcloud-sdk/go/core"
)

// Container is the typed data model for the container entity.
type Container struct {
}

// ContainerLoadMatch is the typed request payload for Container.LoadTyped.
type ContainerLoadMatch struct {
	Id string `json:"id"`
	OrganizationName string `json:"organization_name"`
	ProjectId string `json:"project_id"`
}

// ContainerListMatch is the typed request payload for Container.ListTyped.
type ContainerListMatch struct {
	OrganizationName string `json:"organization_name"`
	ProjectName string `json:"project_name"`
}

// ContainerCreateData is the typed request payload for Container.CreateTyped.
type ContainerCreateData struct {
	OrganizationName string `json:"organization_name"`
	ProjectName string `json:"project_name"`
	AutostartPolicy bool `json:"autostart_policy"`
	Container map[string]any `json:"container"`
	CountryCodes []any `json:"country_codes"`
	CreateTime string `json:"create_time"`
	CurrentState map[string]any `json:"current_state"`
	DisplayName string `json:"display_name"`
	Id string `json:"id"`
	LivenessProbe any `json:"liveness_probe"`
	Name string `json:"name"`
	Networking map[string]any `json:"networking"`
	PendingChange bool `json:"pending_change"`
	Priority any `json:"priority"`
	QueueAutoscaler map[string]any `json:"queue_autoscaler"`
	QueueConnection map[string]any `json:"queue_connection"`
	ReadinessProbe any `json:"readiness_probe"`
	Readme *string `json:"readme,omitempty"`
	Replicas int `json:"replicas"`
	RestartPolicy string `json:"restart_policy"`
	Scalingactions []any `json:"scalingactions"`
	Scheduledscalingenabled bool `json:"scheduledscalingenabled"`
	StartupProbe any `json:"startup_probe"`
	UpdateTime string `json:"update_time"`
	Version int `json:"version"`
}

// ContainerUpdateData is the typed request payload for Container.UpdateTyped.
type ContainerUpdateData struct {
	Id string `json:"id"`
	OrganizationName string `json:"organization_name"`
	ProjectId string `json:"project_id"`
	AutostartPolicy *bool `json:"autostart_policy,omitempty"`
	Container *map[string]any `json:"container,omitempty"`
	CountryCodes *[]any `json:"country_codes,omitempty"`
	CreateTime *string `json:"create_time,omitempty"`
	CurrentState *map[string]any `json:"current_state,omitempty"`
	DisplayName *string `json:"display_name,omitempty"`
	LivenessProbe *any `json:"liveness_probe,omitempty"`
	Name *string `json:"name,omitempty"`
	Networking *map[string]any `json:"networking,omitempty"`
	PendingChange *bool `json:"pending_change,omitempty"`
	Priority *any `json:"priority,omitempty"`
	ProjectName *string `json:"project_name,omitempty"`
	QueueAutoscaler *map[string]any `json:"queue_autoscaler,omitempty"`
	QueueConnection *map[string]any `json:"queue_connection,omitempty"`
	ReadinessProbe *any `json:"readiness_probe,omitempty"`
	Readme *string `json:"readme,omitempty"`
	Replicas *int `json:"replicas,omitempty"`
	RestartPolicy *string `json:"restart_policy,omitempty"`
	Scalingactions *[]any `json:"scalingactions,omitempty"`
	Scheduledscalingenabled *bool `json:"scheduledscalingenabled,omitempty"`
	StartupProbe *any `json:"startup_probe,omitempty"`
	UpdateTime *string `json:"update_time,omitempty"`
	Version *int `json:"version,omitempty"`
}

// ContainerRemoveMatch is the typed request payload for Container.RemoveTyped.
type ContainerRemoveMatch struct {
	Id string `json:"id"`
	OrganizationName string `json:"organization_name"`
	ProjectId string `json:"project_id"`
}

// ContainerGroup is the typed data model for the container_group entity.
type ContainerGroup struct {
}

// ContainerGroupLoadMatch is the typed request payload for ContainerGroup.LoadTyped.
type ContainerGroupLoadMatch struct {
	ContainerGroupInstanceId string `json:"container_group_instance_id"`
	ContainerId string `json:"container_id"`
	OrganizationName string `json:"organization_name"`
	ProjectId string `json:"project_id"`
}

// ContainerGroupCreateData is the typed request payload for ContainerGroup.CreateTyped.
type ContainerGroupCreateData struct {
	ContainerId string `json:"container_id"`
	InstanceId string `json:"instance_id"`
	OrganizationName string `json:"organization_name"`
	ProjectId string `json:"project_id"`
	CpuPercent *float64 `json:"cpu_percent,omitempty"`
	CpuUsage *int `json:"cpu_usage,omitempty"`
	CpuUsageTotal *int `json:"cpu_usage_total,omitempty"`
	DeletionCost *int `json:"deletion_cost,omitempty"`
	Id string `json:"id"`
	MachineId string `json:"machine_id"`
	MemoryUsageMb *float64 `json:"memory_usage_mb,omitempty"`
	MemoryUsagePercent *float64 `json:"memory_usage_percent,omitempty"`
	PullingProgress *float64 `json:"pulling_progress,omitempty"`
	Ready *bool `json:"ready,omitempty"`
	SshHostKeyFingerprint *string `json:"ssh_host_key_fingerprint,omitempty"`
	SshIp *string `json:"ssh_ip,omitempty"`
	SshPort *int `json:"ssh_port,omitempty"`
	Started *bool `json:"started,omitempty"`
	State string `json:"state"`
	UpdateTime string `json:"update_time"`
	Version int `json:"version"`
}

// ContainerGroupInstance is the typed data model for the container_group_instance entity.
type ContainerGroupInstance struct {
}

// ContainerGroupInstanceListMatch is the typed request payload for ContainerGroupInstance.ListTyped.
type ContainerGroupInstanceListMatch struct {
	ContainerGroupName string `json:"container_group_name"`
	OrganizationName string `json:"organization_name"`
	ProjectId string `json:"project_id"`
}

// ContainerGroupInstanceUpdateData is the typed request payload for ContainerGroupInstance.UpdateTyped.
type ContainerGroupInstanceUpdateData struct {
	ContainerId string `json:"container_id"`
	Id string `json:"id"`
	OrganizationName string `json:"organization_name"`
	ProjectId string `json:"project_id"`
	CpuPercent *float64 `json:"cpu_percent,omitempty"`
	CpuUsage *int `json:"cpu_usage,omitempty"`
	CpuUsageTotal *int `json:"cpu_usage_total,omitempty"`
	DeletionCost *int `json:"deletion_cost,omitempty"`
	MachineId *string `json:"machine_id,omitempty"`
	MemoryUsageMb *float64 `json:"memory_usage_mb,omitempty"`
	MemoryUsagePercent *float64 `json:"memory_usage_percent,omitempty"`
	PullingProgress *float64 `json:"pulling_progress,omitempty"`
	Ready *bool `json:"ready,omitempty"`
	SshHostKeyFingerprint *string `json:"ssh_host_key_fingerprint,omitempty"`
	SshIp *string `json:"ssh_ip,omitempty"`
	SshPort *int `json:"ssh_port,omitempty"`
	Started *bool `json:"started,omitempty"`
	State *string `json:"state,omitempty"`
	UpdateTime *string `json:"update_time,omitempty"`
	Version *int `json:"version,omitempty"`
}

// CpuAvailability is the typed data model for the cpu_availability entity.
type CpuAvailability struct {
}

// CpuAvailabilityCreateData is the typed request payload for CpuAvailability.CreateTyped.
type CpuAvailabilityCreateData struct {
	OrganizationName string `json:"organization_name"`
	AvailableCpuBatch *int `json:"available_cpu_batch,omitempty"`
	CountryCodes *[]any `json:"country_codes,omitempty"`
	Cpu *int `json:"cpu,omitempty"`
	Memory *int `json:"memory,omitempty"`
	OnCallCpu *int `json:"on_call_cpu,omitempty"`
	StorageAmount *int `json:"storage_amount,omitempty"`
}

// GpuAvailability is the typed data model for the gpu_availability entity.
type GpuAvailability struct {
}

// GpuAvailabilityCreateData is the typed request payload for GpuAvailability.CreateTyped.
type GpuAvailabilityCreateData struct {
	OrganizationName string `json:"organization_name"`
	AvailableGpuBatch *int `json:"available_gpu_batch,omitempty"`
	AvailableGpuHigh *int `json:"available_gpu_high,omitempty"`
	AvailableGpuLow *int `json:"available_gpu_low,omitempty"`
	AvailableGpuMedium *int `json:"available_gpu_medium,omitempty"`
	CountryCodes *[]any `json:"country_codes,omitempty"`
	Cpu *int `json:"cpu,omitempty"`
	GpuClasses []any `json:"gpu_classes"`
	Memory *int `json:"memory,omitempty"`
	OnCallGpu *int `json:"on_call_gpu,omitempty"`
	StorageAmount *int `json:"storage_amount,omitempty"`
}

// GpuClass is the typed data model for the gpu_class entity.
type GpuClass struct {
}

// GpuClassListMatch is the typed request payload for GpuClass.ListTyped.
type GpuClassListMatch struct {
	OrganizationName string `json:"organization_name"`
}

// InferenceEndpoint is the typed data model for the inference_endpoint entity.
type InferenceEndpoint struct {
}

// InferenceEndpointLoadMatch is the typed request payload for InferenceEndpoint.LoadTyped.
type InferenceEndpointLoadMatch struct {
	Id string `json:"id"`
	OrganizationName string `json:"organization_name"`
}

// InferenceEndpointListMatch is the typed request payload for InferenceEndpoint.ListTyped.
type InferenceEndpointListMatch struct {
	OrganizationName string `json:"organization_name"`
	Page *int `json:"page,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
}

// InferenceEndpointRemoveMatch is the typed request payload for InferenceEndpoint.RemoveTyped.
type InferenceEndpointRemoveMatch struct {
	InferenceEndpointId string `json:"inference_endpoint_id"`
	InferenceEndpointJobId string `json:"inference_endpoint_job_id"`
	OrganizationName string `json:"organization_name"`
}

// InferenceEndpointJob is the typed data model for the inference_endpoint_job entity.
type InferenceEndpointJob struct {
}

// InferenceEndpointJobLoadMatch is the typed request payload for InferenceEndpointJob.LoadTyped.
type InferenceEndpointJobLoadMatch struct {
	Id string `json:"id"`
	InferenceEndpointId string `json:"inference_endpoint_id"`
	OrganizationName string `json:"organization_name"`
}

// InferenceEndpointJobCreateData is the typed request payload for InferenceEndpointJob.CreateTyped.
type InferenceEndpointJobCreateData struct {
	InferenceEndpointName string `json:"inference_endpoint_name"`
	OrganizationName string `json:"organization_name"`
	CreateTime string `json:"create_time"`
	Events []any `json:"events"`
	Id string `json:"id"`
	Input any `json:"input"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Output *any `json:"output,omitempty"`
	Status string `json:"status"`
	UpdateTime string `json:"update_time"`
	Webhook *string `json:"webhook,omitempty"`
	WebhookUrl *string `json:"webhook_url,omitempty"`
}

// InferenceEndpointJobCollection is the typed data model for the inference_endpoint_job_collection entity.
type InferenceEndpointJobCollection struct {
}

// InferenceEndpointJobCollectionListMatch is the typed request payload for InferenceEndpointJobCollection.ListTyped.
type InferenceEndpointJobCollectionListMatch struct {
	InferenceEndpointName string `json:"inference_endpoint_name"`
	OrganizationName string `json:"organization_name"`
	Page *int `json:"page,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
}

// LogEntry is the typed data model for the log_entry entity.
type LogEntry struct {
}

// LogEntryCreateData is the typed request payload for LogEntry.CreateTyped.
type LogEntryCreateData struct {
	OrganizationName string `json:"organization_name"`
	EndTime string `json:"end_time"`
	Items []any `json:"items"`
	PageMaxTime string `json:"page_max_time"`
	PageMinTime string `json:"page_min_time"`
	PageSize *int `json:"page_size,omitempty"`
	Query string `json:"query"`
	SortOrder *string `json:"sort_order,omitempty"`
	StartTime string `json:"start_time"`
}

// Queue is the typed data model for the queue entity.
type Queue struct {
}

// QueueLoadMatch is the typed request payload for Queue.LoadTyped.
type QueueLoadMatch struct {
	OrganizationName string `json:"organization_name"`
	ProjectId string `json:"project_id"`
	QueueId *string `json:"queue_id,omitempty"`
	QueueJobId *string `json:"queue_job_id,omitempty"`
	Id *string `json:"id,omitempty"`
}

// QueueListMatch is the typed request payload for Queue.ListTyped.
type QueueListMatch struct {
	OrganizationName string `json:"organization_name"`
	ProjectName string `json:"project_name"`
}

// QueueCreateData is the typed request payload for Queue.CreateTyped.
type QueueCreateData struct {
	OrganizationName string `json:"organization_name"`
	ProjectName string `json:"project_name"`
	ContainerGroups []any `json:"container_groups"`
	CreateTime string `json:"create_time"`
	CurrentQueueLength *int `json:"current_queue_length,omitempty"`
	Description *string `json:"description,omitempty"`
	DisplayName string `json:"display_name"`
	Events []any `json:"events"`
	Id string `json:"id"`
	Input any `json:"input"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Name string `json:"name"`
	Output *any `json:"output,omitempty"`
	Status string `json:"status"`
	UpdateTime string `json:"update_time"`
	Webhook *string `json:"webhook,omitempty"`
}

// QueueUpdateData is the typed request payload for Queue.UpdateTyped.
type QueueUpdateData struct {
	Id string `json:"id"`
	OrganizationName string `json:"organization_name"`
	ProjectId string `json:"project_id"`
	ContainerGroups *[]any `json:"container_groups,omitempty"`
	CreateTime *string `json:"create_time,omitempty"`
	CurrentQueueLength *int `json:"current_queue_length,omitempty"`
	Description *string `json:"description,omitempty"`
	DisplayName *string `json:"display_name,omitempty"`
	Events *[]any `json:"events,omitempty"`
	Input *any `json:"input,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Name *string `json:"name,omitempty"`
	Output *any `json:"output,omitempty"`
	Status *string `json:"status,omitempty"`
	UpdateTime *string `json:"update_time,omitempty"`
	Webhook *string `json:"webhook,omitempty"`
}

// QueueRemoveMatch is the typed request payload for Queue.RemoveTyped.
type QueueRemoveMatch struct {
	OrganizationName string `json:"organization_name"`
	ProjectId string `json:"project_id"`
	QueueId *string `json:"queue_id,omitempty"`
	QueueJobId *string `json:"queue_job_id,omitempty"`
	Id *string `json:"id,omitempty"`
}

// Quota is the typed data model for the quota entity.
type Quota struct {
}

// QuotaLoadMatch is the typed request payload for Quota.LoadTyped.
type QuotaLoadMatch struct {
	OrganizationName string `json:"organization_name"`
}

// SystemLog is the typed data model for the system_log entity.
type SystemLog struct {
}

// SystemLogListMatch is the typed request payload for SystemLog.ListTyped.
type SystemLogListMatch struct {
	ContainerGroupName string `json:"container_group_name"`
	OrganizationName string `json:"organization_name"`
	ProjectId string `json:"project_id"`
}

// WebhookSecretKey is the typed data model for the webhook_secret_key entity.
type WebhookSecretKey struct {
}

// WebhookSecretKeyLoadMatch is the typed request payload for WebhookSecretKey.LoadTyped.
type WebhookSecretKeyLoadMatch struct {
	OrganizationName string `json:"organization_name"`
}

// WebhookSecretKeyCreateData is the typed request payload for WebhookSecretKey.CreateTyped.
type WebhookSecretKeyCreateData struct {
	OrganizationName string `json:"organization_name"`
	SecretKey string `json:"secret_key"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
