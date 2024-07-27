"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = exports.patch = exports.del = exports.put = exports.post = exports.get = exports.routeBinder = void 0;
require("reflect-metadata");
const HttpMethods_1 = require("./HttpMethods");
const Metadata_1 = require("./Metadata");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(Metadata_1.Metadata.PATH, path, target, key);
            Reflect.defineMetadata(Metadata_1.Metadata.METHOD, method, target, key);
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
