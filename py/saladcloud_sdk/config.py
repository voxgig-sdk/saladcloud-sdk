# Saladcloud SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Saladcloud",
            "slug": "saladcloud",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.salad.com/api/public",
            "auth": {
                "prefix": "",
                "name": "Salad-Api-Key",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "container": {},
                "container_group": {},
                "container_group_instance": {},
                "cpu_availability": {},
                "gpu_availability": {},
                "gpu_class": {},
                "inference_endpoint": {},
                "inference_endpoint_job": {},
                "inference_endpoint_job_collection": {},
                "log_entry": {},
                "queue": {},
                "quota": {},
                "system_log": {},
                "webhook_secret_key": {},
            },
        },
        "entity": {
      "container": {
        "fields": [
          {
            "name": "autostart_policy",
            "title": "Autostart Policy",
            "type": "`$BOOLEAN`",
            "req": True,
            "short": "Defines whether containers in this group should automatically start when deployed (true) or require manual starting (false)",
          },
          {
            "name": "container",
            "title": "Container",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Represents a container with its configuration and resource requirements.",
          },
          {
            "name": "country_codes",
            "title": "Country Codes",
            "type": "`$ARRAY`",
            "req": True,
            "op": {
              "create": {
                "type": "`$ARRAY`",
              },
            },
            "short": "List of country codes where container instances are permitted to run.",
          },
          {
            "name": "create_time",
            "title": "Create Time",
            "type": "`$STRING`",
            "req": True,
            "short": "ISO 8601 timestamp when this container group was initially created",
            "format": "date-time",
          },
          {
            "name": "current_state",
            "title": "Current State",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Represents the operational state of a container group during its lifecycle, including timing information, status, and instance distribution metrics.",
          },
          {
            "name": "display_name",
            "title": "Display Name",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "create": {
                "type": "`$STRING`",
              },
            },
            "short": "The display-friendly name of the resource.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The container group identifier.",
            "format": "uuid",
          },
          {
            "name": "liveness_probe",
            "title": "Liveness Probe",
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "req": True,
            "short": "Defines a liveness probe for container groups that determines when to restart a container if it becomes unhealthy",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The container group name.",
          },
          {
            "name": "networking",
            "title": "Networking",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Network configuration for container groups that defines connectivity, routing, and access control settings",
          },
          {
            "name": "organization_name",
            "title": "Organization Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The organization name.",
          },
          {
            "name": "pending_change",
            "title": "Pending Change",
            "type": "`$BOOLEAN`",
            "req": True,
            "short": "Indicates whether a configuration change has been requested but not yet applied to all containers in the group",
          },
          {
            "name": "priority",
            "title": "Priority",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
            "short": "Specifies the priority level for container group execution, which determines resource allocation and scheduling precedence.",
          },
          {
            "name": "project_name",
            "title": "Project Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The project name.",
          },
          {
            "name": "queue_autoscaler",
            "title": "Queue Autoscaler",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Defines configuration for automatically scaling container instances based on queue length.",
          },
          {
            "name": "queue_connection",
            "title": "Queue Connection",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Configuration for connecting a container group to a message queue system, enabling asynchronous communication between services.",
          },
          {
            "name": "readiness_probe",
            "title": "Readiness Probe",
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "req": True,
            "short": "Defines how to check if a container is ready to serve traffic.",
          },
          {
            "name": "readme",
            "title": "Readme",
            "type": "`$STRING`",
          },
          {
            "name": "replicas",
            "title": "Replicas",
            "type": "`$INTEGER`",
            "req": True,
            "short": "The container group replicas.",
            "format": "int32",
          },
          {
            "name": "restart_policy",
            "title": "Restart Policy",
            "type": "`$STRING`",
            "req": True,
            "short": "Specifies the policy for restarting containers when they exit or fail.",
          },
          {
            "name": "scalingactions",
            "title": "Scalingactions",
            "type": "`$ARRAY`",
            "req": True,
            "op": {
              "create": {
                "type": "`$ARRAY`",
              },
            },
            "short": "List of scaling actions configurations",
          },
          {
            "name": "scheduledscalingenabled",
            "title": "Scheduledscalingenabled",
            "type": "`$BOOLEAN`",
            "req": True,
            "op": {
              "create": {
                "type": "`$BOOLEAN`",
              },
            },
            "short": "Indicates if scheduled scaling is enabled",
          },
          {
            "name": "startup_probe",
            "title": "Startup Probe",
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "req": True,
            "short": "Defines a probe that checks if a container application has started successfully.",
          },
          {
            "name": "update_time",
            "title": "Update Time",
            "type": "`$STRING`",
            "req": True,
            "short": "ISO 8601 timestamp when this container group was last updated",
            "format": "date-time",
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Incremental version number that increases with each configuration change to the container group",
            "format": "int32",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "container",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/start",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "containers",
                  },
                  {
                    "var": "container_group_name",
                  },
                  {
                    "lit": "start",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "containers",
                  "{container_group_name}",
                  "start",
                ],
                "rename": {
                  "param": {
                    "project_name": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "container_group_name",
                      "orig": "container_group_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "start",
                  "exist": [
                    "container_group_name",
                    "organization_name",
                    "project_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/stop",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "containers",
                  },
                  {
                    "var": "container_group_name",
                  },
                  {
                    "lit": "stop",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "containers",
                  "{container_group_name}",
                  "stop",
                ],
                "rename": {
                  "param": {
                    "project_name": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "container_group_name",
                      "orig": "container_group_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "stop",
                  "exist": [
                    "container_group_name",
                    "organization_name",
                    "project_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/organizations/{organization_name}/projects/{project_name}/containers",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_name",
                  },
                  {
                    "lit": "containers",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_name}",
                  "containers",
                ],
                "rename": {},
                "transform": {
                  "req": {
                    "container": "`reqdata`",
                  },
                  "res": "`body.container`",
                },
                "args": {
                  "params": [
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_name",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "organization_name",
                    "project_name",
                  ],
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organizations/{organization_name}/projects/{project_name}/containers",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_name",
                  },
                  {
                    "lit": "containers",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_name}",
                  "containers",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "params": [
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_name",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "organization_name",
                    "project_name",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "containers",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "containers",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "container_group_name": "id",
                    "project_name": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.container`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "container_group_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "organization_name",
                    "project_id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "containers",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "containers",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "container_group_name": "id",
                    "project_name": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "container_group_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "organization_name",
                    "project_id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "containers",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "containers",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "container_group_name": "id",
                    "project_name": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "container_group_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "organization_name",
                    "project_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "container_group": {
        "fields": [],
        "name": "container_group",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/reallocate",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "containers",
                  },
                  {
                    "var": "container_id",
                  },
                  {
                    "lit": "instances",
                  },
                  {
                    "var": "instance_id",
                  },
                  {
                    "lit": "reallocate",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "containers",
                  "{container_id}",
                  "instances",
                  "{instance_id}",
                  "reallocate",
                ],
                "rename": {
                  "param": {
                    "container_group_instance_id": "instance_id",
                    "container_group_name": "container_id",
                    "project_name": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "container_id",
                      "orig": "container_group_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "instance_id",
                      "orig": "container_group_instance_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "reallocate",
                  "exist": [
                    "container_id",
                    "instance_id",
                    "organization_name",
                    "project_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/recreate",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "containers",
                  },
                  {
                    "var": "container_id",
                  },
                  {
                    "lit": "instances",
                  },
                  {
                    "var": "instance_id",
                  },
                  {
                    "lit": "recreate",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "containers",
                  "{container_id}",
                  "instances",
                  "{instance_id}",
                  "recreate",
                ],
                "rename": {
                  "param": {
                    "container_group_instance_id": "instance_id",
                    "container_group_name": "container_id",
                    "project_name": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "container_id",
                      "orig": "container_group_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "instance_id",
                      "orig": "container_group_instance_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "recreate",
                  "exist": [
                    "container_id",
                    "instance_id",
                    "organization_name",
                    "project_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/restart",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "containers",
                  },
                  {
                    "var": "container_id",
                  },
                  {
                    "lit": "instances",
                  },
                  {
                    "var": "instance_id",
                  },
                  {
                    "lit": "restart",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "containers",
                  "{container_id}",
                  "instances",
                  "{instance_id}",
                  "restart",
                ],
                "rename": {
                  "param": {
                    "container_group_instance_id": "instance_id",
                    "container_group_name": "container_id",
                    "project_name": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "container_id",
                      "orig": "container_group_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "instance_id",
                      "orig": "container_group_instance_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "restart",
                  "exist": [
                    "container_id",
                    "instance_id",
                    "organization_name",
                    "project_id",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "containers",
                  },
                  {
                    "var": "container_id",
                  },
                  {
                    "lit": "instances",
                  },
                  {
                    "var": "container_group_instance_id",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "containers",
                  "{container_id}",
                  "instances",
                  "{container_group_instance_id}",
                ],
                "rename": {
                  "param": {
                    "container_group_name": "container_id",
                    "project_name": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "container_group_instance_id",
                      "orig": "container_group_instance_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "container_id",
                      "orig": "container_group_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "container_group_instance_id",
                    "container_id",
                    "organization_name",
                    "project_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.container",
            ],
          ],
        },
      },
      "container_group_instance": {
        "fields": [
          {
            "name": "cpu_percent",
            "title": "Cpu Percent",
            "type": "`$NUMBER`",
            "short": "The percentage of CPU used by this container group instance.",
            "format": "float",
          },
          {
            "name": "cpu_usage",
            "title": "Cpu Usage",
            "type": "`$INTEGER`",
            "short": "The total CPU usage in seconds for this container group instance.",
            "format": "int64",
          },
          {
            "name": "cpu_usage_total",
            "title": "Cpu Usage Total",
            "type": "`$INTEGER`",
            "short": "The total CPU usage in seconds for this container group instance since it was started.",
            "format": "int64",
          },
          {
            "name": "deletion_cost",
            "title": "Deletion Cost",
            "type": "`$INTEGER`",
            "short": "The cost of deleting the container group instance",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The container group instance identifier.",
            "format": "uuid",
          },
          {
            "name": "machine_id",
            "title": "Machine Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The container group machine identifier.",
            "format": "uuid",
          },
          {
            "name": "memory_usage_mb",
            "title": "Memory Usage Mb",
            "type": "`$NUMBER`",
            "short": "The memory usage in MB for this container group instance.",
            "format": "float",
          },
          {
            "name": "memory_usage_percent",
            "title": "Memory Usage Percent",
            "type": "`$NUMBER`",
            "short": "The percentage of memory used by this container group instance.",
            "format": "float",
          },
          {
            "name": "pulling_progress",
            "title": "Pulling Progress",
            "type": "`$NUMBER`",
            "short": "The progress percentage of pulling the container image.",
            "format": "float",
          },
          {
            "name": "ready",
            "title": "Ready",
            "type": "`$BOOLEAN`",
            "short": "Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function.",
          },
          {
            "name": "ssh_host_key_fingerprint",
            "title": "Ssh Host Key Fingerprint",
            "type": "`$STRING`",
            "short": "The SSH host key fingerprint of the container group instance",
          },
          {
            "name": "ssh_ip",
            "title": "Ssh Ip",
            "type": "`$STRING`",
            "short": "The SSH IP address of the container group instance",
            "format": "ipv4",
          },
          {
            "name": "ssh_port",
            "title": "Ssh Port",
            "type": "`$INTEGER`",
            "short": "The SSH port of the container group instance",
            "format": "int32",
          },
          {
            "name": "started",
            "title": "Started",
            "type": "`$BOOLEAN`",
            "short": "Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes.",
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
            "req": True,
            "short": "The state of the container group instance",
          },
          {
            "name": "update_time",
            "title": "Update Time",
            "type": "`$STRING`",
            "req": True,
            "short": "The UTC timestamp when the container group instance last changed its state.",
            "format": "date-time",
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$INTEGER`",
            "req": True,
            "short": "The version of the container group definition currently running on this instance.",
            "format": "int32",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "container_group_instance",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "containers",
                  },
                  {
                    "var": "container_group_name",
                  },
                  {
                    "lit": "instances",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "containers",
                  "{container_group_name}",
                  "instances",
                ],
                "rename": {
                  "param": {
                    "project_name": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.instances`",
                },
                "args": {
                  "params": [
                    {
                      "name": "container_group_name",
                      "orig": "container_group_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "container_group_name",
                    "organization_name",
                    "project_id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "containers",
                  },
                  {
                    "var": "container_id",
                  },
                  {
                    "lit": "instances",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "containers",
                  "{container_id}",
                  "instances",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "container_group_instance_id": "id",
                    "container_group_name": "container_id",
                    "project_name": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "container_id",
                      "orig": "container_group_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "container_group_instance_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "container_id",
                    "id",
                    "organization_name",
                    "project_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.container",
            ],
          ],
        },
      },
      "cpu_availability": {
        "fields": [
          {
            "name": "available_cpu_batch",
            "title": "Available Cpu Batch",
            "type": "`$INTEGER`",
            "short": "The number of available CPU cores",
            "format": "int32",
          },
          {
            "name": "country_codes",
            "title": "Country Codes",
            "type": "`$ARRAY`",
            "short": "A list of country codes where the resources are available",
          },
          {
            "name": "cpu",
            "title": "Cpu",
            "type": "`$INTEGER`",
            "short": "The number of available CPU cores",
            "format": "int32",
          },
          {
            "name": "memory",
            "title": "Memory",
            "type": "`$INTEGER`",
            "short": "The amount of available memory in MB",
            "format": "int64",
          },
          {
            "name": "on_call_cpu",
            "title": "On Call Cpu",
            "type": "`$INTEGER`",
            "short": "The amount of on-call CPU",
            "format": "int32",
          },
          {
            "name": "storage_amount",
            "title": "Storage Amount",
            "type": "`$INTEGER`",
            "short": "The amount of available storage in bytes",
            "format": "int64",
          },
        ],
        "name": "cpu_availability",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/organizations/{organization_name}/availability/sce-cpu-availability",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "availability",
                  },
                  {
                    "lit": "sce-cpu-availability",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "availability",
                  "sce-cpu-availability",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "organization_name",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "gpu_availability": {
        "fields": [
          {
            "name": "available_gpu_batch",
            "title": "Available Gpu Batch",
            "type": "`$INTEGER`",
            "short": "The number of available GPU batches",
            "format": "int32",
          },
          {
            "name": "available_gpu_high",
            "title": "Available Gpu High",
            "type": "`$INTEGER`",
            "short": "The number of available high-end GPUs",
            "format": "int32",
          },
          {
            "name": "available_gpu_low",
            "title": "Available Gpu Low",
            "type": "`$INTEGER`",
            "short": "The number of available low-end GPUs",
            "format": "int32",
          },
          {
            "name": "available_gpu_medium",
            "title": "Available Gpu Medium",
            "type": "`$INTEGER`",
            "short": "The number of available medium-end GPUs",
            "format": "int32",
          },
          {
            "name": "country_codes",
            "title": "Country Codes",
            "type": "`$ARRAY`",
            "short": "A list of country codes where the resources are available",
          },
          {
            "name": "cpu",
            "title": "Cpu",
            "type": "`$INTEGER`",
            "short": "The number of available CPU cores",
            "format": "int32",
          },
          {
            "name": "gpu_classes",
            "title": "Gpu Classes",
            "type": "`$ARRAY`",
            "req": True,
            "short": "A list of available GPU class names",
          },
          {
            "name": "memory",
            "title": "Memory",
            "type": "`$INTEGER`",
            "short": "The amount of available memory in MB",
            "format": "int64",
          },
          {
            "name": "on_call_gpu",
            "title": "On Call Gpu",
            "type": "`$INTEGER`",
            "short": "The number of on-call GPUs available",
            "format": "int32",
          },
          {
            "name": "storage_amount",
            "title": "Storage Amount",
            "type": "`$INTEGER`",
            "short": "The amount of available storage in bytes",
            "format": "int64",
          },
        ],
        "name": "gpu_availability",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/organizations/{organization_name}/availability/sce-gpu-availability",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "availability",
                  },
                  {
                    "lit": "sce-gpu-availability",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "availability",
                  "sce-gpu-availability",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "organization_name",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "gpu_class": {
        "fields": [
          {
            "name": "gpu_class_type",
            "title": "Gpu Class Type",
            "type": "`$STRING`",
            "short": "The type of GPU class",
          },
          {
            "name": "gpu_count",
            "title": "Gpu Count",
            "type": "`$INTEGER`",
            "short": "The number of GPUs in the cluster",
            "format": "int32",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The unique identifier",
            "format": "uuid",
          },
          {
            "name": "is_high_demand",
            "title": "Is High Demand",
            "type": "`$BOOLEAN`",
            "short": "Whether the GPU class is in high demand",
          },
          {
            "name": "max_ram",
            "title": "Max Ram",
            "type": "`$INTEGER`",
            "short": "The maximum RAM amount in MB",
            "format": "int32",
          },
          {
            "name": "max_storage",
            "title": "Max Storage",
            "type": "`$INTEGER`",
            "short": "The maximum storage amount in bytes",
            "format": "int64",
          },
          {
            "name": "max_vcpu",
            "title": "Max Vcpu",
            "type": "`$INTEGER`",
            "short": "The maximum vCPU count",
            "format": "int32",
          },
          {
            "name": "min_ram",
            "title": "Min Ram",
            "type": "`$INTEGER`",
            "short": "The minimum RAM amount in MB",
            "format": "int32",
          },
          {
            "name": "min_storage",
            "title": "Min Storage",
            "type": "`$INTEGER`",
            "short": "The minimum storage amount in bytes",
            "format": "int64",
          },
          {
            "name": "min_vcpu",
            "title": "Min Vcpu",
            "type": "`$INTEGER`",
            "short": "The minimum vCPU count",
            "format": "int32",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The GPU class name",
          },
          {
            "name": "prices",
            "title": "Prices",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The list of prices for each container group priority",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "gpu_class",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organizations/{organization_name}/gpu-classes",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "gpu-classes",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "gpu-classes",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "params": [
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "organization_name",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "inference_endpoint": {
        "fields": [
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "req": True,
            "short": "The detailed description of the resource.",
          },
          {
            "name": "display_name",
            "title": "Display Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The display-friendly name of the resource.",
          },
          {
            "name": "icon_url",
            "title": "Icon Url",
            "type": "`$STRING`",
            "req": True,
            "short": "The URL of the icon image",
            "format": "url",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The inference endpoint identifier.",
            "format": "uuid",
          },
          {
            "name": "input_schema",
            "title": "Input Schema",
            "type": "`$STRING`",
            "req": True,
            "short": "The input schema",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The inference endpoint name.",
          },
          {
            "name": "organization_name",
            "title": "Organization Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The organization name.",
          },
          {
            "name": "output_schema",
            "title": "Output Schema",
            "type": "`$STRING`",
            "req": True,
            "short": "The output schema",
          },
          {
            "name": "price_description",
            "title": "Price Description",
            "type": "`$STRING`",
            "req": True,
            "short": "A description of the price",
          },
          {
            "name": "readme",
            "title": "Readme",
            "type": "`$STRING`",
            "req": True,
            "short": "A markdown file containing a detailed description of the inference endpoint",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "inference_endpoint",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organizations/{organization_name}/inference-endpoints",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "inference-endpoints",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "inference-endpoints",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "params": [
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "page_size",
                      "orig": "page_size",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "organization_name",
                    "page",
                    "page_size",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "inference-endpoints",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "inference-endpoints",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "inference_endpoint_name": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "inference_endpoint_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "organization_name",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs/{inference_endpoint_job_id}",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "inference-endpoints",
                  },
                  {
                    "var": "inference_endpoint_id",
                  },
                  {
                    "lit": "jobs",
                  },
                  {
                    "var": "inference_endpoint_job_id",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "inference-endpoints",
                  "{inference_endpoint_id}",
                  "jobs",
                  "{inference_endpoint_job_id}",
                ],
                "rename": {
                  "param": {
                    "inference_endpoint_name": "inference_endpoint_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "inference_endpoint_id",
                      "orig": "inference_endpoint_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "inference_endpoint_job_id",
                      "orig": "inference_endpoint_job_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "inference_endpoint_id",
                    "inference_endpoint_job_id",
                    "organization_name",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "inference_endpoint_job": {
        "fields": [
          {
            "name": "create_time",
            "title": "Create Time",
            "type": "`$STRING`",
            "req": True,
            "short": "The time the job was created.",
            "format": "date-time",
          },
          {
            "name": "events",
            "title": "Events",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The list of events.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The inference endpoint job identifier.",
            "format": "uuid",
          },
          {
            "name": "inference_endpoint_name",
            "title": "Inference Endpoint Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The inference endpoint name.",
          },
          {
            "name": "input",
            "title": "Input",
            "type": "`$ANY`",
            "req": True,
            "short": "The job input.",
          },
          {
            "name": "metadata",
            "title": "Metadata",
            "type": "`$OBJECT`",
            "short": "The job metadata.",
          },
          {
            "name": "organization_name",
            "title": "Organization Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The organization name.",
          },
          {
            "name": "output",
            "title": "Output",
            "type": "`$ANY`",
            "short": "The job output.",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
            "short": "The current status.",
          },
          {
            "name": "update_time",
            "title": "Update Time",
            "type": "`$STRING`",
            "req": True,
            "short": "The time the job was last updated.",
            "format": "date-time",
          },
          {
            "name": "webhook",
            "title": "Webhook",
            "type": "`$STRING`",
            "short": "The webhook URL called when the job completes.",
            "deprecated": True,
            "format": "url",
          },
          {
            "name": "webhook_url",
            "title": "Webhook Url",
            "type": "`$STRING`",
            "short": "The webhook URL called when the job completes.",
            "format": "url",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "inference_endpoint_job",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "inference-endpoints",
                  },
                  {
                    "var": "inference_endpoint_name",
                  },
                  {
                    "lit": "jobs",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "inference-endpoints",
                  "{inference_endpoint_name}",
                  "jobs",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "inference_endpoint_name",
                      "orig": "inference_endpoint_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "inference_endpoint_name",
                    "organization_name",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs/{inference_endpoint_job_id}",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "inference-endpoints",
                  },
                  {
                    "var": "inference_endpoint_id",
                  },
                  {
                    "lit": "jobs",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "inference-endpoints",
                  "{inference_endpoint_id}",
                  "jobs",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "inference_endpoint_job_id": "id",
                    "inference_endpoint_name": "inference_endpoint_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "inference_endpoint_job_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "inference_endpoint_id",
                      "orig": "inference_endpoint_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "inference_endpoint_id",
                    "organization_name",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.inference_endpoint",
            ],
          ],
        },
      },
      "inference_endpoint_job_collection": {
        "fields": [
          {
            "name": "create_time",
            "title": "Create Time",
            "type": "`$STRING`",
            "req": True,
            "short": "The time the job was created.",
            "format": "date-time",
          },
          {
            "name": "events",
            "title": "Events",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The list of events.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The inference endpoint job identifier.",
            "format": "uuid",
          },
          {
            "name": "inference_endpoint_name",
            "title": "Inference Endpoint Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The inference endpoint name.",
          },
          {
            "name": "input",
            "title": "Input",
            "type": "`$ANY`",
            "req": True,
            "short": "The job input.",
          },
          {
            "name": "metadata",
            "title": "Metadata",
            "type": "`$OBJECT`",
            "short": "The job metadata.",
          },
          {
            "name": "organization_name",
            "title": "Organization Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The organization name.",
          },
          {
            "name": "output",
            "title": "Output",
            "type": "`$ANY`",
            "short": "The job output.",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
            "short": "The current status.",
          },
          {
            "name": "update_time",
            "title": "Update Time",
            "type": "`$STRING`",
            "req": True,
            "short": "The time the job was last updated.",
            "format": "date-time",
          },
          {
            "name": "webhook",
            "title": "Webhook",
            "type": "`$STRING`",
            "short": "The webhook URL called when the job completes.",
            "deprecated": True,
            "format": "url",
          },
          {
            "name": "webhook_url",
            "title": "Webhook Url",
            "type": "`$STRING`",
            "short": "The webhook URL called when the job completes.",
            "format": "url",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "inference_endpoint_job_collection",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organizations/{organization_name}/inference-endpoints/{inference_endpoint_name}/jobs",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "inference-endpoints",
                  },
                  {
                    "var": "inference_endpoint_name",
                  },
                  {
                    "lit": "jobs",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "inference-endpoints",
                  "{inference_endpoint_name}",
                  "jobs",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "params": [
                    {
                      "name": "inference_endpoint_name",
                      "orig": "inference_endpoint_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "page_size",
                      "orig": "page_size",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "inference_endpoint_name",
                    "organization_name",
                    "page",
                    "page_size",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.inference_endpoint",
            ],
          ],
        },
      },
      "log_entry": {
        "fields": [
          {
            "name": "end_time",
            "title": "End Time",
            "type": "`$STRING`",
            "req": True,
            "short": "The end time of the time range",
            "format": "date-time",
          },
          {
            "name": "items",
            "title": "Items",
            "type": "`$ARRAY`",
            "req": True,
            "short": "A collection of log entries",
          },
          {
            "name": "organization_name",
            "title": "Organization Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The organization name.",
          },
          {
            "name": "page_max_time",
            "title": "Page Max Time",
            "type": "`$STRING`",
            "req": True,
            "short": "The maximum time page boundary.",
            "format": "date-time",
          },
          {
            "name": "page_min_time",
            "title": "Page Min Time",
            "type": "`$STRING`",
            "req": True,
            "short": "The minimum time page boundary.",
            "format": "date-time",
          },
          {
            "name": "page_size",
            "title": "Page Size",
            "type": "`$INTEGER`",
            "short": "The maximum number of items per page.",
            "format": "int32",
          },
          {
            "name": "query",
            "title": "Query",
            "type": "`$STRING`",
            "req": True,
            "short": "The query string for filtering logs",
          },
          {
            "name": "sort_order",
            "title": "Sort Order",
            "type": "`$STRING`",
            "short": "The sort order of the log entries.",
          },
          {
            "name": "start_time",
            "title": "Start Time",
            "type": "`$STRING`",
            "req": True,
            "short": "The start time of the time range",
            "format": "date-time",
          },
        ],
        "name": "log_entry",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/organizations/{organization_name}/log-entries",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "log-entries",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "log-entries",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "organization_name",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "queue": {
        "fields": [
          {
            "name": "container_groups",
            "title": "Container Groups",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The container groups that are part of this queue.",
          },
          {
            "name": "create_time",
            "title": "Create Time",
            "type": "`$STRING`",
            "req": True,
            "short": "The job creation time",
            "format": "date-time",
          },
          {
            "name": "current_queue_length",
            "title": "Current Queue Length",
            "type": "`$INTEGER`",
            "short": "The current length of the queue",
            "format": "int32",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "The description.",
          },
          {
            "name": "display_name",
            "title": "Display Name",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "create": {
                "type": "`$STRING`",
              },
            },
            "short": "The display name.",
          },
          {
            "name": "events",
            "title": "Events",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The job events",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The job identifier",
            "format": "uuid",
          },
          {
            "name": "input",
            "title": "Input",
            "type": "`$ANY`",
            "req": True,
            "short": "The job input.",
          },
          {
            "name": "metadata",
            "title": "Metadata",
            "type": "`$OBJECT`",
            "short": "Additional metadata for the job",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The queue name.",
          },
          {
            "name": "output",
            "title": "Output",
            "type": "`$ANY`",
            "short": "The job output.",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
            "short": "The job status",
          },
          {
            "name": "update_time",
            "title": "Update Time",
            "type": "`$STRING`",
            "req": True,
            "short": "The job update time",
            "format": "date-time",
          },
          {
            "name": "webhook",
            "title": "Webhook",
            "type": "`$STRING`",
            "short": "The webhook URL to notify when the job completes",
            "format": "url",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "queue",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "queues",
                  },
                  {
                    "var": "queue_name",
                  },
                  {
                    "lit": "jobs",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "queues",
                  "{queue_name}",
                  "jobs",
                ],
                "rename": {
                  "param": {
                    "project_name": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "queue_name",
                      "orig": "queue_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "job",
                  "exist": [
                    "organization_name",
                    "project_id",
                    "queue_name",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/organizations/{organization_name}/projects/{project_name}/queues",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_name",
                  },
                  {
                    "lit": "queues",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_name}",
                  "queues",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_name",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "organization_name",
                    "project_name",
                  ],
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "queues",
                  },
                  {
                    "var": "queue_name",
                  },
                  {
                    "lit": "jobs",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "queues",
                  "{queue_name}",
                  "jobs",
                ],
                "rename": {
                  "param": {
                    "project_name": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "params": [
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "queue_name",
                      "orig": "queue_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "page_size",
                      "orig": "page_size",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "job",
                  "exist": [
                    "organization_name",
                    "page",
                    "page_size",
                    "project_id",
                    "queue_name",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organizations/{organization_name}/projects/{project_name}/queues",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_name",
                  },
                  {
                    "lit": "queues",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_name}",
                  "queues",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "params": [
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_name",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "organization_name",
                    "project_name",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs/{queue_job_id}",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "queues",
                  },
                  {
                    "var": "queue_id",
                  },
                  {
                    "lit": "jobs",
                  },
                  {
                    "var": "queue_job_id",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "queues",
                  "{queue_id}",
                  "jobs",
                  "{queue_job_id}",
                ],
                "rename": {
                  "param": {
                    "project_name": "project_id",
                    "queue_name": "queue_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "queue_id",
                      "orig": "queue_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "queue_job_id",
                      "orig": "queue_job_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "organization_name",
                    "project_id",
                    "queue_id",
                    "queue_job_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "queues",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "queues",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "project_name": "project_id",
                    "queue_name": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "queue_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "organization_name",
                    "project_id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}/jobs/{queue_job_id}",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "queues",
                  },
                  {
                    "var": "queue_id",
                  },
                  {
                    "lit": "jobs",
                  },
                  {
                    "var": "queue_job_id",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "queues",
                  "{queue_id}",
                  "jobs",
                  "{queue_job_id}",
                ],
                "rename": {
                  "param": {
                    "project_name": "project_id",
                    "queue_name": "queue_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "queue_id",
                      "orig": "queue_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "queue_job_id",
                      "orig": "queue_job_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "organization_name",
                    "project_id",
                    "queue_id",
                    "queue_job_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "queues",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "queues",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "project_name": "project_id",
                    "queue_name": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "queue_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "organization_name",
                    "project_id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/organizations/{organization_name}/projects/{project_name}/queues/{queue_name}",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "queues",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "queues",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "project_name": "project_id",
                    "queue_name": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "queue_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "organization_name",
                    "project_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "quota": {
        "fields": [
          {
            "name": "container_replicas_quota",
            "title": "Container Replicas Quota",
            "type": "`$INTEGER`",
            "req": True,
            "short": "The maximum number of replicas that can be created for a container group",
            "format": "int32",
          },
          {
            "name": "container_replicas_used",
            "title": "Container Replicas Used",
            "type": "`$INTEGER`",
            "req": True,
            "short": "The number of replicas that are currently in use",
            "format": "int32",
          },
          {
            "name": "max_container_group_reallocations_per_minute",
            "title": "Max Container Group Reallocations Per Minute",
            "type": "`$INTEGER`",
            "short": "The maximum number of container group reallocations per minute",
            "format": "int32",
          },
          {
            "name": "max_container_group_recreates_per_minute",
            "title": "Max Container Group Recreates Per Minute",
            "type": "`$INTEGER`",
            "short": "The maximum number of container group recreates per minute",
            "format": "int32",
          },
          {
            "name": "max_container_group_restarts_per_minute",
            "title": "Max Container Group Restarts Per Minute",
            "type": "`$INTEGER`",
            "short": "The maximum number of container group restarts per minute",
            "format": "int32",
          },
        ],
        "name": "quota",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organizations/{organization_name}/quotas",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "quotas",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "quotas",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.container_groups_quotas`",
                },
                "args": {
                  "params": [
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "organization_name",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "system_log": {
        "fields": [
          {
            "name": "event_name",
            "title": "Event Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The name of the event",
          },
          {
            "name": "event_time",
            "title": "Event Time",
            "type": "`$STRING`",
            "req": True,
            "short": "The UTC date & time when the log item was created",
            "format": "date-time",
          },
          {
            "name": "instance_id",
            "title": "Instance Id",
            "type": "`$STRING`",
            "short": "The container group instance identifier.",
            "format": "uuid",
          },
          {
            "name": "machine_id",
            "title": "Machine Id",
            "type": "`$STRING`",
            "short": "The container group machine identifier.",
            "format": "uuid",
          },
          {
            "name": "resource_cpu",
            "title": "Resource Cpu",
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
            "req": True,
            "short": "The number of CPUs",
          },
          {
            "name": "resource_gpu_class",
            "title": "Resource Gpu Class",
            "type": "`$STRING`",
            "req": True,
            "short": "The GPU class name",
          },
          {
            "name": "resource_memory",
            "title": "Resource Memory",
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
            "req": True,
            "short": "The memory amount in MB",
          },
          {
            "name": "resource_storage_amount",
            "title": "Resource Storage Amount",
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
            "req": True,
            "short": "The storage amount in bytes",
            "format": "int64",
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$STRING`",
            "req": True,
            "short": "The version instance ID",
          },
        ],
        "name": "system_log",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/system-logs",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "containers",
                  },
                  {
                    "var": "container_group_name",
                  },
                  {
                    "lit": "system-logs",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "projects",
                  "{project_id}",
                  "containers",
                  "{container_group_name}",
                  "system-logs",
                ],
                "rename": {
                  "param": {
                    "project_name": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "params": [
                    {
                      "name": "container_group_name",
                      "orig": "container_group_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "container_group_name",
                    "organization_name",
                    "project_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.container",
            ],
          ],
        },
      },
      "webhook_secret_key": {
        "fields": [
          {
            "name": "secret_key",
            "title": "Secret Key",
            "type": "`$STRING`",
            "req": True,
            "short": "The webhook secret key",
          },
        ],
        "name": "webhook_secret_key",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/organizations/{organization_name}/webhook-secret-key",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "webhook-secret-key",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "webhook-secret-key",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "organization_name",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organizations/{organization_name}/webhook-secret-key",
                "segments": [
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_name",
                  },
                  {
                    "lit": "webhook-secret-key",
                  },
                ],
                "parts": [
                  "organizations",
                  "{organization_name}",
                  "webhook-secret-key",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "organization_name",
                      "orig": "organization_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "organization_name",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
