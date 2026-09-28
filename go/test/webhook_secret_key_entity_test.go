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

func TestWebhookSecretKeyEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.WebhookSecretKey(nil)
		if ent == nil {
			t.Fatal("expected non-nil WebhookSecretKeyEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := webhook_secret_keyBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "webhook_secret_key." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set SALADCLOUD_TEST_WEBHOOK_SECRET_KEY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		webhookSecretKeyRef01Ent := client.WebhookSecretKey(nil)
		webhookSecretKeyRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "webhook_secret_key"}), "webhook_secret_key_ref01"))
		webhookSecretKeyRef01Data["organization_name"] = setup.idmap["organization_name01"]

		webhookSecretKeyRef01DataResult, err := webhookSecretKeyRef01Ent.Create(webhookSecretKeyRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		webhookSecretKeyRef01Data = core.ToMapAny(entityData(webhookSecretKeyRef01DataResult))
		if webhookSecretKeyRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LOAD
		webhookSecretKeyRef01MatchDt0 := map[string]any{}
		webhookSecretKeyRef01DataDt0Loaded, err := webhookSecretKeyRef01Ent.Load(webhookSecretKeyRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if webhookSecretKeyRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func webhook_secret_keyBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "webhook_secret_key", "WebhookSecretKeyTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read webhook_secret_key test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse webhook_secret_key test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"webhook_secret_key01", "webhook_secret_key02", "webhook_secret_key03", "organization_name01"},
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
	entidEnvRaw := os.Getenv("SALADCLOUD_TEST_WEBHOOK_SECRET_KEY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"SALADCLOUD_TEST_WEBHOOK_SECRET_KEY_ENTID": idmap,
		"SALADCLOUD_TEST_LIVE":      "FALSE",
		"SALADCLOUD_TEST_EXPLAIN":   "FALSE",
		"SALADCLOUD_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["SALADCLOUD_TEST_WEBHOOK_SECRET_KEY_ENTID"])
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
