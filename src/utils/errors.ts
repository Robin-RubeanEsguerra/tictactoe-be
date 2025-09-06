export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(message = "Invalid credentials") {
    super(message, 401);
  }
}

export class UnableToCreateUserError extends AppError {
  constructor(message = "Unable to create user") {
    super(message, 500);
  }
}

export class UnableToCreateGameInstanceError extends AppError {
  constructor(message = "Unable to create game instance") {
    super(message, 500);
  }
}

export class UnableToFindGameInstanceError extends AppError {
  constructor(message = "Unable to find game instance") {
    super(message, 400);
  }
}

export class UnableToFindGameRoundError extends AppError {
  constructor(message = "Unable to find game round") {
    super(message, 400);
  }
}

export class GameInstanceAlreadyCompletedError extends AppError {
  constructor(message = "Game instance already completed") {
    super(message, 400);
  }
}

export class GameRoundAlreadyCompletedError extends AppError {
  constructor(message = "Game round already completed") {
    super(message, 400);
  }
}

export class MissingGameUuidError extends AppError {
  constructor(message = "Game UUID is required") {
    super(message, 400);
  }
}

export class DuplicateMoveError extends AppError {
  constructor(message = "This move has already been made in the current game round") {
    super(message, 400);
  }
}