---
title: "BackEnd Seminar 2-1"
layout: post
---

#### 수업의 키워드
- 함수 (2)
- Callback function
- 동기식 처리와 비동기식 처리
  - 비동기식 처리의 효용
  - 콜백 지옥(Callback hell)

<hr>

### 함수 (2)
JS에서 함수를 정의하는 새로운 방식을 알아봅시다. 

JS에선 익명 함수를 선언할 때, 다음과 같이 간단하게 표현할 수 있습니다.

``` javascript
var square = function(num) {
  return num * num;
}

var square = (num) => {
  return num * num;
}
```
`function` 키워드를 대신해 화살표 `=>`를 사용합니다.

함수를 선언할 때, `=>`를 사용하기 때문에 이런 함수를 **화살표 함수<small>arrow function</small>**이라고 합니다.

코딩의 간편함 때문에 많은 경우 화살표 함수로 JS 함수를 선언합니다. 앞으로 이어지는 내용에선 화살표 함수를 위주로 함수를 작성하도록 하겠습니다!

<hr>

### Call back function

**콜백 함수<small>Call back function</small>**은 함수에 파라미터로 전달되는 함수를 말합니다.[^1]

예를 들어 `setTimeout()` 함수를 살펴봅시다.
``` javascript
console.log("hello");
setTimeout(() => {
  console.log("bye");
}, 3000);
```
`setTimeout()`은 지연시간(ms) 후에 인자로 주어진 함수를 실행하는 함수입니다.

위의 코드에선 `bye`를 출력하는 함수를 인자로 전달하였기 때문에 `hello` 출력 3000 ms 후에 `bye`를 출력합니다.

콜백 함수는 뒤에 이어지는 비동기 처리에서도 등장합니다!

<hr>

### 동기 vs. 비동기 <small>Synchronous vs. Asynchronous</small>

보통의 코드는 위에서부터 아래로 순서대로 실행됩니다. 그래서 아래의 코드는
``` javascript
console.log("1st")
console.log("2nd")
console.log("3rd")
```

``` shell
1st
2nd
3rd
```
와 같이 순서대로 결과를 출력합니다.

이처럼 코드를 위에서부터 아래로 내려오며, 하나의 작접이 끝나면 다음 작업이 실행되는 방식을 **동기식<small>Synchronous</small> 처리**라고 합니다.

<br>

반면, 다음과 같은 코드를 살펴봅시다.

``` javascript
console.log("1st")
setTimeout(() => {
  console.log("2nd");
}, 3000)
console.log("3rd");
```
`setTimeout()`에 의해 3000 ms를 기다린 후에 `2nd`가 출력되기 때문에 결과는 아래와 같습니다.

``` shell
1st
3rd
2nd
```
위의 상황에선 `setTimeout()`이 실행되어 3000 ms를 기다리는 동안 `console.log("3rd")`가 실행되었습니다. 이것을 그림으로 표현하면 아래와 같습니다.

<div style="text-align: center; margin: 5px;">
<img src="https://poiemaweb.com/img/settimeout.png"  style="width: 90%;">
</div>

이렇게 앞의 작업이 완전히 종료되지 않았음에도 다음 작업을 수행하는 것을 "작업을 병렬적으로 수행한다"라고 합니다.

#### 비동기식 처리의 효용
<div style="text-align: center; margin: 5px;">
<img src="https://poiemaweb.com/img/block_nonblock.png"  style="width: 60%;">
</div>

대부분의 JS 어플리케이션[^2]은 비동기식 처리에 의해 동작합니다!

`setTimeout()` 같이 간단한 경우도 있지만, 서버에서 데이터를 받아 처리하는 것, 또는 서버에 저장된 데이터를 읽는 것도 비동기식 처리를 사용합니다. 

예를 통해 살펴봅시다. 여러분이 만든 서버에 요청(request)이 들어오면 서버에 저장된 사람의 DNA 데이터의 전달해준다고 가정합시다. 

만약 이것을 동기식 처리로 구현하면, 요청이 들어왔을 때 여러분의 서버는 DNA 데이터를 전달하는 하나의 작업만을 수행합니다.

<div style="text-align: center; margin: 5px;">
<img src="https://poiemaweb.com/img/synchronous.png"  style="width: 70%;"><br>
<small>"Get Data from Server"를 "Send Data to User"로 바꿔서 이해하시면 됩니다 :)</small>
</div>

사람의 DNA 정보는 그 단위가 GB이기 때문에 유저가 데이터를 다운로드 받는 데에 적어도 몇초는 필요합니다. 이때, 다른 유저가 요청을 보내게 된다면, 여러분의 서버는 하나의 작업만을 할 수 있기 때문에 다른 유저는 앞 유저의 다운로드가 끝날 때까지 기다릴 수 밖에 없습니다.

<br>

<div style="text-align: center; margin: 5px;">
<img src="https://poiemaweb.com/img/asynchronous.png"  style="width: 70%;"><br>
<small>"Get Data from Server"를 "Send Data to User"로 바꿔서 이해하시면 됩니다 :)</small>
</div>

그러나 데이터를 보내는 작업을 비동기식 처리로 구현한다면, 유저가 데이터를 다운로드 받는 동안 다른 유저들도 데이터를 동시에 다운로드 받을 수 있습니다!

비동기식 처리는 웹프론트/웹백엔드 모두가 사용하는 "웹개발의 핵심 of 핵심"입니다. 잘 이해해두면 웹프론트를 공부할 떄도 많은 도움이 됩니다 :)

<hr>

#### 콜백 지옥 <small>Callback hell</small>

콜백 지옥은 비동기 처리를 구현하는 과정에서 콜백 함수를 연속해서 사용할 때에 발생하는 문제입니다.

``` javascript
asnyc1(() => {
  async2(() => {
    async3(() => {
      async4(() => {
        console.log("작업 완료???");
      })
    })
  })
})
```

위의 코드는 극단적인 상황을 연출한 것이지만, 콜백 지옥은 실제 코드에서도 종종 등장합니다. 아래 코드는 예시로만 봐주세요 :)

``` javascript
$.get('url', function(response) {
  parseValue(response, function(id) {
    auth(id, function(result) {
      display(result, function(text) {
        console.log(text);
      });
    });
  });
});
```

콜백 지옥은 코드의 로직을 이해하는 데에 큰 어려움을 줍니다. 

비동기 처리의 부작용인 콜백 지옥을 해결하기 위해 JS에서는 `Promise`와 `async/await` 두 가지 방법을 제공합니다. 이번주 수업(10/18) 때 `Promise`에 대해서 다루도록 하겠습니다 :)

<hr>

#### 참고자료
- https://poiemaweb.com/js-async
- https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/

<hr>

[^1]: 이렇게 함수를 인자처럼 사용하는 프로그래밍 패러다임을 **함수형 프로그래밍**이라고 합니다.
[^2]: 여러분의 프로그램을 '어플리케이션<small>application</small>`이라고 합니다. 지금은 하나의 js 파일을 다루지만, 나중에는 기능을 모듈화하여 여러 js 파일을 다루게 됩니다. 이 여러 js가 묶어 하나의 기능/역할을 하는 것이'어플리케이션'입니다.
