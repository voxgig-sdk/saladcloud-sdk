# Queue entity test

import json
import os
import time

import pytest

from saladcloud_sdk.utility.voxgig_struct import voxgig_struct as vs
from saladcloud_sdk import SaladcloudSDK
from saladcloud_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestQueueEntity:

    def test_should_create_instance(self):
        testsdk = SaladcloudSDK.test(None, None)
        ent = testsdk.Queue(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "queue": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = SaladcloudSDK.test(seed, None)
        seen = list(base.Queue(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from saladcloud_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = SaladcloudSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.Queue(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _queue_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "queue." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set SALADCLOUD_TEST_QUEUE_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        queue_ref01_ent = client.Queue(None)
        queue_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.queue"), "queue_ref01"))
        queue_ref01_data["organization_name"] = setup["idmap"]["organization_name01"]
        queue_ref01_data["project_id"] = setup["idmap"]["project01"]
        queue_ref01_data["project_name"] = setup["idmap"]["project_name01"]
        queue_ref01_data["queue_id"] = setup["idmap"]["queue01"]
        queue_ref01_data["queue_name"] = setup["idmap"]["queue_name01"]

        queue_ref01_data = helpers.to_map(runner.entity_data(queue_ref01_ent.create(queue_ref01_data, None)))
        assert queue_ref01_data is not None
        assert queue_ref01_data["id"] is not None

        # LIST
        queue_ref01_match = {
            "organization_name": setup["idmap"]["organization_name01"],
            "project_name": setup["idmap"]["project_name01"],
        }

        queue_ref01_list_result = queue_ref01_ent.list(queue_ref01_match, None)
        assert isinstance(queue_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(queue_ref01_list_result),
            {"id": queue_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # UPDATE
        queue_ref01_data_up0_up = {
            "id": queue_ref01_data["id"],
            "organization_name": setup["idmap"]["organization_name"],
            "project_id": setup["idmap"]["project_id"],
        }

        queue_ref01_markdef_up0_name = "create_time"
        queue_ref01_markdef_up0_value = "Mark01-queue_ref01_" + str(setup["now"])
        queue_ref01_data_up0_up[queue_ref01_markdef_up0_name] = queue_ref01_markdef_up0_value

        queue_ref01_resdata_up0 = helpers.to_map(runner.entity_data(queue_ref01_ent.update(queue_ref01_data_up0_up, None)))
        assert queue_ref01_resdata_up0 is not None
        assert queue_ref01_resdata_up0["id"] == queue_ref01_data_up0_up["id"]
        assert queue_ref01_resdata_up0[queue_ref01_markdef_up0_name] == queue_ref01_markdef_up0_value

        # LOAD
        queue_ref01_match_dt0 = {
            "id": queue_ref01_data["id"],
        }
        queue_ref01_data_dt0_loaded = queue_ref01_ent.load(queue_ref01_match_dt0, None)
        queue_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(queue_ref01_data_dt0_loaded))
        assert queue_ref01_data_dt0_load_result is not None
        assert queue_ref01_data_dt0_load_result["id"] == queue_ref01_data["id"]

        # REMOVE
        queue_ref01_match_rm0 = {
            "id": queue_ref01_data["id"],
        }
        queue_ref01_ent.remove(queue_ref01_match_rm0, None)

        # LIST
        queue_ref01_match_rt0 = {
            "organization_name": setup["idmap"]["organization_name01"],
            "project_name": setup["idmap"]["project_name01"],
        }

        queue_ref01_list_rt0_result = queue_ref01_ent.list(queue_ref01_match_rt0, None)
        assert isinstance(queue_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(queue_ref01_list_rt0_result),
            {"id": queue_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _queue_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/queue/QueueTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = SaladcloudSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["queue01", "queue02", "queue03", "organization_name01", "project01", "project_name01", "queue_name01"],
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
        "SALADCLOUD_TEST_QUEUE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "SALADCLOUD_TEST_QUEUE_ENTID": idmap,
        "SALADCLOUD_TEST_LIVE": "FALSE",
        "SALADCLOUD_TEST_EXPLAIN": "FALSE",
        "SALADCLOUD_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("SALADCLOUD_TEST_QUEUE_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("organization_name") is None:
        idmap_resolved["organization_name"] = idmap_resolved.get("organization_name01")
    if idmap_resolved.get("project_id") is None:
        idmap_resolved["project_id"] = idmap_resolved.get("project01")

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
