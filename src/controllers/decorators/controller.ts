import 'reflect-metadata';
import express from 'express';
import { HttpMethods } from './HttpMethods';
import { MetadataKeys } from './MetadataKeys';

export const router = express.Router();

export function controller(routePrefix: string) {
    return function (target: Function) {
        Object.getOwnPropertyNames(target.prototype).forEach((key) => {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(MetadataKeys.PATH, target.prototype, key);
            const method: HttpMethods = Reflect.getMetadata(
                MetadataKeys.METHOD,
                target.prototype,
                key
            );

            path && router[method](`${routePrefix}${path}`, routeHandler);
        });
    };
}
