---
title: "BackEnd Seminar 6-1"
layout: post
date: 20211119
published: true
---

#### 키워드
- Express란?
- "Hello Express!"
- `Express` + CRUD
- `Express` + 라우팅

<hr>

### 도입말
이전의 강의를 통해 `MySQL` 데이터베이스를 사용하는 서버를 만들 수 있었습니다! 하지만 `http` 모듈을 통해 만든 서버는, 서버가 거대해지고 처리할 URL과 구현할 기능들이 많아지게 되면 코드가 점점 더 복잡해지고, 코드 가독성이 떨어지게 됩니다. 

`express` 라이브러리는 `if-else` 처리하던 많은 것들을 함수로 처리할 수 있게 만들어 줍니다.

예를 들어, `GET`, `POST` method를 처리할 때 이전에는

``` js
const method = url.method
if(method == "GET"){ }
else if(method == "POST"){ }
```

였다면, `express` 라이브러리를 도입하게 되면,

``` js
app.get("/", (req, res) => {})
app.post("/", (req, res) => {})
```

의 방식으로 처리해줍니다.

지금 당장은 `http`에서 `express`로의 전환이 번거롭게 느껴질 수도 있습니다. 하지만, `express`는 [NestJS](https://nestjs.com/) 프레임워크나 등 다양한 프레임워크의 기반이 되는 라이브러리입니다. 그래서 숙련 개발자가 되기 위해서는 `express`를 익혀둘 필요가 있습니다!!

자! 이제 `express`로 서버를 만들어 봅시다!

<hr>

### Express란?

`Express`에 대해 잘 설명하는 동영상이 있어, `Express`에 대한 개념은 생활코딩의 egoing 님의 영상으로 대체합니다.

[생활코딩/egoing - Express](https://opentutorials.org/course/3370)

egoing 님의 `express` 강좌도 매우 좋으니, 세미나와 병행해서 듣는 것도 추천드립니다 ㅎㅎ

<hr>

#### `express` 설치
js 코드에 `express` 라이브러리를 사용하기 위해 `npm`을 이용해 `express` 라이브러리르 설치합니다. 아래 코드를 이용해 설치를 진행합니다.

``` bash
npm install express
```

<hr>

#### "Hello Express!"
먼저 `express` 라이브러리로 아주 간단한 서버를 만들어 봅시다.

`Hello World!`를 출력하는 서버를 만듭니다.

``` js
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World');
})
app.listen(8080, () => console.log("server run on 8080 port."))
```

`http`로 만든 서버와 비교도 해봅시다.

``` js
const http = require('http');

const app = http.createServer((req, res) => {
  res.write('Hello World!');
  res.end();
})
app.listen(8080, () => console.log("server run on 8080 port."))
```

<hr>

### `express` + CRUD 

지난 세미나에서 구현한 전공책 CRUD를 진행하는 서버를 `express`를 통해 그대로 구현해봅시다!

#### 베이스 코드
먼저 `express`를 기반으로 아는 아래의 코드를 작성합니다.

``` js
const express = require('express')
const mysql = require('mysql')
const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'poapper_backend'
});

const app = express();
app.get("/", (req, res) => {
  res.send("Hello Express!");
})

app.listen(8080, () => Console.log("Server is listening on 8080 port..."));
```

#### `GET`

`express`는 `.get()` 함수를 통해 `GET` method 간단하게 처리할 수 있습니다.

먼저 table에 저장된 전체 값을 반환하는 기능을 구현해봅시다.
``` js
// ... //
const app = express();

// GET
app.get("/book", (req, res) => {
  db.query(`SELECT * FROM books`, (err, data) => {
    if(err) throw err;
    res.write(JSON.stringify(data));
    res.end();
  });
});
```

<br>

이제 `GET localhost:8080/book/id`를 통해 실행되는 `GET` 기능을 처리해봅시다.

`http`에서는 `req.url.split('/')`를 통해 url 파싱을 통해 `id` 값을 얻었다면, `express`에서는 정말 간단하게 `id` 값을 얻을 수 있습니다!!

먼저 아래와 같이 코드를 작성합니다.

``` js
app.get("/book/:id", (req, res) => {
  const query_id = req.params.id;
  res.send(query_id);
})
```

`/book/:id`에서 `id`는 파라미터 값으로, 앞의 `book`과 달리 정해진 값이 아닙니다! 이것을 parameter라고 하는데, express에선 이것을 `req.params`를 통해 얻을 수 있습니다.

`id`에 대한 parameter를 얻고 싶다면, `req.params.id`를 통해 url에 담긴 `id` 값을 얻을 수 있습니다.

이제 이 값을 활용해 코드를 완성해봅시다.

``` js
app.get("/book/:id", (req, res) => {
  const query_id = req.params.id;
  db.query(`SELECT * FROM books WHERE id=${query_id}`, (err, data) => {
    if(err) throw err;
    res.write(JSON.stringify(data));
    res.end();
  });
})
```

<hr>

#### `POST`
express를 쓰면 request body를 간단하게 얻을 수 있습니다!!

``` js
//...//
const app = express();
app.use(express.json())
//...//
app.post("/book", (req, res) => {
  const body = req.body;
  console.log(body);
})
```

`app`에 `app.use(express.json())` 구문을 추가해주어, request body에 `req.body`로 접근할 수 있도록 변환해줍니다.

이제 `POST`에 대한 전체 로직을 구성해보면

``` js
//...//
const app = express();
app.use(express.json())
//...//
app.post("/book", (req, res) => {
  const body = req.body;
  db.query(`INSERT INTO books (title, author, created) VALUES ('${body.title}', '${body.author}', NOW())`, (err, results) => {
        if(err) throw err;
        res.end();
      });
});
```

<hr>

이후의 `PUT`, `DELETE` method는 매우 쉽게 구현할 수 있습니다.

#### `PUT`

``` js
app.put("/book/:id", (req, res) => {
  const body = req.body;
  const query_id = req.params.id;
  db.query(`UPDATE books SET title='${body.title}', author='${body.author}', created=NOW() WHERE id=${query_id}`, (err, data) => {
    if(err) throw err;
    res.end();
  });
})
```

#### `DELETE`

``` js
app.delete("/book/:id", (req, res) => {
  const query_id = req.params.id;
  db.query(`DELETE FROM books WHERE id=${query_id}`, (err, data) => {
    if(err) throw err;
    res.end();
  })
})
```

<hr>

전체 코드는 [이곳](https://github.com/BlueHorn07/poapper-backend/blob/master/assets/example/book_express.js)에서 확인할 수 있습니다.

<br>

<hr>

### `Express` + 라우팅

지금의 서버는 `localhost:8080/book` URL로 접속했을 때, 책(book)에 대한 데이터를 제공하고 있습니다. 그리고 서버는 하나의 `js` 파일에서 작성되어 있습니다. 

만약 서버가 `localhost:8080/book` 뿐만 아니라 `localhost:8080/food`, `localhost:8080/student` 등 다양한 데이터를 제공해야 하는 상황이라면, 우리는 하나의 `js` 파일에 수백줄의 코드를 담게 담게 됩니다.

이런 상황을 해결하기 위해 라우팅을 도입하여, 서버의 코드를 두 개의 `js` 파일로 분리하도록 하겠습니다!

<hr>

먼저 책(book)에 대한 CRUD를 진행하는 코드를 분리합니다.

`book.js` 이름으로 파일을 만든 후에 book CRUD에 대한 코드를 모두 `book.js`로 옮겨줍니다.

``` js
// GET whole table
app.get("/book", (req, res) => {
  db.query(`SELECT * FROM books`, (err, data) => {
    if(err) throw err;
    res.write(JSON.stringify(data));
    res.end();
  });
});
//...//
```

이제 코드를 다음과 같이 변경해줍니다.

``` js
const express = require('express')
const mysql = require('mysql')

const router = express.Router();

const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'poapper_backend'
});

// GET whole table
router.get("/book", (req, res) => {
  db.query(`SELECT * FROM books`, (err, data) => {
    if(err) throw err;
    res.write(JSON.stringify(data));
    res.end();
  });
});

// app.[method]() 부분에서 모든 app을 router로 변경해주세요!
```

이때, express의 `router()`를 사용하게 됩니다. 기존 CRUD 코드에서 `app.[method]` 부분을 모두 `router.[method]`로 변경해주세요!!

그리고, method 함수들 `.get()`, `.post()` 등등에 지정한 url 형식에서 `/book` 부분을 모두 제거해주세요!

즉, 
``` js
router.get("", (req, res) => { ... });
router.get("/:id", (req, res) => { ... });
router.post("/:id", (req, res) => { ... });
...
```

로 바꿔주시면 됩니다!

마지막으로 `book.js`에 있는 `router`를 사용하기 위해 `export` 구문을 추가해줍니다.

``` js
const router = express.Router();
//...//
// in the last line
module.exports = router;
```

<hr>

이제 `index.js` 파일을 만들어 메인 함수의 역할을 담당하도록 합니다.

`index.js`를 아래와 같이 작성합니다.

``` js
const express = require('express');
// 앞서 정의한 router를 ipmort 합니다.
const bookRouter = require('./book.js');

const app = express();
app.use(express.json());

// app에 bookRouter를 등록합니다.
app.use("/book", bookRouter);

app.get("", (req, res) => {
  res.send("Hello Express!");
})

app.listen(8080, () => console.log("Server is listening on 8080 port..."));
```

`const bookRouter = require('./book.js');`를 통해 만들어 둔 라우터(router)를 import 합니다.

이후, 기존의 `express` 서버에서 `app.use("book", bookRouter);` 구문을 추가하여 서버에 `bookRoter`를 등록해줍니다.

<br>

이제 API tester를 통해 라우터가 잘 작동하는지 확인해봅니다.

<br>

전체 코드는 [이곳](https://github.com/BlueHorn07/poapper-backend/tree/master/assets/example/express-routing)에서 확인할 수 있습니다!


<hr>

라우팅을 통해 하나의 코드에 모든 로직을 작성하는 것이 아니라, 서버의 기능 별로 코드를 나누어 서버 코드의 가독성을 높일 수 있습니다!!

모듈화는 프로그래밍에서 중요한 테크닉 중 하나입니다. 서버를 개발은 단순히 로직을 짜는 것에서 끝나는 것이 아니라, 코드를 적절히 분리하고 간결하게 만드는 것까지 포함하는 과정입니다!

<hr>

### 맺음말

`http` 라이브러리를 구현한 기능을 `express` 라이브러리로 대체함으로써 다음과 같은 이득을 얻었습니다.

- `if-else` 문을 제거
- `.split('/')`으로 처리하던 부분을 `req.params`으로 해결
- `app.use(express.json())`을 추가하여 `req.body`로 간단하게 request body에 접근
- 라우팅(routing)을 통해 코드를 기능별로 분리

<br>

다음 시간에는 `express`에서 가장 중요하고, 핵심적인 기능이라고 할 수 있는 **미들웨어(Middleware)**에 대해 다루겠습니다!
