import { Request, Response } from 'express';
import { controller, get, post, use, bodyValidator } from './decorators';
import { httpLogger, RequestWithBody, adminUser } from '../Helpers';

@controller('/auth')
class LoginController {
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
    @post('/login')
    @use(httpLogger)
    @bodyValidator('email', 'password')
    postLogin(req: RequestWithBody, res: Response) {
        const { email, password } = req.body;

        const isAdminUser =
            email &&
            password &&
            email === adminUser.email &&
            password === adminUser.password;

        if (isAdminUser) {
            req.session = { loggedIn: true };
            res.redirect('/');
        } else {
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
    @get('/logout')
    getLogout(req: Request, res: Response): void {
        const loggedOut = undefined;

        req.session = loggedOut;
        res.redirect('/');
    }
}
