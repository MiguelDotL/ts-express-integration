import 'reflect-metadata';
import { HttpMethods } from './HttpMethods';
import { MetadataKeys } from './MetadataKeys';

export function routeBinder(method: string) {
    return function (path: string) {
        return function (target: any, key: string, desc: PropertyDescriptor) {
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
