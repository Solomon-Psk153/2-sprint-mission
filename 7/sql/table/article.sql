create table article( -- 게시글의 정보를 저장한다.
    id
        bigserial,
        -- 게시글을 유일하게 식별할 수 있는 값이다.
    
    title
        varchar(200),
        -- 게시글의 제목을 의미한다.
    
    content
        text            not null,
        -- 게시글의 내용을 의미한다.
    
    image_url 
        varchar(200)[],
        -- 게시글에 등록된 이미지 개수를 의미한다. 
        -- 나중에 조인을 할 때, 시간을 감소시키기 위함이다.

    like_count
        bigint          default 0,
        -- 게시글의 좋아요 개수이다.
        -- 나중에 조인을 할 때, 시간을 감소시키기 위함이다.

    client_id
        bigint          not null,
        -- 게시글의 주인을 알려주는 값이다.

    created_at
        timestamp       default now(),
        -- 게시글이 처음 만들어진 시간을 저장한다.

    updated_at
        timestamp       default now(),
        -- 게시글이 수정된 시간을 저장한다.


    constraint pk_article_id
        primary key(id),
        -- 게시글의 id를 기본키로 설정하는 제약조건

    constraint fkey_article2client
        foreign key(client_id) references client(id)
        on delete Cascade on update Cascade,
        -- 게시글을 누가 작성했는지 정의하는 제약조건
        -- 고객(유저)이 지워지면, 고객이 올린 게시글들도 지워지고 게시글 id가 변경되면, id가 같이 변경된다.

    constraint chk_article_like_count_whole_number
        check(like_count >= 0),
        -- 게시글의 좋아요 수가 0 이상인지 확인한다.

    constraint  chk_article_title_len
        check(char_length(title) < 10),
        -- 게시글 제목의 길이를 10자 이내로 제한하는 제약조건
        -- 이게 한글에서도 똑같이 적용되는지 모르겠다.

    constraint  chk_article_desc_len
        check(char_length(content) between 1 and 20000),
        -- 게시글 내용 길이를 제한하는 제약조건이다.

    constraint  chk_article_image_url_length
        check(cardinality(image_url) <= 10)
        -- 게시글 이미지는 10개를 넘어가지 않도록 정한다.

);