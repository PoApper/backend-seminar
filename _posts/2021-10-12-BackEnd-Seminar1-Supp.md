---
title: "BackEnd Seminar 1(보충)"
layout: post
---

#### 키워드
- JavaScript에서의 데이터 타입
- JavaScript와 세미콜론(;)

<hr>

### JavaScript에서의 데이터 타입
`1 === 1.0`의 결과는 `True`입니다. C언어에서는 정수인 `1`과 실수인 `1.0`이 다른 타입이었지만, JS에서는 정수와 실수를 아울러 `Number`라는 타입으로 관리합니다.

JS에서는 **기본 데이터 타입**[^1]<small>primitive type</small>과 **참조 데이터 타입**<small>reference type</small>, 두 가지로 나뉩니다.

기본 데이터 타입에는 `Number`, `String`, `Boolean`, `undefined`, `null`이 있습니다. 그리고 참조 데이터 타입에는 `Object`를 포함하여 `Array`, `Function` 등이 있습니다.

기본 데이터 타입은 변수에 저장할 때나 함수에 전달할 때, 데이터 값 자체가 복사됩니다. 반면에 참조 데이터 타입은 데이터의 참조(reference)가 전달됩니다. 예제를 통해 살펴봅시다.

``` javascript
var x = 100;        // 원시 타입 데이터를 선언
var y = x;          // 값을 새 변수에 복사
x = 99;             // 'x'의 값을 변경
console.log(y);     // 100, 'y'의 값은 변경되지 않음
```

``` javascript
var x = { count: 100 };   // 참조 타입 데이터를 선언
var y = x;              // 참조를 새 변수에 복사
x.count=99;             // 참조 타입 데이터를 변경
console.log(y.count);   // 99, 'x'와 'y'는 동일한 참조를 담고 있으며, 따라서 동일한 객체를 가리킴
```

<hr>

### JavaScript와 세미콜론(;)
JS 코드의 끝에 꼭 세미콜론을 써야할까요? 사실 세미콜론을 굳이 넣지 않아도 됩니다! JS의 경우 세미콜론을 써주지 않아도 인터프리터가 **세미콜론 자동 삽입**<small>ASI, automatic semicolon insertion</small>을 해줍니다. 

그러나 JS 코딩에 기본 규칙은 문장의 끝에 세미콜론을 작성하는 것 입니다. 다음의 예시를 통해 세미콜론 없이 코딩하는 것이 어떤 부작용을 일으키는지 살펴봅시다.

<div style="text-align: center; margin: 5px;">
<img src="{{"/assets/img/JS_semicolon.png" | relative_url}}"  style="width: 90%;">
</div>

결론을 내리면, 세미콜론을 굳이 넣지 않아도 됩니다. 다만, 좀더 명확한 코드가 필요할 때는 세미콜론을 넣어줍시다!

- [참고자료](https://bakyeono.net/post/2018-01-19-javascript-use-semicolon-or-not.html 
)

<hr>

[^1]: "원시 타입"이라고도 합니다.