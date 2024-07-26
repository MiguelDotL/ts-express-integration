"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
function controller(routePrefix) {
    return function (target) {
        Object.getOwnPropertyNames(target.prototype).forEach((key) => {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata('path', target.prototype, key);
        });
    };
}
exports.controller = controller;
