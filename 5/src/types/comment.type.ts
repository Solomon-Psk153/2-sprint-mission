type metadataType = {
    lastCursor: string | null,
    hasNextPage: boolean,
};

type CreateCommentDataType = {
    title: string | undefined;
    content: string;
};

type whereToLeaveComment = "articles" | "products";

type GetRootCommentsListQueryType = CreateCommentDataType & {
    whichId: string;
    kind: whereToLeaveComment;
    lastCursor: string;
    limit: number;
    orderBy: CreatedAtType;
};

type GetCommentsOfRootCommentQueryType = PagenationType & {
    kind: whereToLeaveComment;
    whichId: string;
    commentId: string;
};

type CreateCommentQueryType = Modify<CreateCommentDataType & { userId: string; } & Omit<GetCommentsOfRootCommentQueryType, keyof PagenationType>, {
    commentId?: string;
}>;

type UpdateCommentQueryType = CreateCommentDataType & DeleteCommentQueryType;

type DeleteCommentQueryType = {
    userId: string;
    commentId: string;
}

type QueryMode = 'default' | 'insensitive';