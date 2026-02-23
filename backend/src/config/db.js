import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_CONNECTIONSTRING
        );

        console.log("Connected to the database successfully");

    } catch (error) {
        console.error("Error connecting to the database", error.message);
    }
};