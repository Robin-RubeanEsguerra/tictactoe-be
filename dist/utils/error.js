"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnableToCreateUserError = void 0;
class UnableToCreateUserError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnableToCreateUserError";
    }
}
exports.UnableToCreateUserError = UnableToCreateUserError;
