"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaladcloudError = void 0;
class SaladcloudError extends Error {
    isSaladcloudError = true;
    sdk = 'Saladcloud';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.SaladcloudError = SaladcloudError;
//# sourceMappingURL=SaladcloudError.js.map