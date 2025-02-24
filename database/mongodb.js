import mongoose from "mongoose";
import { NODE_ENV, DB_URI } from "../config/env.js";

if (!DB_URI) {
    throw new Error(`Please define a MongoDB URI environment variable in .env.${NODE_ENV}.local`);
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Successfully connected to the database in ${NODE_ENV} mode.`);
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};

export default connectToDatabase;