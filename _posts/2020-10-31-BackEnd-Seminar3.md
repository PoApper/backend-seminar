---
title: "BackEnd Seminar 3"
layout: post
published: false
---

수업 영상 링크: [link](https://drive.google.com/file/d/1qBr6WAbIk7RVTSK13s7uDA_pT8YuCqm0/view?usp=sharing)


이제부터 Node.js를 통해 본격적으로 서버를 만들게 됩니다!!

#### 키워드
- Request-Response
- HTTP
- `http` 모듈로 웹서버 만들기
- 라우팅(routing)

<hr>

### Request-Response 
<div style="text-align: center; margin: 5px;">
<img src="https://t1.daumcdn.net/cfile/tistory/21282E3B554A0A1B2C"  style="width: 80%;">
</div>

서버와 프론트는 Request-Response를 통해 서로 통신하며 데이터를 주고 받습니다. Request<small>(요청)</small>와 Response<small>(응답)</small>를 주고받는 대상들을 클라이언트<small>Client</small>와 서버<small>Server</small>라고도 부릅니다. Client는 Server에 Request를 보내고, Server는 Client에 적절한 Response를 응답합니다.

위의 그림의 네모 박스엔 여러 내용이 담겨있습니다. 이 내용들은 모두 HTTP라는 형식을 따릅니다. HTTP에 대해 살펴보겠습니다.

### HTTP
HTTP<small>HyperText Transfer Protocol</small>는 인터넷에서 데이터를 주고받는데에 사용하는 **프로토콜**입니다. 프로토콜<small>protocol</small>은 '규칙' 이나 '형식' 정도로 이해하시면 됩니다.

웹 프론트와 서버는 HTTP를 사용해 서로 통신합니다. 이것은 데이터의 형식(format)이 HTTP 규칙을 따른다는 말입니다.

HTTP에 'HyperText'라는 표현이 있지만 HyperText 뿐만 아니라 이미지, 동영상, 오디오, 텍스트 문서 등 다양한 데이터를 HTTP를 통해 전송할 수 있습니다.

Server와 Client는 HTTP의 HTTP request, HTTP response 형식에 따라 데이터를 주고 받습니다.

HTTP는 웹개발에서 아주 중요한 개념입니다. HTTP에 대한 더 많은 특징이 있지만, 지금은 이정도만 알아도 다음 내용을 진행하는데에 충분합니다 :)

<hr>

#### Before we start
서버를 개발하기 위해선 많은 웹개발 지식이 필요합니다. 하지만, 세미나 시간과 강사의 자원이 한정되어 있어서 모든 웹개발 지식을 다루기는 불가능합니다 ㅠㅠ

수업 내용 중에 **포트(port)**가 등장합니다. 포트는 웹개발의 기본 of 기본이기에 혹시 포트(port)를 처음 접하고 생소하신 분은 생활코딩의 egoing님이 만드는 아래의 강의를 참고해주세요!!

[생활코딩 - 포트(port)](https://opentutorials.org/course/3265/20037)

위 링크는 네트워크의 기초 지식을 다루는 묶음 강좌의 일부분입니다. egoing 님이 아주 쉽게 설명을 해주시고, 내용도 어렵지 않기 때문에 시간이 되는 분은 강좌의 전체 영상을 보기를 추천합니다!

<hr>

### `http` 모듈로 웹서버 만들기

`http` 모듈을 통해 서버를 만들 수 있습니다. `http_server.js` 이름의 JS 파일을 만들고, 아래의 코드를 작성해 실행해봅시다.

``` javascript
const http = require('http')

http.createServer((req, res) => {
  res.write('<h1>Hello Node!</h1>');
  res.write('<p>Hello Server!</p>');
  res.end()
}).listen(8080, () => {
  console.log("server is running on 8080 port.")
})
```

`node`로 실행 후, `localhost:8080`에 접속하시면 여러분의 첫 서버가 동작하는 것을 확인할 수 있습니다!!

코드의 내용을 간단히 설명하면, 

`http.createServer()`는 서버 객체를 만들어줍니다. 이 객체는 일종의 비동기 함수로 클라이언트로부터 요청(request)이 들어올 때마다 미리 지정한 콜백 함수를 실행합니다.

`res.write()`는 서버가 반환할 response에 들어갈 내용을 적는 것입니다. 위 코드에선 간단한 HTML을 response에 적어주었습니다.

`res.end()`는 response를 끝맺는 역할을 합니다. 우리가 File I/O에서 파일 사용 후, 할당 해제 해주는 것처럼 response도 사용이 있다면 `res.end()`를 통해 끝을 명시해줘야 합니다. (한번 `res.end()`를 주석처리하고 코드를 실행해보세요!)

`.listen()`은 우리가 만든 서버를 클라이언트에게 공개할 포트 번호와 포트 연결에 성공했을 때[^1]의 콜백 함수를 넣어줬습니다.

<hr>

이제 위 코드를 조금 다듬어 보겠습니다.

먼저 `.listen()`을 분리해봅시다.

``` javascript
const http = require('http')

const server = http.createServer((req, res) => {
  res.write('<h1>Hello Node!</h1>');
  res.write('<p>Hello Server!</p>');
  res.end()
})

server.listen(8080)

server.on('listening', () => {
  console.log("server is running on 8080 port.")
})
```

`http.createServer()`가 만드는 서버 객체를 `server` 변수에 저장하였습니다.

이후 `server` 변수에 `listen(8080)`을 통해 포트를 지정해줍니다.

위 코드에서는 `.listen()`에 콜백 함수를 넣는 대신 `listening` 이벤트에 대한 이벤트 리스너를 추가하였습니다.[^2]

``` javascript
server.on('listening', () => {
  console.log("server is running on 8080 port.")
})

server.on('error', (error) => {
  console.log(error)
})
```

에러에 대한 이벤트 리스너도 추가해줍시다.

<hr>

드디어 웹 서버를 만들었습니다!

하지만, 지금 우리의 서버는 `Hello Node`의 간단한 내용 만을 응답으로 처리하고 있습니다. 그리고 내용이 길어진다면 `res.write()`에 모든 내용을 적기 힘들어집니다.

그래서 서버가 응답할 내용을 HTML 파일로 분리해봅시다! `home.html`라는 이름으로 간단한 HTML 파일을 만들어봅시다.

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Node.js 웹 서버</title>
  </head>
  <body>
    <h1>Hello Node!</h1>
    <p>Hello Server!</p>
  </body>
</html>
```

이제 작성한 html 파일을 활용해봅시다! `server`를 다음과 같이 변경합니다.

``` javascript
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.readFile('./home.html', (err, data) => {
    if(err) throw err
    res.write(data)
    res.end()
  });
});
```

<hr>

### 라우팅(routing)

지금 우리의 서버는 하나의 html 문서만 보여주고 있습니다. 하지만, 일반적인 사이트는 다양한 html 문서를 서로 다른 url 경로(route)를 통해 제공합니다.

이렇게 서버가 url에 따라 다른 정보를 보여주는 것을 **라우팅(routing)**이라고 합니다.

먼저 서버가 제공할 여러 페이지를 만듭시다!

* `about.html`

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My Profile</title>
  </head>
  <body>
    <h1>About Me</h1>
    <p>My name is [user name]. I'm a junior developer.</p>
  </body>
</html>
```

* `textbook.json`

json 파일도 응답해줄 수 있습니다. HW2에서 만든 `textbook.json`을 서버가 위치한 디렉토리로 옮겨주세요.

<br>

이제 js 코드를 수정해봅시다. `server` 변수를 아래와 같이 변경합니다.

``` javascript
const server = http.createServer((req, res) => {
  console.log(req.url)
  if(req.url == '/') {
    fs.readFile('./home.html', (err, data) => {
      if(err) throw err
      res.write(data)
      res.end()
    });
  }else if(req.url == '/about'){
    fs.readFile('./about.html', (err, data) => {
      if(err) throw err
      res.write(data)
      res.end()
    });
  }else if(req.url == '/textbook'){
    fs.readFile('./textbook.json', (err, data) => {
      if(err) throw err
      res.write(data)
      res.end()
    });
  }
});
```

클라이언트가 보내는 요청인 `req`에는 요청한 url 정보가 `req.url`에 담겨 있습니다. 이를 *if-else* 문으로 처리하면 간단하게 라우팅을 구현할 수 있습니다!

이제 서버를 다시 실행하고, `localhost:8080/about`, `localhost:8080/textbook`으로 접속하면 url에 따라 다른 정보를 얻을 수 있습니다!

<hr>

#### 참고자료
- [Node.js 교과서(조현영 지음)](http://www.yes24.com/Product/Goods/62597864)

<hr>

[^1]: 설정한 포트가 이미 사용 중이거나 도중에 에러가 나면, 포트 연결에 실패할 수도 있습니다. 테스트를 위해 동일한 코드 파일을 다른 터미널을 이용해 실행해봅시다. <br> (터미널1에서 `node http_server.js` 실행, 터미널1을 그대로 두고 새로운 터미널을 실행시켜 터미널2에서 `node http_server.js` 실행)

[^2]: 함수형 프로그래밍과 함께 웹개발의 중요한 패러다임은 이벤트 기반 프로그래밍(Event-driven programming)입니다. 간단하게 설명하면 마우스 클릭과 같은 사건이 발생하면, 어플리케이션이 특정 행동을 수행하게 하는 디자인 패턴입니다. 위에서는 `listening`이라는 서버가 클라이언트로부터 요청을 받는 사건이 발생할 때, 내부의 콜백함수가 실행하도록 하였습니다.

