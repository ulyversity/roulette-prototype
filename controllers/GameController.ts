import { Request, Response } from 'express';
import { getCurrentGameService, getCurrentGameStatsService, getGameByIdService, getGamesService, getGameStatsByIdService, purchaseSlotService } from '../services/GameService';

export const getGames = async (req: Request, res: Response) => {
    try {
        const games = await getGamesService();
        res.json(games);
    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: err.message });
        }
    }
};

export const getGameById = async (req: Request, res: Response) => {
    try {
        const game = await getGameByIdService(Number(req.params.gameid));
        if (!game) {
            res.status(404).json({ error: 'Game not found' });
        }
        res.json(game);
    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: err.message });
        }
    }
};

export const getGameStats = async (req: Request, res: Response) => {
    try {
        const stats = await getGameStatsByIdService(Number(req.params.gameid));
        res.json(stats);
    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: err.message });
        }
    }
};

export const getCurrentGame = async (req: Request, res: Response) => {
    try {
        const game = await getCurrentGameService();
        res.json(game);
    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: err.message });
        }
    }
};

export const getCurrentGameStats = async (req: Request, res: Response) => {
    try {
        const stats = await getCurrentGameStatsService();
        res.json(stats);
    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: err.message });
        }
    }
};

export const purchaseSlot = async (req: Request, res: Response) => {
    try {
        const { gameid, userid } = req.params;
        const { slotAmount } = req.body;
        const slot = await purchaseSlotService(Number(gameid), Number(userid), slotAmount);
        res.json({ slot });
    } catch (err) {
        if (err instanceof Error) {
            res.json({ error: err.message });
        }
    }
};
