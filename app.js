import express from 'express';
import CookieParser from 'cookie-parser';
import {PORT} from './config/env.js';

import authRouter from "./routes/auth.route.js";
import subscriptionsRouter from "./routes/subscriptions.routes.js";
import userRouter from "./routes/user.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";

// Removed duplicate declaration of 'app'
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(CookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/subscriptions", subscriptionsRouter);
app.use(errorMiddleware);


app.get('/', (req, res) => {
    res.send('Welcome to the Subscription Tracker API!');
})

app.listen(PORT, async () => {
    console.log(`Subscription Tracker is running on http://localhost:${PORT}`)
    await connectToDatabase()
})