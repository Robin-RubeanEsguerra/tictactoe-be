import express from 'express'
import { createGameRound, endGameRound, getGameRoundsByGameUuid } from '../controller/gameRoundController';
import { validateJwt } from '../middlewares/validateJwt';

const router = express.Router();

router.post('/:gameUuid',validateJwt, createGameRound);
router.get('/get-by-game/:gameUuid', validateJwt, getGameRoundsByGameUuid);
router.put('/end/:gameRoundUuid', validateJwt,endGameRound);
export default router;