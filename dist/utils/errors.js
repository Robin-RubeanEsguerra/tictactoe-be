"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateMoveError = exports.MissingGameUuidError = exports.GameRoundAlreadyCompletedError = exports.GameInstanceAlreadyCompletedError = exports.UnableToFindGameRoundError = exports.UnableToFindGameInstanceError = exports.UnableToCreateGameInstanceError = exports.UnableToCreateUserError = exports.InvalidCredentialsError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class InvalidCredentialsError extends AppError {
    constructor(message = "Invalid credentials") {
        super(message, 401);
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
class UnableToCreateUserError extends AppError {
    constructor(message = "Unable to create user") {
        super(message, 500);
    }
}
exports.UnableToCreateUserError = UnableToCreateUserError;
class UnableToCreateGameInstanceError extends AppError {
    constructor(message = "Unable to create game instance") {
        super(message, 500);
    }
}
exports.UnableToCreateGameInstanceError = UnableToCreateGameInstanceError;
class UnableToFindGameInstanceError extends AppError {
    constructor(message = "Unable to find game instance") {
        super(message, 400);
    }
}
exports.UnableToFindGameInstanceError = UnableToFindGameInstanceError;
class UnableToFindGameRoundError extends AppError {
    constructor(message = "Unable to find game round") {
        super(message, 400);
    }
}
exports.UnableToFindGameRoundError = UnableToFindGameRoundError;
class GameInstanceAlreadyCompletedError extends AppError {
    constructor(message = "Game instance already completed") {
        super(message, 400);
    }
}
exports.GameInstanceAlreadyCompletedError = GameInstanceAlreadyCompletedError;
class GameRoundAlreadyCompletedError extends AppError {
    constructor(message = "Game round already completed") {
        super(message, 400);
    }
}
exports.GameRoundAlreadyCompletedError = GameRoundAlreadyCompletedError;
class MissingGameUuidError extends AppError {
    constructor(message = "Game UUID is required") {
        super(message, 400);
    }
}
exports.MissingGameUuidError = MissingGameUuidError;
class DuplicateMoveError extends AppError {
    constructor(message = "This move has already been made in the current game round") {
        super(message, 400);
    }
}
exports.DuplicateMoveError = DuplicateMoveError;
