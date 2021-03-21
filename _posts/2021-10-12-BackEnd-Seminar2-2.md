---
title: "BackEnd Seminar 2-2"
layout: post
---

#### 수업의 키워드
- 모듈화
- `exports` 객체와 `require` 함수
- `require`와 라이브러리

<hr>

모든 코드를 하나의 js 파일에 관리하는 것은 비효율적이고 코드의 가독성을 떨어뜨립니다. 이것을 해결하기 위해 코드를 모듈화 해봅시다.

#### `exports` 객체와 `require` 함수
JS에서 '**모듈**'은 js 파일 하나에 대응되는 개념입니다. 즉, js 파일 하나가 모듈의 역할을 하는 셈입니다. 그리고 js 파일을 만들어 코드를 분리함으로써 어플리케이션을 모듈화 할 수 있습니다.

다음의 코드를 모듈화 해봅시다.

``` javascript
const PI = 3.14
const square = (num) => {
  return num * num;
}
const getCircleArea = (radius) => {
  return 0.5 * PI * square(radius);
}

console.log(`radius: ${3}, Circle Area ${getCircleArea(3)}`);
```
[^1]

원의 넓이를 구하는 일련의 과정을 `circle.js`의 파일로 분리합시다. 이때 `exports` 객체를 활용합니다.

``` javascript
const PI = 3.14
const square = (num) => {
  return num * num;
}
const getCircleArea = (radius) => {
  return 0.5 * PI * square(radius);
}

exports.getArea = getCircleArea;
```

이렇게 모듈화한 파일을 `require` 함수를 통해서 사용할 수 있습니다.

``` javascript
const circle = require('./circle');

console.log(circle);
console.log(circle.getArea(1));
```

```
{ getArea: [Function: getCircleArea] }
1.57
```
터미널에 `circle`을 출력해보면, `circle.js`의 `exports` 객체와 동일하다는 것을 알 수 있습니다. 그리고 `.`을 통해 객체에 저장된 value를 사용할 수 있습니다.

<hr>

서버를 개발할 때는 여러 라이브러리를 사용합니다. `require` 함수를 사용해 라이브러리를 로드하는 방법을 알아봅시다.

#### `require`와 라이브러리
지난 시간에 작성한 `myProfile.json` 파일을 읽고 출력하는 코드를 작성해봅시다. 우리는 File I/O를 위해 `fs` 라이브러리를 로드하고, json 파일의 내용을 출력 해보겠습니다.[^2]

``` javascript
const fs = require('fs');
const myProfile = fs.readFileSync('myProfile.json')
const myProfileJSON = JSON.parse(myProfile);

console.log(myProfileJSON);
console.log(myProfileJSON.name);
```

`JSON.parse()`은 `fs.readFileSync()`를 통해 읽은 값은 string이기 때문에 이것을 JSON 객체로 변환하는 과정을 수행합니다.

<hr>

<br>

이것으로 서버를 개발하기 위해 꼭 필요한 JS 문법은 다 살펴보았습니다. 다음 수업부터는 Node.js의 `express` 라이브러리를 통해서 직접 서버를 만들어보도록 하겠습니다 :)

<hr>

[^1]: 결과를 출력할 때, 백틱(`)을 사용한 문자열을 사용하였습니다. 백틱 방식으로 문자열을 표현하게 되면, 손쉽게 값을 string과 함께 출력할 수 있습니다.
[^2]: `fs`는 *file system* 의 약자입니다.

