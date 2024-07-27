import { NextFunction, Request, Response, Router } from 'express';

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.session?.loggedIn) {
        res.status(403);
        res.send('🛑 User not permitted. Please log in with an authorized account.');
        res.redirect('/login');
        return;
    }
    next();
}

const router = Router();
const user = {
    email: 'user.one@email.com',
    password: 'password'
};

router.get('/login', (req: Request, res: Response) => {
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

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body;

    if (email && password && email === user.email && password === user.password) {
        // res.send(email + password);
        req.session = { loggedIn: true };
        res.redirect('/');
    } else {
        res.send('Invalid email or password');
    }
});

router.get('/', (req: Request, res: Response) => {
    const loggedIn = req.session?.loggedIn;

    if (loggedIn) {
        res.send(`
            <div>
                <h1>Welcome!</h1>
                <p>You are logged in</p>
                <a href="/logout">Logout</a>
            </div>
        `);
    } else {
        res.redirect('/login');
        return;
    }
});

router.get('/logout', (req: Request, res: Response) => {
    const loggedOut = undefined;

    req.session = loggedOut;
    res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send('✅ Welcome to a protected route. Logged in with authorized user account.');
});

export { router };
