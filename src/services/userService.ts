
import bcrypt from "bcrypt";
import { config } from "../config";
import UserDao from "../daos/UserDao";
import { IUser } from "../models/User";
import { InvalidCredentialsError, UnableToCreateUserError } from "../utils/errors";
import * as jwt from 'jsonwebtoken';

export async function create(user: IUser): Promise<IUser> {
  const ROUNDS = config.server.rounds;

  try {
    const hashedPassword = await bcrypt.hash(user.password, ROUNDS);
    const newUser = new UserDao({
      username: user.username,
      password: hashedPassword,
      email: user.email,
    });
    await newUser.save();
    return newUser;
  } catch (err: any) {
    throw new UnableToCreateUserError(err.message);
  }
}

export async function login(credentials: Partial<IUser>) {
  try {
    const { email, password } = credentials;
    const user = await UserDao.findOne({ email });
    if (!user) {
    throw new InvalidCredentialsError();
    }

    if (password) {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
       throw new InvalidCredentialsError();
      }
    }

    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);

    const expiration = currentTimestampInSeconds + 30 * 24 * 60 * 60;
    const accessToken = jwt.sign(
        {
          data: {
            id: user.id,
            email: user.email,
            username: user.username,
          },
          exp: expiration,
        },
        String(process.env.JWT_SECRET_TOKEN),
      );
    const refreshToken = jwt.sign(
      {
        data: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      },
      String(process.env.JWT_SECRET_TOKEN),
      {
        expiresIn: 24 * 60 * 60 * 1000,
      },
    );
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.accessTokenExpiration = expiration;

    await user.save();
    return user;
  } catch (err: any) {
   throw err;
  }
}


export async function logout(accessToken: string) {
  const user = await UserDao.findOne({ accessToken });

  if (!user) {
    throw new InvalidCredentialsError();
  }

  user.refreshToken = "";
  user.accessToken = "";
  user.accessTokenExpiration = 0;
  await user.save();
  return {
    success: true,
  };
  
}