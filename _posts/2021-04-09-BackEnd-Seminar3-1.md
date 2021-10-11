---
title: "BackEnd Seminar 3-1"
layout: post
date: 20211011
published: true
---

#### 키워드
- async/await

<hr>

## async/await

`async/await`은 기존의 비동기 처리 방식인 Callback함수와 Promise의 단점을 보완하기 위한 방식입니다. async/await의 구현은 매우 간단합니다. 다음과 같이 비동기 처리를 하고자 하는 함수의 앞에 async 키워드를 써 주고, 기다려야 하는 Promise 앞에 await 키워드를 적어줍니다.
```javascript
async function f() {
    var result = await new Promise((resolve, result) => {
        setTimeout(resolve("fulfilled!!"), 2000);
    })
    console.log(result);        // fulfilled!
}
```
await은 반드시 **async 키워드가 붙은 함수 내부**에서만 사용할 수 있습니다.

앞선 포스트에서 말씀드렸듯이, async/await 키워드는 비동기적으로 작동하는 함수 내에서 "순서대로" 처리해야하는 부분을 구현하기 위해 사용합니다. 한 가지 예시를 더 들어보겠습니다.
```javascript
async function userfunction(id){
    let resultofuser = await new Promise((resolve, result) => {     
        setTimeout(()=>{
            user = {
              id: id,
              name: "User" + id,
              email: id + "@test.com",
            };
            resolve(user)
            
          }, 100);
    }); //유저의 정보를 불러오는 부분 (데이터 베이스에서 데이터를 불러오는 경우를 상정하여 코드를 0.1초후에 실행하도록 함)
    console.log("user :",resultofuser);

    let updated_user = await new Promise((resolve,result) => {              // 유저의 정보를 수정하는 부분. 마찬가지로 유저의 정보를 수정하기 위해 걸리는 시간을 0.1초로 정함
        setTimeout(()=> {
            resultofuser.id = 2;
            resultofuser.name = "UPDATED_USER" + resultofuser.id;
            resolve(resultofuser);
        }, 100);
    });
   console.log(updated_user);
}

userfunction(1);
```
어떤 유저의 정보를 데이터베이스에서 불러오고, 그 정보를 수정해 콘솔창에 출력하는 경우를 생각해봅시다. 

유저의 정보를 수정하고 출력하기 위해서는 그 전에 유저의 정보를 데이터베이스에서 먼저 불러와야 합니다. 그렇기 때문에 유저의 정보를 불러오는 부분의 코드가 실행된 후에 그 뒤의 코드가 실행되어야 합니다.

이를 구현하기 위해서 callback을 이용할 수도 있지만, 그렇게 할 경우 코드가 복잡해지고 가독성이 떨어지게 됩니다. 그래서 이를 가독성 있게 구현하기 위해 async await 키워드를 사용합니다.

코드에서 볼 수 있듯이, await 키워드를 사용하게 되면 그 다음 코드를 실행하기 전에 Promise에 전달된 함수를 실행합니다. 해당 함수에서 실행해야 하는 코드가 다 실행된 경우(이 코드에서는 데이터 베이스에서 유저의 정보를 읽어온 후를 말합니다.) Promise에서 resolve라는 부분에 result로 넘겨줄 값을 전달합니다. 이 코드의 경우엔 유저의 정보를 result로 넘겨주게 됩니다. Promise는 resolve에 어떤 값이 전달되었을 때, 그 다음 코드로 넘어갈 수 있도록 하기 때문에 이 코드의 경우 유저의 정보를 데이터베이스에서 받아온 경우에만 그 다음 코드를 실행할 수 있게 합니다.
<br>


### async/await의 예외 처리
async/await의 경우 try-catch문을 이용하여 예외 처리를 할 수 있습니다.
```javascript
async function f() {
    try {
        var result = await new Promise((resolve, result) => {
            setTimeout(resolve("fulfilled!"), 2000);
        })
        console.log(result);
    } catch(err) {
        console.log(err);
    }
}
```

<hr>

#### 참고자료
- [async와 await](https://ko.javascript.info/async-await)

<hr>