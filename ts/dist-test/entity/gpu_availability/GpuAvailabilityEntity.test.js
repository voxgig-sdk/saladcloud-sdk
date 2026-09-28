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
(0, node_test_1.describe)('GpuAvailabilityEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SALADCLOUD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SALADCLOUD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SaladcloudSDK.test();
        const ent = testsdk.GpuAvailability();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SALADCLOUD_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'gpu_availability.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "available_gpu_batch": { "a": true, "fo": "int32", "h": "Available Gpu Batch", "n": "available_gpu_batch", "r": false, "sh": "The number of available GPU batches", "t": "`$INTEGER`", "key$": "available_gpu_batch", "index$": 0 }, "available_gpu_high": { "a": true, "fo": "int32", "h": "Available Gpu High", "n": "available_gpu_high", "r": false, "sh": "The number of available high-end GPUs", "t": "`$INTEGER`", "key$": "available_gpu_high", "index$": 1 }, "available_gpu_low": { "a": true, "fo": "int32", "h": "Available Gpu Low", "n": "available_gpu_low", "r": false, "sh": "The number of available low-end GPUs", "t": "`$INTEGER`", "key$": "available_gpu_low", "index$": 2 }, "available_gpu_medium": { "a": true, "fo": "int32", "h": "Available Gpu Medium", "n": "available_gpu_medium", "r": false, "sh": "The number of available medium-end GPUs", "t": "`$INTEGER`", "key$": "available_gpu_medium", "index$": 3 }, "country_codes": { "a": true, "h": "Country Codes", "n": "country_codes", "r": false, "sh": "A list of country codes where the resources are available", "t": "`$ARRAY`", "key$": "country_codes", "index$": 4 }, "cpu": { "a": true, "fo": "int32", "h": "Cpu", "n": "cpu", "r": false, "sh": "The number of available CPU cores", "t": "`$INTEGER`", "key$": "cpu", "index$": 5 }, "gpu_classes": { "a": true, "h": "Gpu Classes", "n": "gpu_classes", "r": true, "sh": "A list of available GPU class names", "t": "`$ARRAY`", "key$": "gpu_classes", "index$": 6 }, "memory": { "a": true, "fo": "int64", "h": "Memory", "n": "memory", "r": false, "sh": "The amount of available memory in MB", "t": "`$INTEGER`", "key$": "memory", "index$": 7 }, "on_call_gpu": { "a": true, "fo": "int32", "h": "On Call Gpu", "n": "on_call_gpu", "r": false, "sh": "The number of on-call GPUs available", "t": "`$INTEGER`", "key$": "on_call_gpu", "index$": 8 }, "storage_amount": { "a": true, "fo": "int64", "h": "Storage Amount", "n": "storage_amount", "r": false, "sh": "The amount of available storage in bytes", "t": "`$INTEGER`", "key$": "storage_amount", "index$": 9 } }, "name": "gpu_availability", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /organizations/{organization_name}/availability/sce-gpu-availability", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_name", "or": "organization_name", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/organizations/{organization_name}/availability/sce-gpu-availability", "q": { "exist": ["organization_name"] }, "r": {}, "s": [{ "lit": "organizations" }, { "var": "organization_name" }, { "lit": "availability" }, { "lit": "sce-gpu-availability" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "gpu_availability", "name__orig": "gpu_availability", "Name": "GpuAvailability", "name_": "gpu_availability", "name-": "gpu-availability", "NAME": "GPU_AVAILABILITY", "index$": 4 }, { "active": true, "entity": "gpu_availability", "key$": "BasicGpuAvailabilityFlow", "kind": "basic", "name": "BasicGpuAvailabilityFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "gpu_availability_ref01" }, "m": { "organization_name": "organization_name01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'GpuAvailability', { "POST /organizations/{organization_name}/availability/sce-gpu-availability": { "protocol": "http", "requestBody": { "description": "Represents a request to check GPU availability", "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "country_codes": { "description": "A list of country codes where the resources are available", "type": "array", "items": { "description": "ISO 3166-1 alpha-2 country code", "type": "string", "example": "us", "enum": ["af", "al", "dz", "as", "ad", "ao", "ai", "aq", "ag", "ar", "am", "aw", "au", "at", "az", "bs", "bh", "bd", "bb", "by", "be", "bz", "bj", "bm", "bt", "bo", "bq", "ba", "bw", "bv", "br", "io", "bn", "bg", "bf", "bi", "cv", "kh", "cm", "ca", "ky", "cf", "td", "cl", "cn", "cx", "cc", "co", "km", "cd", "cg", "ck", "cr", "hr", "cu", "cw", "cy", "cz", "ci", "dk", "dj", "dm", "do", "ec", "eg", "sv", "gq", "er", "ee", "sz", "et", "fk", "fo", "fj", "fi", "fr", "gf", "pf", "tf", "ga", "gm", "ge", "de", "gh", "gi", "gr", "gl", "gd", "gp", "gu", "gt", "gg", "gn", "gw", "gy", "ht", "hm", "va", "hn", "hk", "hu", "is", "in", "id", "ir", "iq", "ie", "im", "il", "it", "jm", "jp", "je", "jo", "kz", "ke", "ki", "kp", "kr", "kw", "kg", "la", "lv", "lb", "ls", "lr", "ly", "li", "lt", "lu", "mo", "mg", "mw", "my", "mv", "ml", "mt", "mh", "mq", "mr", "mu", "yt", "mx", "fm", "md", "mc", "mn", "me", "ms", "ma", "mz", "mm", "na", "nr", "np", "nl", "nc", "nz", "ni", "ne", "ng", "nu", "nf", "mp", "no", "om", "pk", "pw", "ps", "pa", "pg", "py", "pe", "ph", "pn", "pl", "pt", "pr", "qa", "mk", "ro", "ru", "rw", "re", "bl", "sh", "kn", "lc", "mf", "pm", "vc", "ws", "sm", "st", "sa", "sn", "rs", "sc", "sl", "sg", "sx", "sk", "si", "sb", "so", "za", "gs", "ss", "es", "lk", "sd", "sr", "sj", "se", "ch", "sy", "tw", "tj", "tz", "th", "tl", "tg", "tk", "to", "tt", "tn", "tr", "tm", "tc", "tv", "ug", "ua", "ae", "gb", "um", "us", "uy", "uz", "vu", "ve", "vn", "vg", "vi", "wf", "eh", "ye", "zm", "zw", "ax"], "title": "Country Code", "x-ref": "#/components/schemas/CountryCode" }, "example": ["us", "ca"], "key$": "country_codes" }, "cpu": { "description": "The number of available CPU cores", "type": "integer", "format": "int32", "example": 4, "nullable": true, "key$": "cpu" }, "gpu_classes": { "description": "A list of available GPU class names", "type": "array", "items": { "type": "string", "format": "uuid" }, "example": ["550e8400-e29b-41d4-a716-446655440000", "6ba7b810-9dad-11d1-80b4-00c04fd430c8"], "minItems": 1, "key$": "gpu_classes" }, "memory": { "description": "The amount of available memory in MB", "type": "integer", "format": "int64", "example": 8192, "nullable": true, "key$": "memory" }, "storage_amount": { "description": "The amount of available storage in bytes", "type": "integer", "format": "int64", "example": 1000000000, "nullable": true, "key$": "storage_amount" } }, "required": ["gpu_classes"], "x-ref": "#/components/schemas/GpuAvailabilityPrototype", "index$": 1 } } }, "x-ref": "#/components/requestBodies/GetGpuAvailability" }, "parameters": [{ "name": "organization_name", "in": "path", "description": "Your organization name. This identifies the billing context for the API operation and represents a security boundary for SaladCloud resources. The organization must be created before using the API, and you must be a member of the organization.", "required": true, "schema": { "description": "The organization name.", "type": "string", "examples": ["acme-corp"], "maxLength": 63, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,61}[a-z0-9]$", "title": "Organization Name", "x-ref": "#/components/schemas/OrganizationName" }, "x-ref": "#/components/parameters/organization_name", "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const gpu_availability_ref01_ent = client.GpuAvailability();
        let gpu_availability_ref01_data = setup.data.new.gpu_availability['gpu_availability_ref01'];
        gpu_availability_ref01_data['organization_name'] = setup.idmap['organization_name01'];
        gpu_availability_ref01_data = (await gpu_availability_ref01_ent.create(gpu_availability_ref01_data)).data();
        (0, node_assert_1.default)(null != gpu_availability_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/gpu_availability/GpuAvailabilityTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SaladcloudSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['gpu_availability01', 'gpu_availability02', 'gpu_availability03', 'organization_name01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SALADCLOUD_TEST_GPU_AVAILABILITY_ENTID': idmap,
        'SALADCLOUD_TEST_LIVE': 'FALSE',
        'SALADCLOUD_TEST_EXPLAIN': 'FALSE',
        'SALADCLOUD_APIKEY': '',
    });
    idmap = env['SALADCLOUD_TEST_GPU_AVAILABILITY_ENTID'];
    const live = 'TRUE' === env.SALADCLOUD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SALADCLOUD_TEST_GPU_AVAILABILITY_ENTID'];
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
//# sourceMappingURL=GpuAvailabilityEntity.test.js.map