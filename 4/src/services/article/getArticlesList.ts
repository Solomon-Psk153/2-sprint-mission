import { Prisma } from '../../../generated/prisma';
import db from "../../model/prisma";
import {query} from '../../types/query';

const getArticlesList = async function(query: query){

    const orderSelects: Record<NonNullable<query['orderBy']>, Prisma.ProductOrderByWithRelationInput> = {
        'recent': { 'createdAt': 'desc' },
        'oldest': { 'createdAt': 'asc' },
        'highestprice': { 'price': 'desc' },
        'lowestprice': { 'price': 'asc' },
    };

    const offset = query.offset ? Number(query.offset) : 0;
    const limit = query.limit ? Number(query.limit) : 10;
    const orderBy = query.orderBy == null ? orderSelects['recent'] : orderSelects[query.orderBy];

    const titleSearch = query.title;
    const contentSearch = query.content;

    const articlesList = await db.article.findMany({
        where: {
            ...(titleSearch != null && {
                title: {
                    contains: titleSearch,
                    mode: Prisma.QueryMode.insensitive
                }
            }),
            ...(contentSearch != null && {
                content: { 
                    contains: contentSearch, 
                    mode: Prisma.QueryMode.insensitive 
                }
            })
        },

        select: {
            id: true,
            title: true,
            content: true,
            userId: true,
            images:true,
            comments: true
        },

        orderBy,

        skip: offset,
        take: limit
    });

    return articlesList;
};

export default getArticlesList;