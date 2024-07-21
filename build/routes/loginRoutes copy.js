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
router.get('/login', (req, res) => {
    res.send(`
        <form method="post">
            <div>
                <label>Email</label>
                <input type="email" name="email" required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
    `);
});
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
