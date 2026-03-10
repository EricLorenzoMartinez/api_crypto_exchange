import express from 'express';
import cors from 'cors';
import { CLIENT_URL, NODE_ENV } from './config/config';
import { baseRouter } from './routes/base.routes';
import { errorMiddleware } from './middlewares/error.middleware';


export const app = express();
app.disable('x-powered-by');

if (NODE_ENV === 'production') {
    app.use(cors({ origin: CLIENT_URL }));
} else {
    app.use(cors());
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', baseRouter);

app.use(errorMiddleware);