create table product ( -- 상품에 대한 정보를 담고 있는 테이블이다.
    id          
        bigserial,
        -- 상품을 유일하게 식별할 수 있는 id 이다.

    image_url   
        varchar(200)[],
        -- 상품의 이미지 주소를 저장하는 곳이다.
        -- 이미지를 업로드 하면, 이미지를 서버에 저장하고 서버에서 만든 이미지 url 저장한다.
        -- 이미지를 몇 개를 저장할 지 몰라서 일단 배열로 잡아 놓는다.

    name        
        varchar(30)     not null,
        -- 상품의 이름을 저장한다.

    description
        text            not null,
        -- 상품에 대한 설명을 저장한다.

    like_count
        bigint          default 0,
        -- 상품의 좋아요 수를 저장한다.
        -- 조인 시, 시간이 걸리는 것을 방지한다.

    price
        bigint          default 0,
        -- 상품의 가격을 저장한다. 
        -- 음수는 안 되며, 가격을 지정하지 않으면, 기본값은 0이다.

    client_id
        bigint          not null,
        -- 상품을 누가 올렸는지 가리키는 외래키이다.

    created_at
        timestamp       default now(),
        -- 상품을 언제 처음 등록했는지 저장한다.

    updated_at
        timestamp       default now(),
        -- 상품을 언제 수정했는지 최신 시간을 저장한다.


    constraint  pk_product_id               
        primary key(id),
        -- 상품의 기본키를 id로 정의하는 제약조건

    constraint  fkey_products2client
        foreign key(client_id) references client(id)
        on delete Cascade on update Cascade,
        -- 상품이 어느 유저가 올렸는지 가리키는지 정의하는 제약조건
        -- 상품을 올린 고객이 지워지면, 올린 상품도 모두 지워지고 고객의 id가 변경되면, 같이 변경된다.

    constraint  chk_product_price_whole_number
        check(price >= 0),
        -- 상품의 가격이 0 이상인지 확인하는 제약조건

    constraint  chk_product_name_len
        check(char_length(name) < 10),
        -- 상품의 이름의 길이를 10자 이내로 제한하는 제약조건

    constraint  chk_product_desc_len
        check(char_length(description) between 1 and 10000),
        -- 상품의 설명의 길이를 제한하는 제약조건이다.
    
    constraint  chk_product_like_count_whole_number
        check(like_count >= 0),
        -- 상품의 좋아요 수가 양수인지 판단한다.
        -- 유튜브에서도 int를 넘은 것은 봤지만, bigint는 넘은 것을 못 봤으므로, 굳이 이런 제약조건이 필요없을 듯 하다.
        -- 좋아요 클릭을 여러 번 해서 트래픽을 과도하게 만들면, 좋아요가 음수가 될 수도 있을 것 같다.

    constraint  chk_product_image_url_length
        check(cardinality(image_url) <= 10)
        -- 상품의 이미지는 10개를 넘어가지 않도록 정한다.

);