package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/saladcloud-sdk/go"
)

// Args is the common argument shape for both tools. `entity` selects
// the SDK entity to operate on; `query` is the optional reqmatch /
// reqdata map passed through to the SDK. For load, `query` should be
// `{"id": <value>}`. For list, omit `query` or pass an empty map.
type Args struct {
	Entity string         `json:"entity" jsonschema:"container | container_group | container_group_instance | cpu_availability | gpu_availability | gpu_class | inference_endpoint | inference_endpoint_job | inference_endpoint_job_collection | log_entry | queue | quota | system_log | webhook_secret_key"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional match map e.g. {\"id\":1} for load, omit for list"`
}

func registerTools(server *mcp.Server, client *sdk.SaladcloudSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name: "saladcloud_list",
		Description: "List records from Saladcloud. " +
			"Args: entity (one of the supported SDK entities), query (optional filter map). " +
			"Returns the first page of records as JSON.",
	}, func(ctx context.Context, req *mcp.CallToolRequest, args Args) (*mcp.CallToolResult, any, error) {
		return runOp(client, "list", args)
	})

	mcp.AddTool(server, &mcp.Tool{
		Name: "saladcloud_load",
		Description: "Load a single record from Saladcloud. " +
			"Args: entity, query ({\"id\":N} required). Returns the record as JSON.",
	}, func(ctx context.Context, req *mcp.CallToolRequest, args Args) (*mcp.CallToolResult, any, error) {
		return runOp(client, "load", args)
	})
}

func runOp(client *sdk.SaladcloudSDK, op string, args Args) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, args.Entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(args.Query, nil)
	case "load":
		result, err = ent.Load(args.Query, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.SaladcloudSDK, name string) (sdk.SaladcloudEntity, error) {
	switch strings.ToLower(name) {
	case "container":
		return client.Container(nil), nil
	case "container_group":
		return client.ContainerGroup(nil), nil
	case "container_group_instance":
		return client.ContainerGroupInstance(nil), nil
	case "cpu_availability":
		return client.CpuAvailability(nil), nil
	case "gpu_availability":
		return client.GpuAvailability(nil), nil
	case "gpu_class":
		return client.GpuClass(nil), nil
	case "inference_endpoint":
		return client.InferenceEndpoint(nil), nil
	case "inference_endpoint_job":
		return client.InferenceEndpointJob(nil), nil
	case "inference_endpoint_job_collection":
		return client.InferenceEndpointJobCollection(nil), nil
	case "log_entry":
		return client.LogEntry(nil), nil
	case "queue":
		return client.Queue(nil), nil
	case "quota":
		return client.Quota(nil), nil
	case "system_log":
		return client.SystemLog(nil), nil
	case "webhook_secret_key":
		return client.WebhookSecretKey(nil), nil

	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}
