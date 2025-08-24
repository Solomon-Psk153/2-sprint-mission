type GetArticleDataType = {
    title: string;
    content: string;
} & PagenationType;

type CreateArticleReqType = Pick<GetArticleDataType, "title" | "content">;

type CreateArticleDataType = CreateArticleReqType & {
    userId: string;
};

type UpdateArticleReqType = CreateArticleReqType;

type UpdateArticleDataType = CreateArticleDataType & {
    articleId: string;
};

type deleteArticleDataType = Omit<UpdateArticleDataType, "title" | "content">