import mongoose from "mongoose";
import logger from "../utilities/logger.js";

const connectDatabase = async () => {

    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            logger.info("Database connection success!")
        })
        .catch((err) => {
            logger.error("Database connection unsuccessful!" + err.message)
        })
}

export default connectDatabase;