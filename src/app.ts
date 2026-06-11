import express,  { type Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler.js';
import { AuthRoutes } from './modules/auth/auth.routes.js';
import { IssuesRoutes } from './modules/issues/issues.routes.js';

const app: Application = express();


app.use(express.json());
app.use(cors());



app.use('/api/auth', AuthRoutes);
app.use('/api/issues', IssuesRoutes);

app.get('/', async (req, res) => {
  res.send('Welcome to the Issue Tracker API!');
});



// Global Error Handler
app.use(globalErrorHandler);

export default app;
