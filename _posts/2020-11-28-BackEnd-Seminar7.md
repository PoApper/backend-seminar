---
title: "BackEnd Seminar 7-1"
layout: post
date: 20211204
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

#### 쿠키 옵션

여기에 쿠키 옵션을 주면 쿠키를 좀 더 다채롭게 사용할 수 있습니다!

쿠키 옵션은 아래와 같이 res.cookie함수의 3번째 인자에 원하는 쿠키 옵션을 넣어주면
사용할 수 있습니다.

``` js
   res.cookie('count', count, {httpOnly: true, maxAge: 10000, signed: true}});
```

쿠키 옵션 종류

 - maxAge : 쿠키의 수명을 밀리초 단위로 지정
 - expires : 만료 시기를 GMT 표준 시간으로 정한다.
 - path : 해당 디렉토리와 하위 디렉토리에서만 활성화 되고, 웹 브라우저는 해당하는 쿠키만 웹 서버로 전송한다.
 - secure : 웹브라우저와 웹서버가 https로 통신하는 경우만 웹브라우저가 쿠키를 서버로 전송한다.
 - httpOnly : 웹 서버를 통해서만 쿠키에 접근할 수 있다.
 - signed : 쿠키를 암호화 시킨다. 암호화의 기준은 cookieParser에 들어가는 문자열이 된다.

옵션을 사용하여 위에서 구현한 코드에 10초마다 방문 횟수가 초기화 되도록 하고, 방문한 횟수를 클라이언트에서 알 수 없도록 해봅시다!

``` js
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser("asdf"));        
const cookieConfig = { httpOnly: true, maxAge: 10000, signed: true };   
app.get('/', (req, res) => {
  let count;                           
  if(req.signedCookies.count){      
    count = parseInt(req.signedCookies.count, 10) + 1;    
  }else{
    count = 0;                      
  }
  res.cookie('count', count, cookieConfig);
  res.send(`Cookie : count=${count}`);
})

app.listen(8080, () => console.log("Server is listening on 8080 port..."));
```

위 코드를 실행해보면, 10초마다 쿠키가 사라져서 0으로 초기화 되는 것을 볼 수 있습니다!

또한 chrome의 개발자 도구를 실행시켜 쿠키를 확인해 보면 쿠키가 암호화 되어 있는 것을 볼 수 있습니다!

<hr>

### 쿠키로 로그인 기능 구현

이제 Cookie를 바탕으로 로그인 기능을 구현해 봅시다! 

처음 홈페이지에 접속했을 때, 로그인 페이지가 등장하며 로그인에 성공했을 경우에만 페이지에 접근할 수 있도록 합니다.

이때 디렉토리 구성은 다음과 같습니다.

```
/login
│  express_login.js
└─view
    index.html
    secret_file.html
```

[^1]

위의 구조를 따라 파일들을 하나씩 작성하면서 로그인 기능을 구현해봅시다!

#### 루트 페이지 작성

먼저 루트(root) 페이지부터 작성해봅시다. `localhost:8080`로 접속했을 때, 화면에 출력할 페이지입니다. `index.html` 이름으로 파일을 작성합니다.

``` html
<!DOCTYPE html>
<html>
<head>
  <title>Home</title>
</head>
<body>
  <h1> Home </h1>
  <h3>Login</h3>
  <form>
    <p>id: <input type="text" name="id" value="아이디 입력"> </p>
    <p>pw: <input type="password" name="password"> </p>
    <p><input type="submit" value="로그인"></p>
  </form>
</body>
</html>
```

아직 로직을 완전히 작성한 것은 아니고, 로그인 페이지의 뼈대만 잡은 상황입니다.

#### 서버 뼈대

이제 Express 서버의 뼈대를 아래와 같이 작성합니다. 파일 이름은 `express_login.js`로 작성합니다.

``` js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  
})

app.listen(8080, () => console.log("Server is listening on 8080 port..."));
```

#### 루트 페이지 라우팅

`localhost:8080`에 접속했을 때, 루트 페이지를 출력할 수 있도록 라우팅 해줍시다.

[세미나3](https://bluehorn07.github.io/poapper-backend/2020/10/31/BackEnd-Seminar3.html)에서 진행했던 라우팅을 Express 서버에서도 진행할 수 있습니다.

`res.sendFile()` 함수를 활용합니다.

``` js
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/view/index.html")
})
```

이때, `__dirname`은 현재 실행 중인 node 파일의 경로를 반환하는 일종의 매크로 입니다.

`localhost:8080`에 접속해 루트 페이지에 잘 접근하는지 확인합니다.

#### 쿠키 발행

이제 쿠키를 발행하는 로직을 작성해봅시다.

`localhost:8080/login`에 접속해 쿠키를 발행하도록 합니다.

``` js
app.get('/login', (req, res) => {
  res.cookie('id', 'yourId');
  res.cookie('password', 'yourPassword');
})
```

우리는 기능 구현의 편의를 위해 로그인에 필요한 ID와 password를 상수값을 제한하겠습니다. 세미나에서는 아래의 ID와 password를 사용하도록 하겠습니다.

``` js
const _id = 'poapper';
const _password = '1986' // 포항공대 개교 기념일입니다 :)
```

이제 앞에서 작성한 쿠키 발행 로직으로 설정한 ID, password로 발급하도록 수정합니다.

``` js
app.get('/login', (req, res) => {
  res.cookie('id', _id);
  res.cookie('password', _password);
  res.end();
})
```

이후 `locahost:8080/login`으로 접속 및 개발자도구 `F12`를 통해 쿠키가 잘 발급되었는지 확인합니다.

#### 로그인 로직

이제 실제 로그인 로직을 작성해봅시다.

`index.html`에서 `<form>` 태그 부분을 수정하겠습니다.

``` html
  <form action="/login" method="POST">
    <p>id: <input type="text" name="id" value="아이디 입력"> </p>
    <p>pw: <input type="password" name="password"> </p>
    <p><input type="submit" value="로그인"></p>
  </form>
```

`로그인` 버튼을 눌렀을 때, `<input>`에 작성한 데이터를 어떤 URL로 전송할지 `action`과 `method`를 통해 명시해주었습니다!

<br>

이제 서버의 로직을 수정해봅시다. `<form>`에 입력한 id, password 값이 `poapper`, `1986`일 때에만 쿠키를 발급하도록 합니다.

POST 방식에서 body에 담긴 값은 `app.use(express.json())`과 `req.body`를 통해 얻을 수 있습니다; [세미나6](http://localhost:4000/2020/11/21/BackEnd-Seminar6.html) 참고

이때, `<form>` 태그로 `POST`를 수행하기 위해 `app.use(express.urlencoded())`도 함께 사용합니다.

``` js
const app = express();
app.use(express.json())
app.use(express.urlencoded())

app.post('/login', (req, res) => {
  const body = req.body;
  const query_id = body.id;
  const query_pw = body.password

  // 입력한 id와 pw가 동일해서 쿠키 발급
  if(query_id == _id && query_pw == _password){
    console.log("Login success")
    res.cookie('id', _id);
    res.cookie('password', _password);
  }else {
    console.log("Login failed...")
  }
  res.end();
})
```

이제 개발자도구를 이용해 쿠키가 잘 발급 되었는지 확인해봅니다.

#### 리다이렉션 설정; redirection

지금은 login 이후에 `localhost:8080/login`에 머물러 있습니다. 하지만, 보통은 로그인 완료 후에 로그인 화면에 그대로 있는 것이 아니라 루트 페이지로 돌아가는 형태로 동작합니다. 

이렇게 접속한 url을 바꿔주는 작업을 **<u>redirection</u>**이라고 합니다.

Express에서는 `res.redirect()` 함수로 redirection을 수행할 수 있습니다.

우리는 `localhost:8080/login`에 접속 후, 다시 루트 페이지 `localhost:8080/`로 돌아가도록 디자인하겠습니다.

``` js
app.post('/login', (req, res) => {
  const body = req.body;
  const query_id = body.id;
  const query_pw = body.password

  // 입력한 id와 pw가 동일해서 쿠키 발급
  if(query_id == _id && query_pw == _password){
    console.log("Login success")
    res.cookie('id', _id);
    res.cookie('password', _password);
  }else {
    console.log("Login failed...")
  }
  res.redirect(301, "/"); // res.end()를 res.redirect()로 대체
})
```

#### 쿠키 파싱
이제 로그인 성공 이후, 쿠키가 잘 발급되어 유지되는지 확인하기 위해 쿠키를 파싱하는 로직을 작성해봅시다. [세미나7-2](https://bluehorn07.github.io/poapper-backend/2020/11/28/BackEnd-Seminar7-2.html)에서 사용한 `cookie-parser`를 활용합니다.

``` js
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log(req.cookies)
  res.sendFile(__dirname + "/view/index.html")
})
```

콘솔 창을 확인해 cookie가 잘 발급되었는지 확인해줍니다!

<hr>

이것으로 쿠키를 바탕으로 로그인 기능을 구현 완료하였습니다!! 이 로그인 기능을 활용해 페이지에 접근하는 것을 제어해봅시다.

#### 페이지 접근 제어

접근할 페이지를 만들기 위해 `secret_file.html` 이름으로 `html` 파일을 작성합니다.

``` html
<!DOCTYPE html>
<head>
  <title>content</title>
</head>
<body>
  <h3>Content</h3>
  <p>이 문서는 로그인 한 사용자에게만 공개됩니다.</p>
</body>
</html>
```

이제 서버에 라우팅을 추가합니다.

``` js
app.get('/secret', (req, res) => {
  res.sendFile(__dirname + "/view/secret_file.html")
})
```

로그인한 사용자가 `/secrete`로 접속할 경우, html의 내용을 볼 수 있도록 로직을 디자인합니다.

``` js
app.get('/secret', (req, res) => {
  const cookie_id = req.cookies.id;
  const cookie_pw = req.cookies.password;

  if(cookie_id == _id && cookie_pw == _password){
    res.sendFile(__dirname + "/view/secret_file.html")
  }else{
    res.redirect(301, "/");
  }
})
```

이를 통해 로그인한 사용자만 특정 경로에 접근해 html 파일을 확인할 수 있도록 제어하는 기능을 구현하였습니다!

전체 코드는 [이곳](https://github.com/BlueHorn07/poapper-backend/blob/master/assets/example/login.zip)에서 확인하실 수 있습니다!


## 맺음말
쿠키가 갖는 강점은 "HTTP에 상태(state)를 담을 수 있다는 점" 입니다!! 이를 통해 웹사이트를 개인에 맞게 커스텀하거나, 로그인 등의 기능을 제공하는 더 **세련된 서버**를 제작할 수 있습니다 ㅎㅎ

하지만, Cookie는 HTTP header에 그 내용이 그대로 담겨있어 보안적으로 매우 취약합니다! 그래서 실제 서버를 개발할 때는 로그인 정보 같은 중요한 정보는 Cookie에 담지 않습니다!!

다음 장에선 Cookie를 발전시켜 보안성을 높인 **세션(Session)**에 대해 다뤄보겠습니다!

<hr>

### 참고자료
- [빨간색코딩/request 모듈](https://sjh836.tistory.com/89)
- [Node.js 교과서(조현영 지음)](http://www.yes24.com/Product/Goods/62597864)
- [[node.js] express - HTTP 쿠키 사용하기](https://jinbroing.tistory.com/158)