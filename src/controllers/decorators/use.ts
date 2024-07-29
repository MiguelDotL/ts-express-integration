import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

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
export function use(middleware: RequestHandler) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        const middlewares =
            Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target, key) || [];

        Reflect.defineMetadata(
            MetadataKeys.MIDDLEWARE,
            [...middlewares, middleware],
            target,
            key
        );
    };
}
