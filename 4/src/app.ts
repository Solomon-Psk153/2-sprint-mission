import createError from 'http-errors';
import cors from 'cors';
import express, { ErrorRequestHandler, RequestHandler } from 'express';
import actuator from 'express-actuator';
import productRouter from './routes/productRouter';
// import freeBoardRouter
// import commentRouter
// import imgRouter

const app = express();
app.use(cors());
app.use(express.json());
app.use(actuator());
app.use('/product', productRouter);

// app.use('/freeboard', freeBoardRouter);
// app.use('/comment', commentRouter);
// app.use('/image', imgRouter);

app.use(((_req, _res, next) => {
    next(createError(404));
}) as RequestHandler);

app.use(((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).send('ERROR: ' + err.message);
}) as ErrorRequestHandler);

export default app;