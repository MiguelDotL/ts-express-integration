import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { HttpMethods } from './HttpMethods';
import { MetadataKeys } from './MetadataKeys';
import { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * A middleware function that validates the presence of required properties in the request body.
 *
 * @param keys - An array of property names that must exist in the request body.
 * @returns A RequestHandler function that can be used as middleware in an Express application.
 *
 * @remarks
 * This function is designed to be used as a middleware in an Express application. It checks
 * if the request body contains all the required properties specified in the `keys` array. If any
 * required property is missing, it sends a 422 status code and a message indicating the missing field.
 * If all required properties are present, it calls the `next()` function to proceed with the next middleware.
 *
 * @example
 * ```typescript
 * const requiredBodyProps = ['username', 'password'];
 * const validator = bodyValidators(requiredBodyProps);
 *
 * app.post('/register', validator, (req, res) => {
 *   // Handle registration logic
 * });
 * ```
 */
function bodyValidators(keys: string[]): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            res.status(422).send('Invalid request');
            return;
        }

        for (let key of keys) {
            if (!req.body[key]) {
                res.status(422).send(`Missing required field: ${key}`);
                return;
            }
        }

        next();
    };
}

/**
 * A decorator function that registers routes for a controller class.
 *
 * @param routePrefix - The prefix to be added to all routes defined in the controller class.
 * @returns A function that can be used as a decorator for a controller class.
 *
 * @remarks
 * This decorator function is used to register routes for a controller class. It retrieves
 * route information from metadata attached to the class and its methods using the `Reflect` API.
 * The decorator dynamically creates routes using the specified prefix, HTTP method, and middleware
 * functions. It also applies a body validation middleware to each route if required.
 *
 * @example
 * ```typescript
 * @controller('/api/users')
 * class UserController {
 *     @get('/:id')
 *     getUser(@param('id') id: string) {
 *         // Handle GET user by ID logic
 *     }
 *
 *     @post('/')
 *     @use(authMiddleware)
 *     @validateBody(['username', 'password'])
 *     createUser(@body() user: User) {
 *         // Handle create user logic
 *     }
 * }
 * ```
 */
export function controller(routePrefix: string) {
    return function (target: Function) {
        const router = AppRouter.getInstance();

        Object.getOwnPropertyNames(target.prototype).forEach((key) => {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(MetadataKeys.PATH, target.prototype, key);
            const method: HttpMethods = Reflect.getMetadata(
                MetadataKeys.METHOD,
                target.prototype,
                key
            );
            const middlewares =
                Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) || [];
            const requiredBodyProps =
                Reflect.getMetadata(MetadataKeys.VALIDATOR, target.prototype, key) || [];
            const validator = bodyValidators(requiredBodyProps);
            path &&
                router[method](
                    `${routePrefix}${path}`,
                    ...middlewares,
                    validator,
                    routeHandler
                );
        });
    };
}
