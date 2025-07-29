create table client ( -- 유저가 가지고 있어야 할 정보들을 저장한다.
    id          
        bigserial,
        -- 유저를 유일하게 구별할 수 있는 id이다.

    image_url   
        varchar(200),
        -- 유저의 프로필 이미지를 가리키는 문자열이다.
        -- 조인을 해서 가져오면, 시간이 걸리기 때문에 유저에 저장할 수 있도록 한다.
        -- text로 할 수 있지만, 많은 용량을 차지하게 하고 싶진 않아서 varchar로 하였다.

    email       
        varchar(50)     not null,
        -- 유저의 로그인할 때, 입력하는 이메일을 저장한다.
        -- 이메일과 provider의 쌍은 고유해야 한다.

    provider
        varchar(30)     default 'local',
        -- 유저의 정보를 전달하는 곳의 이름을 저장한다.
        -- 유저의 이름을 전달하는 곳이 없고 사용자가 회원가입을 통해 직접 입력하였다면,
        -- local이라는 값을 가지게 된다.

    provider_id 
        bigint,
        -- 유저 정보 공급 제공자가 가지고 있는 유저 개별 값이다.
        -- 만약, provider가 local 값을 가지고 있다면, null이 기본이 된다.

    nickname
        varchar(50)     not null,
        -- 유저를 대표할 닉네임을 정할 수 있다.
        -- 이 값이 유일하게 댓글에 달린 이름으로 보아 유일해야 할 듯 싶다.

    password
        varchar(200),
        -- 유저가 로그인할 때, 입력하는 비밀번호를 입력한다.
        -- 이 값은 암호화해서 저장해야 한다. 
        -- 하지만, 지금 여기에서는 연습 목적으로 평문으로 저장한다.

    created_at
        timestamp       default now(),
        -- 유저가 처음 만들어 진 시간을 등록한다.

    updated_at
        timestamp       default now(),
        -- 유저가 개인정보를 수정했을 때, 수정한 최신 시간을 등록한다.


    constraint  pk_user_id
        primary key(id),
        -- 유저의 기본키를 정의하는 제약조건

    constraint  uniq_user_email_provider
        unique(email, provider),
        -- email과 provider가 쌍으로 고유해야 한다는 것을 정의하는 제약조건

    constraint  uniq_user_nickname
        unique(nickname)
        -- nickname이 고유해야 함을 의미하는 제약조건

);