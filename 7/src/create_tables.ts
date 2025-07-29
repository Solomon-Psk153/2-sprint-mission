import { PrismaClient } from '../generated/prisma/client';
import readSQL from './utils/readSQL';

const prisma = new PrismaClient();

const create_tables = () => prisma.$transaction(async (tx: any) => {

    await tx.$executeRawUnsafe(readSQL('../../sql/table/client.sql'));
    await tx.$executeRawUnsafe(readSQL('../../sql/table/image.sql'));
    await tx.$executeRawUnsafe(readSQL('../../sql/table/article.sql'));
    await tx.$executeRawUnsafe(readSQL('../../sql/table/article_comment.sql'));
    await tx.$executeRawUnsafe(readSQL('../../sql/table/article_like.sql'));
    await tx.$executeRawUnsafe(readSQL('../../sql/table/product.sql'));
    await tx.$executeRawUnsafe(readSQL('../../sql/table/product_like.sql'));
    await tx.$executeRawUnsafe(readSQL('../../sql/table/product_comment.sql'));
    await tx.$executeRawUnsafe(readSQL('../../sql/table/tag.sql'));
    await tx.$executeRawUnsafe(readSQL('../../sql/table/product_tag.sql'));

    const sql = readSQL('../../sql/trigger/update_timestamp.sql');
    const queries = sql
        .split('--')
        .map(q => q.trim())
        .filter( code => code.length > 0)

    for(const query of queries){
        await tx.$executeRawUnsafe(query);
    }
});

create_tables()
    .then( () => console.log("all sql executed: table created") )
    .catch(e => console.log(e))