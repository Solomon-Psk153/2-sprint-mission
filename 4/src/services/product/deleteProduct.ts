import { devDebug } from '../../lib/debugs';
import db from '../../model/prisma';

const deleteProduct = async function (productOwnId: string) {
    return db.$transaction(async (tx) => {
        const deletedProduct = await tx.product.delete({
            where: { id:productOwnId },
            include: {
                tags: true
            }
        });

        const deletedTags = [];
        devDebug("deletedProduct.tags", deletedProduct.tags);
        for (const productTagObj of deletedProduct.tags) {
            // productTag에 태그가 남아 있으면, 삭제하지 말고 없어야 삭제할 수 있게 한다.
            const tagId = productTagObj.tagId;
            const productTagCount = await tx.productTag.count({
                where: {
                    tagId
                }
            });

            devDebug("productTagCount", productTagCount);

            if (productTagCount === 0) {
                const deletedTag = await tx.tag.delete({
                    where: { id: productTagObj.tagId }
                });

                deletedTags.push(deletedTag);
            }
        }

        return { deletedProduct, deletedTags };
    });
};

export default deleteProduct;