create table product_tag( -- 상품이 어떤 태그를 가지고 있는지에 대한 정보를 가지고 있다.
    id 
        bigserial,
        -- 상품의 태그를 유일하게 구별할 수 있는 값이다.

    tag_id
        bigint          not null,
        -- 상품이 어떤 태그 값을 가지고 있는지 가리키는 값이다.

    product_id 
        bigint          not null,
        -- 상품의 태그가 어떤 제품을 가리키는 지 알려주는 값이다.

    created_at 
        timestamp       default now(),
        -- 상품의 태그가 언제 등록됬는지 알려주는 값이다.

    -- updated_at 
    --     timestamp       not null default now(),


    constraint pk_product_tag_id
        primary key(id),
        -- 상품의 태그 id가 기본키라는 것을 정의하는 제약조건

    constraint fkey_product_tag2tag
        foreign key(tag_id) references tag(id)
        on delete Cascade on update Cascade,
        -- 상품 태그의 tag 값을 가리키는 제약조건
        -- 태그 존재가 지워지면, 상품의 태그도 저절로 없어지고 태그 id가 변경되면, 같이 변경된다.
    
    constraint fkey_product_tag2product
        foreign key(product_id) references product(id)
        on delete Cascade on update Cascade,
        -- 상품 태그의 상품 id 값을 가리키는 제약조건
        -- 상품이 지워지면, 상품을 가리키는 태그도 없어진다. 만약 product의 id가 변경되면, 가리키는 id도 같이 변경된다.

    constraint uniq_tag_product_id
        unique(tag_id, product_id)
        -- 상품의 id, tag id가 유일해야 함을 나타내는 제약조건

);