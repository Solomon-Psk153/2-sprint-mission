type GetArticleDataType = {
    title: string;
    content: string;
    userId?: string;
} & PagenationType;

type GetArticleByIdQueryDataType = Optional<DeleteArticleDataType, "userId">;

type CreateArticleReqType = Pick<GetArticleDataType, "title" | "content">;

type CreateArticleDataType = CreateArticleReqType & {
    userId: string;
};

type UpdateArticleReqType = CreateArticleReqType;

type UpdateArticleDataType = CreateArticleDataType & {
    articleId: string;
};

type DeleteArticleDataType = Omit<UpdateArticleDataType, "title" | "content">

type LikeArticleDataType = DeleteArticleDataType;

type UndoLikeArticleDataType = LikeArticleDataType;

type GetLikedArticleDataType = GetArticleDataType & {
    userId: string;
};