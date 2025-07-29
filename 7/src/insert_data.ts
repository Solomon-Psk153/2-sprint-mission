import { PrismaClient } from '../generated/prisma/client';
import readSQL from './utils/readSQL';

const prisma = new PrismaClient();

const insert_data = async () => {
    const sql = readSQL('../../sql/insert.sql');
    const queries = sql
        .split(';')                   // 세미콜론으로 나누기
        .map(q => q.trim())          // 양쪽 공백 제거
        .filter(q => q.length > 0);  // 빈 문자열 제거

    await prisma.$transaction(async (tx) => {
        for (const query of queries) {
            await tx.$executeRawUnsafe(query);  // 하나씩 실행
        }
    });
};

insert_data()
    .then( () => console.log("all sql executed: table data inserted") )
    .catch(e => console.log(e))