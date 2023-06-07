"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBase64 = exports.isUrl = void 0;
function isUrl(str) {
    const urlPattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;
    return urlPattern.test(str);
}
exports.isUrl = isUrl;
function isBase64(str) {
    const base64Pattern = /^[A-Za-z0-9+/=]+$/;
    return base64Pattern.test(str);
}
exports.isBase64 = isBase64;
//# sourceMappingURL=utils.js.map