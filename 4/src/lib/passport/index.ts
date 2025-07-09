import passport from 'passport';
import {accessTokenStrategy, refreshTokenStrategy} from './jwtStrategy';
import localStrategy from './localStrategy';

passport.use('local', localStrategy);
passport.use('accessToken', accessTokenStrategy);
passport.use('refreshToken', refreshTokenStrategy);
// passport.use('naver', naverStrategy);

export default passport;
