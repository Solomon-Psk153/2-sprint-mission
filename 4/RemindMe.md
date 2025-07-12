# 참고한 사이트와 코드
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