import 'reflect-metadata';
import { HttpMethods } from './HttpMethods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

interface RouteHandleDescriptor extends PropertyDescriptor {
    value?: RequestHandler;
}

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
export function routeBinder(method: string) {
    return function (path: string) {
        return function (target: any, key: string, desc: RouteHandleDescriptor) {
            Reflect.defineMetadata(MetadataKeys.PATH, path, target, key);
            Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key);
        };
    };
}
const { GET, POST, PUT, DELETE, PATCH, ALL } = HttpMethods;

export const get = routeBinder(GET);
export const post = routeBinder(POST);
export const put = routeBinder(PUT);
export const del = routeBinder(DELETE);
export const patch = routeBinder(PATCH);
export const all = routeBinder(ALL);
