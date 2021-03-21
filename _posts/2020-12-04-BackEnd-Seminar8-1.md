---
title: "BackEnd Seminar 8-1"
layout: post
published: false
---

수업 영상 링크: [link](https://drive.google.com/file/d/1Ytk_-ejt61oTLePUXxT1pXAY5pJ_Jmc1/view?usp=sharing) <br>

#### 키워드
- 로그인으로 페이지 접근 제어

<hr>

## 도입말

저번 세미나를 통해 Cookie를 생성하고 조회하는 방법을 익혔습니다. 이번 세미나에서는 Cookie로 **<u>로그인</u>**을 구현하고, 활용하는 방법들을 소개합니다!

<hr>

## 로그인으로 페이지 접근 제어

Cookie를 바탕으로 로그인 페이지를 작성합니다. 

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

<hr>

## 맺음말

이것으로 쿠키를 활용해 로그인 기능을 구현할 수 있었습니다. 하지만, 인증을 구현할 때 쿠키는 웹보안 측면에서 좋은 접근은 아닙니다. 다음 시간에는 **세션(session)**에 대해 알아보겠습니다!

<hr>

[^1]: 참고로 `tree 폴더이름` 명령어로 폴더의 트리 구조를 그릴 수 있습니다. `tree /f 폴더이름`을 쓰면 파일도 포함하여 트리 구조를 그립니다.