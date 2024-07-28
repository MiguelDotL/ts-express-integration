import { Request, Response } from 'express';
import { controller, get, post, use, bodyValidator } from './decorators';
import { httpLogger, RequestWithBody, adminUser } from '../Helpers';

@controller('/auth')
class LoginController {
    @get('/login')
    @use(httpLogger)
    getLogin(req: Request, res: Response): void {
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

    @post('/login')
    @use(httpLogger)
    @bodyValidator('email', 'password')
    // postLogin(req: RequestWithBody, res: Response) {
    postLogin(req: Request, res: Response) {
        // postLogin(req: RequestWithBody, res: Response) {
        const { email, password } = req.body;

        if (
            email &&
            password &&
            email === adminUser.email &&
            password === adminUser.password
        ) {
            req.session = { loggedIn: true };
            res.redirect('/');
        } else {
            res.send('Invalid email or password');
        }
    }

    @get('/logout')
    getLogout(req: Request, res: Response) {
        const loggedOut = undefined;

        req.session = loggedOut;
        res.redirect('/');
    }
}
