"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
const user = {
    email: 'user.one@email.com',
    password: 'password'
};
router.get('/', (req, res) => {
    var _a;
    const loggedIn = (_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn;
    if (loggedIn) {
        res.send(`
            <div>
                <h1>Welcome!</h1>
                <p>You are logged in</p>
                <a href="/logout">Logout</a>
            </div>
        `);
    }
    else {
        res.redirect('/login');
        return;
    }
});
