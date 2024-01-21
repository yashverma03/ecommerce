import express from 'express';
import { createUser, getUserByEmail } from '../controller/user.ts';

const router = express.Router();

router.post('/sign-up', createUser);
router.post('/login', getUserByEmail);

export default router;
