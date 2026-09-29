<?php
declare(strict_types=1);

// ContainerGroup entity test

require_once __DIR__ . '/../saladcloud_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ContainerGroupEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = SaladcloudSDK::test(null, null);
        $ent = $testsdk->ContainerGroup(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = container_group_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "container_group." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set SALADCLOUD_TEST_CONTAINER_GROUP_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $container_group_ref01_ent = $client->ContainerGroup(null);
        $container_group_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.container_group"), "container_group_ref01"));
        $container_group_ref01_data["container_id"] = $setup["idmap"]["container01"];
        $container_group_ref01_data["instance_id"] = $setup["idmap"]["instance01"];
        $container_group_ref01_data["organization_name"] = $setup["idmap"]["organization_name01"];
        $container_group_ref01_data["project_id"] = $setup["idmap"]["project01"];

        $container_group_ref01_data_result = $container_group_ref01_ent->create($container_group_ref01_data, null);
        $container_group_ref01_data = Helpers::to_map(is_object($container_group_ref01_data_result) && method_exists($container_group_ref01_data_result, 'data_get') ? $container_group_ref01_data_result->data_get() : $container_group_ref01_data_result);
        $this->assertNotNull($container_group_ref01_data);
        $this->assertNotNull($container_group_ref01_data["id"]);

        // LOAD
        $container_group_ref01_match_dt0 = [
            "id" => $container_group_ref01_data["id"],
        ];
        $container_group_ref01_data_dt0_loaded = $container_group_ref01_ent->load($container_group_ref01_match_dt0, null);
        $container_group_ref01_data_dt0_load_result = Helpers::to_map(is_object($container_group_ref01_data_dt0_loaded) && method_exists($container_group_ref01_data_dt0_loaded, 'data_get') ? $container_group_ref01_data_dt0_loaded->data_get() : $container_group_ref01_data_dt0_loaded);
        $this->assertNotNull($container_group_ref01_data_dt0_load_result);
        $this->assertEquals($container_group_ref01_data_dt0_load_result["id"], $container_group_ref01_data["id"]);

    }
}

function container_group_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/container_group/ContainerGroupTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = SaladcloudSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["container_group01", "container_group02", "container_group03", "container01", "container02", "container03", "instance01", "organization_name01", "project01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("SALADCLOUD_TEST_CONTAINER_GROUP_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "SALADCLOUD_TEST_CONTAINER_GROUP_ENTID" => $idmap,
        "SALADCLOUD_TEST_LIVE" => "FALSE",
        "SALADCLOUD_TEST_EXPLAIN" => "FALSE",
        "SALADCLOUD_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["SALADCLOUD_TEST_CONTAINER_GROUP_ENTID"]);
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
