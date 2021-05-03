---
title: "BackEnd Seminar 5"
layout: post
date: 20210503
published: true
---

#### 키워드
- MySQL 기초 명령어
- request `body` 활용하기
- `mysql` 모듈

<hr>

### 도입말
저번 수업을 통해 원시적인 형태의 데이터베이스를 구현하고, 이와 함께 REST API를 익혔습니다.

그러나 서버가 종료되면, 데이터베이스에 저장된 값이 모두 사라진다는 단점이 있었습니다. 이것을 극복하기 위해 서버에 `MySQL` 데이터베이스를 도입할 것입니다. `MySQL`의 간단한 SQL 명령어를 배우고, 우리의 코드에 적용해봅시다! :)

<hr>

### MySQL 기초 명령어

서버에 MySQL을 도입하기 전에, 먼저 MySQL의 명령어인 SQL 명령어를 익혀봅시다!

// 본 포스트에서 MySQL의 기초 명령어를 모두 다루려고 했으나, 제가 글을 작성해보니 글이 마음에 들지 않았습니다 ㅠㅠ.

// 그래서 생활코딩의 egoing 님이 강의하신 MySQL 도입 영상으로 이 부분을 대체하고자 합니다!

[생활코딩/egoing - MySQL](https://opentutorials.org/course/3161/19531)

<br>

대략의 `수업의 정상` 챕터까지 보고 오시면 됩니다! 해당 부분까지 듣는데 1시간 반 정도의 시간이 걸리는 것 같습니다.

MySQL을 빠르게 배우는 것보다, 조금 느리더라도 MySQL과 데이터베이스의 패러다임을 깊고 정확하게 배우는게 더 낫다고 생각합니다 :)

이어지는 MySQL을 서버에 적용하는 부분은 그렇게 어렵진 않습니다. 안심하고 영상을 보고 오시면 될 것 같습니다 :)

<hr>

#### `poapper_backend` 데이터베이스 생성

수업에서 사용할 `poapper_backend` 데이터베이스를 만들어주세요!

``` bash
CREATE DATABASE poapper_backend;
USE poapper_backend;
```

수업에서 사용할 테이블을 생성합니다.

``` bash
CREATE TABLE books(
 id INT(11) NOT NULL AUTO_INCREMENT,
 title VARCHAR(100) NOT NULL,
 author VARCHAR(100) NOT NULL,
 created DATETIME NOT NULL,
 PRIMARY KEY(id)
);

SHOW TABLES;
```

이제 book 테이블에 책 정보를 저장하는 서버를 개발해봅시다!

### `mysql` 모듈
이전에 REST API가 적용된 코드 스켈레톤을 바탕으로 코드를 채워나가겠습니다.

``` javascript
const server = http.createServer((req, res) => {
  const method = req.method;

  if(method == 'POST'){

  }else if(method == 'GET'){

  }else if(method == 'PUT'){

  }else if(method == 'DELETE'){

  }
  res.end();
});
```

#### request `body`

하.지.만. 세부로직을 구현하기 전에 새롭게 도입할 테크닉이 하나 있습니다.

우리가 이전에 구현한 데이터베이스는 `id: value`의 아주 간단한 형태였습니다. 하지만, 이번에 구현할 데이터베이스는 `title`부터 `created`까지 다양한 프로퍼티를 지닙니다. 

POST로 책 하나에 대한 정보를 저장할 때, 이 많은 프로퍼티의 값을 주소로 받는 것은 대단히 비효율적입니다. 

그래서 이번에는 주소가 아니라 http request의 `body`에 책 정보에 대한 json을 실어보낼 생각입니다. 그리고 서버가 http request `body`에 담긴 값을 읽을 수 있도록 디자인 하겠습니다.

<hr>

먼저 아래와 같은 코드를 server 내부에 넣어줍니다.

``` javascript
const server = http.createServer((req, res) => {
  // ... //
  req.on('data', data => {
      console.log(`Data available: ${data}`)
  })
  // ... //
});
```

request의 body를 통해 들어오는 데이터를 읽을 수 있게 하는 코드입니다. 

API Tester를 통해 BODY에 다음과 같은 내용을 담은 `POST` method를 보내줍니다.

```JSON
{
  "title": "The Selfish Gene",
  "author": "Richard Dawkins"
}
```



그리고 출력 결과를 확인해보면, `body`에 넣은 값이 잘 출력되는 것을 확인할 수 있습니다!

<hr>

이제 코드를 조금 수정해줍니다.

``` javascript
const server = http.createServer((req, res) => {
  if(method == 'GET'){
  }else if(method == 'DELETE'){
  }

  req.on('data', data => {
    console.log(`Data available: ${data}`)
    const method = req.method;

    if(method == 'POST'){
    }else if(method == 'PUT'){
    }
    res.end();
  })
})
```

`req.on('data', data => {})`로 얻은 `data` 값은 현재 plain-text 입니다. 이것을 JSON object로 변환해줍시다.

``` javascript
  req.on('data', data => {
    const body = JSON.parse(data);
    console.log(body);
  }
```

출력값을 확인해보면 JSON 형식의 body를 볼 수 있습니다.

자! 이제 우리는 데이터베이스에 입력을 주기 위해 request body를 활용할 수 있습니다!

<hr>

### `mysql` 모듈 (cont'd)

이제 서버에 `MySQL`을 연결해봅시다.

먼저 `mysql` 라이브러리를 임포트 합니다.

``` javascript
const http = require('http');
const mysql = require('mysql');
```

이때, `mysql`은 JS의 기본 라이브러리가 아니기 때문에 `npm`을 이용해 설치해줘야 합니다. 다음의 명령어로 `mysql` 라이브러리를 설치해줍니다.

``` javascript
npm install mysql
```

이제 `MySQL` 서버와 연결할 때 쓸 Connection을 정의하겠습니다.

``` javascript
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'poapper_backend'
});
```

이 `mysql`을 활용해 `MySQL`에 쿼리(query)를 날릴 수 있습니다. 테스트를 위해 `books` 테이블에 저장된 값을 출력해봅시다. 적절한 위치에 아래의 코드를 작성합니다.

``` javascript
// ... //
db.query('SELECT * FROM books ', (err, results) => {
  if(err) throw err;
  console.log(results);
});
// ... //
```

현재는 `books` 테이블에 아무값도 저장하지 않았기 때문에 빈 값이 출력될 것입니다. 

이번에는 `books` 테이블에 테스트 값을 입력해봅시다. 적절한 위치에 아래의 코드를 작성합니다.

``` javascript
// ... //
db.query(`INSERT INTO books (title, author, created) VALUES ('book test', 'tester', NOW())`, (err, results) => {
  if(err) throw err;
});
// ... //
```

<hr>

이제 앞에서 다른 두 내용을 통합해봅시다!

#### POST + req body + mysql
앞에서 DB connection을 테스트할 때, 작성한 코드를 잘 활용하면 쉽게 코드를 작성할 수 있습니다.

``` javascript
  if(method == 'POST'){
    db.query(`INSERT INTO books (title, author, created) VALUES ('${body.title}', '${body.author}', NOW())`, (err, results) => {
      if(err) throw err;
      res.end();
    });
  }
```

#### GET + mysql
마찬가지로 mysql 문을 적절히 구성해 코드를 작성할 수 있습니다.

``` javascript
  if(method == 'GET'){
    const query_id = req.url.split('/')[1];
    if(query_id == ''){
      db.query(`SELECT * FROM books`, (err, results) => {
        if(err) throw err;
        res.write(JSON.stringify(results));
        res.end();
      });
    }else {
      db.query(`SELECT * FROM books WHERE id=${query_id}`, (err, results) => {
        if(err) throw err;
        res.write(JSON.stringify(results));
        res.end();
      });
    }
  }
```

#### PUT + req body + mysql
GET과 POST의 코드를 오류 없이 잘 구성하셨다면, PUT, DELETE 부터는 수월하게 작성하실 수 있을 겁니다 ㅎㅎ

``` javascript
  else if(method == 'PUT'){
    const query_id = req.url.split('/')[1];
    db.query(`UPDATE books SET title='${body.title}', author='${body.author}', created=NOW() WHERE id=${query_id}`, (err, results) => {
      if(err) throw err;
      res.end();
    });
  }
```

#### DELETE + mysql
``` javascript
  else if(method == 'DELETE'){
    const query_id = req.url.split('/')[1];
    db.query(`DELETE FROM books WHERE id=${query_id}`, (err, results) => {
      res.end();
    })
  }
```

<hr>

mysql을 적용한 전체 코드에 대한 링크를 걸어두겠습니다. [링크](https://github.com/BlueHorn07/poapper-backend/blob/master/assets/example/http_server_mysql.js). <br>
도중에 막히면 본인의 코드와 비교해보세요!

<hr>

### 맺음말
축하드립니다! 드디어 `MySQL`을 활용해 데이터베이스 구축한 서버를 만들 수 있게 되었습니다!! 이제는 더이상 서버를 종료시켜도 데이터베이스에 담긴 값이 사라지지 않습니다 ㅎㅎ

우리는 지금까지 `http` 라이브러리로 서버를 구성하였습니다. 그리고 `if-else`문으로 REST API를 구현했습니다. 하지만, `http` 라이브러리만으론 서버를 섬세하게 제어하고, 더 다양한 기능을 추가하는 데에 한계가 있습니다. 

그래서 다음 시간에는 `http`를 대체할 수 있는 `express`라는 라이브러리를 활용해보고자 합니다! 아직은 어떤 점이 불편한지 잘 와닿지 않으시겠지만, `express`를 도입해보면 `http`에서의 불편한 부분들이 보이기 시작하실 겁니다 ㅎㅎ

[ExpressJS](https://expressjs.com/)

<hr>

#### 참고자료
- [Get HTTP request body data using Node.js](https://nodejs.dev/learn/get-http-request-body-data-using-nodejs)
- [Node.js로 웹서버 구축하기 - Mysql 연결](https://esaek.tistory.com/9)
- [생활코딩: Node.js-MySQL로 홈페이지 만들기](https://opentutorials.org/course/3347)
