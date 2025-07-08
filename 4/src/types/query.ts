interface query{
    offset?: string;
    limit?: string;
    orderBy?: "recent" | "oldest" | "highestprice" | "lowestprice";
    name?: string;
    description?: string;
    title?: string;
    content?: string;
}

export {query};