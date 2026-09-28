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
(0, node_test_1.describe)('ContainerGroupEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SALADCLOUD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SALADCLOUD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SaladcloudSDK.test();
        const ent = testsdk.ContainerGroup();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SALADCLOUD_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'container_group.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "container_group", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/reallocate", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "container_id", "or": "container_group_name", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "instance_id", "or": "container_group_instance_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_name", "or": "organization_name", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "project_id", "or": "project_name", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "POST", "o": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/reallocate", "q": { "$action": "reallocate", "exist": ["container_id", "instance_id", "organization_name", "project_id"] }, "r": { "param": { "container_group_instance_id": "instance_id", "container_group_name": "container_id", "project_name": "project_id" } }, "s": [{ "lit": "organizations" }, { "var": "organization_name" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "containers" }, { "var": "container_id" }, { "lit": "instances" }, { "var": "instance_id" }, { "lit": "reallocate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/recreate", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "container_id", "or": "container_group_name", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "instance_id", "or": "container_group_instance_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_name", "or": "organization_name", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "project_id", "or": "project_name", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "POST", "o": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/recreate", "q": { "$action": "recreate", "exist": ["container_id", "instance_id", "organization_name", "project_id"] }, "r": { "param": { "container_group_instance_id": "instance_id", "container_group_name": "container_id", "project_name": "project_id" } }, "s": [{ "lit": "organizations" }, { "var": "organization_name" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "containers" }, { "var": "container_id" }, { "lit": "instances" }, { "var": "instance_id" }, { "lit": "recreate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "POST /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/restart", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "container_id", "or": "container_group_name", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "instance_id", "or": "container_group_instance_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_name", "or": "organization_name", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "project_id", "or": "project_name", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "POST", "o": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/restart", "q": { "$action": "restart", "exist": ["container_id", "instance_id", "organization_name", "project_id"] }, "r": { "param": { "container_group_instance_id": "instance_id", "container_group_name": "container_id", "project_name": "project_id" } }, "s": [{ "lit": "organizations" }, { "var": "organization_name" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "containers" }, { "var": "container_id" }, { "lit": "instances" }, { "var": "instance_id" }, { "lit": "restart" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "container_group_instance_id", "or": "container_group_instance_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "container_id", "or": "container_group_name", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_name", "or": "organization_name", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "project_id", "or": "project_name", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}", "q": { "exist": ["container_group_instance_id", "container_id", "organization_name", "project_id"] }, "r": { "param": { "container_group_name": "container_id", "project_name": "project_id" } }, "s": [{ "lit": "organizations" }, { "var": "organization_name" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "containers" }, { "var": "container_id" }, { "lit": "instances" }, { "var": "container_group_instance_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.container"]] }, "key$": "container_group", "name__orig": "container_group", "Name": "ContainerGroup", "name_": "container_group", "name-": "container-group", "NAME": "CONTAINER_GROUP", "index$": 1 }, { "active": true, "entity": "container_group", "key$": "BasicContainerGroupFlow", "kind": "basic", "name": "BasicContainerGroupFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "container_group_ref01" }, "m": { "container_id": "container01", "instance_id": "instance01", "organization_name": "organization_name01", "project_id": "project01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "container_group_ref01", "srcdatavar": "container_group_ref01_data", "suffix": "_dt0" }, "m": { "container_id": "container01", "id": "container_group01", "organization_name": "organization_name01", "project_id": "project01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-container_group_ref01" } }], "index$": 1 }] }, 'ContainerGroup', { "POST /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/reallocate": { "protocol": "http", "parameters": [{ "name": "organization_name", "in": "path", "description": "Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.", "required": true, "schema": { "description": "The organization name.", "type": "string", "examples": ["acme-corp"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "title": "Organization Name", "x-ref": "#/components/schemas/OrganizationName" }, "x-ref": "#/components/parameters/organization_name", "index$": 0 }, { "name": "project_name", "in": "path", "description": "Your project name. This represents a collection of related SaladCloud resources. The project must be created before using the API.", "required": true, "schema": { "description": "The project name.", "type": "string", "examples": ["dev-env"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "x-ref": "#/components/schemas/ProjectName" }, "x-ref": "#/components/parameters/project_name", "index$": 1 }, { "in": "path", "name": "container_group_name", "description": "The unique container group name", "required": true, "schema": { "description": "The container group name.", "type": "string", "examples": ["mandlebrot"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "title": "Container Group Name", "x-ref": "#/components/schemas/ContainerGroupName" }, "x-ref": "#/components/parameters/container_group_name", "index$": 2 }, { "in": "path", "name": "container_group_instance_id", "description": "The unique container group instance identifier", "required": true, "schema": { "description": "The container group instance identifier.", "type": "string", "format": "uuid", "examples": ["db3a4591-efc3-46c0-b06a-3d820c0ec100"], "title": "Container Group Instance ID", "x-ref": "#/components/schemas/ContainerGroupInstanceId" }, "x-ref": "#/components/parameters/container_group_instance_id", "index$": 3 }] }, "POST /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/recreate": { "protocol": "http", "parameters": [{ "name": "organization_name", "in": "path", "description": "Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.", "required": true, "schema": { "description": "The organization name.", "type": "string", "examples": ["acme-corp"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "title": "Organization Name", "x-ref": "#/components/schemas/OrganizationName" }, "x-ref": "#/components/parameters/organization_name", "index$": 0 }, { "name": "project_name", "in": "path", "description": "Your project name. This represents a collection of related SaladCloud resources. The project must be created before using the API.", "required": true, "schema": { "description": "The project name.", "type": "string", "examples": ["dev-env"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "x-ref": "#/components/schemas/ProjectName" }, "x-ref": "#/components/parameters/project_name", "index$": 1 }, { "in": "path", "name": "container_group_name", "description": "The unique container group name", "required": true, "schema": { "description": "The container group name.", "type": "string", "examples": ["mandlebrot"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "title": "Container Group Name", "x-ref": "#/components/schemas/ContainerGroupName" }, "x-ref": "#/components/parameters/container_group_name", "index$": 2 }, { "in": "path", "name": "container_group_instance_id", "description": "The unique container group instance identifier", "required": true, "schema": { "description": "The container group instance identifier.", "type": "string", "format": "uuid", "examples": ["db3a4591-efc3-46c0-b06a-3d820c0ec100"], "title": "Container Group Instance ID", "x-ref": "#/components/schemas/ContainerGroupInstanceId" }, "x-ref": "#/components/parameters/container_group_instance_id", "index$": 3 }] }, "POST /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}/restart": { "protocol": "http", "parameters": [{ "name": "organization_name", "in": "path", "description": "Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.", "required": true, "schema": { "description": "The organization name.", "type": "string", "examples": ["acme-corp"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "title": "Organization Name", "x-ref": "#/components/schemas/OrganizationName" }, "x-ref": "#/components/parameters/organization_name", "index$": 0 }, { "name": "project_name", "in": "path", "description": "Your project name. This represents a collection of related SaladCloud resources. The project must be created before using the API.", "required": true, "schema": { "description": "The project name.", "type": "string", "examples": ["dev-env"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "x-ref": "#/components/schemas/ProjectName" }, "x-ref": "#/components/parameters/project_name", "index$": 1 }, { "in": "path", "name": "container_group_name", "description": "The unique container group name", "required": true, "schema": { "description": "The container group name.", "type": "string", "examples": ["mandlebrot"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "title": "Container Group Name", "x-ref": "#/components/schemas/ContainerGroupName" }, "x-ref": "#/components/parameters/container_group_name", "index$": 2 }, { "in": "path", "name": "container_group_instance_id", "description": "The unique container group instance identifier", "required": true, "schema": { "description": "The container group instance identifier.", "type": "string", "format": "uuid", "examples": ["db3a4591-efc3-46c0-b06a-3d820c0ec100"], "title": "Container Group Instance ID", "x-ref": "#/components/schemas/ContainerGroupInstanceId" }, "x-ref": "#/components/parameters/container_group_instance_id", "index$": 3 }] }, "GET /organizations/{organization_name}/projects/{project_name}/containers/{container_group_name}/instances/{container_group_instance_id}": { "protocol": "http", "parameters": [{ "name": "organization_name", "in": "path", "description": "Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.", "required": true, "schema": { "description": "The organization name.", "type": "string", "examples": ["acme-corp"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "title": "Organization Name", "x-ref": "#/components/schemas/OrganizationName" }, "x-ref": "#/components/parameters/organization_name", "index$": 0 }, { "name": "project_name", "in": "path", "description": "Your project name. This represents a collection of related SaladCloud resources. The project must be created before using the API.", "required": true, "schema": { "description": "The project name.", "type": "string", "examples": ["dev-env"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "x-ref": "#/components/schemas/ProjectName" }, "x-ref": "#/components/parameters/project_name", "index$": 1 }, { "in": "path", "name": "container_group_name", "description": "The unique container group name", "required": true, "schema": { "description": "The container group name.", "type": "string", "examples": ["mandlebrot"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "title": "Container Group Name", "x-ref": "#/components/schemas/ContainerGroupName" }, "x-ref": "#/components/parameters/container_group_name", "index$": 2 }, { "in": "path", "name": "container_group_instance_id", "description": "The unique container group instance identifier", "required": true, "schema": { "description": "The container group instance identifier.", "type": "string", "format": "uuid", "examples": ["db3a4591-efc3-46c0-b06a-3d820c0ec100"], "title": "Container Group Instance ID", "x-ref": "#/components/schemas/ContainerGroupInstanceId" }, "x-ref": "#/components/parameters/container_group_instance_id", "index$": 3 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const container_group_ref01_ent = client.ContainerGroup();
        let container_group_ref01_data = setup.data.new.container_group['container_group_ref01'];
        container_group_ref01_data['container_id'] = setup.idmap['container01'];
        container_group_ref01_data['instance_id'] = setup.idmap['instance01'];
        container_group_ref01_data['organization_name'] = setup.idmap['organization_name01'];
        container_group_ref01_data['project_id'] = setup.idmap['project01'];
        container_group_ref01_data = (await container_group_ref01_ent.create(container_group_ref01_data)).data();
        (0, node_assert_1.default)(null != container_group_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/container_group/ContainerGroupTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SaladcloudSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['container_group01', 'container_group02', 'container_group03', 'container01', 'container02', 'container03', 'instance01', 'organization_name01', 'project01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SALADCLOUD_TEST_CONTAINER_GROUP_ENTID': idmap,
        'SALADCLOUD_TEST_LIVE': 'FALSE',
        'SALADCLOUD_TEST_EXPLAIN': 'FALSE',
        'SALADCLOUD_APIKEY': '',
    });
    idmap = env['SALADCLOUD_TEST_CONTAINER_GROUP_ENTID'];
    const live = 'TRUE' === env.SALADCLOUD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SALADCLOUD_TEST_CONTAINER_GROUP_ENTID'];
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
//# sourceMappingURL=ContainerGroupEntity.test.js.map