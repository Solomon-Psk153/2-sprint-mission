type OrderByField<K extends string, V extends "asc" | "desc"> = {
  [P in K]: V;
};

type ArticleOrderByType = {
  "recent": OrderByField<"createdAt", "desc">;
  "oldest": OrderByField<"createdAt", "asc">;
};

type ProductPriceOrderByType = {
  "highestprice": OrderByField<"price", "desc">,
  "lowestprice": OrderByField<"price", "asc">
};