import { articleOrderBy, productOrderBy } from "../enums/orderby.enum";

export const articleOrderBySelector = function (orderBy: string) {
  switch (orderBy) {
    case "oldest":
      return articleOrderBy["oldest"];

    case "recent":
    default:
      return articleOrderBy["recent"];
  }
};

export const productOrderBySelector = function (orderBy: string) {
  switch (orderBy) {
    case "highestprice":
    case "lowestprice":
      return productOrderBy[orderBy];

    case "oldest":
      return productOrderBy["oldest"];

    case "recent":
    default:
      return productOrderBy["recent"];
  }
};