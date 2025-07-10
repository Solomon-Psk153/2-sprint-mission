import express from 'express';
import bcrypt from 'bcrypt';
import db from '../../model/prisma';
import { v4 as uuidv4 } from 'uuid';

const register = async function (email: string, password: string, nickname: string) {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userId = uuidv4();
    const user = await db.user.create({
        data: {
            id: userId,
            nickname,
            email,
            password: hashedPassword,
            provider: "local",
            providerId: userId
        },
    });

    return user;
}

export default register;