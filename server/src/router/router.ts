import express from 'express';
import { createUser, getUser } from '../controller/user.ts';

const router = express.Router();

router.post('/sign-up', createUser);
router.post('/login', getUser);

export default router;
