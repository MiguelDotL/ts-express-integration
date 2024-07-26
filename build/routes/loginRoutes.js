"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
function requireAuth(req, res, next) {
    var _a;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn)) {
        res.status(403);
        res.send('🛑 User not permitted. Please log in with an authorized account.');
        res.redirect('/login');
        return;
    }
    next();
}
const router = (0, express_1.Router)();
exports.router = router;
const user = {
    email: 'user.one@email.com',
    password: 'password'
};
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email && password && email === user.email && password === user.password) {
        // res.send(email + password);
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.send('Invalid email or password');
    }
});
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
router.get('/logout', (req, res) => {
    const loggedOut = undefined;
    req.session = loggedOut;
    res.redirect('/');
});
router.get('/protected', requireAuth, (req, res) => {
    res.send('✅ Welcome to a protected route. Logged in with authorized user account.');
});
