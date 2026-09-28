<?php
declare(strict_types=1);

// Queue entity test

require_once __DIR__ . '/../saladcloud_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class QueueEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = SaladcloudSDK::test(null, null);
        $ent = $testsdk->Queue(null);
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
                "queue" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = SaladcloudSDK::test($seed, null);
        $seen = iterator_to_array($base->Queue(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = SaladcloudConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = SaladcloudSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Queue(null)->stream("list", null, null) as $item) {
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
        $setup = queue_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "queue." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set SALADCLOUD_TEST_QUEUE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $queue_ref01_ent = $client->Queue(null);
        $queue_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.queue"), "queue_ref01"));
        $queue_ref01_data["organization_name"] = $setup["idmap"]["organization_name01"];
        $queue_ref01_data["project_id"] = $setup["idmap"]["project01"];
        $queue_ref01_data["project_name"] = $setup["idmap"]["project_name01"];
        $queue_ref01_data["queue_id"] = $setup["idmap"]["queue01"];
        $queue_ref01_data["queue_name"] = $setup["idmap"]["queue_name01"];

        $queue_ref01_data_result = $queue_ref01_ent->create($queue_ref01_data, null);
        $queue_ref01_data = Helpers::to_map(is_object($queue_ref01_data_result) && method_exists($queue_ref01_data_result, 'data_get') ? $queue_ref01_data_result->data_get() : $queue_ref01_data_result);
        $this->assertNotNull($queue_ref01_data);
        $this->assertNotNull($queue_ref01_data["id"]);

        // LIST
        $queue_ref01_match = [
            "organization_name" => $setup["idmap"]["organization_name01"],
            "project_name" => $setup["idmap"]["project_name01"],
        ];

        $queue_ref01_list_result = $queue_ref01_ent->list($queue_ref01_match, null);
        $this->assertIsArray($queue_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($queue_ref01_list_result),
            ["id" => $queue_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // UPDATE
        $queue_ref01_data_up0_up = [
            "id" => $queue_ref01_data["id"],
            "organization_name" => $setup["idmap"]["organization_name"],
            "project_id" => $setup["idmap"]["project_id"],
        ];

        $queue_ref01_markdef_up0_name = "create_time";
        $queue_ref01_markdef_up0_value = "Mark01-queue_ref01_" . $setup["now"];
        $queue_ref01_data_up0_up[$queue_ref01_markdef_up0_name] = $queue_ref01_markdef_up0_value;

        $queue_ref01_resdata_up0_result = $queue_ref01_ent->update($queue_ref01_data_up0_up, null);
        $queue_ref01_resdata_up0 = Helpers::to_map(is_object($queue_ref01_resdata_up0_result) && method_exists($queue_ref01_resdata_up0_result, 'data_get') ? $queue_ref01_resdata_up0_result->data_get() : $queue_ref01_resdata_up0_result);
        $this->assertNotNull($queue_ref01_resdata_up0);
        $this->assertEquals($queue_ref01_resdata_up0["id"], $queue_ref01_data_up0_up["id"]);
        $this->assertEquals($queue_ref01_resdata_up0[$queue_ref01_markdef_up0_name], $queue_ref01_markdef_up0_value);

        // LOAD
        $queue_ref01_match_dt0 = [
            "id" => $queue_ref01_data["id"],
        ];
        $queue_ref01_data_dt0_loaded = $queue_ref01_ent->load($queue_ref01_match_dt0, null);
        $queue_ref01_data_dt0_load_result = Helpers::to_map(is_object($queue_ref01_data_dt0_loaded) && method_exists($queue_ref01_data_dt0_loaded, 'data_get') ? $queue_ref01_data_dt0_loaded->data_get() : $queue_ref01_data_dt0_loaded);
        $this->assertNotNull($queue_ref01_data_dt0_load_result);
        $this->assertEquals($queue_ref01_data_dt0_load_result["id"], $queue_ref01_data["id"]);

        // REMOVE
        $queue_ref01_match_rm0 = [
            "id" => $queue_ref01_data["id"],
        ];
        $queue_ref01_ent->remove($queue_ref01_match_rm0, null);

        // LIST
        $queue_ref01_match_rt0 = [
            "organization_name" => $setup["idmap"]["organization_name01"],
            "project_name" => $setup["idmap"]["project_name01"],
        ];

        $queue_ref01_list_rt0_result = $queue_ref01_ent->list($queue_ref01_match_rt0, null);
        $this->assertIsArray($queue_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($queue_ref01_list_rt0_result),
            ["id" => $queue_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function queue_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/queue/QueueTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = SaladcloudSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["queue01", "queue02", "queue03", "organization_name01", "project01", "project_name01", "queue_name01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("SALADCLOUD_TEST_QUEUE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "SALADCLOUD_TEST_QUEUE_ENTID" => $idmap,
        "SALADCLOUD_TEST_LIVE" => "FALSE",
        "SALADCLOUD_TEST_EXPLAIN" => "FALSE",
        "SALADCLOUD_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["SALADCLOUD_TEST_QUEUE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }
    if (!isset($idmap_resolved["organization_name"])) {
        $idmap_resolved["organization_name"] = $idmap_resolved["organization_name01"];
    }
    if (!isset($idmap_resolved["project_id"])) {
        $idmap_resolved["project_id"] = $idmap_resolved["project01"];
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
