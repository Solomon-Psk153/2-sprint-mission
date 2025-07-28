create table article_like( -- 게시글에 누가 좋아요를 눌렀는지 저장하는 테이블이다.
    id
        bigserial,
        -- 게시글의 좋아요 레코드를 구분하기 위한 값이다. 나중에 정렬할 때는 필요할 것 같다.

    client_id
        bigint          not null,
        -- 게시글에 좋아요를 누른 유저가 누구인지 가리킨다.

    article_id
        bigint          not null,
        -- 어떤 게시글을 좋아요를 눌렀는지 가리킨다.

    created_at
        timestamp       default now(),
        -- 게시글의 좋아요가 언제 눌렸는지 확인할 때, 사용한다.

    constraint pk_article_like_id 
        primary key(id),
        -- 게시글의 좋아요 id가 기본키라는 것을 정의하는 제약조건

    constraint fkey_article_like2client 
        foreign key(client_id) references client(id)
        on delete Cascade on update Cascade,
        -- 게시글의 좋아요를 한 client의 id를 가리키는 제약조건
        -- 고객이 지워지면, 좋아요 정보도 지워버리고 고객 id가 변경되면, 정보도 업데이트 시킨다.

    constraint fkey_article_like2article
        foreign key(article_id) references article(id)
        on delete Cascade on update Cascade,
        -- 좋아요를 받은 게시글이 무엇인지 id를 가리키는 제약조건
        -- 게시글이 없어지면, 좋아요 정보도 없어지고 게시글 id가 변경되면, 정보도 업데이트 시킨다.

    constraint uniq_article_like_client_article_id
        unique(client_id, article_id)
        -- 게시글의 id와 유저 id의 쌍은 고유함을 나타내는 제약조건

);