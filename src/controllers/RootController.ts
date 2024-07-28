import { NextFunction, Request, Response } from 'express';
import { controller, get, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (req.session?.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('🛑 User not permitted. Please log in with an authorized account.');
}

@controller('')
class RootController {
    @get('/')
    getRoot(req: Request, res: Response) {
        const loggedIn = req.session?.loggedIn;

        if (loggedIn) {
            res.send(`
            <div>
                <h1>Welcome!</h1>
                <p>You are logged in</p>
                <a href="/auth/logout">Logout</a>
            </div>
        `);
        } else {
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

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.send(
            '✅ Welcome to a protected route. Logged in with authorized user account.'
        );
    }
}
