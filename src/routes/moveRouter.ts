
import express from 'express'
import { createMove } from '../controller/moveController';
import { validateJwt } from '../middlewares/validateJwt';

const router = express.Router();

router.post('/:gameRoundUuid', validateJwt, createMove);

export default router;