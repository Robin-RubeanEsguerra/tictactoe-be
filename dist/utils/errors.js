"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsError = exports.UnableToCreateUserError = void 0;
class UnableToCreateUserError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UnableToCreateUserError = UnableToCreateUserError;
class InvalidCredentialsError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
