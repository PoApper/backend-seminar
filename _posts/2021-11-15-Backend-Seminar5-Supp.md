---
title: "BackEnd Seminar 5(보충)"
layout: post
---

* 키워드
  * QueryString

<hr>

이전에 데이터베이스에 저장할 값을 request `body`를 이용해 얻는 방법을 배웠습니다. 

하지만 `body` 대신 주소의 인자(QueryString)을 통해 얻는 방법도 존재합니다!

### QueryString

QueryString은 주소에 인자들을 전달하는 일종의 형식입니다. 그 형식은 아래와 같습니다.

![QueryString format](https://images.squarespace-cdn.com/content/v1/5b3db57531d4df55852d3dcd/1536365285207-AUMQ2OQC4WQUDKGQXWVM/ke17ZwdGBToddI8pDm48kFFscMeWnJf1m3t8YqzROmtZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpzEntm8jakF15BaD15nK6PxptFQskNhNA5avJpCeD2IuSINXf6ioyYj_qHw4H6t87c/url+parameter+components.png?format=500w)

- url 주소 뒤에 `?`를 붙여 이어지는 내용이 QueryString 임을 알립니다.
- `key=value`의 형식으로 인자 값을 전달합니다.
- 둘 이상의 인자는 `&`로 구분합니다.

간단하게 생각하면, `JSON` 데이터를 선형으로 만들어 주소에 담아 서버로 전달하는 꼴입니다.

<hr>

Seminar5에서 다룬 `books` 데이터베이스를 QueryString 방식으로 처리해봅시다.

입력 형식은 `localhost:8080?title=value1&author=value2`의 형식으로 줍니다.

이제 QueryString에 담긴 값을 서버에서 파싱해봅시다.

`mysql`을 적용하기 전인 아주 기본적인 형태의 `http` 기반 서버를 준비해주세요.

``` javascript
const http = require('http');

const server = http.createServer((req, res) => {

});
server.listen(8080);
```

`url`과 `querystring` 라이브러리를 활용하겠습니다.

``` javascript
const http = require('http');
const url = require('url')
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const parseURL = url.parse(req.url);
  const queryString = parseURL.query;
  console.log("query string is...")
  console.log(queryString)
  console.log(querystring.parse(queryString))
  res.end();
})
server.listen(8080);
```

이제 `localhost:8080?title=test&author=test`의 주소로 서버에 접속해주세요.

출력 결과를 확인해보면, QueryString이 `JSON`으로 파싱된 것을 확인할 수 있습니다! 이제 이 값을 적절히 사용해 데이터베이스에 저장할 수도 있습니다 ㅎㅎ

QueryString을 사용하는 방식이 request body를 사용하는 방식보다 어떤 장점이 있는지 와닿지 않는 분도 계실 것입니다. 

물론 QueryString은 주소에 담을 수 있는 값이 한정되어 있고, 주소 값에 인자값이 노출된다는 단점이 있습니다.

하지만, 웹주소 체계에서 표준으로 사용되고, request body를 쓸 만큼의 분량이 안 나오는 경우에는 QueryString 방식으로 CRUD를 처리하기도 합니다!

그리고 주소에 인자를 담고 있기 때문에, 주소와 함께 인자를 url로 전달할 수도 있습니다. (request body는 주소와 인자를 함께 전달해줄 수 없습니다 ㅠㅠ)

QueryString이 쓰이는 실제 예를 보고 싶으시다면, [naver](https://www.naver.com/)에 아무 키워드만 검색해서 주소창을 살펴봐도 그때의 검색 주소가 query로 이루어져 있음을 볼 수 있습니다!


