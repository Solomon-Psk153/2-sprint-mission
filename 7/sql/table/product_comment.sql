create table product_comment ( -- 상품에 누가 댓글을 달았는지 정보를 저장한다.
    id
        bigserial,
        -- 상품에 달린 댓글을 유일하게 구별할 수 있는 값이다.

    content
        text,
        -- 상품에 대한 댓글 내용이다.

    product_id
        bigint          not null,
        -- 어떤 상품인지 가리키는 값이다.

    client_id
        bigint          not null,
        -- 댓글을 단 사용자를 가리킨다.

    created_at
        timestamp       default now(),
        -- 상품의 댓글을 처음 생성한 시간이다.

    updated_at  
        timestamp       default now(),
        -- 상품 댓글을 수정한 최신 시간이다.


    constraint  pk_product_comment
        primary key(id),
        -- 상품 댓글의 기본키 값을 지정하는 제약조건

    constraint  chk_product_comment_content_len
        check(char_length(content) between 1 and 10000),
        -- 상품 댓글의 길이를 정의하는 제약조건

    constraint  fkey_product_comment2product
        foreign key(product_id) references product(id)
        on delete Cascade on update Cascade,
        -- 어떤 상품을 가리키는지 정의하는 제약조건
        -- 상품이 지워지면, 상품의 댓글도 모두 지워지고 상품의 id가 변경되면, 같이 변경된다.

    constraint  fkey_product_comment2client
        foreign key(client_id) references client(id)
        on delete Cascade on update Cascade
        -- 어떤 사용자를 가리키는지 정의하는 제약조건
        -- 상품에 댓글을 단 고객이 지워지면, 고객의 id를 가진 모든 댓글이 지워지고, 고객의 id가 변경되면, 같이 변경된다.

);