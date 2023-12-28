import { User } from "@prisma/client";
require('dotenv').config();
const jwt = require('jsonwebtoken');

export function generateAccessToken(user: User) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '5m',
  });
}

export function generateRefreshToken(user: User, jti: any) {
  return jwt.sign({
    userId: user.id,
    jti
  }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '8h',
  });
};

export function generateTokens(user: User, jti: any) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
};