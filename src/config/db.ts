import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const mongoUrl = process.env.MONGODB_URL;

        if (!mongoUrl) {
            throw new Error('Environment var MONGODB_URL is not defined');
        }

        await mongoose.connect(mongoUrl);
        console.log('Connected to MongoDB');
    } catch (error: unknown) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

export default connectDB;