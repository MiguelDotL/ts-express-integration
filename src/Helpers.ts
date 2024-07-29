import { NextFunction, Request, Response } from 'express';

export interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined };
}

export const adminUser = {
    email: 'user.one@email.com',
    password: 'password'
};

/**
 * A middleware function for logging HTTP requests.
 *
 * This function logs the timestamp, HTTP method, and URL of each incoming request.
 * It uses the `console.log` function to output the log message.
 *
 * @param request - The Express request object, containing information about the incoming HTTP request.
 * @param response - The Express response object, used to send a response to the client.
 * @param next - The next middleware function in the request-response cycle.
 *
 * @returns {void} This function does not return a value. It simply logs the HTTP request information.
 */
export function httpLogger(request: Request, response: Response, next: NextFunction) {
    const time = new Date(Date.now()).toLocaleTimeString('en-GB');

    console.log(`[${time}] ${request.method} ${request.url}`);
    next();
}
