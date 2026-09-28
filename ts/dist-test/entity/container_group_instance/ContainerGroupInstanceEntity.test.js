"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ContainerGroupInstanceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SALADCLOUD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SALADCLOUD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SaladcloudSDK.test();
        const ent = testsdk.ContainerGroupInstance();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SALADCLOUD_TEST_LIVE;
        for (const op of ['list', 'update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'container_group_instance.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "cpu_percent": { "a": true, "fo": "float", "h": "Cpu Percent", "n": "cpu_percent", "r": false, "sh": "The percentage of CPU used by this container group instance.", "t": "`$NUMBER`", "key$": "cpu_percent", "index$": 0 }, "cpu_usage": { "a": true, "fo": "int64", "h": "Cpu Usage", "n": "cpu_usage", "r": false, "sh": "The total CPU usage in seconds for this container group instance.", "t": "`$INTEGER`", "key$": "cpu_usage", "index$": 1 }, "cpu_usage_total": { "a": true, "fo": "int64", "h": "Cpu Usage Total", "n": "cpu_usage_total", "r": false, "sh": "The total CPU usage in seconds for this container group instance since it was started.", "t": "`$INTEGER`", "key$": "cpu_usage_total", "index$": 2 }, "deletion_cost": { "a": true, "h": "Deletion Cost", "n": "deletion_cost", "r": false, "sh": "The cost of deleting the container group instance", "t": "`$INTEGER`", "key$": "deletion_cost", "index$": 3 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": true, "sh": "The container group instance identifier.", "t": "`$STRING`", "key$": "id", "index$": 4 }, "machine_id": { "a": true, "fo": "uuid", "h": "Machine Id", "n": "machine_id", "r": true, "sh": "The container group machine identifier.", "t": "`$STRING`", "key$": "machine_id", "index$": 5 }, "memory_usage_mb": { "a": true, "fo": "float", "h": "Memory Usage Mb", "n": "memory_usage_mb", "r": false, "sh": "The memory usage in MB for this container group instance.", "t": "`$NUMBER`", "key$": "memory_usage_mb", "index$": 6 }, "memory_usage_percent": { "a": true, "fo": "float", "h": "Memory Usage Percent", "n": "memory_usage_percent", "r": false, "sh": "The percentage of memory used by this container group instance.", "t": "`$NUMBER`", "key$": "memory_usage_percent", "index$": 7 }, "pulling_progress": { "a": true, "fo": "float", "h": "Pulling Progress", "n": "pulling_progress", "r": false, "sh": "The progress percentage of pulling the container image.", "t": "`$NUMBER`", "key$": "pulling_progress", "index$": 8 }, "ready": { "a": true, "h": "Ready", "n": "ready", "r": false, "sh": "Indicates whether the container group instance is currently passing its readiness checks and is able to receive traffic or perform its intended function.", "t": "`$BOOLEAN`", "key$": "ready", "index$": 9 }, "ssh_host_key_fingerprint": { "a": true, "h": "Ssh Host Key Fingerprint", "n": "ssh_host_key_fingerprint", "r": false, "sh": "The SSH host key fingerprint of the container group instance", "t": "`$STRING`", "key$": "ssh_host_key_fingerprint", "index$": 10 }, "ssh_ip": { "a": true, "fo": "ipv4", "h": "Ssh Ip", "n": "ssh_ip", "r": false, "sh": "The SSH IP address of the container group instance", "t": "`$STRING`", "key$": "ssh_ip", "index$": 11 }, "ssh_port": { "a": true, "fo": "int32", "h": "Ssh Port", "n": "ssh_port", "r": false, "sh": "The SSH port of the container group instance", "t": "`$INTEGER`", "key$": "ssh_port", "index$": 12 }, "started": { "a": true, "h": "Started", "n": "started", "r": false, "sh": "Indicates whether the container group instance has successfully completed its startup sequence and passed any configured startup probes.", "t": "`$BOOLEAN`", "key$": "started", "index$": 13 }, "state": { "a": true, "h": "State", "n": "state", "r": true, "sh": "The state of the container group instance", "t": "`$STRING`", "key$": "state", "index$": 14 }, "update_time": { "a": true, "fo": "date-time", "h": "Update Time", "n": "update_time", "r": true, "sh": "The UTC timestamp when the container group instance last changed its state.", "t": "`$STRING`", "key$": "update_time", "index$": 15 }, "version": { "a": true, "fo": "int32", "h": "Version", "n": "version", "r": true, "sh": "The version of the container group definition currently running on this instance.", "t": "`$INTEGER`", "key$": "version", "index$": 16 } }, "id": { "field": "id", "name": "id" }, "name": "container_group_instance", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "container_group_name", "or": "container_group_name", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_name", "or": "organization_name", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_name", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances", "q": { "exist": ["container_group_name", "organization_name", "project_id"] }, "r": { "param": { "project_name": "project_id" } }, "s": [{ "lit": "organizations" }, { "var": "organization_name" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "containers" }, { "var": "container_group_name" }, { "lit": "instances" }], "t": { "req": "`reqdata`", "res": "`body.instances`" }, "index$": 0 }], "key$": "list" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "container_id", "or": "container_group_name", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "container_group_instance_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_name", "or": "organization_name", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "project_id", "or": "project_name", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "PATCH", "o": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}", "q": { "exist": ["container_id", "id", "organization_name", "project_id"] }, "r": { "param": { "container_group_instance_id": "id", "container_group_name": "container_id", "project_name": "project_id" } }, "s": [{ "lit": "organizations" }, { "var": "organization_name" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "containers" }, { "var": "container_id" }, { "lit": "instances" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.container"]] }, "key$": "container_group_instance", "name__orig": "container_group_instance", "Name": "ContainerGroupInstance", "name_": "container_group_instance", "name-": "container-group-instance", "NAME": "CONTAINER_GROUP_INSTANCE", "index$": 2 }, { "active": true, "entity": "container_group_instance", "key$": "BasicContainerGroupInstanceFlow", "kind": "basic", "name": "BasicContainerGroupInstanceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "container_group_name": "container_group_name01", "organization_name": "organization_name01", "project_id": "project01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "container_group_instance_ref01" } }], "index$": 0 }, { "a": true, "d": { "container_id": "container01", "organization_name": "organization_name01", "project_id": "project01" }, "i": { "ref": "container_group_instance_ref01", "srcdatavar": "container_group_instance_ref01_data", "suffix": "_up0", "textfield": "machine_id" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-container_group_instance_ref01" } }], "v": [], "index$": 1 }] }, 'ContainerGroupInstance', { "GET /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances": { "protocol": "http", "parameters": [{ "name": "organization_name", "in": "path", "description": "Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.", "required": true, "schema": { "description": "The organization name.", "type": "string", "examples": ["acme-corp"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "title": "Organization Name", "x-ref": "#/components/schemas/OrganizationName" }, "x-ref": "#/components/parameters/organization_name", "index$": 0 }, { "name": "project_name", "in": "path", "description": "Your project name. This represents a collection of related SaladCloud resources. The project must be created before using the API.", "required": true, "schema": { "description": "The project name.", "type": "string", "examples": ["dev-env"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "x-ref": "#/components/schemas/ProjectName" }, "x-ref": "#/components/parameters/project_name", "index$": 1 }, { "in": "path", "name": "container_group_name", "description": "The unique container group name", "required": true, "schema": { "description": "The container group name.", "type": "string", "examples": ["mandlebrot"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "title": "Container Group Name", "x-ref": "#/components/schemas/ContainerGroupName" }, "x-ref": "#/components/parameters/container_group_name", "index$": 2 }] }, "PATCH /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/merge-patch+json": { "schema": { "description": "Represents a request to update a container group instance", "type": "object", "properties": { "deletion_cost": { "description": "The cost of deleting the container group instance", "type": ["integer", "null"], "maximum": 100000, "minimum": 0 } }, "additionalProperties": false, "x-ref": "#/components/schemas/ContainerGroupInstancePatch" } } }, "x-ref": "#/components/requestBodies/UpdateContainerGroupInstance" }, "parameters": [{ "name": "organization_name", "in": "path", "description": "Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.", "required": true, "schema": { "description": "The organization name.", "type": "string", "examples": ["acme-corp"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "title": "Organization Name", "x-ref": "#/components/schemas/OrganizationName" }, "x-ref": "#/components/parameters/organization_name", "index$": 0 }, { "name": "project_name", "in": "path", "description": "Your project name. This represents a collection of related SaladCloud resources. The project must be created before using the API.", "required": true, "schema": { "description": "The project name.", "type": "string", "examples": ["dev-env"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "x-ref": "#/components/schemas/ProjectName" }, "x-ref": "#/components/parameters/project_name", "index$": 1 }, { "in": "path", "name": "container_group_name", "description": "The unique container group name", "required": true, "schema": { "description": "The container group name.", "type": "string", "examples": ["mandlebrot"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "title": "Container Group Name", "x-ref": "#/components/schemas/ContainerGroupName" }, "x-ref": "#/components/parameters/container_group_name", "index$": 2 }, { "in": "path", "name": "container_group_instance_id", "description": "The unique container group instance identifier", "required": true, "schema": { "description": "The container group instance identifier.", "type": "string", "format": "uuid", "examples": ["db3a4591-efc3-46c0-b06a-3d820c0ec100"], "title": "Container Group Instance ID", "x-ref": "#/components/schemas/ContainerGroupInstanceId" }, "x-ref": "#/components/parameters/container_group_instance_id", "index$": 3 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let container_group_instance_ref01_data = Object.values(setup.data.existing.container_group_instance)[0];
        // LIST
        const container_group_instance_ref01_ent = client.ContainerGroupInstance();
        const container_group_instance_ref01_match = {};
        container_group_instance_ref01_match['container_group_name'] = setup.idmap['container_group_name01'];
        container_group_instance_ref01_match['organization_name'] = setup.idmap['organization_name01'];
        container_group_instance_ref01_match['project_id'] = setup.idmap['project01'];
        const container_group_instance_ref01_list = (await container_group_instance_ref01_ent.list(container_group_instance_ref01_match)).map((e) => e.data());
        // UPDATE
        const container_group_instance_ref01_data_up0 = {};
        container_group_instance_ref01_data_up0.id = container_group_instance_ref01_data.id;
        container_group_instance_ref01_data_up0['container_id'] = setup.idmap['container_id'];
        container_group_instance_ref01_data_up0['organization_name'] = setup.idmap['organization_name'];
        container_group_instance_ref01_data_up0['project_id'] = setup.idmap['project_id'];
        const container_group_instance_ref01_markdef_up0 = { name: 'machine_id', value: 'Mark01-container_group_instance_ref01_' + setup.now };
        container_group_instance_ref01_data_up0[container_group_instance_ref01_markdef_up0.name] = container_group_instance_ref01_markdef_up0.value;
        const container_group_instance_ref01_resdata_up0 = (await container_group_instance_ref01_ent.update(container_group_instance_ref01_data_up0)).data();
        (0, node_assert_1.default)(container_group_instance_ref01_resdata_up0.id === container_group_instance_ref01_data_up0.id);
        (0, node_assert_1.default)(container_group_instance_ref01_resdata_up0[container_group_instance_ref01_markdef_up0.name] === container_group_instance_ref01_markdef_up0.value);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/container_group_instance/ContainerGroupInstanceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SaladcloudSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['container_group_instance01', 'container_group_instance02', 'container_group_instance03', 'container01', 'container02', 'container03', 'container_group_name01', 'organization_name01', 'project01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID': idmap,
        'SALADCLOUD_TEST_LIVE': 'FALSE',
        'SALADCLOUD_TEST_EXPLAIN': 'FALSE',
        'SALADCLOUD_APIKEY': '',
    });
    idmap = env['SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID'];
    const live = 'TRUE' === env.SALADCLOUD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SALADCLOUD_TEST_CONTAINER_GROUP_INSTANCE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.SaladcloudSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.SALADCLOUD_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.SALADCLOUD_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ContainerGroupInstanceEntity.test.js.map