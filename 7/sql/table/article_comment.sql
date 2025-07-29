create table article_comment( -- 게시글에 누가 댓글을 달았는지 정보를 저장한다.
    id
        bigserial,
        -- 게시글에 달린 댓글을 유일하게 구별할 수 있는 값이다.

    content
        text            not null,
        -- 게시글에 대한 댓글이다.

    article_id
        bigint          not null,
        -- 댓글을 단 게시글을 가리킨다.

    client_id
        bigint          not null,
        -- 댓글을 단 사람을 가리킨다.

    created_at
        timestamp       default now(),
        -- 게시글의 댓글을 처음 생성한 시간이다.

    updated_at
        timestamp       default now(),
        -- 게시글 댓글을 수정한 최신 시간이다.


    constraint pk_article_comment_id 
        primary key(id),
        -- 게시글 댓글의 기본키 값을 지정하는 제약조건

    constraint  chk_article_comment_content_len
        check(char_length(content) between 1 and 10000),
        -- 게시글 댓글의 길이를 정하는 제약조건

    constraint  fkey_article_comment2article
        foreign key(article_id) references article(id)
        on delete Cascade on update Cascade,
        -- 어떤 게시글을 가리키는지 정의하는 제약조건
        -- 게시글이 삭제되면, 같이 삭제되고 게시글 id가 변경되면, 같이 변경된다.

    constraint  fkey_article_comment2client
        foreign key(client_id) references client(id)
        on delete Cascade on update Cascade
        -- 어떤 사용자를 가리키는지 정의하는 제약 조건
        -- 고객이 삭제되면, 같이 삭제되고 고객id가 변경되면, 같이 변경된다.

);
