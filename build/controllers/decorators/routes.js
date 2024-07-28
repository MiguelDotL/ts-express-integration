"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = exports.patch = exports.del = exports.put = exports.post = exports.get = exports.routeBinder = void 0;
require("reflect-metadata");
const HttpMethods_1 = require("./HttpMethods");
const MetadataKeys_1 = require("./MetadataKeys");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.PATH, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.METHOD, method, target, key);
        };
    };
}
exports.routeBinder = routeBinder;
const { GET, POST, PUT, DELETE, PATCH, ALL } = HttpMethods_1.HttpMethods;
exports.get = routeBinder(GET);
exports.post = routeBinder(POST);
exports.put = routeBinder(PUT);
exports.del = routeBinder(DELETE);
exports.patch = routeBinder(PATCH);
exports.all = routeBinder(ALL);
