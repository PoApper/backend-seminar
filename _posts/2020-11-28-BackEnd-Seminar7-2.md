---
title: "BackEnd Seminar 7-2"
layout: post
date: 20210511
published: true
---

#### 키워드
- Hello Cookie!
- Cookie + `Express`

<br>

## Hello Cookie!

클라이언트가 서버에 요청을 보낼 때는 한 가지 큰 단점이 있습니다. 바로 누가 **요청을 보내는지 모른다**는 것입니다. 물론 요청을 보내는 IP 주소를 받아올 수는 있습니다. 하지만, 여러 컴퓨터가 공통의 IP 주소를 가지거나, 한 컴퓨터를 여러 사람이 사용할 수도 있습니다.

이런 문제를 해결하는 방법은 `로그인`을 구현하는 것입니다. 이때, 로그인 구현하기 위해선 `Cookie`와 `Session`에 대해 알아야 합니다! 여러분이 웹 사이트에 방문해 로그인 할 때, 내부적으로 쿠키와 세션을 이용해 동작하고 있습니다. 로그인한 이후에 새로고침을 해도 로그아웃 되지 않는 이유도 쿠키와 세션 덕분입니다 ㅎㅎ

<br>

이번에도 생활코딩의 egoing 님의 명강의의 도움을 받겠습니다 ㅎㅎ

러닝 타임은 **30분** 정도입니다!

#### '쿠키'란?

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/i51xW3eh-T4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### 쿠키 생성
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ccsfzUFCyuE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

코드로 정리하면 아래와 같습니다.

``` js
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200, {
    'Set-Cookie': ['yumm_cookie:choco', 'tasty_cookie:strawberry']
  });
  res.end('Cookie!')
});
```

#### 쿠키 조회

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/CfR1H9z-lSI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

코드로 정리하면 아래와 같습니다.

``` js
const http = require('http');
const cookie = require('cookie');
http.createServer((req, res) => {
  let cookies = {};
  if(req.headers.cookie !== undefined)
    cookies = cookie.parse(req.headers.cookie);
  console.log(cookies);
  res.writeHead(200, {
    'Set-Cookie': ['yumm_cookie:choco', 'tasty_cookie:strawberry']
  });
  res.end('Cookie!')
});
```

#### 쿠키 활용
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/HHBOUG3cpQ4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### 세션 쿠키 vs. Permanent 쿠키
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/jIZf-3ItQH8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<hr>

## Cookie + `Express`

자! 이제 `Express`에 Cookie를 도입해봅시다!

#### 서버 뼈대

먼저 바닐라 상태의 Express 서버를 만들어 봅시다.

``` js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  
})

app.listen(8080, () => console.log("Server is listening on 8080 port..."));
```

#### 쿠키 생성

먼저 브라우저에 보낼 쿠키 정보를 작성해봅시다.

``` js
const app = express();

app.get('/', (req, res) => {
  res.cookie('yumm_cookie', 'choco');
  res.send('Cookie : yumm_cookie=choco');
})
```

쿠키가 잘 저장되었는지 확인하기 위해 개발자모드 `F12`의 Network 항목을 확인해줍니다.

#### 쿠키 조회

앞에서 사용한 `cookie` 모듈을 사용해도 request에 담긴 쿠키 정보를 파싱할 수 있습니다. 하지만 이번에는 `Express`에 최적화된 모듈인 `cookie-parser` 모듈을 대신 사용해봅시다!

먼저 `cookie-parser` 모듈을 설치해줍니다. 

``` bash
npm install cookie-parser
```

``` js
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
  console.log(req.cookies)
  res.cookie('yumm_cookie', 'choco');
  res.send('Cookie : yumm_cookie=choco');
})
```

이를 통해 우리가 생성한 쿠키를 조회할 수 있게 되었습니다!!

<hr>

이제 쿠키를 이용해 간단한 어플리케이션을 만들어봅시다!

기능: root URL `/`에 접속했을 때마다 카운트가 올라가도록 하기

``` js
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
  let count;

  if(req.cookies.count){
    count = parseInt(req.cookies.count, 10) + 1;
  }else{
    count = 0;
  }
  res.cookie('count', count);
  res.send(`Cookie : count=${count}`);
})

app.listen(8080, () => console.log("Server is listening on 8080 port..."));
```

이를 통해 사이트에 접속한 유저가 홈 URL을 몇번 방문했는지를 확인할 수 있습니다!!

## 맺음말
쿠키가 갖는 강점은 "HTTP에 상태(state)를 담을 수 있다는 점" 입니다!! 이를 통해 웹사이트를 개인에 맞게 커스텀하거나, 로그인 등의 기능을 제공하는 더 **세련된 서버**를 제작할 수 있습니다 ㅎㅎ

하지만, Cookie는 HTTP header에 그 내용이 그대로 담겨있어 보안적으로 매우 취약합니다! 그래서 실제 서버를 개발할 때는 로그인 정보 같은 중요한 정보는 Cookie에 담지 않습니다!!

다음 세미나에선 Cookie를 발전시켜 보안성을 높인 **세션(Session)**에 대해 다뤄보겠습니다!

<hr>

### 참고자료
- [빨간색코딩/request 모듈](https://sjh836.tistory.com/89)
- [Node.js 교과서(조현영 지음)](http://www.yes24.com/Product/Goods/62597864)
- [[node.js] express - HTTP 쿠키 사용하기](https://jinbroing.tistory.com/158)