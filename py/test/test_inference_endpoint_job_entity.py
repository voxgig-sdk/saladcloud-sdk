# InferenceEndpointJob entity test

import json
import os
import time

import pytest

from saladcloud_sdk.utility.voxgig_struct import voxgig_struct as vs
from saladcloud_sdk import SaladcloudSDK
from saladcloud_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestInferenceEndpointJobEntity:

    def test_should_create_instance(self):
        testsdk = SaladcloudSDK.test(None, None)
        ent = testsdk.InferenceEndpointJob(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _inference_endpoint_job_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "inference_endpoint_job." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        inference_endpoint_job_ref01_ent = client.InferenceEndpointJob(None)
        inference_endpoint_job_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.inference_endpoint_job"), "inference_endpoint_job_ref01"))
        inference_endpoint_job_ref01_data["inference_endpoint_id"] = setup["idmap"]["inference_endpoint01"]
        inference_endpoint_job_ref01_data["inference_endpoint_name"] = setup["idmap"]["inference_endpoint_name01"]
        inference_endpoint_job_ref01_data["organization_name"] = setup["idmap"]["organization_name01"]

        inference_endpoint_job_ref01_data = helpers.to_map(runner.entity_data(inference_endpoint_job_ref01_ent.create(inference_endpoint_job_ref01_data, None)))
        assert inference_endpoint_job_ref01_data is not None
        assert inference_endpoint_job_ref01_data["id"] is not None

        # LOAD
        inference_endpoint_job_ref01_match_dt0 = {
            "id": inference_endpoint_job_ref01_data["id"],
        }
        inference_endpoint_job_ref01_data_dt0_loaded = inference_endpoint_job_ref01_ent.load(inference_endpoint_job_ref01_match_dt0, None)
        inference_endpoint_job_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(inference_endpoint_job_ref01_data_dt0_loaded))
        assert inference_endpoint_job_ref01_data_dt0_load_result is not None
        assert inference_endpoint_job_ref01_data_dt0_load_result["id"] == inference_endpoint_job_ref01_data["id"]



def _inference_endpoint_job_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/inference_endpoint_job/InferenceEndpointJobTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = SaladcloudSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["inference_endpoint_job01", "inference_endpoint_job02", "inference_endpoint_job03", "inference_endpoint01", "inference_endpoint02", "inference_endpoint03", "inference_endpoint_name01", "organization_name01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_ENTID": idmap,
        "SALADCLOUD_TEST_LIVE": "FALSE",
        "SALADCLOUD_TEST_EXPLAIN": "FALSE",
        "SALADCLOUD_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("SALADCLOUD_TEST_INFERENCE_ENDPOINT_JOB_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("SALADCLOUD_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("SALADCLOUD_APIKEY"),
            },
            extra or {},
        ])
        client = SaladcloudSDK(helpers.to_map(merged_opts))

    _live = env.get("SALADCLOUD_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("SALADCLOUD_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
