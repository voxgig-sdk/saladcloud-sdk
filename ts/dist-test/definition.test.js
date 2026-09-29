"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "container",
        "accessor": "Container",
        "op": "create",
        "method": "POST",
        "path": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/start",
        "action": "start",
        "args": [
            {
                "name": "container_group_name",
                "wire": "container_group_name",
                "value": "p1"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p2"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 202,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "container",
        "accessor": "Container",
        "op": "create",
        "method": "POST",
        "path": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/stop",
        "action": "stop",
        "args": [
            {
                "name": "container_group_name",
                "wire": "container_group_name",
                "value": "p1"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p2"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 202,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "container",
        "accessor": "Container",
        "op": "create",
        "method": "POST",
        "path": "/organizations/{organization_name}/projects/{project_name}/containers",
        "args": [
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p1"
            },
            {
                "name": "project_name",
                "wire": "project_name",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "autostart_policy": true,
            "container": {
                "command": [
                    "x"
                ],
                "environment_variables": {},
                "hash": "x",
                "image": "x",
                "image_caching": true,
                "logging": {
                    "axiom": {
                        "api_token": "x",
                        "dataset": "x",
                        "host": "x"
                    },
                    "datadog": {
                        "api_key": "x",
                        "host": "x",
                        "tags": [
                            {
                                "name": "x",
                                "value": "x"
                            }
                        ]
                    },
                    "http": {
                        "compression": "none",
                        "format": "json",
                        "headers": [
                            {
                                "name": "x",
                                "value": "x"
                            }
                        ],
                        "host": "x",
                        "password": "x",
                        "path": "x",
                        "port": 1,
                        "user": "x"
                    },
                    "new_relic": {
                        "host": "x",
                        "ingestion_key": "x"
                    },
                    "splunk": {
                        "host": "x",
                        "token": "x"
                    },
                    "tcp": {
                        "host": "x",
                        "port": 1
                    }
                },
                "resources": {
                    "cpu": 1,
                    "gpu_classes": [
                        "x"
                    ],
                    "memory": 1,
                    "shm_size": 1,
                    "storage_amount": 1
                },
                "size": 1
            },
            "country_codes": [
                "us"
            ],
            "create_time": "2026-01-01T00:00:00Z",
            "current_state": {
                "description": "x",
                "finish_time": "2026-01-01T00:00:00Z",
                "instance_status_counts": {
                    "allocating_count": 1,
                    "creating_count": 1,
                    "running_count": 1,
                    "stopping_count": 1
                },
                "start_time": "2026-01-01T00:00:00Z",
                "status": "pending"
            },
            "display_name": "x",
            "id": "x",
            "liveness_probe": {
                "exec": {
                    "command": [
                        "x"
                    ]
                },
                "failure_threshold": 1,
                "grpc": {
                    "port": 1,
                    "service": "x"
                },
                "http": {
                    "headers": [
                        {
                            "name": "x",
                            "value": "x"
                        }
                    ],
                    "path": "x",
                    "port": 1,
                    "scheme": "http"
                },
                "initial_delay_seconds": 1,
                "period_seconds": 1,
                "success_threshold": 1,
                "tcp": {
                    "port": 1
                },
                "timeout_seconds": 1
            },
            "name": "x",
            "networking": {
                "auth": true,
                "client_request_timeout": 1,
                "dns": "x",
                "load_balancer": "round_robin",
                "port": 1,
                "protocol": "http",
                "server_response_timeout": 1,
                "single_connection_limit": true
            },
            "organization_name": "x",
            "pending_change": true,
            "priority": "high",
            "project_name": "x",
            "queue_autoscaler": {
                "desired_queue_length": 1,
                "max_downscale_per_minute": 1,
                "max_replicas": 1,
                "max_upscale_per_minute": 1,
                "min_replicas": 1,
                "polling_period": 1
            },
            "queue_connection": {
                "path": "x",
                "port": 1,
                "queue_name": "x"
            },
            "readiness_probe": {
                "exec": {
                    "command": [
                        "x"
                    ]
                },
                "failure_threshold": 1,
                "grpc": {
                    "port": 1,
                    "service": "x"
                },
                "http": {
                    "headers": [
                        {
                            "name": "x",
                            "value": "x"
                        }
                    ],
                    "path": "x",
                    "port": 1,
                    "scheme": "http"
                },
                "initial_delay_seconds": 1,
                "period_seconds": 1,
                "success_threshold": 1,
                "tcp": {
                    "port": 1
                },
                "timeout_seconds": 1
            },
            "readme": "x",
            "replicas": 1,
            "restart_policy": "always",
            "scaling-actions": [
                {
                    "replicas": 1,
                    "schedule": "x"
                }
            ],
            "scheduled-scaling-enabled": true,
            "startup_probe": {
                "exec": {
                    "command": [
                        "x"
                    ]
                },
                "failure_threshold": 1,
                "grpc": {
                    "port": 1,
                    "service": "x"
                },
                "http": {
                    "headers": [
                        {
                            "name": "x",
                            "value": "x"
                        }
                    ],
                    "path": "x",
                    "port": 1,
                    "scheme": "http"
                },
                "initial_delay_seconds": 1,
                "period_seconds": 1,
                "success_threshold": 1,
                "tcp": {
                    "port": 1
                },
                "timeout_seconds": 1
            },
            "update_time": "2026-01-01T00:00:00Z",
            "version": 1
        },
        "idField": "id"
    },
    {
        "entity": "container",
        "accessor": "Container",
        "op": "list",
        "method": "GET",
        "path": "/organizations/{organization_name}/projects/{project_name}/containers",
        "args": [
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p1"
            },
            {
                "name": "project_name",
                "wire": "project_name",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "items": [
                {
                    "autostart_policy": true,
                    "container": {
                        "command": [
                            "x"
                        ],
                        "environment_variables": {},
                        "hash": "x",
                        "image": "x",
                        "image_caching": true,
                        "logging": {
                            "axiom": {
                                "api_token": "x",
                                "dataset": "x",
                                "host": "x"
                            },
                            "datadog": {
                                "api_key": "x",
                                "host": "x",
                                "tags": []
                            },
                            "http": {
                                "compression": "none",
                                "format": "json",
                                "headers": [],
                                "host": "x",
                                "password": "x",
                                "path": "x",
                                "port": 1,
                                "user": "x"
                            },
                            "new_relic": {
                                "host": "x",
                                "ingestion_key": "x"
                            },
                            "splunk": {
                                "host": "x",
                                "token": "x"
                            },
                            "tcp": {
                                "host": "x",
                                "port": 1
                            }
                        },
                        "resources": {
                            "cpu": 1,
                            "gpu_classes": [
                                "x"
                            ],
                            "memory": 1,
                            "shm_size": 1,
                            "storage_amount": 1
                        },
                        "size": 1
                    },
                    "country_codes": [
                        "us"
                    ],
                    "create_time": "2026-01-01T00:00:00Z",
                    "current_state": {
                        "description": "x",
                        "finish_time": "2026-01-01T00:00:00Z",
                        "instance_status_counts": {
                            "allocating_count": 1,
                            "creating_count": 1,
                            "running_count": 1,
                            "stopping_count": 1
                        },
                        "start_time": "2026-01-01T00:00:00Z",
                        "status": "pending"
                    },
                    "display_name": "x",
                    "id": "x",
                    "liveness_probe": {
                        "exec": {
                            "command": [
                                "x"
                            ]
                        },
                        "failure_threshold": 1,
                        "grpc": {
                            "port": 1,
                            "service": "x"
                        },
                        "http": {
                            "headers": [
                                {}
                            ],
                            "path": "x",
                            "port": 1,
                            "scheme": "http"
                        },
                        "initial_delay_seconds": 1,
                        "period_seconds": 1,
                        "success_threshold": 1,
                        "tcp": {
                            "port": 1
                        },
                        "timeout_seconds": 1
                    },
                    "name": "x",
                    "networking": {
                        "auth": true,
                        "client_request_timeout": 1,
                        "dns": "x",
                        "load_balancer": "round_robin",
                        "port": 1,
                        "protocol": "http",
                        "server_response_timeout": 1,
                        "single_connection_limit": true
                    },
                    "organization_name": "x",
                    "pending_change": true,
                    "priority": "high",
                    "project_name": "x",
                    "queue_autoscaler": {
                        "desired_queue_length": 1,
                        "max_downscale_per_minute": 1,
                        "max_replicas": 1,
                        "max_upscale_per_minute": 1,
                        "min_replicas": 1,
                        "polling_period": 1
                    },
                    "queue_connection": {
                        "path": "x",
                        "port": 1,
                        "queue_name": "x"
                    },
                    "readiness_probe": {
                        "exec": {
                            "command": [
                                "x"
                            ]
                        },
                        "failure_threshold": 1,
                        "grpc": {
                            "port": 1,
                            "service": "x"
                        },
                        "http": {
                            "headers": [
                                {}
                            ],
                            "path": "x",
                            "port": 1,
                            "scheme": "http"
                        },
                        "initial_delay_seconds": 1,
                        "period_seconds": 1,
                        "success_threshold": 1,
                        "tcp": {
                            "port": 1
                        },
                        "timeout_seconds": 1
                    },
                    "readme": "x",
                    "replicas": 1,
                    "restart_policy": "always",
                    "scaling-actions": [
                        {
                            "replicas": 1,
                            "schedule": "x"
                        }
                    ],
                    "scheduled-scaling-enabled": true,
                    "startup_probe": {
                        "exec": {
                            "command": [
                                "x"
                            ]
                        },
                        "failure_threshold": 1,
                        "grpc": {
                            "port": 1,
                            "service": "x"
                        },
                        "http": {
                            "headers": [
                                {}
                            ],
                            "path": "x",
                            "port": 1,
                            "scheme": "http"
                        },
                        "initial_delay_seconds": 1,
                        "period_seconds": 1,
                        "success_threshold": 1,
                        "tcp": {
                            "port": 1
                        },
                        "timeout_seconds": 1
                    },
                    "update_time": "2026-01-01T00:00:00Z",
                    "version": 1
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "container",
        "accessor": "Container",
        "op": "load",
        "method": "GET",
        "path": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}",
        "args": [
            {
                "name": "id",
                "wire": "container_group_name",
                "value": "p1"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p2"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "autostart_policy": true,
            "container": {
                "command": [
                    "x"
                ],
                "environment_variables": {},
                "hash": "x",
                "image": "x",
                "image_caching": true,
                "logging": {
                    "axiom": {
                        "api_token": "x",
                        "dataset": "x",
                        "host": "x"
                    },
                    "datadog": {
                        "api_key": "x",
                        "host": "x",
                        "tags": [
                            {
                                "name": "x",
                                "value": "x"
                            }
                        ]
                    },
                    "http": {
                        "compression": "none",
                        "format": "json",
                        "headers": [
                            {
                                "name": "x",
                                "value": "x"
                            }
                        ],
                        "host": "x",
                        "password": "x",
                        "path": "x",
                        "port": 1,
                        "user": "x"
                    },
                    "new_relic": {
                        "host": "x",
                        "ingestion_key": "x"
                    },
                    "splunk": {
                        "host": "x",
                        "token": "x"
                    },
                    "tcp": {
                        "host": "x",
                        "port": 1
                    }
                },
                "resources": {
                    "cpu": 1,
                    "gpu_classes": [
                        "x"
                    ],
                    "memory": 1,
                    "shm_size": 1,
                    "storage_amount": 1
                },
                "size": 1
            },
            "country_codes": [
                "us"
            ],
            "create_time": "2026-01-01T00:00:00Z",
            "current_state": {
                "description": "x",
                "finish_time": "2026-01-01T00:00:00Z",
                "instance_status_counts": {
                    "allocating_count": 1,
                    "creating_count": 1,
                    "running_count": 1,
                    "stopping_count": 1
                },
                "start_time": "2026-01-01T00:00:00Z",
                "status": "pending"
            },
            "display_name": "x",
            "id": "x",
            "liveness_probe": {
                "exec": {
                    "command": [
                        "x"
                    ]
                },
                "failure_threshold": 1,
                "grpc": {
                    "port": 1,
                    "service": "x"
                },
                "http": {
                    "headers": [
                        {
                            "name": "x",
                            "value": "x"
                        }
                    ],
                    "path": "x",
                    "port": 1,
                    "scheme": "http"
                },
                "initial_delay_seconds": 1,
                "period_seconds": 1,
                "success_threshold": 1,
                "tcp": {
                    "port": 1
                },
                "timeout_seconds": 1
            },
            "name": "x",
            "networking": {
                "auth": true,
                "client_request_timeout": 1,
                "dns": "x",
                "load_balancer": "round_robin",
                "port": 1,
                "protocol": "http",
                "server_response_timeout": 1,
                "single_connection_limit": true
            },
            "organization_name": "x",
            "pending_change": true,
            "priority": "high",
            "project_name": "x",
            "queue_autoscaler": {
                "desired_queue_length": 1,
                "max_downscale_per_minute": 1,
                "max_replicas": 1,
                "max_upscale_per_minute": 1,
                "min_replicas": 1,
                "polling_period": 1
            },
            "queue_connection": {
                "path": "x",
                "port": 1,
                "queue_name": "x"
            },
            "readiness_probe": {
                "exec": {
                    "command": [
                        "x"
                    ]
                },
                "failure_threshold": 1,
                "grpc": {
                    "port": 1,
                    "service": "x"
                },
                "http": {
                    "headers": [
                        {
                            "name": "x",
                            "value": "x"
                        }
                    ],
                    "path": "x",
                    "port": 1,
                    "scheme": "http"
                },
                "initial_delay_seconds": 1,
                "period_seconds": 1,
                "success_threshold": 1,
                "tcp": {
                    "port": 1
                },
                "timeout_seconds": 1
            },
            "readme": "x",
            "replicas": 1,
            "restart_policy": "always",
            "scaling-actions": [
                {
                    "replicas": 1,
                    "schedule": "x"
                }
            ],
            "scheduled-scaling-enabled": true,
            "startup_probe": {
                "exec": {
                    "command": [
                        "x"
                    ]
                },
                "failure_threshold": 1,
                "grpc": {
                    "port": 1,
                    "service": "x"
                },
                "http": {
                    "headers": [
                        {
                            "name": "x",
                            "value": "x"
                        }
                    ],
                    "path": "x",
                    "port": 1,
                    "scheme": "http"
                },
                "initial_delay_seconds": 1,
                "period_seconds": 1,
                "success_threshold": 1,
                "tcp": {
                    "port": 1
                },
                "timeout_seconds": 1
            },
            "update_time": "2026-01-01T00:00:00Z",
            "version": 1
        },
        "idField": "id"
    },
    {
        "entity": "container",
        "accessor": "Container",
        "op": "remove",
        "method": "DELETE",
        "path": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}",
        "args": [
            {
                "name": "id",
                "wire": "container_group_name",
                "value": "p1"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p2"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 202,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "container",
        "accessor": "Container",
        "op": "update",
        "method": "PATCH",
        "path": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}",
        "args": [
            {
                "name": "id",
                "wire": "container_group_name",
                "value": "p1"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p2"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "autostart_policy": true,
            "container": {
                "command": [
                    "x"
                ],
                "environment_variables": {},
                "hash": "x",
                "image": "x",
                "image_caching": true,
                "logging": {
                    "axiom": {
                        "api_token": "x",
                        "dataset": "x",
                        "host": "x"
                    },
                    "datadog": {
                        "api_key": "x",
                        "host": "x",
                        "tags": [
                            {
                                "name": "x",
                                "value": "x"
                            }
                        ]
                    },
                    "http": {
                        "compression": "none",
                        "format": "json",
                        "headers": [
                            {
                                "name": "x",
                                "value": "x"
                            }
                        ],
                        "host": "x",
                        "password": "x",
                        "path": "x",
                        "port": 1,
                        "user": "x"
                    },
                    "new_relic": {
                        "host": "x",
                        "ingestion_key": "x"
                    },
                    "splunk": {
                        "host": "x",
                        "token": "x"
                    },
                    "tcp": {
                        "host": "x",
                        "port": 1
                    }
                },
                "resources": {
                    "cpu": 1,
                    "gpu_classes": [
                        "x"
                    ],
                    "memory": 1,
                    "shm_size": 1,
                    "storage_amount": 1
                },
                "size": 1
            },
            "country_codes": [
                "us"
            ],
            "create_time": "2026-01-01T00:00:00Z",
            "current_state": {
                "description": "x",
                "finish_time": "2026-01-01T00:00:00Z",
                "instance_status_counts": {
                    "allocating_count": 1,
                    "creating_count": 1,
                    "running_count": 1,
                    "stopping_count": 1
                },
                "start_time": "2026-01-01T00:00:00Z",
                "status": "pending"
            },
            "display_name": "x",
            "id": "x",
            "liveness_probe": {
                "exec": {
                    "command": [
                        "x"
                    ]
                },
                "failure_threshold": 1,
                "grpc": {
                    "port": 1,
                    "service": "x"
                },
                "http": {
                    "headers": [
                        {
                            "name": "x",
                            "value": "x"
                        }
                    ],
                    "path": "x",
                    "port": 1,
                    "scheme": "http"
                },
                "initial_delay_seconds": 1,
                "period_seconds": 1,
                "success_threshold": 1,
                "tcp": {
                    "port": 1
                },
                "timeout_seconds": 1
            },
            "name": "x",
            "networking": {
                "auth": true,
                "client_request_timeout": 1,
                "dns": "x",
                "load_balancer": "round_robin",
                "port": 1,
                "protocol": "http",
                "server_response_timeout": 1,
                "single_connection_limit": true
            },
            "organization_name": "x",
            "pending_change": true,
            "priority": "high",
            "project_name": "x",
            "queue_autoscaler": {
                "desired_queue_length": 1,
                "max_downscale_per_minute": 1,
                "max_replicas": 1,
                "max_upscale_per_minute": 1,
                "min_replicas": 1,
                "polling_period": 1
            },
            "queue_connection": {
                "path": "x",
                "port": 1,
                "queue_name": "x"
            },
            "readiness_probe": {
                "exec": {
                    "command": [
                        "x"
                    ]
                },
                "failure_threshold": 1,
                "grpc": {
                    "port": 1,
                    "service": "x"
                },
                "http": {
                    "headers": [
                        {
                            "name": "x",
                            "value": "x"
                        }
                    ],
                    "path": "x",
                    "port": 1,
                    "scheme": "http"
                },
                "initial_delay_seconds": 1,
                "period_seconds": 1,
                "success_threshold": 1,
                "tcp": {
                    "port": 1
                },
                "timeout_seconds": 1
            },
            "readme": "x",
            "replicas": 1,
            "restart_policy": "always",
            "scaling-actions": [
                {
                    "replicas": 1,
                    "schedule": "x"
                }
            ],
            "scheduled-scaling-enabled": true,
            "startup_probe": {
                "exec": {
                    "command": [
                        "x"
                    ]
                },
                "failure_threshold": 1,
                "grpc": {
                    "port": 1,
                    "service": "x"
                },
                "http": {
                    "headers": [
                        {
                            "name": "x",
                            "value": "x"
                        }
                    ],
                    "path": "x",
                    "port": 1,
                    "scheme": "http"
                },
                "initial_delay_seconds": 1,
                "period_seconds": 1,
                "success_threshold": 1,
                "tcp": {
                    "port": 1
                },
                "timeout_seconds": 1
            },
            "update_time": "2026-01-01T00:00:00Z",
            "version": 1
        },
        "idField": "id"
    },
    {
        "entity": "container_group",
        "accessor": "ContainerGroup",
        "op": "create",
        "method": "POST",
        "path": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/reallocate",
        "action": "reallocate",
        "args": [
            {
                "name": "container_id",
                "wire": "container_group_name",
                "value": "p1"
            },
            {
                "name": "instance_id",
                "wire": "container_group_instance_id",
                "value": "p2"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p3"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p4"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 202,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "container_group",
        "accessor": "ContainerGroup",
        "op": "create",
        "method": "POST",
        "path": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/recreate",
        "action": "recreate",
        "args": [
            {
                "name": "container_id",
                "wire": "container_group_name",
                "value": "p1"
            },
            {
                "name": "instance_id",
                "wire": "container_group_instance_id",
                "value": "p2"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p3"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p4"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 202,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "container_group",
        "accessor": "ContainerGroup",
        "op": "create",
        "method": "POST",
        "path": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/restart",
        "action": "restart",
        "args": [
            {
                "name": "container_id",
                "wire": "container_group_name",
                "value": "p1"
            },
            {
                "name": "instance_id",
                "wire": "container_group_instance_id",
                "value": "p2"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p3"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p4"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 202,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "container_group",
        "accessor": "ContainerGroup",
        "op": "load",
        "method": "GET",
        "path": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}",
        "args": [
            {
                "name": "container_group_instance_id",
                "wire": "container_group_instance_id",
                "value": "p1"
            },
            {
                "name": "container_id",
                "wire": "container_group_name",
                "value": "p2"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p3"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p4"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "cpu_percent": 1,
            "cpu_usage": 1,
            "cpu_usage_total": 1,
            "deletion_cost": 1,
            "id": "x",
            "machine_id": "x",
            "memory_usage_mb": 1,
            "memory_usage_percent": 1,
            "pulling_progress": 1,
            "ready": true,
            "ssh_host_key_fingerprint": "SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8",
            "ssh_ip": "192.168.1.100",
            "ssh_port": 1,
            "started": true,
            "state": "allocating",
            "update_time": "2026-01-01T00:00:00Z",
            "version": 1
        },
        "idField": "id"
    },
    {
        "entity": "container_group_instance",
        "accessor": "ContainerGroupInstance",
        "op": "list",
        "method": "GET",
        "path": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances",
        "args": [
            {
                "name": "container_group_name",
                "wire": "container_group_name",
                "value": "p1"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p2"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "instances": [
                {
                    "cpu_percent": 1,
                    "cpu_usage": 1,
                    "cpu_usage_total": 1,
                    "deletion_cost": 1,
                    "id": "x",
                    "machine_id": "x",
                    "memory_usage_mb": 1,
                    "memory_usage_percent": 1,
                    "pulling_progress": 1,
                    "ready": true,
                    "ssh_host_key_fingerprint": "SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8",
                    "ssh_ip": "192.168.1.100",
                    "ssh_port": 1,
                    "started": true,
                    "state": "allocating",
                    "update_time": "2026-01-01T00:00:00Z",
                    "version": 1
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "container_group_instance",
        "accessor": "ContainerGroupInstance",
        "op": "update",
        "method": "PATCH",
        "path": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}",
        "args": [
            {
                "name": "container_id",
                "wire": "container_group_name",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "container_group_instance_id",
                "value": "p2"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p3"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p4"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "cpu_percent": 1,
            "cpu_usage": 1,
            "cpu_usage_total": 1,
            "deletion_cost": 1,
            "id": "x",
            "machine_id": "x",
            "memory_usage_mb": 1,
            "memory_usage_percent": 1,
            "pulling_progress": 1,
            "ready": true,
            "ssh_host_key_fingerprint": "SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8",
            "ssh_ip": "192.168.1.100",
            "ssh_port": 1,
            "started": true,
            "state": "allocating",
            "update_time": "2026-01-01T00:00:00Z",
            "version": 1
        },
        "idField": "id"
    },
    {
        "entity": "cpu_availability",
        "accessor": "CpuAvailability",
        "op": "create",
        "method": "POST",
        "path": "/organizations/{organization_name}/availability/sce-cpu-availability",
        "args": [
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "available_cpu_batch": 1234,
            "on_call_cpu": 10245
        },
        "idField": "id"
    },
    {
        "entity": "gpu_availability",
        "accessor": "GpuAvailability",
        "op": "create",
        "method": "POST",
        "path": "/organizations/{organization_name}/availability/sce-gpu-availability",
        "args": [
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "available_gpu_batch": 2,
            "available_gpu_high": 0,
            "available_gpu_low": 1,
            "available_gpu_medium": 1,
            "on_call_gpu": 1
        },
        "idField": "id"
    },
    {
        "entity": "gpu_class",
        "accessor": "GpuClass",
        "op": "list",
        "method": "GET",
        "path": "/organizations/{organization_name}/gpu-classes",
        "args": [
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "items": [
                {
                    "gpu_class_type": "community",
                    "gpu_count": 1,
                    "id": "x",
                    "is_high_demand": true,
                    "max_ram": 1,
                    "max_storage": 1,
                    "max_vcpu": 1,
                    "min_ram": 1,
                    "min_storage": 1,
                    "min_vcpu": 1,
                    "name": "x",
                    "prices": [
                        {
                            "price": "x",
                            "priority": "high"
                        }
                    ]
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "inference_endpoint",
        "accessor": "InferenceEndpoint",
        "op": "list",
        "method": "GET",
        "path": "/organizations/{organization_name}/inference-endpoints",
        "args": [
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p1"
            }
        ],
        "select": {
            "page": "v1",
            "page_size": "v1"
        },
        "headers": [],
        "query": [
            "page",
            "page_size"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "items": [
                {
                    "description": "x",
                    "display_name": "x",
                    "icon_url": "x",
                    "id": "x",
                    "input_schema": "x",
                    "name": "x",
                    "organization_name": "x",
                    "output_schema": "x",
                    "price_description": "x",
                    "readme": "x"
                }
            ],
            "page": 1,
            "page_size": 1,
            "total_size": 1
        },
        "idField": "id"
    },
    {
        "entity": "inference_endpoint",
        "accessor": "InferenceEndpoint",
        "op": "load",
        "method": "GET",
        "path": "/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}",
        "args": [
            {
                "name": "id",
                "wire": "inference_endpoint_name",
                "value": "p1"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "description": "x",
            "display_name": "x",
            "icon_url": "x",
            "id": "x",
            "input_schema": "x",
            "name": "x",
            "organization_name": "x",
            "output_schema": "x",
            "price_description": "x",
            "readme": "x"
        },
        "idField": "id"
    },
    {
        "entity": "inference_endpoint",
        "accessor": "InferenceEndpoint",
        "op": "remove",
        "method": "DELETE",
        "path": "/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs/{inference_endpoint_job_id}",
        "args": [
            {
                "name": "inference_endpoint_id",
                "wire": "inference_endpoint_name",
                "value": "p1"
            },
            {
                "name": "inference_endpoint_job_id",
                "wire": "inference_endpoint_job_id",
                "value": "p2"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 202,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "inference_endpoint_job",
        "accessor": "InferenceEndpointJob",
        "op": "create",
        "method": "POST",
        "path": "/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs",
        "args": [
            {
                "name": "inference_endpoint_name",
                "wire": "inference_endpoint_name",
                "value": "p1"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "create_time": "2026-01-01T00:00:00Z",
            "events": [
                {
                    "action": "created",
                    "time": "2026-01-01T00:00:00Z"
                }
            ],
            "id": "x",
            "inference_endpoint_name": "x",
            "metadata": {},
            "organization_name": "x",
            "status": "pending",
            "update_time": "2026-01-01T00:00:00Z",
            "webhook": "x",
            "webhook_url": "x"
        },
        "idField": "id"
    },
    {
        "entity": "inference_endpoint_job",
        "accessor": "InferenceEndpointJob",
        "op": "load",
        "method": "GET",
        "path": "/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs/{inference_endpoint_job_id}",
        "args": [
            {
                "name": "id",
                "wire": "inference_endpoint_job_id",
                "value": "p1"
            },
            {
                "name": "inference_endpoint_id",
                "wire": "inference_endpoint_name",
                "value": "p2"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "create_time": "2026-01-01T00:00:00Z",
            "events": [
                {
                    "action": "created",
                    "time": "2026-01-01T00:00:00Z"
                }
            ],
            "id": "x",
            "inference_endpoint_name": "x",
            "metadata": {},
            "organization_name": "x",
            "status": "pending",
            "update_time": "2026-01-01T00:00:00Z",
            "webhook": "x",
            "webhook_url": "x"
        },
        "idField": "id"
    },
    {
        "entity": "inference_endpoint_job_collection",
        "accessor": "InferenceEndpointJobCollection",
        "op": "list",
        "method": "GET",
        "path": "/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs",
        "args": [
            {
                "name": "inference_endpoint_name",
                "wire": "inference_endpoint_name",
                "value": "p1"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p2"
            }
        ],
        "select": {
            "page": "v1",
            "page_size": "v1"
        },
        "headers": [],
        "query": [
            "page",
            "page_size"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "items": [
                {
                    "create_time": "2026-01-01T00:00:00Z",
                    "events": [
                        {
                            "action": "created",
                            "time": "2026-01-01T00:00:00Z"
                        }
                    ],
                    "id": "x",
                    "inference_endpoint_name": "x",
                    "metadata": {},
                    "organization_name": "x",
                    "status": "pending",
                    "update_time": "2026-01-01T00:00:00Z",
                    "webhook": "x",
                    "webhook_url": "x"
                }
            ],
            "page": 1,
            "page_size": 1,
            "total_size": 1
        },
        "idField": "id"
    },
    {
        "entity": "log_entry",
        "accessor": "LogEntry",
        "op": "create",
        "method": "POST",
        "path": "/organizations/{organization_name}/log-entries",
        "args": [
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "items": [
                {
                    "json_log": {},
                    "parent_span_id": "x",
                    "receive_time": "2026-01-01T00:00:00Z",
                    "resource": {
                        "labels": {},
                        "type": "x"
                    },
                    "severity": "default",
                    "span_Id": "x",
                    "text_log": "x",
                    "time": "2026-01-01T00:00:00Z",
                    "trace_Id": "x"
                }
            ],
            "organization_name": "x",
            "page_max_time": "2026-01-01T00:00:00Z",
            "page_min_time": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "queue",
        "accessor": "Queue",
        "op": "create",
        "method": "POST",
        "path": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs",
        "action": "job",
        "args": [
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p1"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p2"
            },
            {
                "name": "queue_name",
                "wire": "queue_name",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "create_time": "2026-01-01T00:00:00Z",
            "events": [
                {
                    "action": "created",
                    "time": "2026-01-01T00:00:00Z"
                }
            ],
            "id": "x",
            "metadata": {},
            "status": "pending",
            "update_time": "2026-01-01T00:00:00Z",
            "webhook": "x"
        },
        "idField": "id"
    },
    {
        "entity": "queue",
        "accessor": "Queue",
        "op": "create",
        "method": "POST",
        "path": "/organizations/{organization_name}/projects/{project_name}/queues",
        "args": [
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p1"
            },
            {
                "name": "project_name",
                "wire": "project_name",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "container_groups": [
                {
                    "autostart_policy": true,
                    "container": {
                        "command": [
                            "x"
                        ],
                        "environment_variables": {},
                        "hash": "x",
                        "image": "x",
                        "image_caching": true,
                        "logging": {
                            "axiom": {
                                "api_token": "x",
                                "dataset": "x",
                                "host": "x"
                            },
                            "datadog": {
                                "api_key": "x",
                                "host": "x",
                                "tags": []
                            },
                            "http": {
                                "compression": "none",
                                "format": "json",
                                "headers": [],
                                "host": "x",
                                "password": "x",
                                "path": "x",
                                "port": 1,
                                "user": "x"
                            },
                            "new_relic": {
                                "host": "x",
                                "ingestion_key": "x"
                            },
                            "splunk": {
                                "host": "x",
                                "token": "x"
                            },
                            "tcp": {
                                "host": "x",
                                "port": 1
                            }
                        },
                        "resources": {
                            "cpu": 1,
                            "gpu_classes": [
                                "x"
                            ],
                            "memory": 1,
                            "shm_size": 1,
                            "storage_amount": 1
                        },
                        "size": 1
                    },
                    "country_codes": [
                        "us"
                    ],
                    "create_time": "2026-01-01T00:00:00Z",
                    "current_state": {
                        "description": "x",
                        "finish_time": "2026-01-01T00:00:00Z",
                        "instance_status_counts": {
                            "allocating_count": 1,
                            "creating_count": 1,
                            "running_count": 1,
                            "stopping_count": 1
                        },
                        "start_time": "2026-01-01T00:00:00Z",
                        "status": "pending"
                    },
                    "display_name": "x",
                    "id": "x",
                    "liveness_probe": {
                        "exec": {
                            "command": [
                                "x"
                            ]
                        },
                        "failure_threshold": 1,
                        "grpc": {
                            "port": 1,
                            "service": "x"
                        },
                        "http": {
                            "headers": [
                                {}
                            ],
                            "path": "x",
                            "port": 1,
                            "scheme": "http"
                        },
                        "initial_delay_seconds": 1,
                        "period_seconds": 1,
                        "success_threshold": 1,
                        "tcp": {
                            "port": 1
                        },
                        "timeout_seconds": 1
                    },
                    "name": "x",
                    "networking": {
                        "auth": true,
                        "client_request_timeout": 1,
                        "dns": "x",
                        "load_balancer": "round_robin",
                        "port": 1,
                        "protocol": "http",
                        "server_response_timeout": 1,
                        "single_connection_limit": true
                    },
                    "organization_name": "x",
                    "pending_change": true,
                    "priority": "high",
                    "project_name": "x",
                    "queue_autoscaler": {
                        "desired_queue_length": 1,
                        "max_downscale_per_minute": 1,
                        "max_replicas": 1,
                        "max_upscale_per_minute": 1,
                        "min_replicas": 1,
                        "polling_period": 1
                    },
                    "queue_connection": {
                        "path": "x",
                        "port": 1,
                        "queue_name": "x"
                    },
                    "readiness_probe": {
                        "exec": {
                            "command": [
                                "x"
                            ]
                        },
                        "failure_threshold": 1,
                        "grpc": {
                            "port": 1,
                            "service": "x"
                        },
                        "http": {
                            "headers": [
                                {}
                            ],
                            "path": "x",
                            "port": 1,
                            "scheme": "http"
                        },
                        "initial_delay_seconds": 1,
                        "period_seconds": 1,
                        "success_threshold": 1,
                        "tcp": {
                            "port": 1
                        },
                        "timeout_seconds": 1
                    },
                    "readme": "x",
                    "replicas": 1,
                    "restart_policy": "always",
                    "scaling-actions": [
                        {
                            "replicas": 1,
                            "schedule": "x"
                        }
                    ],
                    "scheduled-scaling-enabled": true,
                    "startup_probe": {
                        "exec": {
                            "command": [
                                "x"
                            ]
                        },
                        "failure_threshold": 1,
                        "grpc": {
                            "port": 1,
                            "service": "x"
                        },
                        "http": {
                            "headers": [
                                {}
                            ],
                            "path": "x",
                            "port": 1,
                            "scheme": "http"
                        },
                        "initial_delay_seconds": 1,
                        "period_seconds": 1,
                        "success_threshold": 1,
                        "tcp": {
                            "port": 1
                        },
                        "timeout_seconds": 1
                    },
                    "update_time": "2026-01-01T00:00:00Z",
                    "version": 1
                }
            ],
            "create_time": "2026-01-01T00:00:00Z",
            "current_queue_length": 1,
            "description": "x",
            "display_name": "x",
            "id": "x",
            "name": "x",
            "update_time": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "queue",
        "accessor": "Queue",
        "op": "list",
        "method": "GET",
        "path": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs",
        "action": "job",
        "args": [
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p1"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p2"
            },
            {
                "name": "queue_name",
                "wire": "queue_name",
                "value": "p3"
            }
        ],
        "select": {
            "page": "v1",
            "page_size": "v1"
        },
        "headers": [],
        "query": [
            "page",
            "page_size"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "items": [
                {
                    "create_time": "2026-01-01T00:00:00Z",
                    "events": [
                        {
                            "action": "created",
                            "time": "2026-01-01T00:00:00Z"
                        }
                    ],
                    "id": "x",
                    "metadata": {},
                    "status": "pending",
                    "update_time": "2026-01-01T00:00:00Z",
                    "webhook": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "queue",
        "accessor": "Queue",
        "op": "list",
        "method": "GET",
        "path": "/organizations/{organization_name}/projects/{project_name}/queues",
        "args": [
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p1"
            },
            {
                "name": "project_name",
                "wire": "project_name",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "items": [
                {
                    "container_groups": [
                        {
                            "autostart_policy": true,
                            "container": {
                                "command": [],
                                "environment_variables": {},
                                "hash": "x",
                                "image": "x",
                                "image_caching": true,
                                "logging": {},
                                "resources": {},
                                "size": 1
                            },
                            "country_codes": [
                                "us"
                            ],
                            "create_time": "2026-01-01T00:00:00Z",
                            "current_state": {
                                "description": "x",
                                "finish_time": "2026-01-01T00:00:00Z",
                                "instance_status_counts": {},
                                "start_time": "2026-01-01T00:00:00Z",
                                "status": "pending"
                            },
                            "display_name": "x",
                            "id": "x",
                            "liveness_probe": {
                                "exec": {},
                                "failure_threshold": 1,
                                "grpc": {},
                                "http": {},
                                "initial_delay_seconds": 1,
                                "period_seconds": 1,
                                "success_threshold": 1,
                                "tcp": {},
                                "timeout_seconds": 1
                            },
                            "name": "x",
                            "networking": {
                                "auth": true,
                                "client_request_timeout": 1,
                                "dns": "x",
                                "load_balancer": "round_robin",
                                "port": 1,
                                "protocol": "http",
                                "server_response_timeout": 1,
                                "single_connection_limit": true
                            },
                            "organization_name": "x",
                            "pending_change": true,
                            "priority": "high",
                            "project_name": "x",
                            "queue_autoscaler": {
                                "desired_queue_length": 1,
                                "max_downscale_per_minute": 1,
                                "max_replicas": 1,
                                "max_upscale_per_minute": 1,
                                "min_replicas": 1,
                                "polling_period": 1
                            },
                            "queue_connection": {
                                "path": "x",
                                "port": 1,
                                "queue_name": "x"
                            },
                            "readiness_probe": {
                                "exec": {},
                                "failure_threshold": 1,
                                "grpc": {},
                                "http": {},
                                "initial_delay_seconds": 1,
                                "period_seconds": 1,
                                "success_threshold": 1,
                                "tcp": {},
                                "timeout_seconds": 1
                            },
                            "readme": "x",
                            "replicas": 1,
                            "restart_policy": "always",
                            "scaling-actions": [
                                {}
                            ],
                            "scheduled-scaling-enabled": true,
                            "startup_probe": {
                                "exec": {},
                                "failure_threshold": 1,
                                "grpc": {},
                                "http": {},
                                "initial_delay_seconds": 1,
                                "period_seconds": 1,
                                "success_threshold": 1,
                                "tcp": {},
                                "timeout_seconds": 1
                            },
                            "update_time": "2026-01-01T00:00:00Z",
                            "version": 1
                        }
                    ],
                    "create_time": "2026-01-01T00:00:00Z",
                    "current_queue_length": 1,
                    "description": "x",
                    "display_name": "x",
                    "id": "x",
                    "name": "x",
                    "update_time": "2026-01-01T00:00:00Z"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "queue",
        "accessor": "Queue",
        "op": "load",
        "method": "GET",
        "path": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs/{queue_job_id}",
        "args": [
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p1"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p2"
            },
            {
                "name": "queue_id",
                "wire": "queue_name",
                "value": "p3"
            },
            {
                "name": "queue_job_id",
                "wire": "queue_job_id",
                "value": "p4"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "create_time": "2026-01-01T00:00:00Z",
            "events": [
                {
                    "action": "created",
                    "time": "2026-01-01T00:00:00Z"
                }
            ],
            "id": "x",
            "metadata": {},
            "status": "pending",
            "update_time": "2026-01-01T00:00:00Z",
            "webhook": "x"
        },
        "idField": "id"
    },
    {
        "entity": "queue",
        "accessor": "Queue",
        "op": "load",
        "method": "GET",
        "path": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}",
        "args": [
            {
                "name": "id",
                "wire": "queue_name",
                "value": "p1"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p2"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "container_groups": [
                {
                    "autostart_policy": true,
                    "container": {
                        "command": [
                            "x"
                        ],
                        "environment_variables": {},
                        "hash": "x",
                        "image": "x",
                        "image_caching": true,
                        "logging": {
                            "axiom": {
                                "api_token": "x",
                                "dataset": "x",
                                "host": "x"
                            },
                            "datadog": {
                                "api_key": "x",
                                "host": "x",
                                "tags": []
                            },
                            "http": {
                                "compression": "none",
                                "format": "json",
                                "headers": [],
                                "host": "x",
                                "password": "x",
                                "path": "x",
                                "port": 1,
                                "user": "x"
                            },
                            "new_relic": {
                                "host": "x",
                                "ingestion_key": "x"
                            },
                            "splunk": {
                                "host": "x",
                                "token": "x"
                            },
                            "tcp": {
                                "host": "x",
                                "port": 1
                            }
                        },
                        "resources": {
                            "cpu": 1,
                            "gpu_classes": [
                                "x"
                            ],
                            "memory": 1,
                            "shm_size": 1,
                            "storage_amount": 1
                        },
                        "size": 1
                    },
                    "country_codes": [
                        "us"
                    ],
                    "create_time": "2026-01-01T00:00:00Z",
                    "current_state": {
                        "description": "x",
                        "finish_time": "2026-01-01T00:00:00Z",
                        "instance_status_counts": {
                            "allocating_count": 1,
                            "creating_count": 1,
                            "running_count": 1,
                            "stopping_count": 1
                        },
                        "start_time": "2026-01-01T00:00:00Z",
                        "status": "pending"
                    },
                    "display_name": "x",
                    "id": "x",
                    "liveness_probe": {
                        "exec": {
                            "command": [
                                "x"
                            ]
                        },
                        "failure_threshold": 1,
                        "grpc": {
                            "port": 1,
                            "service": "x"
                        },
                        "http": {
                            "headers": [
                                {}
                            ],
                            "path": "x",
                            "port": 1,
                            "scheme": "http"
                        },
                        "initial_delay_seconds": 1,
                        "period_seconds": 1,
                        "success_threshold": 1,
                        "tcp": {
                            "port": 1
                        },
                        "timeout_seconds": 1
                    },
                    "name": "x",
                    "networking": {
                        "auth": true,
                        "client_request_timeout": 1,
                        "dns": "x",
                        "load_balancer": "round_robin",
                        "port": 1,
                        "protocol": "http",
                        "server_response_timeout": 1,
                        "single_connection_limit": true
                    },
                    "organization_name": "x",
                    "pending_change": true,
                    "priority": "high",
                    "project_name": "x",
                    "queue_autoscaler": {
                        "desired_queue_length": 1,
                        "max_downscale_per_minute": 1,
                        "max_replicas": 1,
                        "max_upscale_per_minute": 1,
                        "min_replicas": 1,
                        "polling_period": 1
                    },
                    "queue_connection": {
                        "path": "x",
                        "port": 1,
                        "queue_name": "x"
                    },
                    "readiness_probe": {
                        "exec": {
                            "command": [
                                "x"
                            ]
                        },
                        "failure_threshold": 1,
                        "grpc": {
                            "port": 1,
                            "service": "x"
                        },
                        "http": {
                            "headers": [
                                {}
                            ],
                            "path": "x",
                            "port": 1,
                            "scheme": "http"
                        },
                        "initial_delay_seconds": 1,
                        "period_seconds": 1,
                        "success_threshold": 1,
                        "tcp": {
                            "port": 1
                        },
                        "timeout_seconds": 1
                    },
                    "readme": "x",
                    "replicas": 1,
                    "restart_policy": "always",
                    "scaling-actions": [
                        {
                            "replicas": 1,
                            "schedule": "x"
                        }
                    ],
                    "scheduled-scaling-enabled": true,
                    "startup_probe": {
                        "exec": {
                            "command": [
                                "x"
                            ]
                        },
                        "failure_threshold": 1,
                        "grpc": {
                            "port": 1,
                            "service": "x"
                        },
                        "http": {
                            "headers": [
                                {}
                            ],
                            "path": "x",
                            "port": 1,
                            "scheme": "http"
                        },
                        "initial_delay_seconds": 1,
                        "period_seconds": 1,
                        "success_threshold": 1,
                        "tcp": {
                            "port": 1
                        },
                        "timeout_seconds": 1
                    },
                    "update_time": "2026-01-01T00:00:00Z",
                    "version": 1
                }
            ],
            "create_time": "2026-01-01T00:00:00Z",
            "current_queue_length": 1,
            "description": "x",
            "display_name": "x",
            "id": "x",
            "name": "x",
            "update_time": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "queue",
        "accessor": "Queue",
        "op": "remove",
        "method": "DELETE",
        "path": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs/{queue_job_id}",
        "args": [
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p1"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p2"
            },
            {
                "name": "queue_id",
                "wire": "queue_name",
                "value": "p3"
            },
            {
                "name": "queue_job_id",
                "wire": "queue_job_id",
                "value": "p4"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 202,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "queue",
        "accessor": "Queue",
        "op": "remove",
        "method": "DELETE",
        "path": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}",
        "args": [
            {
                "name": "id",
                "wire": "queue_name",
                "value": "p1"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p2"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 202,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "queue",
        "accessor": "Queue",
        "op": "update",
        "method": "PATCH",
        "path": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}",
        "args": [
            {
                "name": "id",
                "wire": "queue_name",
                "value": "p1"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p2"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "container_groups": [
                {
                    "autostart_policy": true,
                    "container": {
                        "command": [
                            "x"
                        ],
                        "environment_variables": {},
                        "hash": "x",
                        "image": "x",
                        "image_caching": true,
                        "logging": {
                            "axiom": {
                                "api_token": "x",
                                "dataset": "x",
                                "host": "x"
                            },
                            "datadog": {
                                "api_key": "x",
                                "host": "x",
                                "tags": []
                            },
                            "http": {
                                "compression": "none",
                                "format": "json",
                                "headers": [],
                                "host": "x",
                                "password": "x",
                                "path": "x",
                                "port": 1,
                                "user": "x"
                            },
                            "new_relic": {
                                "host": "x",
                                "ingestion_key": "x"
                            },
                            "splunk": {
                                "host": "x",
                                "token": "x"
                            },
                            "tcp": {
                                "host": "x",
                                "port": 1
                            }
                        },
                        "resources": {
                            "cpu": 1,
                            "gpu_classes": [
                                "x"
                            ],
                            "memory": 1,
                            "shm_size": 1,
                            "storage_amount": 1
                        },
                        "size": 1
                    },
                    "country_codes": [
                        "us"
                    ],
                    "create_time": "2026-01-01T00:00:00Z",
                    "current_state": {
                        "description": "x",
                        "finish_time": "2026-01-01T00:00:00Z",
                        "instance_status_counts": {
                            "allocating_count": 1,
                            "creating_count": 1,
                            "running_count": 1,
                            "stopping_count": 1
                        },
                        "start_time": "2026-01-01T00:00:00Z",
                        "status": "pending"
                    },
                    "display_name": "x",
                    "id": "x",
                    "liveness_probe": {
                        "exec": {
                            "command": [
                                "x"
                            ]
                        },
                        "failure_threshold": 1,
                        "grpc": {
                            "port": 1,
                            "service": "x"
                        },
                        "http": {
                            "headers": [
                                {}
                            ],
                            "path": "x",
                            "port": 1,
                            "scheme": "http"
                        },
                        "initial_delay_seconds": 1,
                        "period_seconds": 1,
                        "success_threshold": 1,
                        "tcp": {
                            "port": 1
                        },
                        "timeout_seconds": 1
                    },
                    "name": "x",
                    "networking": {
                        "auth": true,
                        "client_request_timeout": 1,
                        "dns": "x",
                        "load_balancer": "round_robin",
                        "port": 1,
                        "protocol": "http",
                        "server_response_timeout": 1,
                        "single_connection_limit": true
                    },
                    "organization_name": "x",
                    "pending_change": true,
                    "priority": "high",
                    "project_name": "x",
                    "queue_autoscaler": {
                        "desired_queue_length": 1,
                        "max_downscale_per_minute": 1,
                        "max_replicas": 1,
                        "max_upscale_per_minute": 1,
                        "min_replicas": 1,
                        "polling_period": 1
                    },
                    "queue_connection": {
                        "path": "x",
                        "port": 1,
                        "queue_name": "x"
                    },
                    "readiness_probe": {
                        "exec": {
                            "command": [
                                "x"
                            ]
                        },
                        "failure_threshold": 1,
                        "grpc": {
                            "port": 1,
                            "service": "x"
                        },
                        "http": {
                            "headers": [
                                {}
                            ],
                            "path": "x",
                            "port": 1,
                            "scheme": "http"
                        },
                        "initial_delay_seconds": 1,
                        "period_seconds": 1,
                        "success_threshold": 1,
                        "tcp": {
                            "port": 1
                        },
                        "timeout_seconds": 1
                    },
                    "readme": "x",
                    "replicas": 1,
                    "restart_policy": "always",
                    "scaling-actions": [
                        {
                            "replicas": 1,
                            "schedule": "x"
                        }
                    ],
                    "scheduled-scaling-enabled": true,
                    "startup_probe": {
                        "exec": {
                            "command": [
                                "x"
                            ]
                        },
                        "failure_threshold": 1,
                        "grpc": {
                            "port": 1,
                            "service": "x"
                        },
                        "http": {
                            "headers": [
                                {}
                            ],
                            "path": "x",
                            "port": 1,
                            "scheme": "http"
                        },
                        "initial_delay_seconds": 1,
                        "period_seconds": 1,
                        "success_threshold": 1,
                        "tcp": {
                            "port": 1
                        },
                        "timeout_seconds": 1
                    },
                    "update_time": "2026-01-01T00:00:00Z",
                    "version": 1
                }
            ],
            "create_time": "2026-01-01T00:00:00Z",
            "current_queue_length": 1,
            "description": "x",
            "display_name": "x",
            "id": "x",
            "name": "x",
            "update_time": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "quota",
        "accessor": "Quota",
        "op": "load",
        "method": "GET",
        "path": "/organizations/{organization_name}/quotas",
        "args": [
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "container_groups_quotas": {
                "container_replicas_quota": 1,
                "container_replicas_used": 1,
                "max_container_group_reallocations_per_minute": 1,
                "max_container_group_recreates_per_minute": 1,
                "max_container_group_restarts_per_minute": 1
            },
            "create_time": "2026-01-01T00:00:00Z",
            "update_time": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "system_log",
        "accessor": "SystemLog",
        "op": "list",
        "method": "GET",
        "path": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/system-logs",
        "args": [
            {
                "name": "container_group_name",
                "wire": "container_group_name",
                "value": "p1"
            },
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p2"
            },
            {
                "name": "project_id",
                "wire": "project_name",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "items": [
                {
                    "event_name": "x",
                    "event_time": "2026-01-01T00:00:00Z",
                    "instance_id": "x",
                    "machine_id": "x",
                    "resource_cpu": 1,
                    "resource_gpu_class": "x",
                    "resource_memory": 1,
                    "resource_storage_amount": 1,
                    "version": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "webhook_secret_key",
        "accessor": "WebhookSecretKey",
        "op": "create",
        "method": "POST",
        "path": "/organizations/{organization_name}/webhook-secret-key",
        "args": [
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "secret_key": "x"
        },
        "idField": "id"
    },
    {
        "entity": "webhook_secret_key",
        "accessor": "WebhookSecretKey",
        "op": "load",
        "method": "GET",
        "path": "/organizations/{organization_name}/webhook-secret-key",
        "args": [
            {
                "name": "organization_name",
                "wire": "organization_name",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "salad-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "secret_key": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map