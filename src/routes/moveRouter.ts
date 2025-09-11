import express from 'express'
import { createBulkMove, createMove } from '../controller/moveController';
import { validateJwt } from '../middlewares/validateJwt';

const router = express.Router();

router.post('/:gameRoundUuid', validateJwt, createMove);
router.post('/bulk/:gameRoundUuid', validateJwt, createBulkMove);

export default router;