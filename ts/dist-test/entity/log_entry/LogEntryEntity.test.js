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
(0, node_test_1.describe)('LogEntryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SALADCLOUD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SALADCLOUD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SaladcloudSDK.test();
        const ent = testsdk.LogEntry();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SALADCLOUD_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'log_entry.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "end_time": { "a": true, "fo": "date-time", "h": "End Time", "n": "end_time", "r": true, "sh": "The end time of the time range", "t": "`$STRING`", "key$": "end_time", "index$": 0 }, "items": { "a": true, "h": "Items", "n": "items", "r": true, "sh": "A collection of log entries", "t": "`$ARRAY`", "key$": "items", "index$": 1 }, "organization_name": { "a": true, "h": "Organization Name", "n": "organization_name", "r": true, "sh": "The organization name.", "t": "`$STRING`", "key$": "organization_name", "index$": 2 }, "page_max_time": { "a": true, "fo": "date-time", "h": "Page Max Time", "n": "page_max_time", "r": true, "sh": "The maximum time page boundary.", "t": "`$STRING`", "key$": "page_max_time", "index$": 3 }, "page_min_time": { "a": true, "fo": "date-time", "h": "Page Min Time", "n": "page_min_time", "r": true, "sh": "The minimum time page boundary.", "t": "`$STRING`", "key$": "page_min_time", "index$": 4 }, "page_size": { "a": true, "fo": "int32", "h": "Page Size", "n": "page_size", "r": false, "sh": "The maximum number of items per page.", "t": "`$INTEGER`", "key$": "page_size", "index$": 5 }, "query": { "a": true, "h": "Query", "n": "query", "r": true, "sh": "The query string for filtering logs", "t": "`$STRING`", "key$": "query", "index$": 6 }, "sort_order": { "a": true, "h": "Sort Order", "n": "sort_order", "r": false, "sh": "The sort order of the log entries.", "t": "`$STRING`", "key$": "sort_order", "index$": 7 }, "start_time": { "a": true, "fo": "date-time", "h": "Start Time", "n": "start_time", "r": true, "sh": "The start time of the time range", "t": "`$STRING`", "key$": "start_time", "index$": 8 } }, "name": "log_entry", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /organizations/{organization_name}/log-entries", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_name", "or": "organization_name", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/organizations/{organization_name}/log-entries", "q": { "exist": ["organization_name"] }, "r": {}, "s": [{ "lit": "organizations" }, { "var": "organization_name" }, { "lit": "log-entries" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "log_entry", "name__orig": "log_entry", "Name": "LogEntry", "name_": "log_entry", "name-": "log-entry", "NAME": "LOG_ENTRY", "index$": 9 }, { "active": true, "entity": "log_entry", "key$": "BasicLogEntryFlow", "kind": "basic", "name": "BasicLogEntryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "log_entry_ref01" }, "m": { "organization_name": "organization_name01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'LogEntry', { "POST /organizations/{organization_name}/log-entries": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "description": "Represents a query for logs", "type": "object", "properties": { "end_time": { "description": "The end time of the time range", "type": "string", "format": "date-time", "key$": "end_time" }, "page_size": { "description": "The maximum number of items per page.", "type": "integer", "format": "int32", "examples": [1], "maximum": 100, "minimum": 1, "x-ref": "#/components/schemas/PageSize", "key$": "page_size" }, "query": { "description": "The query string for filtering logs", "maxLength": 20000, "minLength": 0, "type": "string", "key$": "query" }, "sort_order": { "description": "The sort order of the log entries. `asc` will sort the log entries in chronological order. `desc` will sort the log entries in reverse chronological order.", "type": "string", "default": "desc", "enum": ["desc", "asc"], "x-ref": "#/components/schemas/LogEntryQuerySortOrder", "key$": "sort_order" }, "start_time": { "description": "The start time of the time range", "type": "string", "format": "date-time", "key$": "start_time" } }, "required": ["end_time", "query", "start_time"], "x-ref": "#/components/schemas/LogEntryQuery", "index$": 1 } } }, "x-ref": "#/components/requestBodies/QueryLogEntries" }, "parameters": [{ "name": "organization_name", "in": "path", "description": "Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.", "required": true, "schema": { "description": "The organization name.", "type": "string", "examples": ["acme-corp"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "title": "Organization Name", "x-ref": "#/components/schemas/OrganizationName" }, "x-ref": "#/components/parameters/organization_name", "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const log_entry_ref01_ent = client.LogEntry();
        let log_entry_ref01_data = setup.data.new.log_entry['log_entry_ref01'];
        log_entry_ref01_data['organization_name'] = setup.idmap['organization_name01'];
        log_entry_ref01_data = (await log_entry_ref01_ent.create(log_entry_ref01_data)).data();
        (0, node_assert_1.default)(null != log_entry_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/log_entry/LogEntryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SaladcloudSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['log_entry01', 'log_entry02', 'log_entry03', 'organization_name01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SALADCLOUD_TEST_LOG_ENTRY_ENTID': idmap,
        'SALADCLOUD_TEST_LIVE': 'FALSE',
        'SALADCLOUD_TEST_EXPLAIN': 'FALSE',
        'SALADCLOUD_APIKEY': '',
    });
    idmap = env['SALADCLOUD_TEST_LOG_ENTRY_ENTID'];
    const live = 'TRUE' === env.SALADCLOUD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SALADCLOUD_TEST_LOG_ENTRY_ENTID'];
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
//# sourceMappingURL=LogEntryEntity.test.js.map