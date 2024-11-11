import { Router } from 'express';
import { createUser, getUserById, getUsers, patchUser, updateUser } from '../controllers/UserController';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userid', getUserById);
router.put('/:userid', updateUser);
router.patch('/:userid', patchUser);

export { router as userRoutes };

