import { Request, Response } from 'express';
import { loginService } from '../services/AuthService';

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        res.status(200).json(await loginService(username, password));
    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: err.message });
        }
    }
};
