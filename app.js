import express from 'express';
import cors from'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import morgan from 'morgan'

// instance of express
const app = express();

// letting app use some modules and middlewares and pass the requests to server
app.use(express.json());

// to allow the server access the api from other port
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));

app.use(morgan('dev')); // middleware to log the request comming to server

app.use(cookieParser());

// test the server
app.use('/ping', (req, res) => {
    res.send('pong');
});

// to handle 'next()' in controller
app.use('/api/v1/user', userRoutes);

// trying to access a route which doesn't exist
app.all('*', (req, res) => {
    res.status(404).send('OOPS!! 404 page not found');
});

// generic middleware: to handle 'next' if above ones fail
app.use(errorMiddleware);

export default app;