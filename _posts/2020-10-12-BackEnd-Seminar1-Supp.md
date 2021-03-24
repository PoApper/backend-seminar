---
title: "BackEnd Seminar 1(보충)"
layout: post
date: 20210325
published: true
---

#### 키워드
- var, let, const의 사용
- type 확인하기
- type 변환하기: `암묵적 타입 변환` / `명시적 타입 변환`
- JavaScript의 Scope
- JavaScript와 세미콜론(;)

<hr>

## var, let, const의 사용
### var type 변수의 문제점
1. Function Level Scope: 전역변수를 남발할 수 있습니다. 프로그램이 복잡해질수록 유효범위가 넓은 전역변수를 많이 사용하면, 각 변수를 트래킹하는 데에 어려움이 생길 수 있습니다.(변수의 유효범위는 좁을수록 좋다)
2. 중복 선언 허용: 의도치 않게 변수의 값을 변경할 수가 있습니다. let을 사용하면 재선언시 오류가 나타나기 때문에 이를 방지하기 좋습니다.
3. 변수 호이스팅: 다음주 수업에서 **호이스팅**<small>Hoisting</small>에 대해 다룰 예정인데, 호이스팅을 이용하면 변수를 선언하기 전에 참조가 가능하기 때문에 코드가 복잡해질 수 있습니다.

가급적이면 변수는 **유효범위가 작고** **값이 고정**되어있을 수록 좋으니, 작성하는 코드의 맥락에 따라 `var`과 `let`, `const`를 적절히 사용하면 깔끔하게 동작하는 코드를 작성하실 수 있습니다!
- [참고자료](https://poiemaweb.com/es6-block-scope)

<hr>

## type 확인하기
JavaScript는 **동적 타이핑** 언어이기 때문에 변수에 값이 할당될 때 그 type이 결정되고, 재할당시에 타입이 변할 수 있습니다. 변수의 타입은 다음과 같은 방법으로 확인할 수 있습니다.
```javascript
typeof "string"   //string
typeof 0.001    //number
typeof null   //object
```
단, 주의해야 할 점은 null의 경우 `typeof` 연산자를 이용하였을 때 object로 반환되기 때문에(JavaScript가 처음 설계되었을 때 이렇게 됨) 어떤 변수가 null인지 확인할 때에는 다음과 같은 방식을 이용해야 한합니다.
```javascript
typeof null == null   //(X)
null === null         //(O)
```

<hr>

## type 변환하기
JavaScript의 타입 변환에는 크게 두 가지가 있는데, 하나는 **암묵적 타입 변환**<small>implicit coercion</small>이고, 다른 하나는 **명시적 타입 변환**<small>explicit coercion</small>입니다. 둘의 뚜렷한 차이점은 `변수값의 재할당`에 있는데, 암묵적 타입 변환은 변수의 값을 재할당하는 것이 아니고 어떤 연산을 하기 위해 변환된 type의 값을 만들어 사용하는 것이기 때문에 변수 자체의 type은 변환되지 않습니다.

### 암묵적 타입 변환
- 문자열 타입으로의 변환: `문자열 + 문자열X` 를 연산하면, 문자열로 변환되어 문자열의 합으로 연산됩니다.
  ```javascript
  '1' + 3   //'13'
  ```
- 숫자 타입으로의 변환: `+`를 제외한 산술연산자(`-`, `*`, `/`)에 대해서는 숫자로 type을 변환합니다. 계산이 불가능한 경우에는 `NaN`값을 반환합니다. (단, `+`연산자의 경우 단항연산자일 경우 숫자 타입으로 변환함)
  ```javascript
  1 - '1'   //0
  1 * '2'   //2
  1 / 'apple'   //NaN
  ```
- boolean 타입으로의 변환: `false`, `undefined`, `null`, `0`, `-0`, `NaN`, `""`을 제외한 모든 값을 `true`로 변환합니다.
  ```javascript
  '13' == 0    //false
  '' == 0     //true
  ```

### 명시적 타입 변환
변환하고자 하는 변수를 `x`로 나타내어 예시를 들어보겠습니다!
- 문자열 타입으로의 변환: `String(x)`, `(x).toString()`, `x + ''`(`''`은 빈 문자열)
- 숫자 타입으로의 변환: `Number(x)`, `+x`, `x * 1`
- boolean 타입으로의 변환: `Boolean(x)`, `!!x`
  
예시로 든 타입 변환 방식 이외에도 다양한 방법을 통해 타입변환이 가능합니다.

<hr>

## JavaScript의 Scope
Scope란 식별자<small>identifier</small>를 찾아내기 위한 규칙입니다. 여기서 식별자는 `함수`, `변수`와 같이 어떤 대상을 다른 대상과 구별할 때 사용되는 *유일한 이름*을 말합니다. Scope는 두 종류로 나눌 수 있는데, 하나는 **전역 스코프**<small>Global Scope</small>이고, 다른 하나는 **지역 스코프**<small>Local Scope or Function-level Scope</small>입니다. 변수의 관점에서 Scope를 보면 **전역 변수**<small>Global Variable</small>과 **지역 스코프**<small>Local Variable</small>로 표현할 수 있습니다.

JavaScript는 **블록 레벨 스코프**<small>block-level ccope</small>를 가지는 C언어와 달리 **함수 레벨 스코프**<small>function-level scope</small>을 따르기 때문에 함수 코드블록 내에서 선언된 변수는 해당 코드블록 내에서만 유효하고, 그 외에서는 참조할 수 없습니다. 단, `let`키워드를 이용하면 블록 레벨 스코프를 이용할 수 있습니다.
```javascript
var x = 1;
{
  var x = 0;
  console.log(x);    //0
}
console.log(x);   //0

let y = 1;
{
  let y = 0;
  console.log(y);   //0
}
console.log(y);   //1
```
- [참고자료](https://poiemaweb.com/js-scope)

<hr>

## JavaScript와 세미콜론(;)
JS 코드의 끝에 꼭 세미콜론을 써야할까요? 사실 세미콜론을 굳이 넣지 않아도 됩니다! JS의 경우 세미콜론을 써주지 않아도 인터프리터가 **세미콜론 자동 삽입**<small>ASI, automatic semicolon insertion</small>을 해줍니다. 

그러나 JS 코딩에 기본 규칙은 문장의 끝에 세미콜론을 작성하는 것 입니다. 다음의 예시를 통해 세미콜론 없이 코딩하는 것이 어떤 부작용을 일으키는지 살펴봅시다.

![](/assets/img/JS_semicolon.png)
<!-- <div style="text-align: center; margin: 5px;">
<img src="{{"/assets/img/JS_semicolon.png" | relative_url}}"  style="width: 90%;">
</div> -->

결론을 내리면, 세미콜론을 굳이 넣지 않아도 됩니다. 다만, 좀더 명확한 코드가 필요할 때는 세미콜론을 넣어줍시다!

- [참고자료](https://bakyeono.net/post/2018-01-19-javascript-use-semicolon-or-not.html 
)
