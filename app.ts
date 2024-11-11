import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { authRoutes } from './routes/AuthRoutes';
import { gameRoutes } from './routes/GameRoutes';
import { userRoutes } from './routes/UserRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

// Root Route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Game API!');
});

export default app;
