import User from "../db/models/User.js"
import bcrypt from "bcrypt";
import { randomBytes } from 'crypto';
import { Session } from "../db/models/Session.js";
import { ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME } from "../constants/index.js";

export const findSession = filter => Session.findOne(filter);
export const findUser = filter => User.findOne(filter);

export const registration = async(data) => {
const {password} = data;
const hashPassword = await bcrypt.hash(password, 10);
return User.create({...data, password: hashPassword});
};

export const createSession = async (userId) => {

    await Session.deleteOne({ userId });

    const accessToken = randomBytes(30).toString("base64");
    const refreshToken = randomBytes(30).toString("base64");

    const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_LIFETIME);
    const refreshTokenValidUntil = new Date(Date.now() + REFRESH_TOKEN_LIFETIME);

    return Session.create({
        userId,
        accessToken,
        refreshToken,
        accessTokenValidUntil,
        refreshTokenValidUntil
    })
}

export const deleteSession = filter => Session.deleteOne(filter);


