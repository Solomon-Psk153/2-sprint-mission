import { Prisma } from '../../../generated/prisma';
import db from '../../model/prisma';
import { query } from '../../types/query';

const getProductsList = async (query: query) => {
    const orderSelects: Record<NonNullable<query['orderBy']>, Prisma.ProductOrderByWithRelationInput> = {
        'recent': { 'createdAt': 'desc' },
        'oldest': { 'createdAt': 'asc' },
        'highestprice': { 'price': 'desc' },
        'lowestprice': { 'price': 'asc' },
    };

    const offset = query.offset ? Number(query.offset) : 0;
    const limit = query.limit ? Number(query.limit) : 10;
    const orderBy = query.orderBy == null ? orderSelects['recent'] : orderSelects[query.orderBy];

    const nameSearch = query.name;
    const descriptionSearch = query.description;

    const where = {
        ...(nameSearch !== undefined && {
            name: {
                contains: nameSearch,
                mode: Prisma.QueryMode.insensitive
            }
        }),
        ...(descriptionSearch !== undefined && {
            description: { 
                contains: descriptionSearch, 
                mode: Prisma.QueryMode.insensitive 
            }
        })
    };

    const productsList = await db.product.findMany({
        ...(where !== undefined && { where }),

        select: {
            id: true,
            name: true,
            price: true,
            createdAt: true,
        },

        orderBy,

        skip: offset,
        take: limit
    });

    return productsList;
}

export default getProductsList;