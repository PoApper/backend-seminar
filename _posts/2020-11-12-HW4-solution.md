---
title: "HW4 해설"
layout: post
published: false
---

#### 출제자 코멘트
'서버에선 어떤 문제가 언제 생길지 모른다! 스스로 그 에러들을 찾아 핸들링해보자!'는 의도로 이번 숙제를 기획했는데 생각보다 난이도가 있었던 것 같습니다 ㅠㅠ 다음에는 예시를 좀더 추가하여 숙제를 출제하도록 하겠습니다!!

<hr>

#### 중복 포트 에러
세미나3에서 제시되었던 코드인 `.on('error')`를 통해 이미 점유된 포트에 서버를 열 때 발생하는 `ERR_SERVER_ALREADY_LISTEN`를 해결하는 방법입니다.

``` javascript
server.on('error', (err) => {
  console.error(err);
})
```

`server.listen()` 함수에 대한 자세한 내용은 이 [링크](https://nodejs.org/api/net.html#net_server_listen)에서 확인하실 수 있습니다!

다만, 이 방법으로는 서버 내부 로직에서 발생하는 에러를 처리하지 못 한다는 단점이 있습니다.

<hr>

#### try-catch
try-catch 문을 활용한다면, 코드를 실행할 때 발생하는 모든 Error/Exception을 잡아낼 수 있습니다.

``` javascript
try {
  if(method == 'POST'){
    //...//
  }else if(method == 'GET'){
    //...//
  }
  //...//
}catch(err){
  console.error(err);
}
```

이 방식은 `database[OutOfIndex]`와 같이 JS 문법에 의한 Error/Exception을 핸들링 할 수 있습니다. 

다만, 실제 서버를 개발할 때는 이런 문법적인 에러 뿐만 아니라 invalid keyword, invalid input range 등, 에러로 해석되는 다양한 맥락을 핸들링할 필요가 있습니다.

<hr>

##### throw
`throw` 키워드를 통해 코드의 실행을 중지하고, 적절한 Error/Exception을 (강제로) 만들 수 있습니다.

예를 들어, 

``` javascript
  if(method == 'POST'){
    if(url_parsed.length > 2) throw "Too many number of input parameters!"
    database[idx] = url_parsed[1];
    idx += 1;
  }
```

`POST` method일 때, 실제 사용하는 것은 `url_parsed`의 1번째 원소까지입니다. 하지만 만약 request가 `POST /1/more/input`과 같다면 이것은 부가적인 `/more/input`라는 정보를 포함하기 때문에 우리가 설계한 서버의 맥락과 어긋나게 됩니다.

또한 request가 `POST /1/more/input`라면, 유저가 입력하려던 주소는 `POST /more/input`인데 실수로 주소를 잘못 입력한 경우일 수도 있습니다. 만약 그렇다면 지금의 코드에선 `database`에 값이 추가되어, 유저가 의도하는 것과는 다른 상황이 펼쳐질 수 있습니다.

그래서 우리는 정직한 형태의 입력만 허용하도록, (강제로) Error/Exception을 만드는 로직을 추가해줘야 합니다.

<br>

이외에도 우리가 `database`에 문자열이 아니라 정수값만 저장하고 싶다면,

``` javascript
  if(method == 'POST'){
    if(url_parsed.length > 2) throw "Too many number of input parameters!"
    if(!Number.isInteger(parseInt(url_parsed[1]))) throw "Input is Not an integer!"
    database[idx] = url_parsed[1];
    idx += 1;
  }
```

를 통해서 `database`에 입력한 값의 타입도 제한을 줄 수 있습니다.


<hr>

### 맺음말

해설에는 핸들링할 수 있는 상황을 좀더 다양한 맥락에서 제시 하였습니다.

다만, 제가 문제를 출제할 때는

- `database`에 존재하지 않는 인덱스를 사용하는 경우; `database[OutOfIndex]`
  - GET
  - DELETE
- 입력 파라미터의 수가 충분하지 않은 경우
  - POST; `POST /[nothing]`
  - PUT; `PUT /1/[nothing]`
- 이미 점유한 포트를 사용하는 경우

이 정도의 에러를 핸들링하는 것을 바라고 있었습니다 ㅠㅠ

<br>

아직 서버를 개발하는 시작의 단계이고, 아직 서버가 익숙하지 않아서 핸들링보다도 에러 상황을 생각하는 것이 여러웠을 꺼라고 생각합니다 ㅠㅠ

다음 숙제부터는 문제 상황과 맥락을 좀더 구체적으로 제시하도록 하겠습니다 ㅠㅠ