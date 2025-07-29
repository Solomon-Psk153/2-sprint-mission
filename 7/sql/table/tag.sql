create table tag( -- 태그에 대한 정보를 담고 있는 테이블이다.
    id
        bigserial,
        -- tag를 유일하게 식별할 수 있는 값이다.

    name
        varchar(20)     not null,
        -- tag의 값을 나타낸다. 유일해야 한다.

    created_at
        timestamp       default now(),
        -- tag가 만들어진 시간을 나타낸다.

    deleted_at 
        timestamp       default null,
        -- 태그가 언제 삭제됬는지 나타낸다.
        -- updated_at을 넣으려고 했는데, 이후에 데이터 분석 용도로 태그 목록을 남겨두면 좋을 것 같다.

    constraint pk_tag_id
        primary key(id),
        -- 태그의 id는 기본키라는 것을 정의하는 제약조건

    constraint uniq_tag_name
        unique(name),
        -- 태그의 이름은 유일해야 함을 나타내는 제약조건

    constraint chk_name_len
        check(length(name) < 5)
        -- 태그의 이름은 5자를 넘어가지 말아야 하는 제약조건

);