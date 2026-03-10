import { app } from './app';
import { PORT } from './config/config';
import logger from './config/logger';
import { connectDB } from './config/db';

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            logger.info(`Server running at http://localhost:${PORT}`);
        })
    } catch (error) {
        logger.error(error, 'Error starting the server:');
        process.exit(1);
    }
};

startServer();