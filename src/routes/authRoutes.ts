import express from 'express';

import { Schemas, validateUser } from '../middlewares/validation';
import { createUser, loginUser, logoutUser, test } from '../controller/AuthController';
import { validateJwt } from '../middlewares/validateJwt';

const router = express.Router();

router.post('/create', validateUser(Schemas.user.create) , createUser);
router.post('/login', validateUser(Schemas.user.login) , loginUser);
router.post('/logout', logoutUser);
router.get('/test',validateJwt, test)
export default router;