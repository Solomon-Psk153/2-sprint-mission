import { articleOrderBy, productOrderBy } from "../enums/orderby.enum";

export const articleOrderBySelector = (orderBy: string) => {
  switch (orderBy) {
    case "oldest":
      return articleOrderBy["oldest"];

    case "recent":
    default:
      return articleOrderBy["recent"];
  }
};

export const productOrderBySelector = (orderBy: string) => {
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

export const productTagOrderBySelector = articleOrderBySelector;
export const commentOrderBySelector = articleOrderBySelector;