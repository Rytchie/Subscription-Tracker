import express from 'express';
import {PORT} from './config/env.js';

import authRouter from "./routes/auth.route.js";
import subscriptionsRouter from "./routes/subscriptions.routes.js";
import userRouter from "./routes/user.routes.js";
import connectToDatabase from "./database/mongodb.js";

// Removed duplicate declaration of 'app'
const app = express();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/subscriptions", subscriptionsRouter);



app.get('/', (req, res) => {
    res.send('Welcome to the Subscription Tracker API!');
})

app.listen(PORT, async () => {
    console.log(`Subscription Tracker is running on http://localhost:${PORT}`)
    await connectToDatabase()
})