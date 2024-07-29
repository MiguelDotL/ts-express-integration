"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("./decorators");
/**
 * Middleware function to require authentication for certain routes.
 * This function checks if the user is logged in by examining the `req.session?.loggedIn` property.
 * If the user is logged in, the function calls the `next()` middleware function to proceed with the request.
 * If the user is not logged in, the function sends a 403 Forbidden status code and a message indicating that the user is not permitted.
 *
 * @param {Request} req - The Express request object, containing information about the incoming HTTP request.
 * @param {Response} res - The Express response object, used to send a response back to the client.
 * @param {NextFunction} next - The next middleware function in the request-response cycle.
 *
 * @returns {void} - This function does not return any value. Instead, it sends a response to the client or calls the next middleware function.
 */
function requireAuth(req, res, next) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('🛑 User not permitted. Please log in with an authorized account.');
}
let RootController = class RootController {
    /**
     * Handles the GET request for the root ('/') route.
     * This route renders a welcome message based on the user's login status.
     *
     * @param {Request} req - The Express request object, containing information about the incoming HTTP request.
     * @param {Response} res - The Express response object, used to send a response back to the client.
     *
     * @returns {void} - This function does not return any value. Instead, it sends a response to the client.
     */
    getRoot(req, res) {
        var _a;
        const loggedIn = (_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn;
        if (loggedIn) {
            res.send(`
        <div>
            <h1>Welcome!</h1>
            <p>You are logged in</p>
            <a href="/auth/logout">Logout</a>
        </div>
    `);
        }
        else {
            res.send(`
        <div>
            <h1>Wait!</h1>
            <p>You are not logged in</p>
            <a href="/auth/login">Login</a>
        </div>
        `);
            return;
        }
    }
    /**
     * Handles the GET request for the '/protected' route.
     * This route is protected by the `requireAuth` middleware, ensuring that only logged-in users can access it.
     *
     * @param {Request} req - The Express request object, containing information about the incoming HTTP request.
     * @param {Response} res - The Express response object, used to send a response back to the client.
     *
     * @returns {void} - This function does not return any value. Instead, it sends a response to the client.
     */
    getProtected(req, res) {
        res.send('✅ Welcome to a protected route. Logged in with authorized user account.');
    }
};
__decorate([
    (0, decorators_1.get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RootController.prototype, "getRoot", null);
__decorate([
    (0, decorators_1.get)('/protected'),
    (0, decorators_1.use)(requireAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RootController.prototype, "getProtected", null);
RootController = __decorate([
    (0, decorators_1.controller)('')
], RootController);
