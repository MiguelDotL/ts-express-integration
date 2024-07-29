"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = void 0;
require("reflect-metadata");
const MetadataKeys_1 = require("./MetadataKeys");
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
function bodyValidator(...keys) {
    return function (target, key, desc) {
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.VALIDATOR, keys, target, key);
    };
}
exports.bodyValidator = bodyValidator;
