import db from "./prisma.util"

export const resetDb = async() => {
  await db.user.deleteMany();
  await db.article.deleteMany();
  await db.comment.deleteMany();
  await db.product.deleteMany();
  await db.tag.deleteMany();
  await db.articleLike.deleteMany();
  await db.productLike.deleteMany();
  await db.image.deleteMany();
  await db.notification.deleteMany();
  await db.rootCommentToArticle.deleteMany();
  await db.rootCommentToProduct.deleteMany();
};