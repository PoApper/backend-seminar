---
title: "BackEnd Seminar 7-1"
layout: post
published: false
---

#### 키워드
- API 서버에서 값 가져오기; `request`

<br>

## 도입말

이전 강의를 통해 `http`로 구현한 서버를 `express` 서버로 리뉴얼 할 수 있었습니다. 이번에는 지금까지 작성한 서버를 프론트와 연동하는 방법에 대해 다루도록 하겠습니다.

그럼 시작합시다!

<hr>

## API 서버에서 값 가져오기; `request`

p.s. 해커톤을 진행하면서 백엔드와 프론트엔드 연동에 대한 질문이 많이 들어와 이 부분을 다루게 되었습니다!

이전까지는 크롬 브라우저와 API Tester를 이용해 서버에 request를 보내고, response 값을 확인했습니다. 이번에는 `nodejs` 코드를 이용해 서버 API에 접속하여 값을 받아오는 방법을 알아봅시다.

<br>

#### 1. API 서버 실행

먼저 이전에 작성한 Book 서버를 실행해줍니다.

``` bash
node book_express
```

기존 API Tester를 이용해 Book 서버가 잘 동작하는지 간단히 테스트 해봅니다.

#### 2. request 모듈 설치

`request` 모듈을 사용해 API 서버에 접속하는 코드를 작성해봅시다!

먼저 `request.js` 이름의 파일을 생성합니다.

그리고 `npm install request`를 통해서 `request` 모듈을 설치해줍니다.

#### 3. 코드 작성

이제 `request`를 이용한 간단한 코드를 작성해봅시다!

먼저 API 서버의 `GET /book`으로 접속해봅시다.

``` js
const request = require("request");

request({
  url: "http://localhost:8080/book",
  method: "GET",
  },
  function (err, res, body) {
    console.log(body)
  }
);
```

이렇게 API 서버에 저장된 값을 `request` 모듈을 이용해 손쉽게 불러올 수 있습니다!!

이후에 `body` 담긴 값을 잘 파싱해 저장하거나 가공하여, 다른 기능을 수행하는 입력값으로 쓸 수도 있습니다 :)

<hr>

이번에는 POST를 실행해봅시다!

``` js
request({
  url: "http://localhost:8080/book",
  method: "POST",
  body: {
   title: "request test",
   author: "me"
  },
  json: true
  },
  function (err, res, body) {
    if(err) throw err
    console.log(body)
  }
);
```

이후에 `GET`으로 잘 저장되었는지 확인해줍니다!

<hr>

`request` 모듈은 주로 React와 같은 프론트엔드에서 사용하는 모듈입니다. 

또는 다른 API 서버에서 값을 얻어올 때도 `request` 모듈을 사용할 수 있습니다!

예를 들어 [reqres.in](https://reqres.in/)에서 제공하는 예시 API를 활용해보면,

``` js
request({
  url: "https://reqres.in/api/users/2",
  method: "GET",
  },
  function (err, res, body) {
    if(err) throw err
    console.log(body)
  }
);
```

위와 같이 본인이 개발한 서버가 아닌 다른 사람의 서버에서 정보를 얻어 그것을 가공해볼 수도 있습니다 ㅎㅎ

<hr>

### 참고자료
- [빨간색코딩/request 모듈](https://sjh836.tistory.com/89)