"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = void 0;
require("reflect-metadata");
function get(path) {
    return function (target, key, desc) {
        Reflect.defineMetadata('path', path, target, key);
        Reflect.defineMetadata('method', 'get', target, key);
    };
}
exports.get = get;
function post(path) {
    return function (target, key, desc) {
        Reflect.defineMetadata('path', path, target, key);
        Reflect.defineMetadata('method', 'post', target, key);
    };
}
exports.post = post;
