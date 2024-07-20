import bodyParser from 'body-parser';
import { Request, Response, Router } from 'express';

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined };
}

const router = Router();

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

    if (email && password) {
        res.send(email + password);
    }
});

export { router };
