create table image( -- 이미지에 대한 정보를 저장한다.
    id
        bigserial,
        -- 이미지를 유일하게 구별할 수 있는 값이다.

    client_id
        bigint          not null,
        -- 이미지를 누가 올렸는지 가리키는 값이다.

    image_url
        varchar(200)    not null,
        -- 이미지를 어디에서 볼 수 있는지 URL을 저장한다.
        
    original_name
        varchar(200)    not null,
        -- 이미지의 원래 이름을 저장한다.

    name 
        varchar(200)    not null,
        -- 변형된 이름이다. 이 값은 유일해야 한다.

    image_path
        varchar(200)    not null,
        -- 이미지가 어디에 저장되어 있는지 가리킨다.

    mimetype
        varchar(50)     not null,
        -- 이미지의 확장자는 무엇인지 가리킨다.

    created_at
        timestamp       default now(),

    constraint pk_image_id
        primary key(id),
        -- 이미지의 기본키를 정의하는 제약조건

    constraint fkey_image2client
        foreign key(client_id) references client(id)
        on delete Cascade on update Cascade,
        -- 이미지를 누가 올렸는지 정의하는 제약조건
        -- 고객(유저)이 지워지면, 고객이 올린 모든 이미지도 지워지고 고객의 id가 변경되면, 가리키는 id들도 모두 변경된다.

    constraint uniq_image_name
        unique(name)
        -- 이미지의 변형된 이름은 유일해야 함을 지정하는 제약조건

);