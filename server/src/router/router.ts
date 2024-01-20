import express from 'express';
import { signUpUser, loginUser } from '../controller/user.ts';

const router = express.Router();

router.post('/sign-up', signUpUser);
router.post('/login', loginUser);

export default router;
