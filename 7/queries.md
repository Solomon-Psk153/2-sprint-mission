
다음 경우들에 대해 총 14개의 SQL 쿼리를 작성해 주세요.

예시로 값이 필요한 경우 적당한 값으로 채워넣어서 작성하면 됩니다. 


1. 내 정보 업데이트 하기
    - 닉네임을 "test"로 업데이트
    - 현재 로그인한 유저 id가 1이라고 가정

```sql
select * from client where id = 1;

update client
set nickname = 'test'
where id = 1;
```

2. 내가 생성한 상품 조회
- 현재 로그인한 유저 id가 1이라고 가정
- 최신 순으로 정렬
- 10개씩 페이지네이션, 3번째 페이지

```sql
with all_products as (
    select *
    from product
)
select row_number() over () as line_number, *
from all_products
where client_id = 1
limit 10
offset 20;
```


3. 내가 생성한 상품의 총 개수
```sql
select count(*)
from product
where client_id = 1;
```


4. 내가 좋아요 누른 상품 조회
    - 현재 로그인한 유저 id가 1이라고 가정
    - 최신 순으로 정렬
    - 10개씩 페이지네이션, 3번째 페이지

```sql
select *
from product_like
where client_id = 1
order by created_at desc
limit 10;
-- offset 20;
```


5. 내가 좋아요 누른 상품의 총 개수
```sql
select count(*)
from product_like
where client_id = 1;
```

6. 상품 생성
    - 현재 로그인한 유저 id가 1이라고 가정
```sql
insert into product
(name, description, client_id)
values
('hello', 'world', 1);
```

7. 상품 목록 조회
    - "test" 로 검색
    - 최신 순으로 정렬
    - 10개씩 페이지네이션, 1번째 페이지
    - 각 상품의 좋아요 개수를 포함해서 조회하기
```sql
with product_with_like as (
    select p.*, pl.client_id
    from product p
        left join product_like pl
            on p.id = pl.product_id
    -- where name = 'test'
)
select *
from product_with_like
order by created_at desc
limit 10;
```



8. 상품 상세 조회
    - 1번 상품 조회
```sql
select *
from product
where id = 1;
```

9. 상품 수정
    - 1번 상품 수정
```sql
update product
set description = 'nice to meet you!'
where id = 1;

select * from product where id = 1;
```

10. 상품 삭제
    - 1번 상품 삭제
```sql
delete from product
where id = 1;
```


11. 상품 좋아요
    - 1번 유저가 2번 상품 좋아요
```sql
insert into product_like
    (client_id, product_id)
values
(1, 2);
```


12. 상품 좋아요 취소
    - 1번 유저가 2번 상품 좋아요 취소
```sql
delete from product_like
where client_id = 1 and product_id = 2;
```

13. 상품 댓글 작성
- 1번 유저가 2번 상품에 댓글 작성
```sql
insert into product_comment
(content, product_id, client_id)
values
('hello world!!', 2, 1);
```


14. 상품 댓글 조회
    - 1번 상품에 달린 댓글 목록 조회
    - 최신 순으로 정렬
    - 댓글 날짜 2025-03-25 기준으로 커서 페이지네이션
    - 10개씩 페이지네이션
```sql
-- 1번에 달린 댓글이 없어서 2번으로 수행
select *
from product_comment
where product_id = 2 and created_at > '2025-03-25'
order by created_at desc
limit 10;
```