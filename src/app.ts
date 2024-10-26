import express from 'express';
import cors from 'cors';
import { environment } from './config/environment';
import logger from './middlewares/logger.middleware';
import errorHandler from './middlewares/error-handler.middleware';
import authorization from './middlewares/authorization.middleware';
import userRoutes from './routes/user.routes';
import authenticationRoutes from './routes/authentication.routes';

const app = express();
app.use(cors({ origin: environment.FRONTEND_URL }));
app.use(express.json());
app.use(logger);
app.use(authorization);
app.use(userRoutes);
app.use(authenticationRoutes);
app.use(errorHandler);

export default app;