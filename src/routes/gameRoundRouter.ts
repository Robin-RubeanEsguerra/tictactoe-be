import express from 'express'
import { createGameRound, endGameRound } from '../controller/gameRoundController';
import { validateJwt } from '../middlewares/validateJwt';

const router = express.Router();

router.post('/:gameUuid',validateJwt, createGameRound);
router.put('/end/:gameRoundUuid', validateJwt,endGameRound);
export default router;