check는 서버에서만 검증하도록 하자(여기서는 연습하려고 달았다.)
[PostgreSQL Check란? Check를 사용하지 말아야하는 이유](https://puleugo.tistory.com/184)

---
user가 postgresql에서 예약어이다.

---
```sql
provider varchar(30) default "local",
```
위 줄은 sql에서 컬럼으로 인식한다. 제대로 하려면 작은따옴표로 묶어야 한다.