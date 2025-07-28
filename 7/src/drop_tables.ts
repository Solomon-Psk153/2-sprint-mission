import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

const drop_tables = () => prisma.$transaction(async (tx: any) => {

    await tx.$executeRawUnsafe('drop table if exists image');
    await tx.$executeRawUnsafe('drop table if exists article_comment');
    await tx.$executeRawUnsafe('drop table if exists article_like');
    await tx.$executeRawUnsafe('drop table if exists article');
    await tx.$executeRawUnsafe('drop table if exists product_comment');
    await tx.$executeRawUnsafe('drop table if exists product_like');
    await tx.$executeRawUnsafe('drop table if exists product_tag');
    await tx.$executeRawUnsafe('drop table if exists tag');
    await tx.$executeRawUnsafe('drop table if exists product');
    await tx.$executeRawUnsafe('drop table if exists client');
});

drop_tables()
    .then( () => console.log("all sql executed: table dropped") )
    .catch(e => console.log(e))
;