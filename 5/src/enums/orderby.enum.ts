export const articleOrderBy:ArticleOrderByType = {
  recent: { createdAt: "desc" },
  oldest: { createdAt: "asc" }
};

const productPriceOrderBy:ProductPriceOrderByType = {
  highestprice: { price: "desc" },
  lowestprice: { price: "asc" }
}

export const productOrderBy = Object.assign(articleOrderBy, productPriceOrderBy);