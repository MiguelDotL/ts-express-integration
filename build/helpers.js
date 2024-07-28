"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = exports.adminUser = void 0;
exports.adminUser = {
    email: 'user.one@email.com',
    password: 'password'
};
function httpLogger(request, response, next) {
    const time = new Date(Date.now()).toLocaleTimeString('en-GB');
    console.log(`[${time}] ${request.method} ${request.url}`);
    next();
}
exports.httpLogger = httpLogger;
