import passport from "passport";
import { Request, Response, NextFunction } from "express";

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  // authenticate를 실행하되 실패해도 next()로 넘기도록 설정
  passport.authenticate("accessToken", { session: false }, (err: any, user: Express.User | undefined, _info:any) => {
    if (err) return next(err);
    else if (user) {
      // 로그인 성공 → req.user에 사용자 정보 저장
      req.user = user;
    }
    // 로그인 안 했으면 req.user = undefined 그대로
    next();
  })(req, res, next);
};
