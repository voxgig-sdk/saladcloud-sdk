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

func TestContainerEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Container(nil)
		if ent == nil {
			t.Fatal("expected non-nil ContainerEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"container": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Container(nil).Stream("list", nil, nil) {
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
			for item := range streamSdk.Container(nil).Stream("list", nil, nil) {
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
		setup := containerBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "container." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set SALADCLOUD_TEST_CONTAINER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		containerRef01Ent := client.Container(nil)
		containerRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "container"}), "container_ref01"))
		containerRef01Data["organization_name"] = setup.idmap["organization_name01"]
		containerRef01Data["project_id"] = setup.idmap["project01"]
		containerRef01Data["project_name"] = setup.idmap["project_name01"]

		containerRef01DataResult, err := containerRef01Ent.Create(containerRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		containerRef01Data = core.ToMapAny(entityData(containerRef01DataResult))
		if containerRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if containerRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		containerRef01Match := map[string]any{
			"organization_name": setup.idmap["organization_name01"],
			"project_name": setup.idmap["project_name01"],
		}

		containerRef01ListResult, err := containerRef01Ent.List(containerRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		containerRef01List, containerRef01ListOk := containerRef01ListResult.([]any)
		if !containerRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", containerRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(containerRef01List), map[string]any{"id": containerRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		containerRef01DataUp0Up := map[string]any{
			"id": containerRef01Data["id"],
			"organization_name": setup.idmap["organization_name"],
			"project_id": setup.idmap["project_id"],
		}

		containerRef01MarkdefUp0Name := "create_time"
		containerRef01MarkdefUp0Value := fmt.Sprintf("Mark01-container_ref01_%d", setup.now)
		containerRef01DataUp0Up[containerRef01MarkdefUp0Name] = containerRef01MarkdefUp0Value

		containerRef01ResdataUp0Result, err := containerRef01Ent.Update(containerRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		containerRef01ResdataUp0 := core.ToMapAny(entityData(containerRef01ResdataUp0Result))
		if containerRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if containerRef01ResdataUp0["id"] != containerRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if containerRef01ResdataUp0[containerRef01MarkdefUp0Name] != containerRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", containerRef01MarkdefUp0Name, containerRef01ResdataUp0[containerRef01MarkdefUp0Name])
		}

		// LOAD
		containerRef01MatchDt0 := map[string]any{
			"id": containerRef01Data["id"],
		}
		containerRef01DataDt0Loaded, err := containerRef01Ent.Load(containerRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		containerRef01DataDt0LoadResult := core.ToMapAny(entityData(containerRef01DataDt0Loaded))
		if containerRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if containerRef01DataDt0LoadResult["id"] != containerRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		containerRef01MatchRm0 := map[string]any{
			"id": containerRef01Data["id"],
		}
		_, err = containerRef01Ent.Remove(containerRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		containerRef01MatchRt0 := map[string]any{
			"organization_name": setup.idmap["organization_name01"],
			"project_name": setup.idmap["project_name01"],
		}

		containerRef01ListRt0Result, err := containerRef01Ent.List(containerRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		containerRef01ListRt0, containerRef01ListRt0Ok := containerRef01ListRt0Result.([]any)
		if !containerRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", containerRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(containerRef01ListRt0), map[string]any{"id": containerRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func containerBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "container", "ContainerTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read container test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse container test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"container01", "container02", "container03", "organization_name01", "project01", "project_name01"},
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
	entidEnvRaw := os.Getenv("SALADCLOUD_TEST_CONTAINER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"SALADCLOUD_TEST_CONTAINER_ENTID": idmap,
		"SALADCLOUD_TEST_LIVE":      "FALSE",
		"SALADCLOUD_TEST_EXPLAIN":   "FALSE",
		"SALADCLOUD_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["SALADCLOUD_TEST_CONTAINER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
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
