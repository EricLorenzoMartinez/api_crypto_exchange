import mongoose, { type ConnectOptions } from 'mongoose';
import { logError } from '../utils/logger.helper';
import { DATABASE_URL } from './config';
import logger from './logger';

export const connectDB = async () => {
    try {
        const options: ConnectOptions = {};

        if (!DATABASE_URL) {
            throw new Error('Environment var DATABASE_URL is not defined');
        }

        logger.info('Connecting to the database...');
        await mongoose.connect(DATABASE_URL, options);
        logger.info('Connected to the database successfully');

        mongoose.connection.on('error', (error: unknown) => {
            logError(error, 'Connection was interrupted');
            process.exit(1);
        });
    } catch (error: unknown) {
        logError(error, 'Error connecting to the database');
        process.exit(1);
    }
};

export const closeDB = async () => {
    try {
        await mongoose.connection.close();
        logger.info('Database connection closed successfully');
    } catch (error: unknown) {
        logError(error, 'Error closing the database connection');
    }
};