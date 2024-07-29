import { NextFunction, Request, Response } from 'express';
import { controller, get, use } from './decorators';

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
    /**
     * Handles the GET request for the root ('/') route.
     * This route renders a welcome message based on the user's login status.
     *
     * @param {Request} req - The Express request object, containing information about the incoming HTTP request.
     * @param {Response} res - The Express response object, used to send a response back to the client.
     *
     * @returns {void} - This function does not return any value. Instead, it sends a response to the client.
     */
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

    /**
     * Handles the GET request for the '/protected' route.
     * This route is protected by the `requireAuth` middleware, ensuring that only logged-in users can access it.
     *
     * @param {Request} req - The Express request object, containing information about the incoming HTTP request.
     * @param {Response} res - The Express response object, used to send a response back to the client.
     *
     * @returns {void} - This function does not return any value. Instead, it sends a response to the client.
     */
    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.send(
            '✅ Welcome to a protected route. Logged in with authorized user account.'
        );
    }
}
