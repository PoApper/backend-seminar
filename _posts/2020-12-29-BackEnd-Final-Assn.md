---
title: "BackEnd Seminar - 최종 과제"
layout: post
published: false
---

<br>

## 기억 상자

<div style="font-size: large;" markdown="1">

■ **due date**<br>
~~2021.01.08(금)~~ 2021.01.10(일) 23:59:59<br>
<small>(최종 과제를 제출해야 세미나 이수가 인정됩니다.)</small>

</div>

### 도입말

#### 에빙하우스의 망각 곡선

[에빙하우스의 망각곡선](https://ko.wikipedia.org/wiki/%EB%A7%9D%EA%B0%81_%EA%B3%A1%EC%84%A0)에 따르면, 학습 이후 20분만 지나도 학습한 내용의 48%가 사라진다고 한다. 그리고 시간이 지날 수록 학습한 내용은 머릿속에서 점점 사라져 간다. 망각 곡선에 따르면, 사람은 암기한 내용의 20%만을 영구적으로 저장한다고 한다. 

<div style="text-align: center; margin: 10px;">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/ForgettingCurve.svg/1280px-ForgettingCurve.svg.png" style="width: 35%;">
</div>

하지만 절망하기에는 이르다. 그의 연구에 따르면, 학습한 지식을 의식적으로 **복습**한다면 망각의 속도가 느려진다고 한다. 그리고 이 복습의 효과는 중복 적용이 가능하기 때문에 복습이 중첩 될수록 망각의 속도는 점점 느려지게 된다. 그리고 그 지식은 **장기 기억**으로 전환된다.

<br>

#### 라이트너 암기법

<div style="text-align: center; margin: 10px;">
<img src="https://t1.daumcdn.net/cfile/tistory/25680A3F57C058FF27" style="width: 45%;">
</div>

책 "누구나 알지만 아무도 모르는 - 공부의 비결"의 저자 라이트너 박사는 망각을 극복하고, 단기 기억을 장기 기억으로 효율적으로 전환하기 위해 "**라이트너 암기법**"라는 학습법을 제시하였다.

학습 카드를 만들어 앞면에는 암기하려는 단어를, 뒷면에는 단어의 뜻을 적는다. 그리고 학습 카드를 담을 상자를 만든다. 5칸 정도로 만드는데, 첫칸은 아주 좁고, 두번째 칸은 그보다 조금 넓고, 세번째는 그보다 넓은 식으로 상자를 만든다.

처음에는 학습 카드를 가장 좁은 첫째 칸에 모두 넣는다. 앞장부터 하나씩 카드를 꺼내며 정답을 맞주면 다음 칸으로 옮기고, 틀리면 다시 첫째 칸의 맨 끝으로 돌려보낸다. 이런 식으로 복습을 진행하다가 두번째 칸에 카드가 어느 정도 차게 되면, 이번에는 두번째 칸에서 과정을 반복한다. **이때, 카드를 틀리게 되면 항상 첫째 칸의 맨끝으로 카드를 돌려보낸다.** 이것을 셋째, 넷째, 다섯째 칸에서도 동일하게 진행한다. 만약 마지막 칸에서 과정을 진행해보자. 만약 마지막 다섯째 칸에서 정답을 맞춘다면, 그 카드의 내용은 확실히 학습된 것이기 때문에 카드를 상자에서 꺼내어 휴지통에 버린다!

<br>
<hr>

### 서버를 이용해 기억상자 구현하기

2020-2 백엔드 세미나의 최종 과제는 앞에서 소개한 **"라이트너 암기법"의 상자 역할을 하는 서버와 간단한 웹사이트를 구현**하는 것이다. [Quizlet](https://quizlet.com/ko)과 비슷한 서비스를 개발한다고 생각하면 될 것 같다.

구체적인 개발 조건은 아래와 같다.

<div style="padding: 10px; background-color: #ffefcb;" markdown="1">

1. 단어 학습 카드
2. 이미지 학습 카드
3. 공통 조건
   - 서버
   - 프론트

</div>

<br>

#### 단어 학습 카드

여러분의 어플리케이션은 라이트너 암기법을 이용해 단어를 학습하고 암기하는 기능을 제공해야 한다. 이를 위해 아래의 기능들이 필요하다.

<br>

**<u>* 단어 학습 카드 CRUD</u>**

학습할 단어를 생성 / 조회 / 삭제할 수 있는 REST API를 구현해야 한다. <br>
(학습 카드의 내용을 수정(Update)하는 기능은 구현하지 않는다.)

- `Create` API는 학습 카드를 생성할 때 사용한다.
- `Read` API는 상자에서 학습 카드를 출력할 때 사용한다.
- `Delete` API는 학습 카드를 상자에서 방출될 때 사용한다.

학습 카드에는 `단어`와 `뜻` 두 가지 정보가 반드시 저장되어야 한다.

<br>

**<u>* 카드 상자 디자인</u>**

사용자는 웹프론트 사이트를 통해 라이트너 서비스를 이용할 수 있어야 한다. 즉, '도입말'에서 소개된 것처럼 카드가 다섯 칸에 나눠 담겨 있으며, 사용자는 특정 칸에 학습카드가 충분히 모이면, 해당 칸에 대한 학습을 진행하는 방식이다.

상자의 다섯 칸의 용량은 첫칸이 10장, 두번째 칸이 20장으로 하여 매 칸마다 10장씩 용량이 늘어난다.

단, 각 칸의 용량은 사용자에게 해당 칸의 내용을 복습하라는 가이드 역할만 한다. 즉, 해당 칸의 용량을 초과하여 학습 카드를 담을 수 있다.

<br>

**<u>* 유저 상호작용</u>**
<div style="text-align: center;">
<img src="{{"/assets/img/backend_seminar_final_assn1.png" | relative_url}}" style="width: 40%;">
<p>(이 디자인은 설명을 위한 예시일 뿐입니다!)</p>
</div>

1. 유저는 라이트너 상자에서 학습할 칸을 선택한다.
2. 학습할 칸에 담긴 학습 카드가 화면에 출력된다.
3. 사용자는 버튼을 눌러 정답을 확인할 수 있다.
4. 학습 카드의 내용을 맞췄다면, 학습 카드는 다음 칸에 담기며, 해당 칸의 count가 1 증가하고, 원래 칸의 count가 1 감소한다. 
5. 만약 학습 카드의 내용을 틀렸다면, 학습 카드는 첫번째 칸에 담기며, 선택한 칸의 count가 1 감소하고, 첫째 칸의 count가 1 증가한다. 
6. 화면에는 유저가 선택한 칸의 다음 카드가 출력된다.
7. 만약 유저가 선택한 칸에 더이상 학습 카드가 남아있지 않다면, 적절한 안내 문구를 출력한다.

<br>

#### 이미지 학습 카드

몇몇 학습카드는 문제를 기술할 때에 사진이나 `LaTex` 수식 등을 필요로 할 수도 있다. 하지만, 학습 카드에 텍스트 외에 추가적인 자료를 넣는 것은 어싸인의 수준을 상회하기 때문에 좀더 간단한 방식을 채택하고자 한다. 즉, 문제가 기술된 이미지 자체가 학습카드 되어 라이트너 학습법을 진행한다.

이미지 학습 카드는 앞의 단어 학습 카드에서 학습 카드의 내용이 (단어, 뜻)의 쌍에서 (사진, 뜻)으로 바뀌었을 뿐 모든 기능은 동일하다.

<br>

**<u>* 이미지 학습 카드 CRUD</u>**

모든 조건이 '단어 학습 카드'와 동일하다.

이미지 학습 카드에는 `이미지`와 `정답` 두 가지 정보가 반드시 저장되어야 한다.

단, 이미지 학습 카드를 생성하기 위해선 클라이언트에서 서버로 이미지 파일을 전송 및 업로드할 수 있어야 한다. 이것은 `Multer` 모듈을 이용해 수행할 수 있다. 아래의 링크를 참고하자.

- [Express에서 `Multer` 모듈로 파일 업로드하기](https://m.blog.naver.com/sssang97/221642022702)

<br>

**<u>* 카드 상자 디자인</u>**

모든 조건이 '단어 학습 카드'와 동일하다.

<br>

**<u>* 유저 상호작용</u>**

모든 상황이 '단어 학습 카드'와 동일하다.

다만, 학습카드가 나오는 부분이 텍스트가 아니라 이미지로 바뀌었다. 

이미지가 출력되는 영역은 **고정 사이즈(fixed size)**여야 한다. (즉, 이미지 크기별로 출력 영역이 resize 되면 안 된다.) 이것은 이미지를 담는 `<div>` 태그에 아래와 같은 `CSS`를 추가하여 구현할 수 있다.

``` html
<div class="img-wrapper">
  <img src="image-source"></img>
</div>
```

``` css
.img-wrapper {
  text-align: center;
  max-width: 500px;
}
img {
  max-width: 100%;
}
```

<br>

#### 공통 조건

본 과제에서는 서버 개발과 함께 프론트 페이지 작성도 포함된다. 

##### 서버
- 서버 개발은 `ExpressJS` 프레임워크로 개발한다.
- 데이터베이스는 `MySQL` 데이터베이스로 개발한다.
- `MySQL` Database는 세미나에서 진행했던 `poapper_backend` 데이터베이스를 그대로 이용한다.
- (중요) 서버를 구현할 때, 하나의 `.js` 파일에 모든 기능을 구현해서는 안 된다. 서버를 기능/의도에 따라 적절히 소스코드를 분리하여 구현해야 한다.
- 완성된 어플리케이션은 서버와 프론트 페이지는 `local` 환경이 아니라, 외부에서 호스팅되는 상태여야 한다.
  - 즉, 채점자가 본인의 컴퓨터에서 App을 실행해 채점하는 방식이 아니라 채점자가 완성된 어플리케이션에 접속해 기능을 테스트한다.

##### 프론트
- 프론트 페이지 작성에는 별다른 제약은 없다. 본인이 원하는 프레임워크를 사용해 구현하면 된다.
  - 다만, 웹페이지가 내용이 바뀌지 않는 정적(static)인 상황은 아니기 때문에 `pure html`로 구현하기에는 조금 무리가 있을 것 같다.
  - 세미나에서 다뤘던 `http`/`ExpressJS`를 통해 `html` 페이지 호스팅하는 방식을 통해 동적인 웹페이지를 제작할 수 있다.
  - 만약 `ReactJS` 프레임워크를 다룰 줄 안다면, `ReactJS`로 구현하는 것을 추천한다.
  - 또는 `ejs`나 `hbs`와 같은 템플릿 엔진을 이용해 동적인 페이지를 구현할 수도 있다.

- 프론트 페이지는 어플리케이션에서 요구하는 기본적인 기능을 수행할 수 있는 수준만 구현하면 충분하다.
  - 즉, 웹프론트의 디자인은 채점 요소에 포함되지 않는다.
- 만약 어플리케이션의 웹프론트를 어떻게 디자인할지 감이 잡히지 않는다면, 비슷한 기능을 수행하는 사이트인 [Quizlet](https://quizlet.com/ko)의 디자인을 참고하라.

<br>
<hr>

### 채점 및 통과 기준

과제 Due는 `2021.01.08(금) 23:59:59`이다. 

완성된 서버와 프론트에 대한 소스 파일을 압축하여 메일로 제출한다.

완성된 어플리케이션은 `local` 환경이 아니라, 외부에서 호스팅되는 상태여야 한다.

즉, 채점자가 본인의 컴퓨터에서 App을 실행해 채점하는 방식이 아니라 채점자가 완성된 어플리케이션에 접속해 기능을 테스트한다.

따라서 **<u>제출 이메일에 본인의 사이트에 대한 웹주소를 함께 기입한다.</u>**

<br>
<hr>

Final Assignment를 통과해야 최종적으로 백엔드 세미나의 수료가 인정된다.

채점 시 고려하는 사항은 아래와 같다.

- Assn에서 요구하는 "라이트너 암기법"의 기능이 잘 구현되었는가?
- CRUD 기능이 잘 구현되었는가?
- 서버를 구현할 때, 하나의 파일에 모두 구현한 것이 아니라 기능에 따라 파일을 분리하고, 재사용하였는가?
- 크롬 개발자 콘솔로 웹사이트를 확인했을 때, `console` 창에 오류 메시지가 등장하지는 않는가?
- 서버 코드에 **주석이 적절히 달렸는가**? (주석은 모두 영어로 작성해주세요!)
- `README.md`에서 서버 디자인에 대해 잘 설명했는가?

위의 조건을 "모두" 총족한다면, Fianl Assn을 통과한 것이 된다.

<br>

1차 채점 후, 만약 어플리케이션의 구현이 미흡하다면, 피드백과 함께 최대 하루의 연장 제출할 수 있다.

<br>

구현에 어려움을 겪는다면, 멘토의 도움을 요청할 수 있다. 단, 빠른 문제해결을 위해 요청 전에 문제 상황을 3~4 문장으로 요약하여 제시하길 부탁한다.
