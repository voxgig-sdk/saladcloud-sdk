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
(0, node_test_1.describe)('QuotaEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SALADCLOUD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SALADCLOUD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SaladcloudSDK.test();
        const ent = testsdk.Quota();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SALADCLOUD_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'quota.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "container_groups_quotas": { "a": true, "h": "Container Groups Quotas", "n": "container_groups_quotas", "r": true, "sh": "Represents the organization quotas for container groups", "t": "`$OBJECT`", "key$": "container_groups_quotas", "index$": 0 }, "create_time": { "a": true, "fo": "date-time", "h": "Create Time", "n": "create_time", "r": false, "sh": "The time the resource was created", "t": "`$STRING`", "key$": "create_time", "index$": 1 }, "update_time": { "a": true, "fo": "date-time", "h": "Update Time", "n": "update_time", "r": false, "sh": "The time the resource was last updated", "t": "`$STRING`", "key$": "update_time", "index$": 2 } }, "name": "quota", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /organizations/{organization_name}/quotas", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_name", "or": "organization_name", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/organizations/{organization_name}/quotas", "q": { "exist": ["organization_name"] }, "r": {}, "s": [{ "lit": "organizations" }, { "var": "organization_name" }, { "lit": "quotas" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "quota", "name__orig": "quota", "Name": "Quota", "name_": "quota", "name-": "quota", "NAME": "QUOTA", "index$": 11 }, { "active": true, "entity": "quota", "key$": "BasicQuotaFlow", "kind": "basic", "name": "BasicQuotaFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "quota_ref01", "srcdatavar": "quota_ref01_data", "suffix": "_dt0" }, "m": { "id": "quota01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-quota_ref01" } }], "index$": 0 }] }, 'Quota', { "GET /organizations/{organization_name}/quotas": { "protocol": "http", "parameters": [{ "name": "organization_name", "in": "path", "description": "Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.", "required": true, "schema": { "description": "The organization name.", "type": "string", "examples": ["acme-corp"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "title": "Organization Name", "x-ref": "#/components/schemas/OrganizationName" }, "x-ref": "#/components/parameters/organization_name", "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let quota_ref01_data = Object.values(setup.data.existing.quota)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const quota_ref01_ent = client.Quota();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/quota/QuotaTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SaladcloudSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['quota01', 'quota02', 'quota03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SALADCLOUD_TEST_QUOTA_ENTID': idmap,
        'SALADCLOUD_TEST_LIVE': 'FALSE',
        'SALADCLOUD_TEST_EXPLAIN': 'FALSE',
        'SALADCLOUD_APIKEY': '',
    });
    idmap = env['SALADCLOUD_TEST_QUOTA_ENTID'];
    const live = 'TRUE' === env.SALADCLOUD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SALADCLOUD_TEST_QUOTA_ENTID'];
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
//# sourceMappingURL=QuotaEntity.test.js.map