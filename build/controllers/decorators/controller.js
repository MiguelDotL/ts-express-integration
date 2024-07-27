"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = exports.router = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const Metadata_1 = require("./Metadata");
exports.router = express_1.default.Router();
function controller(routePrefix) {
    return function (target) {
        Object.getOwnPropertyNames(target.prototype).forEach((key) => {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(Metadata_1.Metadata.PATH, target.prototype, key);
            const method = Reflect.getMetadata(Metadata_1.Metadata.METHOD, target.prototype, key);
            path && exports.router[method](`${routePrefix}${path}`, routeHandler);
        });
    };
}
exports.controller = controller;
