import { Prisma } from '../../../generated/prisma';
import db from '../../model/prisma';
import { v4 as uuidv4 } from 'uuid';

const createProduct = async function (
    productUserId: string, 
    name: string, 
    description: string = "", 
    price: number, 
    tagNames?: { name: string }[]
) {
    return db.$transaction(async (tx) => {
        const productId = uuidv4();
        const createdProduct = await db.product.create({
            data: {
                id: productId,
                name,
                description,
                price,
                userId: productUserId,
                ...((tagNames !== undefined && tagNames.length !== 0) && {
                    tags: {
                        create: tagNames.map(tagNameObj => ({
                            id: uuidv4(),
                            tag: {
                                connectOrCreate: {
                                    where: { name: tagNameObj.name },
                                    create: {
                                        id: uuidv4(),
                                        name: tagNameObj.name
                                    }
                                }
                            }
                        }))
                    }
                })
            },

            select: {
                id: true,
                tags: {
                    select: {
                        tag: true
                    }
                }
            },

            // include: {
            //     tags: {
            //         include: {
            //             tag: true
            //         }
            //     }
            // }
        });

        return createdProduct;
    });
};

export default createProduct;