package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Saladcloud",
			"slug": "saladcloud",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.salad.com/api/public",
			"auth": map[string]any{
				"prefix": "",
				"name": "Salad-Api-Key",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"container": map[string]any{},
				"container_group": map[string]any{},
				"container_group_instance": map[string]any{},
				"cpu_availability": map[string]any{},
				"gpu_availability": map[string]any{},
				"gpu_class": map[string]any{},
				"inference_endpoint": map[string]any{},
				"inference_endpoint_job": map[string]any{},
				"inference_endpoint_job_collection": map[string]any{},
				"log_entry": map[string]any{},
				"queue": map[string]any{},
				"quota": map[string]any{},
				"system_log": map[string]any{},
				"webhook_secret_key": map[string]any{},
			},
		},
		"entity": map[string]any{
			"container": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "autostart_policy",
						"title": "Autostart Policy",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Defines whether containers in this group should automatically start when deployed (true) or require manual starting (false)",
					},
					map[string]any{
						"name": "container",
						"title": "Container",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Represents a container with its configuration and resource requirements.",
					},
					map[string]any{
						"name": "country_codes",
						"title": "Country Codes",
						"type": "`$ARRAY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ARRAY`",
							},
						},
						"short": "List of country codes where container instances are permitted to run.",
					},
					map[string]any{
						"name": "create_time",
						"title": "Create Time",
						"type": "`$STRING`",
						"req": true,
						"short": "ISO 8601 timestamp when this container group was initially created",
						"format": "date-time",
					},
					map[string]any{
						"name": "current_state",
						"title": "Current State",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Represents the operational state of a container group during its lifecycle, including timing information, status, and instance distribution metrics.",
					},
					map[string]any{
						"name": "display_name",
						"title": "Display Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The display-friendly name of the resource.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The container group identifier.",
						"format": "uuid",
					},
					map[string]any{
						"name": "liveness_probe",
						"title": "Liveness Probe",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Defines a liveness probe for container groups that determines when to restart a container if it becomes unhealthy",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The container group name.",
					},
					map[string]any{
						"name": "networking",
						"title": "Networking",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Network configuration for container groups that defines connectivity, routing, and access control settings",
					},
					map[string]any{
						"name": "organization_name",
						"title": "Organization Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The organization name.",
					},
					map[string]any{
						"name": "pending_change",
						"title": "Pending Change",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Indicates whether a configuration change has been requested but not yet applied to all containers in the group",
					},
					map[string]any{
						"name": "priority",
						"title": "Priority",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Specifies the priority level for container group execution, which determines resource allocation and scheduling precedence.",
					},
					map[string]any{
						"name": "project_name",
						"title": "Project Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The project name.",
					},
					map[string]any{
						"name": "queue_autoscaler",
						"title": "Queue Autoscaler",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Defines configuration for automatically scaling container instances based on queue length.",
					},
					map[string]any{
						"name": "queue_connection",
						"title": "Queue Connection",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Configuration for connecting a container group to a message queue system, enabling asynchronous communication between services.",
					},
					map[string]any{
						"name": "readiness_probe",
						"title": "Readiness Probe",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Defines how to check if a container is ready to serve traffic.",
					},
					map[string]any{
						"name": "readme",
						"title": "Readme",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "replicas",
						"title": "Replicas",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The container group replicas.",
						"format": "int32",
					},
					map[string]any{
						"name": "restart_policy",
						"title": "Restart Policy",
						"type": "`$STRING`",
						"req": true,
						"short": "Specifies the policy for restarting containers when they exit or fail.",
					},
					map[string]any{
						"name": "scalingactions",
						"title": "Scalingactions",
						"type": "`$ARRAY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ARRAY`",
							},
						},
						"short": "List of scaling actions configurations",
					},
					map[string]any{
						"name": "scheduledscalingenabled",
						"title": "Scheduledscalingenabled",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
						"short": "Indicates if scheduled scaling is enabled",
					},
					map[string]any{
						"name": "startup_probe",
						"title": "Startup Probe",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Defines a probe that checks if a container application has started successfully.",
					},
					map[string]any{
						"name": "update_time",
						"title": "Update Time",
						"type": "`$STRING`",
						"req": true,
						"short": "ISO 8601 timestamp when this container group was last updated",
						"format": "date-time",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Incremental version number that increases with each configuration change to the container group",
						"format": "int32",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "container",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/start",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "containers",
									},
									map[string]any{
										"var": "container_group_name",
									},
									map[string]any{
										"lit": "start",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"containers",
									"{container_group_name}",
									"start",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"project_name": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "container_group_name",
											"orig": "container_group_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "start",
									"exist": []any{
										"container_group_name",
										"organization_name",
										"project_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/stop",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "containers",
									},
									map[string]any{
										"var": "container_group_name",
									},
									map[string]any{
										"lit": "stop",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"containers",
									"{container_group_name}",
									"stop",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"project_name": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "container_group_name",
											"orig": "container_group_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "stop",
									"exist": []any{
										"container_group_name",
										"organization_name",
										"project_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organizations/{organization_name}/projects/{project_name}/containers",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_name",
									},
									map[string]any{
										"lit": "containers",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_name}",
									"containers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
										"container": "`reqdata`",
									},
									"res": "`body.container`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_name",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"organization_name",
										"project_name",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organizations/{organization_name}/projects/{project_name}/containers",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_name",
									},
									map[string]any{
										"lit": "containers",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_name}",
									"containers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_name",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"organization_name",
										"project_name",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "containers",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"containers",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"container_group_name": "id",
										"project_name": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.container`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "container_group_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"organization_name",
										"project_id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "containers",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"containers",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"container_group_name": "id",
										"project_name": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "container_group_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"organization_name",
										"project_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "containers",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"containers",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"container_group_name": "id",
										"project_name": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "container_group_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"organization_name",
										"project_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"container_group": map[string]any{
				"fields": []any{},
				"name": "container_group",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/reallocate",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "containers",
									},
									map[string]any{
										"var": "container_id",
									},
									map[string]any{
										"lit": "instances",
									},
									map[string]any{
										"var": "instance_id",
									},
									map[string]any{
										"lit": "reallocate",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"containers",
									"{container_id}",
									"instances",
									"{instance_id}",
									"reallocate",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"container_group_instance_id": "instance_id",
										"container_group_name": "container_id",
										"project_name": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "container_id",
											"orig": "container_group_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "instance_id",
											"orig": "container_group_instance_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "reallocate",
									"exist": []any{
										"container_id",
										"instance_id",
										"organization_name",
										"project_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/recreate",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "containers",
									},
									map[string]any{
										"var": "container_id",
									},
									map[string]any{
										"lit": "instances",
									},
									map[string]any{
										"var": "instance_id",
									},
									map[string]any{
										"lit": "recreate",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"containers",
									"{container_id}",
									"instances",
									"{instance_id}",
									"recreate",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"container_group_instance_id": "instance_id",
										"container_group_name": "container_id",
										"project_name": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "container_id",
											"orig": "container_group_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "instance_id",
											"orig": "container_group_instance_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "recreate",
									"exist": []any{
										"container_id",
										"instance_id",
										"organization_name",
										"project_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/restart",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "containers",
									},
									map[string]any{
										"var": "container_id",
									},
									map[string]any{
										"lit": "instances",
									},
									map[string]any{
										"var": "instance_id",
									},
									map[string]any{
										"lit": "restart",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"containers",
									"{container_id}",
									"instances",
									"{instance_id}",
									"restart",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"container_group_instance_id": "instance_id",
										"container_group_name": "container_id",
										"project_name": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "container_id",
											"orig": "container_group_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "instance_id",
											"orig": "container_group_instance_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "restart",
									"exist": []any{
										"container_id",
										"instance_id",
										"organization_name",
										"project_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "containers",
									},
									map[string]any{
										"var": "container_id",
									},
									map[string]any{
										"lit": "instances",
									},
									map[string]any{
										"var": "container_group_instance_id",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"containers",
									"{container_id}",
									"instances",
									"{container_group_instance_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"container_group_name": "container_id",
										"project_name": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "container_group_instance_id",
											"orig": "container_group_instance_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "container_id",
											"orig": "container_group_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"container_group_instance_id",
										"container_id",
										"organization_name",
										"project_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.container",
						},
					},
				},
			},
			"container_group_instance": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cpu_percent",
						"title": "Cpu Percent",
						"type": "`$NUMBER`",
						"short": "The percentage of CPU used by this container group instance.",
						"format": "float",
					},
					map[string]any{
						"name": "cpu_usage",
						"title": "Cpu Usage",
						"type": "`$INTEGER`",
						"short": "The total CPU usage in seconds for this container group instance.",
						"format": "int64",
					},
					map[string]any{
						"name": "cpu_usage_total",
						"title": "Cpu Usage Total",
						"type": "`$INTEGER`",
						"short": "The total CPU usage in seconds for this container group instance since it was started.",
						"format": "int64",
					},
					map[string]any{
						"name": "deletion_cost",
						"title": "Deletion Cost",
						"type": "`$INTEGER`",
						"short": "The cost of deleting the container group instance",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The container group instance identifier.",
						"format": "uuid",
					},
					map[string]any{
						"name": "machine_id",
						"title": "Machine Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The container group machine identifier.",
						"format": "uuid",
					},
					map[string]any{
						"name": "memory_usage_mb",
						"title": "Memory Usage Mb",
						"type": "`$NUMBER`",
						"short": "The memory usage in MB for this container group instance.",
						"format": "float",
					},
					map[string]any{
						"name": "memory_usage_percent",
						"title": "Memory Usage Percent",
						"type": "`$NUMBER`",
						"short": "The percentage of memory used by this container group instance.",
						"format": "float",
					},
					map[string]any{
						"name": "pulling_progress",
						"title": "Pulling Progress",
						"type": "`$NUMBER`",
						"short": "The progress percentage of pulling the container image.",
						"format": "float",
					},
					map[string]any{
						"name": "ready",
						"title": "Ready",
						"type": "`$BOOLEAN`",
						"short": "Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function.",
					},
					map[string]any{
						"name": "ssh_host_key_fingerprint",
						"title": "Ssh Host Key Fingerprint",
						"type": "`$STRING`",
						"short": "The SSH host key fingerprint of the container group instance",
					},
					map[string]any{
						"name": "ssh_ip",
						"title": "Ssh Ip",
						"type": "`$STRING`",
						"short": "The SSH IP address of the container group instance",
						"format": "ipv4",
					},
					map[string]any{
						"name": "ssh_port",
						"title": "Ssh Port",
						"type": "`$INTEGER`",
						"short": "The SSH port of the container group instance",
						"format": "int32",
					},
					map[string]any{
						"name": "started",
						"title": "Started",
						"type": "`$BOOLEAN`",
						"short": "Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes.",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
						"req": true,
						"short": "The state of the container group instance",
					},
					map[string]any{
						"name": "update_time",
						"title": "Update Time",
						"type": "`$STRING`",
						"req": true,
						"short": "The UTC timestamp when the container group instance last changed its state.",
						"format": "date-time",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The version of the container group definition currently running on this instance.",
						"format": "int32",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "container_group_instance",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "containers",
									},
									map[string]any{
										"var": "container_group_name",
									},
									map[string]any{
										"lit": "instances",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"containers",
									"{container_group_name}",
									"instances",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"project_name": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.instances`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "container_group_name",
											"orig": "container_group_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"container_group_name",
										"organization_name",
										"project_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "containers",
									},
									map[string]any{
										"var": "container_id",
									},
									map[string]any{
										"lit": "instances",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"containers",
									"{container_id}",
									"instances",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"container_group_instance_id": "id",
										"container_group_name": "container_id",
										"project_name": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "container_id",
											"orig": "container_group_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "container_group_instance_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"container_id",
										"id",
										"organization_name",
										"project_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.container",
						},
					},
				},
			},
			"cpu_availability": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "available_cpu_batch",
						"title": "Available Cpu Batch",
						"type": "`$INTEGER`",
						"short": "The number of available CPU cores",
						"format": "int32",
					},
					map[string]any{
						"name": "country_codes",
						"title": "Country Codes",
						"type": "`$ARRAY`",
						"short": "A list of country codes where the resources are available",
					},
					map[string]any{
						"name": "cpu",
						"title": "Cpu",
						"type": "`$INTEGER`",
						"short": "The number of available CPU cores",
						"format": "int32",
					},
					map[string]any{
						"name": "memory",
						"title": "Memory",
						"type": "`$INTEGER`",
						"short": "The amount of available memory in MB",
						"format": "int64",
					},
					map[string]any{
						"name": "on_call_cpu",
						"title": "On Call Cpu",
						"type": "`$INTEGER`",
						"short": "The amount of on-call CPU",
						"format": "int32",
					},
					map[string]any{
						"name": "storage_amount",
						"title": "Storage Amount",
						"type": "`$INTEGER`",
						"short": "The amount of available storage in bytes",
						"format": "int64",
					},
				},
				"name": "cpu_availability",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organizations/{organization_name}/availability/sce-cpu-availability",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "availability",
									},
									map[string]any{
										"lit": "sce-cpu-availability",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"availability",
									"sce-cpu-availability",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"organization_name",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"gpu_availability": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "available_gpu_batch",
						"title": "Available Gpu Batch",
						"type": "`$INTEGER`",
						"short": "The number of available GPU batches",
						"format": "int32",
					},
					map[string]any{
						"name": "available_gpu_high",
						"title": "Available Gpu High",
						"type": "`$INTEGER`",
						"short": "The number of available high-end GPUs",
						"format": "int32",
					},
					map[string]any{
						"name": "available_gpu_low",
						"title": "Available Gpu Low",
						"type": "`$INTEGER`",
						"short": "The number of available low-end GPUs",
						"format": "int32",
					},
					map[string]any{
						"name": "available_gpu_medium",
						"title": "Available Gpu Medium",
						"type": "`$INTEGER`",
						"short": "The number of available medium-end GPUs",
						"format": "int32",
					},
					map[string]any{
						"name": "country_codes",
						"title": "Country Codes",
						"type": "`$ARRAY`",
						"short": "A list of country codes where the resources are available",
					},
					map[string]any{
						"name": "cpu",
						"title": "Cpu",
						"type": "`$INTEGER`",
						"short": "The number of available CPU cores",
						"format": "int32",
					},
					map[string]any{
						"name": "gpu_classes",
						"title": "Gpu Classes",
						"type": "`$ARRAY`",
						"req": true,
						"short": "A list of available GPU class names",
					},
					map[string]any{
						"name": "memory",
						"title": "Memory",
						"type": "`$INTEGER`",
						"short": "The amount of available memory in MB",
						"format": "int64",
					},
					map[string]any{
						"name": "on_call_gpu",
						"title": "On Call Gpu",
						"type": "`$INTEGER`",
						"short": "The number of on-call GPUs available",
						"format": "int32",
					},
					map[string]any{
						"name": "storage_amount",
						"title": "Storage Amount",
						"type": "`$INTEGER`",
						"short": "The amount of available storage in bytes",
						"format": "int64",
					},
				},
				"name": "gpu_availability",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organizations/{organization_name}/availability/sce-gpu-availability",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "availability",
									},
									map[string]any{
										"lit": "sce-gpu-availability",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"availability",
									"sce-gpu-availability",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"organization_name",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"gpu_class": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "gpu_class_type",
						"title": "Gpu Class Type",
						"type": "`$STRING`",
						"short": "The type of GPU class",
					},
					map[string]any{
						"name": "gpu_count",
						"title": "Gpu Count",
						"type": "`$INTEGER`",
						"short": "The number of GPUs in the cluster",
						"format": "int32",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The unique identifier",
						"format": "uuid",
					},
					map[string]any{
						"name": "is_high_demand",
						"title": "Is High Demand",
						"type": "`$BOOLEAN`",
						"short": "Whether the GPU class is in high demand",
					},
					map[string]any{
						"name": "max_ram",
						"title": "Max Ram",
						"type": "`$INTEGER`",
						"short": "The maximum RAM amount in MB",
						"format": "int32",
					},
					map[string]any{
						"name": "max_storage",
						"title": "Max Storage",
						"type": "`$INTEGER`",
						"short": "The maximum storage amount in bytes",
						"format": "int64",
					},
					map[string]any{
						"name": "max_vcpu",
						"title": "Max Vcpu",
						"type": "`$INTEGER`",
						"short": "The maximum vCPU count",
						"format": "int32",
					},
					map[string]any{
						"name": "min_ram",
						"title": "Min Ram",
						"type": "`$INTEGER`",
						"short": "The minimum RAM amount in MB",
						"format": "int32",
					},
					map[string]any{
						"name": "min_storage",
						"title": "Min Storage",
						"type": "`$INTEGER`",
						"short": "The minimum storage amount in bytes",
						"format": "int64",
					},
					map[string]any{
						"name": "min_vcpu",
						"title": "Min Vcpu",
						"type": "`$INTEGER`",
						"short": "The minimum vCPU count",
						"format": "int32",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The GPU class name",
					},
					map[string]any{
						"name": "prices",
						"title": "Prices",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The list of prices for each container group priority",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "gpu_class",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organizations/{organization_name}/gpu-classes",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "gpu-classes",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"gpu-classes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"organization_name",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"inference_endpoint": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"req": true,
						"short": "The detailed description of the resource.",
					},
					map[string]any{
						"name": "display_name",
						"title": "Display Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The display-friendly name of the resource.",
					},
					map[string]any{
						"name": "icon_url",
						"title": "Icon Url",
						"type": "`$STRING`",
						"req": true,
						"short": "The URL of the icon image",
						"format": "url",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The inference endpoint identifier.",
						"format": "uuid",
					},
					map[string]any{
						"name": "input_schema",
						"title": "Input Schema",
						"type": "`$STRING`",
						"req": true,
						"short": "The input schema",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The inference endpoint name.",
					},
					map[string]any{
						"name": "organization_name",
						"title": "Organization Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The organization name.",
					},
					map[string]any{
						"name": "output_schema",
						"title": "Output Schema",
						"type": "`$STRING`",
						"req": true,
						"short": "The output schema",
					},
					map[string]any{
						"name": "price_description",
						"title": "Price Description",
						"type": "`$STRING`",
						"req": true,
						"short": "A description of the price",
					},
					map[string]any{
						"name": "readme",
						"title": "Readme",
						"type": "`$STRING`",
						"req": true,
						"short": "A markdown file containing a detailed description of the inference endpoint",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "inference_endpoint",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organizations/{organization_name}/inference-endpoints",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "inference-endpoints",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"inference-endpoints",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"organization_name",
										"page",
										"page_size",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "inference-endpoints",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"inference-endpoints",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"inference_endpoint_name": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "inference_endpoint_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"organization_name",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs/{inference_endpoint_job_id}",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "inference-endpoints",
									},
									map[string]any{
										"var": "inference_endpoint_id",
									},
									map[string]any{
										"lit": "jobs",
									},
									map[string]any{
										"var": "inference_endpoint_job_id",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"inference-endpoints",
									"{inference_endpoint_id}",
									"jobs",
									"{inference_endpoint_job_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"inference_endpoint_name": "inference_endpoint_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "inference_endpoint_id",
											"orig": "inference_endpoint_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "inference_endpoint_job_id",
											"orig": "inference_endpoint_job_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"inference_endpoint_id",
										"inference_endpoint_job_id",
										"organization_name",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"inference_endpoint_job": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "create_time",
						"title": "Create Time",
						"type": "`$STRING`",
						"req": true,
						"short": "The time the job was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "events",
						"title": "Events",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The list of events.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The inference endpoint job identifier.",
						"format": "uuid",
					},
					map[string]any{
						"name": "inference_endpoint_name",
						"title": "Inference Endpoint Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The inference endpoint name.",
					},
					map[string]any{
						"name": "input",
						"title": "Input",
						"type": "`$ANY`",
						"req": true,
						"short": "The job input.",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
						"short": "The job metadata.",
					},
					map[string]any{
						"name": "organization_name",
						"title": "Organization Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The organization name.",
					},
					map[string]any{
						"name": "output",
						"title": "Output",
						"type": "`$ANY`",
						"short": "The job output.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
						"short": "The current status.",
					},
					map[string]any{
						"name": "update_time",
						"title": "Update Time",
						"type": "`$STRING`",
						"req": true,
						"short": "The time the job was last updated.",
						"format": "date-time",
					},
					map[string]any{
						"name": "webhook",
						"title": "Webhook",
						"type": "`$STRING`",
						"short": "The webhook URL called when the job completes.",
						"deprecated": true,
						"format": "url",
					},
					map[string]any{
						"name": "webhook_url",
						"title": "Webhook Url",
						"type": "`$STRING`",
						"short": "The webhook URL called when the job completes.",
						"format": "url",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "inference_endpoint_job",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "inference-endpoints",
									},
									map[string]any{
										"var": "inference_endpoint_name",
									},
									map[string]any{
										"lit": "jobs",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"inference-endpoints",
									"{inference_endpoint_name}",
									"jobs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "inference_endpoint_name",
											"orig": "inference_endpoint_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"inference_endpoint_name",
										"organization_name",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs/{inference_endpoint_job_id}",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "inference-endpoints",
									},
									map[string]any{
										"var": "inference_endpoint_id",
									},
									map[string]any{
										"lit": "jobs",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"inference-endpoints",
									"{inference_endpoint_id}",
									"jobs",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"inference_endpoint_job_id": "id",
										"inference_endpoint_name": "inference_endpoint_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "inference_endpoint_job_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "inference_endpoint_id",
											"orig": "inference_endpoint_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"inference_endpoint_id",
										"organization_name",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.inference_endpoint",
						},
					},
				},
			},
			"inference_endpoint_job_collection": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "create_time",
						"title": "Create Time",
						"type": "`$STRING`",
						"req": true,
						"short": "The time the job was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "events",
						"title": "Events",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The list of events.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The inference endpoint job identifier.",
						"format": "uuid",
					},
					map[string]any{
						"name": "inference_endpoint_name",
						"title": "Inference Endpoint Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The inference endpoint name.",
					},
					map[string]any{
						"name": "input",
						"title": "Input",
						"type": "`$ANY`",
						"req": true,
						"short": "The job input.",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
						"short": "The job metadata.",
					},
					map[string]any{
						"name": "organization_name",
						"title": "Organization Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The organization name.",
					},
					map[string]any{
						"name": "output",
						"title": "Output",
						"type": "`$ANY`",
						"short": "The job output.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
						"short": "The current status.",
					},
					map[string]any{
						"name": "update_time",
						"title": "Update Time",
						"type": "`$STRING`",
						"req": true,
						"short": "The time the job was last updated.",
						"format": "date-time",
					},
					map[string]any{
						"name": "webhook",
						"title": "Webhook",
						"type": "`$STRING`",
						"short": "The webhook URL called when the job completes.",
						"deprecated": true,
						"format": "url",
					},
					map[string]any{
						"name": "webhook_url",
						"title": "Webhook Url",
						"type": "`$STRING`",
						"short": "The webhook URL called when the job completes.",
						"format": "url",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "inference_endpoint_job_collection",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "inference-endpoints",
									},
									map[string]any{
										"var": "inference_endpoint_name",
									},
									map[string]any{
										"lit": "jobs",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"inference-endpoints",
									"{inference_endpoint_name}",
									"jobs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "inference_endpoint_name",
											"orig": "inference_endpoint_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"inference_endpoint_name",
										"organization_name",
										"page",
										"page_size",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.inference_endpoint",
						},
					},
				},
			},
			"log_entry": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "end_time",
						"title": "End Time",
						"type": "`$STRING`",
						"req": true,
						"short": "The end time of the time range",
						"format": "date-time",
					},
					map[string]any{
						"name": "items",
						"title": "Items",
						"type": "`$ARRAY`",
						"req": true,
						"short": "A collection of log entries",
					},
					map[string]any{
						"name": "organization_name",
						"title": "Organization Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The organization name.",
					},
					map[string]any{
						"name": "page_max_time",
						"title": "Page Max Time",
						"type": "`$STRING`",
						"req": true,
						"short": "The maximum time page boundary.",
						"format": "date-time",
					},
					map[string]any{
						"name": "page_min_time",
						"title": "Page Min Time",
						"type": "`$STRING`",
						"req": true,
						"short": "The minimum time page boundary.",
						"format": "date-time",
					},
					map[string]any{
						"name": "page_size",
						"title": "Page Size",
						"type": "`$INTEGER`",
						"short": "The maximum number of items per page.",
						"format": "int32",
					},
					map[string]any{
						"name": "query",
						"title": "Query",
						"type": "`$STRING`",
						"req": true,
						"short": "The query string for filtering logs",
					},
					map[string]any{
						"name": "sort_order",
						"title": "Sort Order",
						"type": "`$STRING`",
						"short": "The sort order of the log entries.",
					},
					map[string]any{
						"name": "start_time",
						"title": "Start Time",
						"type": "`$STRING`",
						"req": true,
						"short": "The start time of the time range",
						"format": "date-time",
					},
				},
				"name": "log_entry",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organizations/{organization_name}/log-entries",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "log-entries",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"log-entries",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"organization_name",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"queue": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "container_groups",
						"title": "Container Groups",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The container groups that are part of this queue.",
					},
					map[string]any{
						"name": "create_time",
						"title": "Create Time",
						"type": "`$STRING`",
						"req": true,
						"short": "The job creation time",
						"format": "date-time",
					},
					map[string]any{
						"name": "current_queue_length",
						"title": "Current Queue Length",
						"type": "`$INTEGER`",
						"short": "The current length of the queue",
						"format": "int32",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "The description.",
					},
					map[string]any{
						"name": "display_name",
						"title": "Display Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The display name.",
					},
					map[string]any{
						"name": "events",
						"title": "Events",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The job events",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The job identifier",
						"format": "uuid",
					},
					map[string]any{
						"name": "input",
						"title": "Input",
						"type": "`$ANY`",
						"req": true,
						"short": "The job input.",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
						"short": "Additional metadata for the job",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The queue name.",
					},
					map[string]any{
						"name": "output",
						"title": "Output",
						"type": "`$ANY`",
						"short": "The job output.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
						"short": "The job status",
					},
					map[string]any{
						"name": "update_time",
						"title": "Update Time",
						"type": "`$STRING`",
						"req": true,
						"short": "The job update time",
						"format": "date-time",
					},
					map[string]any{
						"name": "webhook",
						"title": "Webhook",
						"type": "`$STRING`",
						"short": "The webhook URL to notify when the job completes",
						"format": "url",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "queue",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "queues",
									},
									map[string]any{
										"var": "queue_name",
									},
									map[string]any{
										"lit": "jobs",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"queues",
									"{queue_name}",
									"jobs",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"project_name": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "queue_name",
											"orig": "queue_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "job",
									"exist": []any{
										"organization_name",
										"project_id",
										"queue_name",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organizations/{organization_name}/projects/{project_name}/queues",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_name",
									},
									map[string]any{
										"lit": "queues",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_name}",
									"queues",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_name",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"organization_name",
										"project_name",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "queues",
									},
									map[string]any{
										"var": "queue_name",
									},
									map[string]any{
										"lit": "jobs",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"queues",
									"{queue_name}",
									"jobs",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"project_name": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "queue_name",
											"orig": "queue_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "job",
									"exist": []any{
										"organization_name",
										"page",
										"page_size",
										"project_id",
										"queue_name",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organizations/{organization_name}/projects/{project_name}/queues",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_name",
									},
									map[string]any{
										"lit": "queues",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_name}",
									"queues",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_name",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"organization_name",
										"project_name",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs/{queue_job_id}",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "queues",
									},
									map[string]any{
										"var": "queue_id",
									},
									map[string]any{
										"lit": "jobs",
									},
									map[string]any{
										"var": "queue_job_id",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"queues",
									"{queue_id}",
									"jobs",
									"{queue_job_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"project_name": "project_id",
										"queue_name": "queue_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "queue_id",
											"orig": "queue_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "queue_job_id",
											"orig": "queue_job_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"organization_name",
										"project_id",
										"queue_id",
										"queue_job_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "queues",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"queues",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"project_name": "project_id",
										"queue_name": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "queue_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"organization_name",
										"project_id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs/{queue_job_id}",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "queues",
									},
									map[string]any{
										"var": "queue_id",
									},
									map[string]any{
										"lit": "jobs",
									},
									map[string]any{
										"var": "queue_job_id",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"queues",
									"{queue_id}",
									"jobs",
									"{queue_job_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"project_name": "project_id",
										"queue_name": "queue_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "queue_id",
											"orig": "queue_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "queue_job_id",
											"orig": "queue_job_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"organization_name",
										"project_id",
										"queue_id",
										"queue_job_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "queues",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"queues",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"project_name": "project_id",
										"queue_name": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "queue_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"organization_name",
										"project_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "queues",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"queues",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"project_name": "project_id",
										"queue_name": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "queue_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"organization_name",
										"project_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"quota": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "container_replicas_quota",
						"title": "Container Replicas Quota",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The maximum number of replicas that can be created for a container group",
						"format": "int32",
					},
					map[string]any{
						"name": "container_replicas_used",
						"title": "Container Replicas Used",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The number of replicas that are currently in use",
						"format": "int32",
					},
					map[string]any{
						"name": "max_container_group_reallocations_per_minute",
						"title": "Max Container Group Reallocations Per Minute",
						"type": "`$INTEGER`",
						"short": "The maximum number of container group reallocations per minute",
						"format": "int32",
					},
					map[string]any{
						"name": "max_container_group_recreates_per_minute",
						"title": "Max Container Group Recreates Per Minute",
						"type": "`$INTEGER`",
						"short": "The maximum number of container group recreates per minute",
						"format": "int32",
					},
					map[string]any{
						"name": "max_container_group_restarts_per_minute",
						"title": "Max Container Group Restarts Per Minute",
						"type": "`$INTEGER`",
						"short": "The maximum number of container group restarts per minute",
						"format": "int32",
					},
				},
				"name": "quota",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organizations/{organization_name}/quotas",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "quotas",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"quotas",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.container_groups_quotas`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"organization_name",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"system_log": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "event_name",
						"title": "Event Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The name of the event",
					},
					map[string]any{
						"name": "event_time",
						"title": "Event Time",
						"type": "`$STRING`",
						"req": true,
						"short": "The UTC date & time when the log item was created",
						"format": "date-time",
					},
					map[string]any{
						"name": "instance_id",
						"title": "Instance Id",
						"type": "`$STRING`",
						"short": "The container group instance identifier.",
						"format": "uuid",
					},
					map[string]any{
						"name": "machine_id",
						"title": "Machine Id",
						"type": "`$STRING`",
						"short": "The container group machine identifier.",
						"format": "uuid",
					},
					map[string]any{
						"name": "resource_cpu",
						"title": "Resource Cpu",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The number of CPUs",
					},
					map[string]any{
						"name": "resource_gpu_class",
						"title": "Resource Gpu Class",
						"type": "`$STRING`",
						"req": true,
						"short": "The GPU class name",
					},
					map[string]any{
						"name": "resource_memory",
						"title": "Resource Memory",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The memory amount in MB",
					},
					map[string]any{
						"name": "resource_storage_amount",
						"title": "Resource Storage Amount",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The storage amount in bytes",
						"format": "int64",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
						"req": true,
						"short": "The version instance ID",
					},
				},
				"name": "system_log",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/system-logs",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "containers",
									},
									map[string]any{
										"var": "container_group_name",
									},
									map[string]any{
										"lit": "system-logs",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"projects",
									"{project_id}",
									"containers",
									"{container_group_name}",
									"system-logs",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"project_name": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "container_group_name",
											"orig": "container_group_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"container_group_name",
										"organization_name",
										"project_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.container",
						},
					},
				},
			},
			"webhook_secret_key": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "secret_key",
						"title": "Secret Key",
						"type": "`$STRING`",
						"req": true,
						"short": "The webhook secret key",
					},
				},
				"name": "webhook_secret_key",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organizations/{organization_name}/webhook-secret-key",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "webhook-secret-key",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"webhook-secret-key",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"organization_name",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organizations/{organization_name}/webhook-secret-key",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_name",
									},
									map[string]any{
										"lit": "webhook-secret-key",
									},
								},
								"parts": []any{
									"organizations",
									"{organization_name}",
									"webhook-secret-key",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "organization_name",
											"orig": "organization_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"organization_name",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
