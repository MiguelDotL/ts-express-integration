"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
const MetadataKeys_1 = require("./MetadataKeys");
/**
 * A decorator function that adds a middleware function to a class method.
 * The middleware function will be executed before the method is invoked.
 *
 * @param middleware - The middleware function to be added.
 * @returns A function that can be used as a decorator for class methods.
 *
 * @example
 * ```typescript
 * import 'reflect-metadata';
 * import { RequestHandler } from 'express';
 * import { use } from './use';
 *
 * class MyController {
 *     @use(myMiddleware)
 *     public myMethod() {
 *         // Method implementation
 *     }
 * }
 * ```
 */
function use(middleware) {
    return function (target, key, desc) {
        const middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.MIDDLEWARE, target, key) || [];
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.MIDDLEWARE, [...middlewares, middleware], target, key);
    };
}
exports.use = use;
