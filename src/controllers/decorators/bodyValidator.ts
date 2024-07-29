import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

/**
 * A decorator function that adds validation metadata to a class method.
 * This metadata is used by a validation middleware to validate the request body.
 *
 * @param {...string[]} keys - The keys of the request body properties to validate.
 * @returns {Function} - A decorator function that adds the validation metadata to the target method.
 *
 * @example
 * ```typescript
 * import 'reflect-metadata';
 * import { bodyValidator } from './bodyValidator';
 * import { MetadataKeys } from './MetadataKeys';
 *
 * class UserController {
 *     @bodyValidator('username', 'email', 'password')
 *     async createUser(req: Request, res: Response) {
 *         // ...
 *     }
 * }
 *
 * const userController = new UserController();
 * const createUserMetadata = Reflect.getMetadata(MetadataKeys.VALIDATOR, userController, 'createUser');
 * console.log(createUserMetadata); // Output: ['username', 'email', 'password']
 * ```
 */
export function bodyValidator(...keys: string[]) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        Reflect.defineMetadata(MetadataKeys.VALIDATOR, keys, target, key);
    };
}
