# ContainerGroupInstance entity test

import json
import os
import time

import pytest

from saladcloud_sdk.utility.voxgig_struct import voxgig_struct as vs
from saladcloud_sdk import SaladcloudSDK
from saladcloud_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestContainerGroupInstanceEntity:

    def test_should_create_instance(self):
        testsdk = SaladcloudSDK.test(None, None)
        ent = testsdk.ContainerGroupInstance(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "container_group_instance": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = SaladcloudSDK.test(seed, None)
        seen = list(base.ContainerGroupInstance(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from saladcloud_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = SaladcloudSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.ContainerGroupInstance(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _container_group_instance_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "update"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "container_group_instance." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        container_group_instance_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.container_group_instance")))
        container_group_instance_ref01_data = None
        if len(container_group_instance_ref01_data_raw) > 0:
            container_group_instance_ref01_data = helpers.to_map(container_group_instance_ref01_data_raw[0][1])

        # LIST
        container_group_instance_ref01_ent = client.ContainerGroupInstance(None)
        container_group_instance_ref01_match = {
            "container_group_name": setup["idmap"]["container_group_name01"],
            "organization_name": setup["idmap"]["organization_name01"],
            "project_id": setup["idmap"]["project01"],
        }

        container_group_instance_ref01_list_result = container_group_instance_ref01_ent.list(container_group_instance_ref01_match, None)
        assert isinstance(container_group_instance_ref01_list_result, list)

        # UPDATE
        container_group_instance_ref01_data_up0_up = {
            "id": container_group_instance_ref01_data["id"],
            "container_id": setup["idmap"]["container_id"],
            "organization_name": setup["idmap"]["organization_name"],
            "project_id": setup["idmap"]["project_id"],
        }

        container_group_instance_ref01_markdef_up0_name = "machine_id"
        container_group_instance_ref01_markdef_up0_value = "Mark01-container_group_instance_ref01_" + str(setup["now"])
        container_group_instance_ref01_data_up0_up[container_group_instance_ref01_markdef_up0_name] = container_group_instance_ref01_markdef_up0_value

        container_group_instance_ref01_resdata_up0 = helpers.to_map(runner.entity_data(container_group_instance_ref01_ent.update(container_group_instance_ref01_data_up0_up, None)))
        assert container_group_instance_ref01_resdata_up0 is not None
        assert container_group_instance_ref01_resdata_up0["id"] == container_group_instance_ref01_data_up0_up["id"]
        assert container_group_instance_ref01_resdata_up0[container_group_instance_ref01_markdef_up0_name] == container_group_instance_ref01_markdef_up0_value



def _container_group_instance_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/container_group_instance/ContainerGroupInstanceTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = SaladcloudSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["container_group_instance01", "container_group_instance02", "container_group_instance03", "container01", "container02", "container03", "container_group_name01", "organization_name01", "project01"],
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
        "SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID": idmap,
        "SALADCLOUD_TEST_LIVE": "FALSE",
        "SALADCLOUD_TEST_EXPLAIN": "FALSE",
        "SALADCLOUD_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("container_id") is None:
        idmap_resolved["container_id"] = idmap_resolved.get("container01")
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
