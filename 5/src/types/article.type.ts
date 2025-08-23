type GetArticleDataType = {
    title: string;
    content: string;
    offset: number;
    limit: number;
    orderBy: CreatedAtType;
};

type CreateArticleReqType = Pick<GetArticleDataType, "title" | "content">;

type CreateArticleDataType = CreateArticleReqType & {
    userId: string;
};

type UpdateArticleReqType = CreateArticleReqType;

type UpdateArticleDataType = CreateArticleDataType & {
    articleId: string;
};

type deleteArticleDataType = Omit<UpdateArticleDataType, "title" | "content">