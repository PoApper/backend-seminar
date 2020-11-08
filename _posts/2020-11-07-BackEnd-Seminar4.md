---
title: "BackEnd Seminar 4"
layout: post
---

간단한 CRUD 기능을 구현해봅시다!

#### 키워드
- CRUD란?
- REST API
  - URI와 URL
  - HTTP method

**주의**: 본문 길이를 감안해 코드 전체를 제시하는 것보다는 진행에 필요한 부분만 제시하도록 하겠습니다. 핵심이 되는 로직을 제외한 나머지 부분은 여러분의 입맛대로 작성하시면 됩니다 :)

<hr>

### 도입말
저번 시간에 `http` 모듈을 이용해 html 파일의 내용을 리턴해주는 간단한 서버를 만들었습니다. 

하지만 이런 방식의 구현은 분명한 한계를 지닙니다. 예를 들어 서버에 저장된 html 파일의 내용이 바뀌지 않는 이상, 클라이언트는 매 요청마다 항상 동일한 정보만을 받게 됩니다. 

이런 정적(static)인 상황을 개선해 **동적(dynamic)인 서버**를 개발하기 위해서 오늘은 클라이언트-서버 상호작용 중 하나인 "**CRUD**"를 구현해봅시다.

<hr>

### CRUD란?

<div style="text-align: center; margin: 5px;">
<img src="https://i.ytimg.com/vi/0pU6_5BQ2Dk/maxresdefault.jpg"  style="width: 65%;">
</div>

CRUD란 아래 **C**reate, **R**ead, **U**pdate, **D**elete의 약자입니다. CRUD는 데이터베이스에서 주로 쓰는 용어입니다. 데이터베이스의 기본인 데이터를 생성/조회/갱신/삭제하는 일련의 로직을 통틀어 CRUD라고 합니다.

<hr>

아래의 코드를 베이스로 차근차근 CRUD를 구현해봅시다.

``` javascript
let database = {};

const server = http.createServer((req, res) => {
  const url_parsed = req.url.split('/');
  const method = url_parsed[1];

  console.log(url_parsed);
  console.log(database)

  if(method == 'create'){
    
  }else if(method == 'read'){

  }else if(method == 'update'){

  }else if(method == 'delete'){

  }
  res.end();
});
```

`database`라는 변수를 데이터베이스로 삼아 데이터에 대한 CRUD를 진행해봅시다!

#### CRUD: Create
먼저 Create 입니다. 우리는 `localhost:8080/create/[value]`의 형식으로 접속하면 `database`에 `value`의 값을 저장할 수 있도록 하겠습니다.

``` javascript
let database = {};
let idx = 1;
// ...
  if(method == 'create'){
    database[idx] = url_parsed[2];
    idx += 1;
  }
// ..
```

주목할 점은 `value`를 `database`에 저장할 때, `value`에 대한 인덱스를 넣어준다는 점입니다. 이것은 데이터베이스를 조회할 때, 값 자체가 아닌 인덱스를 기준으로 조회하기 때문입니다. 그래서 인덱스를 위한 변수 `let idx = 0;`를 전역 위치에 선언 해줍니다!

이후 콘솔창을 확인해보면, 우리가 입력한 `value`의 값이 `database`에 정상적으로 저장된 것을 확인할 수 있습니다!

#### CRUD: Read
다음 Read 입니다. 우리가 Create에서 저장한 값을 조회하기 위한 기능입니다. 

Read의 경우 두 가지 형식을 지정하도록 하겠습니다.
1. `localhost:8080/read/`<br>
  `database`에 담긴 모든 정보를 조회합니다.

2. `localhost:8080/read/[idx]`<br>
  `idx`를 인덱스로 하는 데이터를 조회합니다.

``` javascript
  else if(method == 'read'){
    if(url_parsed.length == 2){ // 전체 조회
      res.write(JSON.stringify(database));
    }else{ // 원소 조회
      const url_idx = Number(url_parsed[2]);
      res.write(database[url_idx]);
    }
  }
```

지정한 형식으로 접속해보면, `database`에 저장한 값을 콘솔이 아닌 웹에서도 확인할 수 있게 되었습니다!!

#### CRUD: Update
축하드립니다! Create와 Read를 성공적으로 구현하셨다면, CRUD의 80%는 성공한 것이나 다름 없습니다!!

Update는 Create로 생성한 데이터의 값을 바꿀 때 쓰는 기능입니다. `localhost:8080/update/[idx]/[value]`의 형식으로 접속하도록 하겠습니다.

``` javascript
  else if(method == 'update'){
    const url_idx = Number(url_parsed[2]);
    const url_data = url_parsed[3];
    database[url_idx] = url_data;
  }
```

#### CRUD: Delete
Delete는 Create로 생성한 데이터의 값을 삭제할 때 쓰는 기능입니다. `localhost:8080/delete/[idx]`의 형식으로 접속하도록 하겠습니다.

``` javascript
  else if(method == 'delete'){
    const url_idx = Number(url_parsed[2]);
    database[url_idx] = undefined;
  }
```

<hr>

축하합니다!! 이제 여러분은 가장 기본적인 CRUD 기능을 구현한 것입니다!

그러나 진정한 CRUD를 위해 아직 남은 부분이 있습니다. 바로 Error Handling 입니다.

#### CRUD: Error Handling

웹개발에서 Error Handling은 아무리 강조해도 지나치지 않습니다 :) 우리가 구현한 로직에서 Error를 통해 서버를 셧다운할 가능성이 있는 부분을 찾아내서 보완해봅시다!

예를 들어, `/read/[idx]`에서 존재하지 않는 인덱스의 원소에 접근하는 경우의 에러를 처리해줍시다.

``` javascript
  else if(method == 'GET'){
    if(url_parsed[1] == ''){ // 전체 조회
      res.write(JSON.stringify(database));
    }else{ // 원소 조회
      try {
        const url_idx = Number(url_parsed[1]);
        res.write(database[url_idx]);
      } catch (error) {
        console.log("READ ERROR")
        console.log(error);
      }
    }
  }
```

`try-catch` 구문을 이용해 코드의 실행 중 에러가 생겼을 때, 바로 서버를 종료하는 것이 아니라 에러가 발생한 CRUD 연산과 에러 내용을 출력해줍니다.

간단한 수준의 코드는 에러가 발생할 것 같은 부분에 `try-catch` 구문만 잘 넣어줘도 서버가 끊김없이 잘 작동합니다. 하지만, 서버의 기능이 복잡해질 수록 더 많은 에러는 물론이고 서버에 대한 올바르지 않은 접근<small>invalid access</small> 역시 빈번히 일어나기 때문에 더 세심한 에러 처리를 요구하게 됩니다.

<hr>

### REST API

#### REST API는 왜 필요한가

앞의 과정에서 우리는 주소에 `create`, `read`, `update`, `delete`의 키워드를 이용해서 CRUD 기능을 수행하고 있습니다. 하지만 이 방식은 몇가지 문제점을 갖고 있습니다. 그리고 REST API를 사용하면 더 개선된 CRUD 기능을 활용할 수 있습니다.

문제 상황을 생각해봅시다. CRUD에 대한 키워드로 `create`, `read`, `update`, `delete`가 아닌 다른 키워드를 사용했다면, 웹개발 과정에서 혼란스럽습니다. 우리는 데이터 생성에 `create` 키워드를 썼지만, 다른 개발자는 `save` 또는 `make` 키워드를 쓸 수도 있습니다. 또는 정말 이상한 `abcdefg`의 키워드로 주소 형식을 지정할 수도 있습니다. REST API는 CRUD 기능에 대한 표준 형식을 제시합니다.


### REST API란 무엇인가

REST API는 Representational State Transfer의 약자로 2000년에 개발된 형식입니다. REST API는 URI[^1]를 통해 자원(resource)을 어떻게 접근할지, 즉 CRUD에 대한 일종의 패러다임 또는 표준으로 인정받는 형식이라고 볼 수 있습니다.

<div style="text-align: center; margin: 5px;">
<img src="https://gmlwjd9405.github.io/images/network/rest.png"  style="width: 75%;">
</div>

REST API로 CRUD를 수행하는 데에 몇가지 규칙들이 존재합니다. 하나씩 살펴봅시다.

1. 자원(resource)는 동사보다는 **명사**를, 대문자보다는 **소문자**를 사용한다.
2. 슬래시 구분자(`/`)는 계층 관계를 나타내는데 사용한다.
3. 자원에 대한 행위는 `HTTP Method`를 이용해 표현한다.

첫 번째 규칙은 정말 간단합니다. 우리가 자원의 식별하는 URI를 작성할 때, 명사와 소문자로 식별자를 작성하면 됩니다. 예를 들어, `/Member/1` 보다는 `/member/1`가 선호됩니다.

두 번째 규칙도 간단합니다. 만약 자원이 계층적 구조를 이룬다면, 슬래시(`/`)를 이용해 계층 관계를 구분해줍니다. 예를 들어 `animal/mammal/cat`이런 형식으로 계층을 표현합니다.

<br>

세 번째 규칙이 REST API에서 새롭게 배우게 되는 부분입니다! 이 규칙은 우리가 CRUD의 `create`를 `save`나 `make` 등으로 표현하는 등, 혼란이 생길 수 있다는 문제를 해결해줍니다.

HTTP에는 Method라는 성질(property)가 있습니다. 이 HTTP Method는 클라이언트의 요청(request)에 담겨 서버에 전달됩니다.

HTTP Method에는 `GET`, `POST`, `PUT`, `DELETE`의 키워드가 있고 각각 CRUD의 한 기능들을 담당합니다.

클라이언트는 request에 HTTP Method에 CRUD 행위를 지정하고, URI에 자원을 명시함을 통해 클라이언트가 request를 더 명확하게 전달할 수 있습니다.

<hr>

### REST API로 CRUD 구현

먼저 HTTP Method를 담아 request를 보내는 것을 돕는 툴을 먼저 설치합니다. [Talend API Tester - Free Edition](https://chrome.google.com/webstore/detail/talend-api-tester-free-ed/aejoelaoggembcahagimdiliamlcdmfm)라는 크롬 확장프로그램을 설치해줍시다.

<br>

이제 REST API 기반의 CRUD를 구현해봅시다!!

먼저 `HTTP Method`부터 확인해봅시다. 코드의 적절한 위치에 다음 문장을 넣어준 뒤, `localhost:8080/read`로 접속합니다.

``` javascript
  console.log(req.method)
```

그러면 콘솔 창에 `GET`이라는 출력이 등장함을 알 수 있습니다. `/create`나 `/delete`와 같은 다른 주소로 접속해봐도 지금은 모두 `GET`이라는 결과를 얻을 것입니다.

이제 `HTTP Method`를 바꿔봅시다. Talend API Tester에서 Method를 `POST`로 바꾼 후 `localhost:8080/read`로 접속합니다. 그러면 콘솔창의 출력과 함께 `HTTP Method`가 `POST`로 바뀌었음을 확인할 수 있습니다.

이제 `HTTP Method`를 변경하는 방법을 알았으니, `req.method`를 기준으로 코드의 `if-else` 문을 재구성해봅시다. 

방법은 간단합니다. `method` 변수에 `req.method`를 저장한 후, `if-else` 문으로 CRUD 연산들을 처리해줍니다. 그리고 `create`, `read`와 같은 연산을 명시하는 키워드가 사라졌기 때문에 `url_parsed`를 사용하는 로직을 약간 수정해줍니다!

``` javascript
  const method = req.method;

  console.log(method)
  console.log(url_parsed);
  console.log(database)

  if(method == 'POST'){
    database[idx] = url_parsed[1];
    idx += 1;
  }else if(method == 'GET'){
    if(url_parsed[1] == ''){ // 전체 조회
      res.write(JSON.stringify(database));
    }else{ // 원소 조회
      const url_idx = Number(url_parsed[1]);
      res.write(database[url_idx]);
    }
  }else if(method == 'PUT'){
    const url_idx = Number(url_parsed[1]);
    const url_data = url_parsed[2];
    database[url_idx] = url_data;
  }else if(method == 'DELETE'){
    const url_idx = Number(url_parsed[1]);
    database[url_idx] = undefined;
  }
```

마지막으로 API Tester를 통해 구현한 REST API가 정상적으로 작동하는지 확인해봅니다!!

<hr>

### 맺음말
이번 수업을 통해 CRUD 기능을 구현함과 더불어 REST API를 적용한 CRUD도 구현했습니다. 그리고 주소에서 `create`, `read` 라는 키워드가 사라지면서 더 명확하고 간결한 주소 체계를 쓸 수 있게 되었습니다. 

하지만, 지금은 서버가 동작을 멈추게 하면, `database`에 담긴 모든 내용이 사라지는, 휘발성이라는 문제를 가지고 있습니다. 이것을 극복하기 위해 우리는 다음 시간에 `MySQL`이라는 데이터베이스를 도입할 것입니다. 다음 시간에는 `MySQL`의 간단한 SQL 명령어를 배우고, 우리의 코드에 적용해봅시다! :)

<hr>

#### 참고자료
- [[Network] REST란? REST API란? RESTful이란?](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html) <br> // REST API의 모든 패러다임을 담고 있는 포스트입니다. 꼭 읽어보기를 추천 합니다!

<hr>

[^1]: 이때, 우리가 쓰는 주소 체계는 **URL**<small>Uniform Resource Location</small>이 아닌 **URI**<small>Uniform Resource Identifier</small>입니다. URI가 URL을 포괄하는 더 큰 개념으로 우리가 접근하고자 하는 자원(resource)를 식별하는 문자열, 즉 식별자(identifier)의 역할을 합니다. 반면에 URL은 자원이 존재하는 구체적인 파일 경로를 의미합니다. 예를 들어 `logo.png` 파일에 대한 URL은 `http://myhomepage/files/img/logo.png`와 같이 표현됩니다. 아직은 URI과 URL을 명확히 구분하기 힘들 것입니다. 지금은 URI가 주소 체계에서 더 큰 개념이라는 정도만 알고 계시면 될 것 같습니다 :)

