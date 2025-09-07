"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.login = login;
exports.logout = logout;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const UserDao_1 = __importDefault(require("../daos/UserDao"));
const errors_1 = require("../utils/errors");
const jwt = __importStar(require("jsonwebtoken"));
function create(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const ROUNDS = config_1.config.server.rounds;
        try {
            const hashedPassword = yield bcrypt_1.default.hash(user.password, ROUNDS);
            const newUser = new UserDao_1.default({
                username: user.username,
                password: hashedPassword,
                email: user.email,
            });
            yield newUser.save();
            return newUser;
        }
        catch (err) {
            throw new errors_1.UnableToCreateUserError(err.message);
        }
    });
}
function login(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = credentials;
            const user = yield UserDao_1.default.findOne({ email });
            if (!user) {
                throw new errors_1.InvalidCredentialsError();
            }
            if (password) {
                const isValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isValid) {
                    throw new errors_1.InvalidCredentialsError();
                }
            }
            const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
            const expiration = currentTimestampInSeconds + 30 * 24 * 60 * 60;
            const accessToken = jwt.sign({
                data: {
                    id: user.id,
                    userUuid: user.userUuid,
                    email: user.email,
                    username: user.username,
                },
                exp: expiration,
            }, String(process.env.JWT_SECRET_TOKEN));
            const refreshToken = jwt.sign({
                data: {
                    id: user.id,
                    userUuid: user.userUuid,
                    email: user.email,
                    username: user.username,
                },
            }, String(process.env.JWT_SECRET_TOKEN), {
                expiresIn: 24 * 60 * 60 * 1000,
            });
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            user.accessTokenExpiration = expiration;
            yield user.save();
            return user;
        }
        catch (err) {
            throw err;
        }
    });
}
function logout(accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield UserDao_1.default.findOne({ accessToken });
        if (!user) {
            throw new errors_1.InvalidCredentialsError();
        }
        user.refreshToken = "";
        user.accessToken = "";
        user.accessTokenExpiration = 0;
        yield user.save();
        return {
            success: true,
        };
    });
}
