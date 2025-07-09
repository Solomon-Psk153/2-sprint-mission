import { RequestHandler } from "express";
import passport from '../../lib/passport/index';
import { AuthenticateCallback } from "passport";
import { devDebug } from "../../lib/debugs";
import { generateToken } from "../../lib/tokens";

const loginHandler: RequestHandler = function (req, res, next) {

    try {
        const callback: AuthenticateCallback = (err, user, info) => {
            console.log("user", user);
            devDebug(user);
            if (err) {
                devDebug(err);
                return next(err);
            }

            if (user == null || user == false) {
                res.status(404).json({ message: info });
                return;
            }

            devDebug(user);

            const userid = user.id;

            req.login(user, { session: false }, async (err) => {
                if (err) {
                    devDebug(err);
                    return next(err);
                }

                // user
                const newAccessToken = generateToken(userid, "accessToken");
                const newRefreshToken = generateToken(userid, "refreshToken");

                res.setHeader("Authorization", `Bearer ${newAccessToken}`);

                res.status(200).json({
                    id: userid,
                    newRefreshToken: newRefreshToken
                });
                return;
            });
        };

        passport.authenticate(
            'local', callback
        )(req, res, next);
    } catch (err) {
        res.status(401).json(err);
        return;
    }
    // if (!req.user) res.status(401).json({ message: 'Unauthorized' });
    // else res.status(200).json({ message: "login success" });
}

export default loginHandler;