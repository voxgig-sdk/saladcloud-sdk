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
(0, node_test_1.describe)('SystemLogEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SALADCLOUD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SALADCLOUD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SaladcloudSDK.test();
        const ent = testsdk.SystemLog();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SALADCLOUD_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'system_log.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "event_name": { "a": true, "h": "Event Name", "n": "event_name", "r": true, "sh": "The name of the event", "t": "`$STRING`", "key$": "event_name", "index$": 0 }, "event_time": { "a": true, "fo": "date-time", "h": "Event Time", "n": "event_time", "r": true, "sh": "The UTC date & time when the log item was created", "t": "`$STRING`", "key$": "event_time", "index$": 1 }, "instance_id": { "a": true, "fo": "uuid", "h": "Instance Id", "n": "instance_id", "r": false, "sh": "The container group instance identifier.", "t": "`$STRING`", "key$": "instance_id", "index$": 2 }, "machine_id": { "a": true, "fo": "uuid", "h": "Machine Id", "n": "machine_id", "r": false, "sh": "The container group machine identifier.", "t": "`$STRING`", "key$": "machine_id", "index$": 3 }, "resource_cpu": { "a": true, "h": "Resource Cpu", "n": "resource_cpu", "r": true, "sh": "The number of CPUs", "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "resource_cpu", "index$": 4 }, "resource_gpu_class": { "a": true, "h": "Resource Gpu Class", "n": "resource_gpu_class", "r": true, "sh": "The GPU class name", "t": "`$STRING`", "key$": "resource_gpu_class", "index$": 5 }, "resource_memory": { "a": true, "h": "Resource Memory", "n": "resource_memory", "r": true, "sh": "The memory amount in MB", "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "resource_memory", "index$": 6 }, "resource_storage_amount": { "a": true, "fo": "int64", "h": "Resource Storage Amount", "n": "resource_storage_amount", "r": true, "sh": "The storage amount in bytes", "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "resource_storage_amount", "index$": 7 }, "version": { "a": true, "h": "Version", "n": "version", "r": true, "sh": "The version instance ID", "t": "`$STRING`", "key$": "version", "index$": 8 } }, "name": "system_log", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/system-logs", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "container_group_name", "or": "container_group_name", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_name", "or": "organization_name", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_name", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/system-logs", "q": { "exist": ["container_group_name", "organization_name", "project_id"] }, "r": { "param": { "project_name": "project_id" } }, "s": [{ "lit": "organizations" }, { "var": "organization_name" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "containers" }, { "var": "container_group_name" }, { "lit": "system-logs" }], "t": { "req": "`reqdata`", "res": "`body.items`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.container"]] }, "key$": "system_log", "name__orig": "system_log", "Name": "SystemLog", "name_": "system_log", "name-": "system-log", "NAME": "SYSTEM_LOG", "index$": 12 }, { "active": true, "entity": "system_log", "key$": "BasicSystemLogFlow", "kind": "basic", "name": "BasicSystemLogFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "container_group_name": "container_group_name01", "organization_name": "organization_name01", "project_id": "project01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "system_log_ref01" } }], "index$": 0 }] }, 'SystemLog', { "GET /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/system-logs": { "protocol": "http", "parameters": [{ "name": "organization_name", "in": "path", "description": "Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.", "required": true, "schema": { "description": "The organization name.", "type": "string", "examples": ["acme-corp"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "title": "Organization Name", "x-ref": "#/components/schemas/OrganizationName" }, "x-ref": "#/components/parameters/organization_name", "index$": 0 }, { "name": "project_name", "in": "path", "description": "Your project name. This represents a collection of related SaladCloud resources. The project must be created before using the API.", "required": true, "schema": { "description": "The project name.", "type": "string", "examples": ["dev-env"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "x-ref": "#/components/schemas/ProjectName" }, "x-ref": "#/components/parameters/project_name", "index$": 1 }, { "in": "path", "name": "container_group_name", "description": "The unique container group name", "required": true, "schema": { "description": "The container group name.", "type": "string", "examples": ["mandlebrot"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "title": "Container Group Name", "x-ref": "#/components/schemas/ContainerGroupName" }, "x-ref": "#/components/parameters/container_group_name", "index$": 2 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let system_log_ref01_data = Object.values(setup.data.existing.system_log)[0];
        // LIST
        const system_log_ref01_ent = client.SystemLog();
        const system_log_ref01_match = {};
        system_log_ref01_match['container_group_name'] = setup.idmap['container_group_name01'];
        system_log_ref01_match['organization_name'] = setup.idmap['organization_name01'];
        system_log_ref01_match['project_id'] = setup.idmap['project01'];
        const system_log_ref01_list = (await system_log_ref01_ent.list(system_log_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/system_log/SystemLogTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SaladcloudSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['system_log01', 'system_log02', 'system_log03', 'container01', 'container02', 'container03', 'container_group_name01', 'organization_name01', 'project01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SALADCLOUD_TEST_SYSTEM_LOG_ENTID': idmap,
        'SALADCLOUD_TEST_LIVE': 'FALSE',
        'SALADCLOUD_TEST_EXPLAIN': 'FALSE',
        'SALADCLOUD_APIKEY': '',
    });
    idmap = env['SALADCLOUD_TEST_SYSTEM_LOG_ENTID'];
    const live = 'TRUE' === env.SALADCLOUD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SALADCLOUD_TEST_SYSTEM_LOG_ENTID'];
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
//# sourceMappingURL=SystemLogEntity.test.js.map