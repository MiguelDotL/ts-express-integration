import 'reflect-metadata';
import express from 'express';
import { HttpMethods } from './HttpMethods';
import { Metadata } from './Metadata';

export const router = express.Router();

export function controller(routePrefix: string) {
    return function (target: Function) {
        Object.getOwnPropertyNames(target.prototype).forEach((key) => {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(Metadata.PATH, target.prototype, key);
            const method: HttpMethods = Reflect.getMetadata(
                Metadata.METHOD,
                target.prototype,
                key
            );

            path && router[method](`${routePrefix}${path}`, routeHandler);
        });
    };
}
