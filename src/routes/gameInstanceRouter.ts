import express from 'express'
import { createGameInstance, endGameInstance, getGameInstanceAll, getGameInstanceByUser,  } from '../controller/gameInstanceController';
import { validateJwt } from '../middlewares/validateJwt';


const router = express.Router();

router.post('/start', validateJwt, createGameInstance);
router.get('/all', validateJwt, getGameInstanceAll);
router.put('/end/:gameUuid', validateJwt, endGameInstance);
router.get('/get-by-user', validateJwt, getGameInstanceByUser);
export default router;