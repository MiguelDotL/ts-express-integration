import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controllers/RootController';
import './controllers/LoginController';
import { AppRouter } from './AppRouter';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['oatmeal'] }));
app.use(AppRouter.getInstance());

app.listen(3000, () => {
    console.log('listening on port 3000');
});
