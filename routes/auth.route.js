import {Router} from "express";

const authRouter = Router();

authRouter.post('/signup', (req, res) => res.send('signup'));

authRouter.post('/signin', (req, res) => res.send('signin'));

authRouter.post('/logout', (req, res) => res.send('logout'));

export default authRouter;
