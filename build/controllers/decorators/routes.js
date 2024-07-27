"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.put = exports.patch = exports.post = exports.get = exports.routeBinder = void 0;
require("reflect-metadata");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', method, target, key);
        };
    };
}
exports.routeBinder = routeBinder;
exports.get = routeBinder('get');
exports.post = routeBinder('post');
exports.patch = routeBinder('put');
exports.put = routeBinder('put');
exports.del = routeBinder('delete');
