---
title: "BackEnd Seminar 3-1"
layout: post
date: 20210412
published: false
---

#### 키워드
- async/await

<hr>

## async/await

`async/await`은 기존의 비동기 처리 방식인 Callback함수와 Promise의 단점을 보완하기 위한 방식입니다. async/await의 구현은 매우 간단합니다. 다음과 같이 비동기 처리를 하고자 하는 함수의 앞에 async 키워드를 써 주고, 기다려야 하는 Promise 앞에 await 키워드를 적어줍니다.
```javascript
async function f() {
    var result = await new Promise((resolve, result) => {
        setTimeout(resolve("fulfilled!!"), 2000);
    })
    console.log(result);        // fulfilled!
}
```
await은 반드시 **async 키워드가 붙은 함수 내부**에서만 사용할 수 있습니다.

<br>

### async/await의 예외 처리
async/await의 경우 try-catch문을 이용하여 예외 처리를 할 수 있습니다.
```javascript
async function f() {
    try {
        var result = await new Promise((resolve, result) => {
            setTimeout(resolve("fulfilled!"), 2000);
        })
        console.log(result);
    } catch(err) {
        console.log(err);
    }
}
```

<hr>

#### 참고자료
- [async와 await](https://ko.javascript.info/async-await)

<hr>