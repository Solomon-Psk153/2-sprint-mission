import db from '../../model/prisma';
import { v4 as uuidv4 } from 'uuid';

const updateProduct = async function (
    userId: string,
    productId: string, 
    name: string, 
    description: string, 
    price: number, 
    tagNames?: { name: string }[]
) {
    return db.$transaction(async (tx) => {
        const updatedProduct = await tx.product.update({
            where: {
                userId, 
                id: productId
            },
            data: {
                name,
                description,
                price
            }
        });
        const updatedTags = [];
        if (tagNames) {
            const tagNamesArr = tagNames.map(tagNameObj => tagNameObj.name)

            const deletedTags = [];

            const findOwnProductTags = await tx.productTag.findMany({
                where:{ productId: productId }
            });

            for(const productTag of findOwnProductTags){
                const deletedProductTag = await tx.productTag.delete({
                    where:{id: productTag.id}
                });

                const findOneTagPoint = await tx.productTag.count({where:{tagId:deletedProductTag.tagId}});
                if(findOneTagPoint === 0){
                    const deletedTag = await tx.tag.delete({
                        where:{
                            id:deletedProductTag.tagId 
                        }
                    });

                    deletedTags.push(deletedTag);
                }
            }

            const createdTags = await tx.tag.createManyAndReturn({
                data: tagNamesArr.map(name => ({
                    id:uuidv4(),
                    name
                })),
                skipDuplicates: true
            });

            const tagsAboutToMapping = await tx.tag.findMany({
                where: {name: {in : tagNamesArr}}
            });

            await tx.productTag.createMany({
                data:tagsAboutToMapping.map(tagObj => ({
                    id:uuidv4(),
                    productId:productId,
                    tagId: tagObj.id
                }))
            });

            updatedTags.push({createdTags});
            updatedTags.push({deletedTags});

        }

        return {updatedProduct, updatedTags}

    });

};

export default updateProduct;
