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
const Helpers_1 = require("../Helpers");
let LoginController = class LoginController {
    /**
     * Handles the GET request for the login page.
     *
     * @remarks
     * This function renders a login form to the user. The form includes fields for email and password.
     *
     * @param req - The Express request object.
     * @param res - The Express response object.
     *
     * @returns {void} - This function does not return a value.
     */
    getLogin(req, res) {
        res.send(`
        <form method="post">
            <div>
                <label>Email</label>
                <input type="email" name="email" required />
            <div>
                <label>Password</label>
                <input type="password" name="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
    `);
    }
    /**
     * Handles the POST request for logging in the user.
     *
     * This function authenticates the user's credentials and sets the session if successful.
     * If the credentials are invalid, it sends a message indicating the error.
     *
     * @remarks
     * The function uses the `bodyValidator` decorator to validate the request body for the presence of 'email' and 'password'.
     *
     * @param req - The Express request object containing the user's email and password in the request body.
     * @param res - The Express response object used to send a response to the client.
     *
     * @returns {void} - This function does not return a value.
     */
    postLogin(req, res) {
        const { email, password } = req.body;
        const isAdminUser = email &&
            password &&
            email === Helpers_1.adminUser.email &&
            password === Helpers_1.adminUser.password;
        if (isAdminUser) {
            req.session = { loggedIn: true };
            res.redirect('/');
        }
        else {
            res.send('Invalid email or password');
        }
    }
    /**
     * Handles the GET request for logging out the user.
     *
     * @remarks
     * This function clears the user's session and redirects them to the home page.
     *
     * @param req - The Express request object.
     * @param res - The Express response object.
     *
     * @returns {void} - This function does not return a value.
     */
    getLogout(req, res) {
        const loggedOut = undefined;
        req.session = loggedOut;
        res.redirect('/');
    }
};
__decorate([
    (0, decorators_1.get)('/login'),
    (0, decorators_1.use)(Helpers_1.httpLogger),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "getLogin", null);
__decorate([
    (0, decorators_1.post)('/login'),
    (0, decorators_1.use)(Helpers_1.httpLogger),
    (0, decorators_1.bodyValidator)('email', 'password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "postLogin", null);
__decorate([
    (0, decorators_1.get)('/logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "getLogout", null);
LoginController = __decorate([
    (0, decorators_1.controller)('/auth')
], LoginController);
