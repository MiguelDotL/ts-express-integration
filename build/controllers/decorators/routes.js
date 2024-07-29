"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = exports.patch = exports.del = exports.put = exports.post = exports.get = exports.routeBinder = void 0;
require("reflect-metadata");
const HttpMethods_1 = require("./HttpMethods");
const MetadataKeys_1 = require("./MetadataKeys");
/**
 * A higher-order function that binds a specific HTTP method to a route path.
 * This function is used as a decorator to annotate class methods with route information.
 *
 * @param method - The HTTP method to be associated with the route.
 * @returns A function that takes a path parameter and returns a decorator function.
 *
 * @example
 * ```typescript
 * const { get } = require('./routeBinder');
 *
 * class MyController {
 *     @get('/users')
 *     getUsers(req: Request, res: Response) {
 *         // Handle GET request for /users route
 *     }
 * }
 * ```
 */
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
