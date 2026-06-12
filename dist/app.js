import express, {} from 'express';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler.js';
import { AuthRoutes } from './modules/auth/auth.routes.js';
import { IssuesRoutes } from './modules/issues/issues.routes.js';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api/auth', AuthRoutes);
app.use('/api/issues', IssuesRoutes);
app.get('/', async (req, res) => {
    res.send('Welcome to the Issue Tracker API!');
});
// Global Error Handler
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map