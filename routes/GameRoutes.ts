import { Router } from 'express';
import { getCurrentGame, getCurrentGameStats, getGameById, getGames, getGameStats, purchaseSlot } from '../controllers/GameController';

const router = Router();

router.get('/', getGames);
router.get('/:gameid', getGameById);
router.get('/:gameid/stats', getGameStats);
router.get('/current', getCurrentGame);
router.get('/current/stats', getCurrentGameStats);
router.post('/:gameid/:userid/purchase-slot', purchaseSlot);

export { router as gameRoutes };

