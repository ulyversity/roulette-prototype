import { Request, Response } from 'express';
import { createUserService, getUserByIdService, getUsersService, patchUserService, updateUserService } from '../services/UserService';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsersService();
        res.json(users);
    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: err.message });
        }
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await createUserService(req.body);
        res.status(201).json(user);
    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: err.message });
        }
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.userid);
        const result = await getUserByIdService(id);
        res.json(result);
    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: err.message });
        }
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.userid);
        const result = await updateUserService(id, req.body);
        res.json(result);
    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: err.message });
        }
    }
};

export const patchUser = async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.userid);
        const result = await patchUserService(id, req.body);
        res.json(result);
    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: err.message });
        }
    }
};
