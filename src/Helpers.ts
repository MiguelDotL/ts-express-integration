import { NextFunction, Request, Response } from 'express';

export interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined };
}

export const adminUser = {
    email: 'user.one@email.com',
    password: 'password'
};

export function httpLogger(request: Request, response: Response, next: NextFunction) {
    const time = new Date(Date.now()).toLocaleTimeString('en-GB');

    console.log(`[${time}] ${request.method} ${request.url}`);
    next();
}
