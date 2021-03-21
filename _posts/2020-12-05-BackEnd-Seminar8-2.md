---
title: "BackEnd Seminar 8-2"
layout: post
published: false
---

#### 키워드
- Express 미들웨어

<hr>

## 도입말

Express 서버를 구축할 때, 우리는 종종 `app.use()`라는 구문을 사용했습니다. 이 구문은 Express의 **미들웨어**(middleware)를 사용하는 구문입니다!

미들웨어는 ExpressJS의 핵심 컨셉트 중 하나입니다. 이번 세미나에서는 Express 미들웨어에 대해 살펴보겠습니다.

<hr>

### 미들웨어란?

미들웨어는 request와 response 중간에 위치하는 요소입니다. 미들웨어는 request와 response에 담긴 내용을 접근 및 조작하여, 서버의 기능을 풍성하게 만들어줍니다.

<div style="text-align: center;">
  <img src="https://media.vlpt.us/images/hwanieee/post/1dfa6b79-9d7d-4d8d-a0b5-b4717f467a96/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202020-10-02%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%206.29.04.png">
</div>

Express 미들웨어는 `.use()` 함수를 통해 사용할 수 있습니다. 우리가 지금까지 작성한 코드 중 `.use()`를 사용한 부분을 모아보았습니다.

``` js
app.use(express.json()) // req.body를 사용하기 위해 미들웨어 적용
app.use(express.urlencoded()) // form 태그의 body를 사용하기 위해 미들웨어 적용
app.use(cookieParser()) // http header에 답긴 cookie를 파싱하기 위해 적용

// 라우터(router)
const bookRouter = require('./book.js');
app.use("/book", bookRouter);
```

이렇듯 제가 설명은 하지 않았지만, 우리는 이미 미들웨어를 사용하고 있었습니다!

위에서 `app.use()` 구문으로 미들웨어를 사용하는 부분을 모았지만, 잘 생각해보면 사실 `app.get()`, `app.post()` 구문도 미들웨어에 사용한 것입니다!

그래서 `미들웨어는 Express의 전부다.`라고 말하기도 합니다 :)

<hr>

### 미들웨어의 형태

아주 간단한 미들웨어를 작성해보면서 미들웨어에 대한 감을 익혀봅시다.

먼저 뼈대가 될 Express 서버를 아래와 같이 작성합니다.

``` js
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World');
})
app.listen(8080, () => console.log("server run on 8080 port."))
```

이제 `app.use()` 구문으로 미들웨어를 추가해줍시다.

``` js
const app = express()

app.use(function(req, res, next) {
  console.log("Hello middleware!");
  next();
})

app.get('/', (req, res) => {
  res.send('Hello World');
})
```

확인을 위해 루트 경로 `localhost:8080/`로 접속하면, 콘솔 창에 `Hello middleware!`에 출력됨을 확인할 수 있습니다!

`app.get()`으로 url을 등록하지는 않았지만, `locahost:8080/poapper`로 접속해도 콘솔 창에 `Hello middleware!`에 출력됨을 확인할 수 있습니다!

즉, 위의 코드로 우리는 `Hello middleware!`를 출력하는 미들웨어를 작성해 서버에 등록한 것입니다!

<br>

우리가 미들웨어 함수를 작성할 때, 그 함수가 `req`, `res`, `next` 세 가지를 인자로 받았습니다.

``` js
app.use(function(req, res, next) {
  console.log("Hello middleware!");
  next();
})
```

먼저 `req`, `res` 인자를 받는 이유는 미들웨어가 request와 response 사이에 위치해 request/response에 접근하기 때문입니다.

방금 작성한 미들웨어는 `req`, `res`를 직접 사용하지는 않았지만, `app.use(cookieParser())`와 같이 http header에서 cookie를 파싱해주는 미들웨어의 경우 `req` 값에서 cookie 정보를 파싱해 request를 수정합니다.

<div style="text-align: center;">
  <img src="https://media.vlpt.us/images/hwanieee/post/1dfa6b79-9d7d-4d8d-a0b5-b4717f467a96/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202020-10-02%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%206.29.04.png">
</div>

request에서 response로 응답하기까지 여러 개의 미들웨어를 거치게 됩니다. 이때, 미들웨어가 다음 미들웨어를 호출하기 위해 사용하는 것이 `next`입니다. 

`next`는 콜백 인자입니다. 그래서 `next();`의 형태로 사용하며, 다음 미들웨어를 호출합니다.

참고로 다음 미들웨어는 보통 `app.use()`로 등록한 순서를 따릅니다. 예를 들어 아래의 코드에선 `next();`로 `middleware2`를 콘솔 출력하는 미들웨어가 호출됩니다.

``` js
const app = express();

app.use(function(req, res, next) {
  console.log('middleware1');
  next();
});
app.use(function(req, res, next) {
  console.log('middleware2');
  next();
});
```

<br>

참고로 미들웨어를 특정 url에만 실행되도록 디자인할 수도 있는데,

``` js
app.use('/poapper', function(req, res, next) {
  console.log('url-based middleware');
  next();
})
```

와 같이 `/poapper` url에만 작동하는 미들웨어를 만들 수도 있습니다. `app.get()`, `app.post()` 미들웨어와의 차이점은 두 미들웨어는 GET, POST method에만 작동하지만, `app.use()`는 HTTP method에 무관하게 동작하는 것이다.

<hr>

이제 미들웨어의 콘셉트를 알았으니, 미들웨어에 대한 Application을 살펴봅시다!

### 에러 핸들링 미들웨어

미들웨어를 정의할 때, `err`를 포함해 4개 인자로 미들웨어를 정의하면, **<u>에러 핸들링 미들웨어</u>**가 됩니다.

``` js
app.use((err, req, res, next) => {
  console.err(err);
})
```

에러 핸들링 미들웨어는 조금 다른 방식으로 호출하게 됩니다.

```js
// 설계된 url이 아닌 url로 접속하는 경우
app.use((req, res, next) => {
  next(new Error("404 Not found"));
})

app.use((err, req, res, next) => {
  res.send(err);
  console.err(err);
})
```

이런 식으로 에러 핸들링 미들웨어를 호출할 수도 있습니다!

위의 예시에서는 에러 핸들링 미들웨어를 라우팅 처리 맨마지막에 호출하여 허용되지 않은 url로 접근했을 때, `404 Not found`를 호출하게 했습니다.

### 로그인 미들웨어

[세미나8-1](https://bluehorn07.github.io/poapper-backend/2020/12/04/BackEnd-Seminar8-1.html)에서 로그인 기능을 하는 미들웨어를 디자인했습니다.

이때, 로그인에 대한 미들웨어를 작성할 수도 있습니다.

예를 들어 만약 HTTP method 중 모든 `DELETE` 요청은 로그인된 사용자만 가능한 서버를 디자인한다면, 아래와 같이 **<u>로그인 미들웨어</u>**를 등록할 수 있습니다.

``` js
app.delete('*', (req, res, next) => {
  const cookie_id = req.cookies.id;
  const cookie_pw = req.cookies.password;

  if(cookie_id == _id && cookie_pw == _password){
    next();
  }else{
    res.redirect(301, "/");
    // next(new Error("Login Failed!!")); 또는 error를 발생시킬 수도 있습니다.
  }
})
```

<hr>

### 맺음말

'미들웨어'의 콘셉트 자체는 그렇게 어렵지 않습니다. 다만 우리가 처음 접하기 때문에 어렵게 느껴지는 것 뿐입니다. 미들웨어는 Express 곳곳에 있으니 금방 익숙해질 겁니다 :)

"미들웨어" 개념은 Express 뿐만 아니라, 웹개발 전반에서 널리 통용되는 개념입니다. NestJS와 같은 프레임워크에서도 자주 사용하는 개념이 잘 숙지해 세련된 서버를 작성할 수 있기를 바랍니다!! ㅎㅎ

<hr>

### 참고자료
- [node.js의 express로 서버 만들기](https://velog.io/@hwanieee/node.js-%EC%99%80-express)
- [middleware란? 미들웨어 정의, 미들웨어 유형](https://psyhm.tistory.com/8)

