import { Strategy as DiscordStrategy } from 'passport-discord';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, PORT } from '../../utils/env.util';
import db from '../../utils/prisma.util';

export const discordStrategy = new DiscordStrategy(
    {
        clientID: DISCORD_CLIENT_ID,
        clientSecret: DISCORD_CLIENT_SECRET,
        callbackURL: `/auth/discord/callback`,
        scope: ['identify', 'email'],
        // state: true
    },
    async function (
        accessToken, refreshToken, profile, done
    ) {
        try{
            const user = await db.user.findUnique({
                where: {
                    provider: 'discord',
                    providerId: profile.id
                },
            });
            if (user) {
                return done(null, user);
            }

            const email = profile.email;
            const nickname = profile.username;
            const imageUrl = profile.avatar;

            if (email != null && nickname != null) {

                const newUser = await db.user.create({
                    data: {
                        id: crypto.randomUUID(),
                        provider: 'discord',
                        providerId: profile.id,
                        email,
                        nickname,
                        imageUrl
                    },
                });

                return done(null, newUser);

            } else {
                return done(null, false, { message: "email, nickname, imageUrl is necessary" });
            }
        }catch(err) {
            return done(err, false, {message: "server error"});
        }
    }
);