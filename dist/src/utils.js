"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageToBase64 = exports.isBase64 = exports.isUrl = void 0;
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
function isUrl(str) {
    var urlPattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;
    return urlPattern.test(str);
}
exports.isUrl = isUrl;
function isBase64(str) {
    var base64Pattern = /^data:[A-Za-z0-9+/]+;base64,/;
    return base64Pattern.test(str);
}
exports.isBase64 = isBase64;
function imageToBase64(filePath) {
    try {
        var fileData = fs_1.default.readFileSync(filePath);
        var base64Data = fileData.toString('base64');
        var mimeType = getMimeType(filePath);
        var base64String = "data:".concat(mimeType, ";base64,").concat(base64Data);
        return base64String;
    }
    catch (error) {
        throw 'Image to base64 error: ' + JSON.stringify(error, null, 4);
    }
}
exports.imageToBase64 = imageToBase64;
function getMimeType(filePath) {
    var mimeTypeMap = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
    };
    var extension = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
    var mimeType = mimeTypeMap[extension];
    return mimeType || 'application/octet-stream';
}
exports.default = {
    isUrl: isUrl,
    isBase64: isBase64,
    imageToBase64: imageToBase64
};
//# sourceMappingURL=utils.js.map