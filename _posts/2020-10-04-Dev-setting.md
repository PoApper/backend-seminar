---
title: "개발환경 세팅"
layout: post
date: 20210321
---

## 개발환경 세팅

수업을 시작하기에 앞서 개발환경을 세팅합시다. 첫수업 시작 전에 반드시 완료해주세요!!

### `Node.js` 설치

이번 백엔드 세미나에서는 `Node.js` 언어로 수업을 진행합니다.

여러분의 OS에 따라 설치하는 과정이 다르기 때문에, 제가 윈도우/Mac을 모두 커버하는 것은 무리라고 판단했습니다. 그래서 생활코딩의 egoing 님의 동영상을 보고, 자신의 OS에 맞는 방법으로 `Node.js`를 설치해주세요!!

-> [링크](https://opentutorials.org/course/3332/21029)

설치 후, 아래의 명령어로 설치가 잘 되었는지 꼭 확인해주세요!!

``` shell
node -v
npm -v
```

#### `npm`이란?

`npm`은 `Node.js`에서 사용하는 라이브러리들을 손쉽게 설치하고 관리하는 도구입니다. `python`의 `pip`이나 `conda` 같은 녀석이라고 이해하면 될 것 같습니다!

<hr>

### `VS Code` 설치[^1]

`C`/`C++`을 경험해보신 분들이라면, `Visual Studio`에서 주로 코딩을 해오셨을 것 같습니다. 그러나 `Node.js`에서는 Visual Studio 보다는 동일 회사에서 만든 `VS Code`를 에디터로 사용하고자 합니다.

`VS Code`는 Visual Studio보다 경량화 되어 있고, 코드 작성에 더 특화되어 있습니다.

아래의 링크에서 `VS Code`를 다운로드해 설치해주세요!

-> [링크](https://code.visualstudio.com/download)

#### `VS Code` Extension 설치

`Node.js` 코딩에 필수적인 또는 도움을 주는 VS Code의 Extension을 설치해봅시다.

##### `Material Theme` (선택)
VS Code에서의 코드 화면과 아이콘의 테마를 바꾸어주는 Extension 입니다.

아래의 링크를 따라 설치하시면 됩니다.

-> [링크](https://dololak.tistory.com/730)

<hr>

### Q: `JavaScript`와 `Node.js`는 차이가 뭔가요?

`JavaScript`와 `Node.js`는 '거의' 동일한 언어입니다. 다만, 어떤 환경에서 실행하느냐에 따라 `JavaScript` / `Node.js`로 불리게 됩니다.

`JavaScript`는 **브라우저(browser)**가 `.js` 파일을 실행시킵니다. 반면에 `Node.js`는 **node**라는 녀석이 `.js` 파일을 실행시킵니다.

역사적으로는 `JavaScript`가 1995년 웹브라우저에 처음 탑재되었고, 2009년 `JavaScript`를 윈도우/Mac과 같은 일반적인 환경에서도 작동할 수 있도록 만든 것이 `Node.js`입니다.[^2]

웹브라우저에서 사용되는 `JavaScript`와는 달리, `Node.js`는 서버를 동작하기 위해 특화된 언어입니다. 그래서 `JavaScript`와 `Node.js`가 같은 언어 일지라도 작동되는 환경이 다르기 때문에 몇몇 함수들은 서로 호환이 되지 않는 경우가 종종 있습니다. 다만, 백엔드 세미나에서는 '서버'라는 주제를 다루기 때문에 `JavaScript`에 대해서나 둘의 차이에 대해서는 다루지 않겠습니다.

<hr>

### 얼른 `Node.js`를 배우고 싶어요!!

여러분이 백엔드 개발에 큰 열정을 가지고 있다면, 아래의 자료들을 추천해드리겠습니다.

- [생활코딩: WEB2 - Node.js](https://opentutorials.org/course/3332)
  - 개인적으로 생활코딩 egoing 님의 강좌를 정말 추천합니다. 저도 이 강좌를 통해 `Node.js`의 기초를 다질 수 있었습니다 :)
- [Node.js 교과서(조현영 지음)](http://www.yes24.com/Product/Goods/62597864)
  - 인터넷 강좌보다는 교재를 선호하시는 분들은 이 교재를 추천드립니다. JS 아키텍처부터 데이터베이스까지의 범위를 다루면서, 설명이 잘 되어 있습니다!

<br>

제가 여유가 있다면, 앞으로도 수업 내용이나 보충할 것들에게 대해 이렇게 포스트를 작성할 예정입니다. 그 외에 더 궁금한 점이 있다면, 언제든지 질문해주세요! 여러분의 질문을 환영합니다 :)

<hr>

[^1]: 간혹 github의 `Atom` 에디터를 사용하시는 분들도 있습니다. `VS Code` 대신 Atom을 써도 괜찮으나 백엔드 수업을 `VS Code`로 진행할 것이기 때문에 저와 UI나 단축키가 다를 수 있습니다!

[^2]: 단, 모든 서버가 `Node.js`로 작성되는 것은 아닙니다. `python`이나 `Java`로 서버를 구축하기 합니다. 어떤 언어로 서버를 구축할지는 Design choice 입니다 ㅎㅎ