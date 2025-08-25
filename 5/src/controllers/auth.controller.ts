import { RequestHandler } from "express";
import * as authService from "../services/auth.service";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens";
import { UnauthorizedError } from "../utils/error/400.error";

// 회원가입
export const register: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, nickname } = req.body;
    const newUserObj = await authService.register({ email, password, nickname });
    res.status(200).json(newUserObj);
  } catch (err) {
    next(err);
  }
};

// 로컬 로그인
export const login: RequestHandler = function (req, res, next) {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const userId = req.user.id;

    res.status(200).json(
      {
        accessToken: generateAccessToken(userId),
        refreshToken: generateRefreshToken(userId),
        message: "login success"
      }
    );
  } catch (err) {
    next(err);
  }
};

// 로그아웃
export const logout: RequestHandler = function (req, res, next) {
  res.status(200).json({ message: "logout success" });
};

// 토큰 재발급
export const refreshTokens: RequestHandler = function (req, res, next) {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const userId = req.user.id;

    res.status(200).json({
      accessToken: generateAccessToken(userId),
      refreshToken: generateRefreshToken(userId),
    });

  } catch (err) {
    next(err);
  }
};