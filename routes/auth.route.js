import {Router} from "express";
import {signUp, signIn, signOut} from "../controllers/auth.controller.js";

// Rytchie is a Programmer!

const authRouter = Router();

// Path: /api/v1/signup (POST)

authRouter.post('/signup', signIn);

// Path: /api/v1/signIn (POST)

authRouter.post('/signin', signUp);

// Path: /api/v1/signOut (POST)

authRouter.post('/logout', signOut);

export default authRouter;
