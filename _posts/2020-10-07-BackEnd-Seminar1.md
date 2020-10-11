---
title: "BackEnd Seminar 1"
layout: post
---

수업 영상 링크: [link](https://drive.google.com/file/d/1z1zMw7psF7QyYaSpmDLOVABKg-FaSjpz/view?usp=sharing)

#### 수업의 키워드
- 변수: `var` / `let` / `const`
- 비교 연산자: `==` / `===`
- 배열 & 반복문
- 함수 ★
- 객체 ★
- JSON ★

<hr>

### Hello JavaScript
JavaScript를 이용해 터미널에 문자열을 출력해봅시다.

**VS Code**에서 `Hello.js` 파일 생성

``` javascript
console.log("Hello JavaScript");
```

터미널에서
``` shell
node Hello.js
node Hello
```

`console.log()` 함수를 통해서 터미널에 값을 출력할 수 있습니다!!

<hr>

## 변수
JavaScript에서는 `var`, `let`, `const` 키워드를 사용해 변수를 선언할 수 있습니다.

``` javascript
var v1;
let v2;
const v3;
```

### `var`
``` javascript
var name = "this is variable";
console.log(name); // this is variable

var name = "this is another variable";
console.log(name); // this is another variable
```

`var` 키워드로 변수를 선언할 경우, **같은 이름**으로 여러 번 선언이 가능합니다.

### `let`
``` javascript
let name = "this is variable";
console.log(name); // this is variable

let name = "this is another variable"; // 오류!
// SyntaxError: Identifier 'name' has already been declared

name = "this is another variable"; 
console.log(name); // this is another variable
```

`let`은 `var`와 달리 선언된 변수를 재언선하는 것이 불가능합니다.

다만, 값의 재할당은 가능합니다!!

### `const`
``` javascript
const pi = "this is variable";
console.log(name); // this is variable

const name = "this is another variable"; // 오류!
// SyntaxError: Identifier 'name' has already been declared

name = "this is another variable"; // 오류!
// TypeError: Assignment to constant variable
```

`const`는 값을 **재할당하는 것**도 불가능합니다.

<hr>

## 비교연산자
JavaScript에는 두 가지 비교 연산자가 있습니다.

### `==`
``` javascript
console.log(1 == 2); // false
console.log(1 == "1"); // true
console.log(0 == false); // true
console.log(null == undefined); // true
```

`==` 연산자는 `1 == "1"` 같이 두 변수의 타입이 다르더라도 type conversion으로 타입을 같게 만들어 비교 연산을 진행합니다.

### `===`
``` javascript
console.log(1 === "1"); // false
console.log(0 === false); // false
console.log(null === undefined); // false
```

`===`는 `==`보다 더 강한 조건의 비교 연산자 입니다. 두 변수의 type까지 같아야 `true`를 반환합니다.

cf) 부정형은 `!==`

<hr>

## 배열
JavaScript에서는 배열을 `[]`를 통해 표현합니다.

``` javascript
let arr1 = [1, 2, 3, 4];
let arr2 = [1, "two", 3, 4.0];
```

JavaScript의 배열은 타입이 다른 원소도 수용할 수 있습니다.

## 반복문
JavaScript의 반복문은 다음과 같습니다.
``` javascript
let arr1 = [1, 2, 3, 4];
for(let i=0; i < arr1.length; i++){
  console.log(arr1[i]);
}
```

<hr>

## 함수 (1)
JavaScript에서는 다음과 같이 함수를 선언합니다.

``` javascript
function square(number) {
  return number * number;
}
```

JavaScript에서는 함수를 하나의 변수로서 취급합니다. 그래서 함수 정의와 동시에 변수에 저장할 수 있습니다.

``` javascript
let square = function(number) {
  return number * number;
}
```

이런 방식을 **함수 표현식(Function expression)**이라고 합니다. 용어 자체는 중요하지 않지만, 함수를 변수에 담을 수 있다는 개념은 정말 중요합니다!!

``` javascript
let sqaure_side = 5;
let square_area = square(square_side);
```

<hr>

## 객체
JS는 객체(Object) 기반의 언어입니다. JS를 이루는 거의 모든 것이 '객체'이기 때문에 여러분은 이미 객체를 사용하고 있습니다만, 좀더 자세히 알아봅시다!

**프로퍼티(property)**란 키(key)와 값(value)의 쌍입니다.

그리고 **객체(object)**는 이 프로퍼티의 집합입니다.

``` javascript
let member = {
  id: "user_id",
  pw: "123456789",
  role: "student"
}
```

객체의 value에는 어떤 값이든 담을 수 있습니다.

``` javascript
let member = {
  id: "user_id",
  pw: "123456789",
  role: "student", 
  func: square // 함수를 value로 저장
}
```

객체 인덱스 `[]`를 통해 이미 선언된 객체의 value에 접근할 수도 있고, 새로운 property를 추가할 수도 있습니다.

``` javascript
console.log(member["id"]);
member["gender"] = "male";
```

또는 `.`을 이용할 수도 있습니다.

``` javascript
console.log(member.id);
member.gender = "male";
```

<hr>

## JSON
JSON(JavaScript Object Notation)은 구조화된 정보를 표현하는 형식(format)입니다. JS 객체와 동일하게 JSON도 key-value 관계로 정보를 저장합니다.

``` javascript
let json1 = {
  "id": "user_id",
  "pw": "123456789",
  "role": "student", 
}
```

JSON은 `.json` 확장자를 통해 별도의 파일로도 저장합니다.

``` json
{
  "name": "hsy4462",
  "job": "student",
  "age": 22,
  "hobby": ["jazz", "steam game"],
  "course_table": [
    {"name": "computer vision", "id": "AIGS539"},
    {"name": "Software Design", "id": "CSED332"},
    {"name": "Modern Algebra 1", "id": "MATH301"},
    {"name": "응용복소함수론", "id": "MATH210"},
    {"name": "중영작", "id": "GEDU131"},
  ]
}
```

서버는 프론트/유저와 상호작용할 때, JSON 형식에 따라 정보를 주고 받습니다.

