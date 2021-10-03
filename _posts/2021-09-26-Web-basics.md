---
title: "Seminar 전에 배우는 WEB 개발 기초"
layout: post
date: 20210926
published: true
---
#### 키워드
 - 웹 개발 기초 용어
  <hr>

### 도입말
Backend Seminar에 오신 여러분을 환영합니다! Backend Semniar에 앞서, 여러분이 웹 개발을 할 때 "이건 모르면 안된다!" 하는 용어를 모아봤습니다! 웹 개발을 하기위해 "당연히" 알아야 하는 용어들이니, 여러 번 읽어보며 익숙해 지셨으면 좋겠습니다!
<hr>

## 목차

- [목차](#목차)
    - [**1. 프론트엔드**](#1-프론트엔드)
    - [**2. 백엔드**](#2-백엔드)
    - [**3. API**](#3-api)
    - [**4. Package Manager**](#4-package-manager)
    - [**5. npm**](#5-npm)
    - [**6. git**](#6-git)
    - [**7. github**](#7-github)
    - [**8. 프레임워크**](#8-프레임워크)
    - [**9. 라이브러리**](#9-라이브러리)

<hr>

#### **1. 프론트엔드**

프론트엔드는 사용자가 직접 시각적으로 마주하게 되는 UI(유저 인터페이스)를 말합니다. 프론트 엔드 개발은 이런 인터페이스를 구축하는 역할을 맡는다고 볼 수 있습니다.

유저는 사용하기 쉽고 완전한 기능을 가진 인터페이스를 갖춘 웹사이트에 더욱 활발히 참여하게 되므로 서비스의 경쟁력과 직접적으로 연결된 분야라 할 수 있습니다!
프론트엔드는 HTML, CSS, javascript등의 언어를 사용하여 구현하며, Angular js, ReactJs, Bootstrap 등의 프레임 워크를 사용합니다.
<div style="text-align: center; margin: 10px;">
<img src="https://d2v80xjmx68n4w.cloudfront.net/gigs/T1kYc1581847355.jpg" style="width: 45%;">
</div>
<hr>

#### **2. 백엔드**
백엔드는 주로 프로그램이 작동하는 서버, 데이터 처리, 보안을 담당하는 분야입니다. 백엔드단이 수행하는 역할은 크게 3가지로 나눌 수 있습니다.
* API 개발 
  
* 데이터 베이스를 구축 및 관리하는 역할

* 서버를 구축 및 관리하는 역할

첫번째로, API 개발 입니다.(API가 뭔지 모르신다면 [여기로](#3-api)) 

백엔드 개발자는 API 서버에서 클라이언트의 요청에 응답할 수 있도록 API를 개발합니다. 세미나에서 대부분의 내용이 여기에 해당됩니다.


두번째로, 백엔드 개발자는 데이터 베이스를 구축 및 관리하는 역할을 맡게 됩니다. 

데이터 베이스는 유저에게 서비스를 제공하기 위해 필요한 모든 데이터들이 저장되어 있는 공간으로, 이러한 공간을 설계하고 유지, 보수하는 역할을 백엔드 개발자가 맡게 됩니다. 여러분은 이 세미나에서 Mysql 데이터 베이스를 다루는 방법에 대해서 배우게 될 것입니다.

세번째로, 서버를 구축 및 관리하는 역할을 맡습니다.

웹을 제공하기 위해서는 웹 서버가 필요하고, 데이터를 제공하기 위해서는 데이터 베이스 서버가 필요합니다. 클라이언트와 데이터 베이스가 통신하기 위해서는 API 서버가 필요합니다. 이렇게 서비스를 제공하기 위해서는 서버들을 구축하고, 관리해야 합니다. 서버를 구축한다는 말은, 아무것도 없는 컴퓨터에서 여러분이 작성한 코드를 실행시키기 위해서 서버 프로그램을 설치하는 과정을 의미한다고 보시면 됩니다. 여러분은 이 세미나의 마지막 챕터로 vultr를 이용해 클라우드 서버를 구축하는 방법을 배우게 되실 겁니다.<br>


벡엔드 개발에 사용되는 언어는 Ruby, Node.js, Java, Python 등이 있으며, 사용되는 프레임워크는 Java의 spring, Node.js의 express, Nest js 등이 있습니다.
<div style="text-align: center; margin: 10px;">
<img src="https://www.overops.com/wp-content/uploads/2020/09/Backend-Languages-1.png" style="width: 80%;">
</div>
<hr>

#### **3. API**
API(Application Programming Interface)는 본래 의미 그대로 풀이해보면 "응용프로그램 간에 데이터를 주고받는 방법" 으로 해석할 수 있습니다. API를 좀 더 깊게 이해해 보기위해, [한 블로그](#http://blog.wishket.com/api%EB%9E%80-%EC%89%BD%EA%B2%8C-%EC%84%A4%EB%AA%85-%EA%B7%B8%EB%A6%B0%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8/)
에서 API를 음식점의 점원으로 비유한 내용을 인용하겠습니다.

![](/assets/img/webdev-basics/API_example.png)

 여러분이 어떤 음식점에 갔다고 생각해봅시다. 점원은 여러분에게 메뉴판을 보여주고, 여러분은 메뉴판을 보고 점원에게 어떤 음식을 먹을 것인지에 대한 정보를 전달합니다. 점원은 그 정보를 요리사에게 전달하고, 요리사는 그 요구사항에 대한 결과물(음식)을 점원에게 전달합니다. 그 뒤 점원은 이를 손님에게 전달하게 됩니다.

 ![](/assets/img/webdev-basics/API_operating.png)

 API는 위의 점원과 같이, 손님(프로그램)이 주문할 수 있게 메뉴(명령 목록)을 정리하고, 주문(명령)을 받으면 요리사(응용프로그램)와 상호작용하여 요청된 메뉴(명령에 대한 값)를 전달합니다. 
쉽게 말해, API는 프로그램들이 서로 상호작용하는 것을 도와주는 매개체로 볼 수 있습니다. <br>
API는 프론트 단에서 요청하는 정보가 들어있는 데이터 베이스에 대한 출입구 역할을 하게 됩니다. 만약 유저가 프론트 인터페이스에서 <가게 목록> 이라는 버튼을 입력했다면, 프론트는 API 서버에 <가게 목록>에 대한 정보를 요구하게 되고, API는 <가게 목록>이라는 명령에 부합하는 정보를 데이터 베이스 서버에서 찾도록 하게 한 뒤, 해당 정보를 받아 프론트 단에 전달하게 됩니다.

<hr>

#### **4. Package Manager**


패키지 매니저란 패키지를 다루는 작업을 편리하고 안전하게 수행하기 위해 사용되는 도구입니다. 

그 전에, 패키지란 무엇일까요? 패키지란 단순하게 어떤 프로그램이나 소프트웨어를 말한다고 생각하면 될 것 같습니다. 

여러분이 개발을 하다보면 그 과정에서 필요한 특정 기능들 (ex. 데이터 서버에 프로그램을 연결하기.. 파일을 출력하기.. 등등)을 직접 구현하기 보다는 다른 사람이 이미 만들어 놓은 프로그램(라이브러리, 또는 특정 함수)들을 일종의 부품으로서 가져다 사용하는 경우가 많습니다. 

이때 여러분이 가져다가 사용하는 부품으로서 기능하는 프로그램을 패키지라고 합니다. 다시말해, 패키지 매니저는 이러한 부품들을 다루는 작업을 수행합니다.

패키지 매니저는 코드를 배포하여 다른사람이 그 프로그램을 쉽게 실행시킬 수 있도록 하기위한 목적으로 쓰이는데, 패키지 매니저를 통해 코드를 작성할 때 어떤 패키지가 사용되었고, 이 코드를 실행하기 위해서 필요한 패키지가 뭔지 파악할 수 있기 때문입니다. 이것이 Package Manager의 역할 중 하나인 Dependency 관리입니다.

Poapper Github에 가서 POPO-nest-api와 같은 repository를 뒤져보면, Package.json이라는 파일을 보실 수 있을 것입니다. 이 파일에 포함되어 있는 dependency가 앞에서 말한 dependency와 같은 의미입니다.

<hr>

#### **5. npm**
Node js를 위한 Package Manager 입니다. Node js를 설치할 때 같이 설치됩니다.

<hr>

#### **6. git**
git은 간단하게 말해서 코딩의 과정을 기록해 놓을 수 있는 툴이라 할 수 있습니다. 아마 프밍이나 객체를 들으면서 어싸인을 진행할 때, 어제까지만 해도 잘 실행되던 코드가 오늘 수정해보니 실행이 안되는 경험이 있으실 겁니다. 그때마다 코드를 되돌리고 싶지만 쉽지 않으셨을 거라 생각합니다. Git이라는 툴은 그것을 가능하게 합니다. 예를 들어 어제 코드의 상태가 A이고, 오늘 코드의 상태가 A-1일때, A-1에서 A로 코드를 되돌리는 것이 가능합니다.

또한, Git에서는 branch라는 기능을 제공합니다. 이 branch의 기능을 이용하면 여러 명이 함께 코드를 개발할 때 소스코드를 서로 주고받을 필요 없이 병렬적으로 개발할 수 있습니다. 기존에 틀이되는 코드에 구현해야하는 기능 별로 branch를 생성하고, 각자 개발이 완료된 후 그 branch를 merge하는 방식으로 개발을 진행할 수 있습니다.

Github는 이러한 Git의 정보(코드, 변경 사항이 저장된 데이터 등)을 웹 상에서 주고받을 수 있도록 웹 호스팅 서비스를 제공합니다.

아래는 Git에서 쓰이는 용어입니다.

Repository - 저장소 / 말 그대로 소스코드 파일이나 폴더를 저장해두는 공간입니다.

Commit - 추가 되었거나 변경된 파일을 저장소에 저장합니다.

push - 로컬 환경에서 저장한 변경된 내용을 원격 저장소(github)에 업로드하는 작업을 의미합니다.

git, github는 꼭 알아야하는 내용이니, 아래 링크에서 git, github의 기본 사용법 정도는 익혀두는 걸 추천합니다!

[egoing-git](https://www.youtube.com/watch?v=hFJZwOfme6w&list=PLuHgQVnccGMA8iwZwrGyNXCGy2LAAsTXk)

<hr>

#### **7. github**
Github은 Git의 정보(코드, 변경 사항이 저장된 데이터 등)을 웹 상에서 주고받을 수 있도록 웹 호스팅 서비스를 제공합니다.

또한 Github에 올라오는 여러 오픈소스 프로젝트들의 코드를 별도의 제한 없이 볼 수 있기 때문에, 다른 사람의 코드를 살펴볼 수 있고, 개발 동향 파악도 어느정도 가능합니다.

<hr>

#### **8. 프레임워크**

프레임워크란 말 그대로 개발을 하는 틀이라 할 수 있습니다. 프레임워크는 개발자를 위한 다양한 도구를 제공하는 동시에, 개발의 가이드라인을 제시합니다. 프레임워크를 이용하게 되면 직접 구현하기 어려운 부분을 프레임워크에서 제공하는 특별한 클래스나 함수를 이용해 쉽게 돌파해나갈 수 있게 됩니다. 또한 "이렇게만 개발하면 어느정도 안정성을 갖출 수 있을 것이다"를 제시하는 가이드라인이 있기 때문에 안정성이나 통합성 측면에서도 장점을 가질 수 있습니다.

참고로 자바스크립트의 프레임 워크 종류에는 Vue.js, React, Angular (프론트엔드 개발에서 가장 많이 사용하는 프레임워크 1,2,3위 입니다..!)가 있고, node js의 프레임 워크에는 express, nest js, socket io 등이 있습니다.
<hr>

#### **9. 라이브러리**

라이브러리는 프레임워크와 비슷하게 개발을 쉽게 만드는 도구를 제공한다고 생각하면 됩니다. 다만 프레임워크와는 다르게 개발의 '틀'이 정해져 있지 않기 때문에 프레임 워크보다 자유도가 높습니다.


































<hr>
참고자료 <br>

https://www.grabbing.me/6166144602844aab9b361c79b8f90785


http://blog.wishket.com/api%EB%9E%80-%EC%89%BD%EA%B2%8C-%EC%84%A4%EB%AA%85-%EA%B7%B8%EB%A6%B0%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8/



  