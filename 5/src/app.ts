import createError from 'http-errors';
import cors from 'cors';
import express, { RequestHandler } from 'express';
import actuator from 'express-actuator';
import router from './routes';
import auth from 'express-openid-connect';
import passport from './middlewares/passport/index';
import morgan from 'morgan';
import helmet from 'helmet';
import session from 'express-session';
import { errorHandler } from './middlewares/errorHandler';
import { SESSION_SECRET } from './utils/env.util';
// import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(actuator()); // https://github.com/rcruzper/express-actuator/tree/master 
app.use(helmet());
app.use(session({
    name: "pskapp.sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

app.use(((_req, _res, next) => {
    next(createError(404));
}) as RequestHandler);

app.use(errorHandler);

export default app;