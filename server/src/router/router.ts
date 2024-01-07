import express from 'express';
import { createUser } from '../controller/user.ts';

const router = express.Router();

router.post('/sign-up', createUser);

export default router;
