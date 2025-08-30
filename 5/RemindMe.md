# 참고한 사이트와 코드

나중에 시스템이 커지면, 편할 수 있다.(업로드한 이미지 관리) 보통은 URL로 방문자에게 제공하는 것 같다.
이미지는 유저 폴더를 따로 만들어서 유저 별로 모아두는 게 관리에 편하다. 그렇지 않은 경우에는 한번 생각해봐야 한다.
```prisma
model Image {
  id           String   @id
  mimetype     String
  originalname String
  filename     String   @unique
  path         String   @unique
  createdAt    DateTime @default(now()) @map("created_at")
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId       String @map("user_id")
  
  @@map("images")
}

---
```
AddressInfo가 net에 있었다는 것을 알게 되었다.
```ts
import { AddressInfo } from 'net';
// https://stackoverflow.com/questions/53736253/type-string-addressinfo-has-no-property-port-and-no-string-index-signature
```

https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.ko.md

이 사이트는 고품질의 타입스크립트(TypeScript) 자료형 정의(Type definition)를 위한 저장소라고 한다. 내가 사용할 예시는 다음 사이트에 찾을 수 있었다.

https://stackoverflow.com/questions/50218878/typescript-express-error-function

```ts
const updatedProduct = await db.product.update({
    where: { id: productOwnId },
    data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price }),
        ...((tagNames != null && tagNames.length !== 0) && {
            tags: {
                deleteMany: {
                    productId: productOwnId
                },
                create: tagNames.map(tagNameObj => ({
                    id: uuidv4(), // productTag Id
                    tag: {
                        connectOrCreate: {
                            where: { name: tagNameObj.name }, // 이름이 같은 태그가 있다면 연결
                            create: { // 없다면 새로 생성
                                id: uuidv4(),
                                name: tagNameObj.name
                            },
                        },
                    }
                })),
            }
        })
    }
});

return updatedProduct;
```

위와 같이 한번에 작성할 수도 있었다. 하지만, 치명적인 점은 삭제되어야 할 태그가 삭제되지 않고 그대로 남아 있을 수 있다. 그리고 race-condition의 위험도 존재한다.

이미 네이버에서 구현한 passport-naver가 있지만, 5~6년 전에 개발 이후로 더 이상 진전이 없고, 프로필 데이터도 한정적으로 제공하고 있어서 새로 개인이 개발한 모듈이다.
```bash
npm install passport-naver-v2
```
출처: https://inpa.tistory.com/entry/

---
아래와 같이 redirect를 사용하면, 새로고침을 하지 않아도 된다.
https://kirkim.github.io/javascript/2021/09/21/redirect.html

crypto.randomUUID()는 uuidv4보다 안전성이 높다. 

discord가 계속 실패가 된다. 원인은 창이 닫아져서 실패한다고 한다.

---

https://betterstack.com/community/guides/scaling-nodejs/error-handling-express/#handling-errors-in-asynchronous-code
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords
https://ko.javascript.info/custom-errors
```ts
class AppError extends Error {
  protected status: number;
  
  constructor( status: number, message: string ) {
    super(message);
    this.status = status;
  }
}
```

protected는 strict mode에서 지원되는 것이다.
에러를 처리할 때는 위와 같이 Error를 extends해서 새로운 클래스를 만드는 식으로 작성한다.

---
https://github.com/prisma/prisma/releases/tag/6.7.0
https://www.prisma.io/docs/orm/prisma-schema/overview/location#multi-file-prisma-schema

prisma 폴더에 models를 활용하고 package.json이 위치한 곳에 prisma.config.ts를 주면, part를 붙이지 않아도 되고 merge하지 않아도 된다.

https://github.com/pi0/config-dir
.config를 설정하면 좋다고 한다. 하지만, 지금은 굳이 필요하지 않을 것 같다.

---
typedSQL도 도입되었다고 한다. 5.19.0 하지만, 해당 필드가 존재하지 않는다. 
https://www.reddit.com/r/node/comments/1fhso6x/whats_everyones_opinion_of_prismas_typedsql_update/?tl=ko

---
https://stackoverflow.com/questions/42198973/does-it-need-to-socket-leave-a-room-on-disconnect-in-socket-io
socket은 끊어지면 room에서 leave할 필요는 없다.

---
https://jknt.in/posts/using-db-timestamptz-prisma
Using @db.Timestamptz(0) can lead to unexpected rounding issues