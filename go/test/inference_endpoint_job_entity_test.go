package sdktest

import (
	"encoding/json"
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

func TestInferenceEndpointJobEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.InferenceEndpointJob(nil)
		if ent == nil {
			t.Fatal("expected non-nil InferenceEndpointJobEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := inference_endpoint_jobBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "inference_endpoint_job." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		inferenceEndpointJobRef01Ent := client.InferenceEndpointJob(nil)
		inferenceEndpointJobRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "inference_endpoint_job"}), "inference_endpoint_job_ref01"))
		inferenceEndpointJobRef01Data["inference_endpoint_id"] = setup.idmap["inference_endpoint01"]
		inferenceEndpointJobRef01Data["inference_endpoint_name"] = setup.idmap["inference_endpoint_name01"]
		inferenceEndpointJobRef01Data["organization_name"] = setup.idmap["organization_name01"]

		inferenceEndpointJobRef01DataResult, err := inferenceEndpointJobRef01Ent.Create(inferenceEndpointJobRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		inferenceEndpointJobRef01Data = core.ToMapAny(entityData(inferenceEndpointJobRef01DataResult))
		if inferenceEndpointJobRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if inferenceEndpointJobRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LOAD
		inferenceEndpointJobRef01MatchDt0 := map[string]any{
			"id": inferenceEndpointJobRef01Data["id"],
		}
		inferenceEndpointJobRef01DataDt0Loaded, err := inferenceEndpointJobRef01Ent.Load(inferenceEndpointJobRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		inferenceEndpointJobRef01DataDt0LoadResult := core.ToMapAny(entityData(inferenceEndpointJobRef01DataDt0Loaded))
		if inferenceEndpointJobRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if inferenceEndpointJobRef01DataDt0LoadResult["id"] != inferenceEndpointJobRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func inference_endpoint_jobBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "inference_endpoint_job", "InferenceEndpointJobTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read inference_endpoint_job test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse inference_endpoint_job test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"inference_endpoint_job01", "inference_endpoint_job02", "inference_endpoint_job03", "inference_endpoint01", "inference_endpoint02", "inference_endpoint03", "inference_endpoint_name01", "organization_name01"},
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
	entidEnvRaw := os.Getenv("SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_ENTID": idmap,
		"SALADCLOUD_TEST_LIVE":      "FALSE",
		"SALADCLOUD_TEST_EXPLAIN":   "FALSE",
		"SALADCLOUD_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
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
