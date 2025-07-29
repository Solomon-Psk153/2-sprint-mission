import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

const delete_data = () => prisma.$transaction(async (tx: any) => {

    await tx.$executeRawUnsafe('delete from article_comment');
    await tx.$executeRawUnsafe('delete from article_like');
    await tx.$executeRawUnsafe('delete from image');
    await tx.$executeRawUnsafe('delete from article');

    await tx.$executeRawUnsafe('delete from tag');
    await tx.$executeRawUnsafe('delete from product_tag');
    await tx.$executeRawUnsafe('delete from product_like');
    await tx.$executeRawUnsafe('delete from product_comment');
    await tx.$executeRawUnsafe('delete from product');

    await tx.$executeRawUnsafe('delete from client');

    await tx.$executeRawUnsafe('select count(*) from client');
    await tx.$executeRawUnsafe('select count(*) from article_comment');
    await tx.$executeRawUnsafe('select count(*) from article_like');
    await tx.$executeRawUnsafe('select count(*) from article');
    await tx.$executeRawUnsafe('select count(*) from product_comment');
    await tx.$executeRawUnsafe('select count(*) from product_like');
    await tx.$executeRawUnsafe('select count(*) from product_tag');
    await tx.$executeRawUnsafe('select count(*) from tag');
    await tx.$executeRawUnsafe('select count(*) from product');
    await tx.$executeRawUnsafe('select count(*) from client');
});

delete_data()
    .then( () => console.log("all sql executed: table dropped") )
    .catch(e => console.log(e))
;