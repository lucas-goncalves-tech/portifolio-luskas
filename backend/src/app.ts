import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

export const app = express();

// Middlewares Globais
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

import { authRouter } from './routes/authRoutes';
import reportsRouter from './routes/reports.routes';
import { apiReference } from '@scalar/express-api-reference';
import openApiDoc from './openapi.json';

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/auth', authRouter);
app.use('/api/reports', reportsRouter);

app.use(
  '/docs',
  apiReference({
    spec: {
      content: openApiDoc,
    },
  })
);

// 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});
