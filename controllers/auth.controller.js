import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";

const signUp = async (req, res, next) => {
    const session = mongoose.startSession();
    session.startTransaction();

    try{
        // Logic to create a new user

        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            const error = new Error('User already exists');
            error.status = 400;
            throw error;
        }

        //Hash the password for the new user

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new User

        const newUsers = new User([{name, email, hashedPassword}], {session});

        const token = jwt.sign({_id: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success: true,

            data: {
                token,
                newUsers[0],
            }
        });
    }
    catch(err){
        await session.abortTransaction();
        session.endSession();
        next(err);
    }
}

const signIn = async (req, res, next) => {}

const signOut = async (req, res, next) => {}


export {signUp, signIn, signOut};