---
title: "BackEnd Seminar 2(보충)"
layout: post
---

수업 영상 링크: [link](https://drive.google.com/file/d/1VBF0JgmH4BZcp7SJ49VcPsL-Ptkly1os/view?usp=sharing)

#### 키워드
- `Promise`
  - pending
  - fulfilled
  - rejected
- `then()` / `catch()`
- 맺음말

**Tip**: 이번 주제는 아직 잘 와닿지 않을 수 있습니다. 처음에는 JS에선 `Promise`란 녀석을 사용하고, `Promise`만 어떤 특징이 있다 정도만 파악하시면 됩니다. `Promise`는 서버를 프로그래밍 할 때 다른 개념과 결합하여 자주 사용되기 때문에 지금 잘 이해가 되지 않더라도, 이후에 현실적인 예제와 코드를 보면 익숙해질 것 입니다 :)

<hr>

#### `Promise`
`Promise`는 JS에서 비동기 처리에 사용하는 '객체'입니다. 

Promise는 몇가지 중요한 형식과 특징이 있습니다.

먼저 Promise는 아래와 같이 선언할 수 있습니다.

``` javascript
new Promise();
```

이것을 `console.log()`로 확인해보면, 'pending'이라는 문구를 볼 수 있습니다.

Promise는 resolve, reject를 인자로 갖는 콜백 함수를 인자로 받습니다.

``` javascript
new Promise(function(resolve, reject) {

})
```

여기서 콜백 함수의 인자 `resolve`를 호출하면 Promise는 **이행(Fulfilled)** 상태가 됩니다.

``` javascript
new Promise(function(resolve, reject) {
  resolve();
})
```

Promise가 fulfilled 상태가 되면, `then()` 키워드를 통해서 `resolve`에 전달한 값을 사용할 수 있습니다.

``` javascript
function getData() {
  return new Promise(function(resolve, reject) {
    var data = 100;
    resolve(data);
  });
}

// resolve()의 결과 값 data를 resolvedData로 받음
getData().then(function(resolvedData) {
  console.log(resolvedData); // 100
});
```

만약 `reject`를 호출하면 Promise는 **실패(Rejected)** 상태가 됩니다.

``` javascript
new Promise(function(resolve, reject) {
  reject();
});
```

Promise가 Rejected 상태가 되면, `catch()` 키워드를 통해서 `reject`에 전달한 값을 사용할 수 있습니다.

``` javascript
function getData() {
  return new Promise(function(resolve, reject) {
    reject(new Error("Request is failed"));
  });
}

// reject()의 결과 값 Error를 err에 받음
getData().then().catch(function(err) {
  console.log(err); // Error: Request is failed
});
```

지금까지의 내용을 정리해봅시다.

`Promise`는 3가지 상태를 갖습니다.
- pending
- fulfilled
- rejected

`Promise`는 resolve, reject를 인자로 갖는 콜백 함수를 인자로 받습니다. 인자로 받은 `resolve`를 호출하면, Promise가 fulfilled 상태가 됩니다. 인자로 받은 `reject`를 호출하면, Promise가 rejected 상태가 됩니다.

Promise가 fulfilled 상태면, `then()` 키워드를 통해서 `resolve`에 전달한 값을 쓸 수 있습니다. 반대로 Promise가 rejected 상태면, `catch()` 키워드를 통해서 `reject`에 전달한 값을 쓸 수 있습니다.

<hr>

예시 코드를 통해 살펴봅시다.

``` javascript
new Promise(function(resolve, reject){
  setTimeout(function() {
    resolve("fulfilled!!");
  }, 2000);
})
.then(function(result){
  console.log(result);
});
```

<hr>

앞에서 살펴본 예시는 코드가 항상 정상 동작한다고 가정하고 구현한 예제입니다. 그러나 실제 서비스를 구현해보면 네트워크 연결, 서버 문제 등으로 인해 오류가 빈번히 발생합니다. 그래서 `Promise`의 에러 처리 방법도 알고 있어야 합니다.

Promise에서는 2가지 방법으로 에러를 처리할 수 있습니다.

1. `then()`의 두 번째 콜백 함수로 에러를 처리
``` javascript
getData().then(
  handleSuccess,
  handleError
);
```

2. `catch()`를 이용해 에러를 처리
``` javascript
getData().then().catch();
```

위 2가지 방법 모두 프로미스의 `reject()`가 호출되어 rejected 상태가 된 경우를 처리합니다.

``` javascript
function getData() {
  return new Promise(function(resolve, reject) {
    reject('failed');
  });
}

// 1. then()의 두 번째 인자로 에러를 처리하는 코드
getData().then(function() {
  // ...
}, function(err) {
  console.log(err);
});

// 2. catch()로 에러를 처리하는 코드
getData().then().catch(function(err) {
  console.log(err);
});
```

<hr>

### 맺음말
비동기 처리의 Callback Hell을 해결하기 위해 `Promise`가 도입되었습니다. Promise를 사용의 장점은 `then()`이라는 키워드를 통해 콜백 함수 부분을 비동기 함수 밖으로 분리했다는 점입니다. 그래서 아래의 코드가

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

물론 이렇게 바꿔쓸 수도 있죠.

``` javascript
function async4(){
  console.log("작업 완료??");
}

function async3(){
  async4();
}

function async2(){
  async3();
}

function asnyc1() {
  async2();
};
```

`Promise`를 적용하면 이렇습니다.
``` javascript
function async2(){
  return new Promise((resolve) => {
    resolve();
  })
}

//...//

new Promise((resolve) => {
  resolve();
}).then(async2())
  .then(async3())
  .then(async4())
```

아직은 잘 와닿지 않을 순 있지만 `Promise`를 쓰면 코드를 좀더 선형으로 분석할 수 있고, 가독성이 높아진다는 장점이 있습니다. 그리고 이전과 달리 비동기 함수가 어느 상태에 있는지를 pending / fulfilled / rejected를 통해 확인할 수 있습니다. 또, `catch()`를 통해서 에러도 유연하게 처리할 수 있습니다.

`Promise`가 Callback Hell을 해결하는 완벽한 도구라고 말할 수는 없습니다. `Promise`가 연속해서 연결되어 오히려 코드의 가독성을 해치는 경우를 **Promise chaining**이라고 합니다.

그래서 JS는 `async`/`await` 키워드를 통해서 비동기 함수를 처리하는 새로운 방법을 제시합니다. `async`/`await` 키워드는 중간고사 이후의 수업에서 다루도록 하겠습니다!

<hr>

#### 참고자료
- [자바스크립트 Promise 쉽게 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)


<hr>

