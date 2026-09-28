<?php
declare(strict_types=1);

// InferenceEndpointJobCollection entity test

require_once __DIR__ . '/../saladcloud_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class InferenceEndpointJobCollectionEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = SaladcloudSDK::test(null, null);
        $ent = $testsdk->InferenceEndpointJobCollection(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "inference_endpoint_job_collection" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = SaladcloudSDK::test($seed, null);
        $seen = iterator_to_array($base->InferenceEndpointJobCollection(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = SaladcloudConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = SaladcloudSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->InferenceEndpointJobCollection(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = inference_endpoint_job_collection_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "inference_endpoint_job_collection." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_COLLECTION_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $inference_endpoint_job_collection_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.inference_endpoint_job_collection")));
        $inference_endpoint_job_collection_ref01_data = null;
        if (count($inference_endpoint_job_collection_ref01_data_raw) > 0) {
            $inference_endpoint_job_collection_ref01_data = Helpers::to_map($inference_endpoint_job_collection_ref01_data_raw[0][1]);
        }

        // LIST
        $inference_endpoint_job_collection_ref01_ent = $client->InferenceEndpointJobCollection(null);
        $inference_endpoint_job_collection_ref01_match = [
            "inference_endpoint_name" => $setup["idmap"]["inference_endpoint_name01"],
            "organization_name" => $setup["idmap"]["organization_name01"],
        ];

        $inference_endpoint_job_collection_ref01_list_result = $inference_endpoint_job_collection_ref01_ent->list($inference_endpoint_job_collection_ref01_match, null);
        $this->assertIsArray($inference_endpoint_job_collection_ref01_list_result);

    }
}

function inference_endpoint_job_collection_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/inference_endpoint_job_collection/InferenceEndpointJobCollectionTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = SaladcloudSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["inference_endpoint_job_collection01", "inference_endpoint_job_collection02", "inference_endpoint_job_collection03", "inference_endpoint01", "inference_endpoint02", "inference_endpoint03", "inference_endpoint_name01", "organization_name01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_COLLECTION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_COLLECTION_ENTID" => $idmap,
        "SALADCLOUD_TEST_LIVE" => "FALSE",
        "SALADCLOUD_TEST_EXPLAIN" => "FALSE",
        "SALADCLOUD_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_COLLECTION_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["SALADCLOUD_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["SALADCLOUD_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new SaladcloudSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["SALADCLOUD_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["SALADCLOUD_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
