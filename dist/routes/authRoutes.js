"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validation_1 = require("../middlewares/validation");
const AuthController_1 = require("../controller/AuthController");
const validateJwt_1 = require("../middlewares/validateJwt");
const router = express_1.default.Router();
router.post('/create', (0, validation_1.validateUser)(validation_1.Schemas.user.create), AuthController_1.createUser);
router.post('/login', (0, validation_1.validateUser)(validation_1.Schemas.user.login), AuthController_1.loginUser);
router.post('/logout', AuthController_1.logoutUser);
router.get('/test', validateJwt_1.validateJwt, AuthController_1.test);
exports.default = router;
