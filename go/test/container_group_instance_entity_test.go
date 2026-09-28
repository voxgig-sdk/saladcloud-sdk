package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/saladcloud-sdk/go"
	"github.com/voxgig-sdk/saladcloud-sdk/go/core"

	vs "github.com/voxgig-sdk/saladcloud-sdk/go/utility/struct"
)

func TestContainerGroupInstanceEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ContainerGroupInstance(nil)
		if ent == nil {
			t.Fatal("expected non-nil ContainerGroupInstanceEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"container_group_instance": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.ContainerGroupInstance(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.ContainerGroupInstance(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := container_group_instanceBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "container_group_instance." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		containerGroupInstanceRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.container_group_instance")))
		var containerGroupInstanceRef01Data map[string]any
		if len(containerGroupInstanceRef01DataRaw) > 0 {
			containerGroupInstanceRef01Data = core.ToMapAny(containerGroupInstanceRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = containerGroupInstanceRef01Data

		// LIST
		containerGroupInstanceRef01Ent := client.ContainerGroupInstance(nil)
		containerGroupInstanceRef01Match := map[string]any{
			"container_group_name": setup.idmap["container_group_name01"],
			"organization_name": setup.idmap["organization_name01"],
			"project_id": setup.idmap["project01"],
		}

		containerGroupInstanceRef01ListResult, err := containerGroupInstanceRef01Ent.List(containerGroupInstanceRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, containerGroupInstanceRef01ListOk := containerGroupInstanceRef01ListResult.([]any)
		if !containerGroupInstanceRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", containerGroupInstanceRef01ListResult)
		}

		// UPDATE
		containerGroupInstanceRef01DataUp0Up := map[string]any{
			"id": containerGroupInstanceRef01Data["id"],
			"container_id": setup.idmap["container_id"],
			"organization_name": setup.idmap["organization_name"],
			"project_id": setup.idmap["project_id"],
		}

		containerGroupInstanceRef01MarkdefUp0Name := "machine_id"
		containerGroupInstanceRef01MarkdefUp0Value := fmt.Sprintf("Mark01-container_group_instance_ref01_%d", setup.now)
		containerGroupInstanceRef01DataUp0Up[containerGroupInstanceRef01MarkdefUp0Name] = containerGroupInstanceRef01MarkdefUp0Value

		containerGroupInstanceRef01ResdataUp0Result, err := containerGroupInstanceRef01Ent.Update(containerGroupInstanceRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		containerGroupInstanceRef01ResdataUp0 := core.ToMapAny(entityData(containerGroupInstanceRef01ResdataUp0Result))
		if containerGroupInstanceRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if containerGroupInstanceRef01ResdataUp0["id"] != containerGroupInstanceRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if containerGroupInstanceRef01ResdataUp0[containerGroupInstanceRef01MarkdefUp0Name] != containerGroupInstanceRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", containerGroupInstanceRef01MarkdefUp0Name, containerGroupInstanceRef01ResdataUp0[containerGroupInstanceRef01MarkdefUp0Name])
		}

	})
}

func container_group_instanceBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "container_group_instance", "ContainerGroupInstanceTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read container_group_instance test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse container_group_instance test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"container_group_instance01", "container_group_instance02", "container_group_instance03", "container01", "container02", "container03", "container_group_name01", "organization_name01", "project01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID": idmap,
		"SALADCLOUD_TEST_LIVE":      "FALSE",
		"SALADCLOUD_TEST_EXPLAIN":   "FALSE",
		"SALADCLOUD_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add container_id alias for update test.
	if idmapResolved["container_id"] == nil {
		idmapResolved["container_id"] = idmapResolved["container01"]
	}
	// Add organization_name alias for update test.
	if idmapResolved["organization_name"] == nil {
		idmapResolved["organization_name"] = idmapResolved["organization_name01"]
	}
	// Add project_id alias for update test.
	if idmapResolved["project_id"] == nil {
		idmapResolved["project_id"] = idmapResolved["project01"]
	}

	if env["SALADCLOUD_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["SALADCLOUD_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewSaladcloudSDK(core.ToMapAny(mergedOpts))
	}

	live := env["SALADCLOUD_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["SALADCLOUD_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
