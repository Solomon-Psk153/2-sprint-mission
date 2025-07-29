create table product_like( -- 상품에 누가 좋아요를 눌렀는지 저장하는 테이블이다.
    id 
        bigserial,
        -- 상품의 좋아요 레코드를 구분하기 위한 값이다. 나중에 정렬할 때는 필요할 것 같다.

    client_id 
        bigint          not null,
        -- 상품에 좋아요를 누른 유저가 누구인지 가리킨다.

    product_id 
        bigint          not null,
        -- 어떤 상품을 좋아요를 눌렀는지 가리킨다.

    created_at 
        timestamp       default now(),
        -- 상품의 좋아요가 언제 눌렸는지 확인할 때, 사용한다.

    
    constraint pk_product_like_id 
        primary key(id),
        -- 상품의 좋아요 id가 기본키라는 것을 정의하는 제약조건

    constraint fkey_product_like2client 
        foreign key(client_id) references client(id)
        on delete Cascade on update Cascade,
        -- 상품의 좋아요를 한 client의 id를 가리키는 제약조건
        -- 좋아요를 누른 고객이 지워지면, 좋아요도 지워지고 고객의 id가 변경되면, 같이 변경된다.

    constraint fkey_product_like2product
        foreign key(product_id) references product(id)
        on delete Cascade on update Cascade,
        -- 좋아요를 받은 상품이 무엇인지 id를 가리키는 제약조건
        -- 상품이 지워지면, 좋아요도 같이 지워지고 상품의 id가 변경되면, 같이 변경된다.

    constraint uniq_product_like_client_product_id
        unique(client_id, product_id)
        -- 상품의 id와 유저 id의 쌍은 고유함을 나타내는 제약조건

);