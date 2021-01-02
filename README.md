# Node

## 요청 방식 4가지
1. 읽기 (GET)
2. 쓰기 (POST)
    * 글생성
3. 수정 (PUT)
4. 삭제 (DELETE)

## Node js 특징
* javascript
    * 해석의 주체 : 브라우저
        * Chrome - v8
        * IE - chakra
        * Firefox - Spider Monkey
* v8 자체로 출시 -> node.js
    * 브라우저 내 이외에도 다른 환경에서 javascript 실행 가능하도록
* javascript 실행 환경
* 서버도 만들 수 있음

### Non-blocking I/O
1. 요청을 다 받음 
2. 처리속도가 빠른 순으로 처리
3. 오래걸리는 작업 처리
4. 중간에 멈추지 않음

## Node.js 설치
* `node -v`
* `npm init` - `entry point` `server.js`
* `npm install express` or `yarn add express`
* `server.js` 파일 생성
* `npm install -g nodemon` or `yarn add global nodemon`
    * 보안 오류가 뜨는 경우(window 10): powershell - 우클릭 관리자권한으로 - `executionpolicy` - `set-executionpolicy unrestricted` - `y`
* `npm install body-parser` or `yarn add body-parser`
```
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
```


## Node 시작
```
const express = require('express');
const app = express();

app.listen();
```
* `node server.js` , `http://localhost:8080/`
```
app.get('/example', function(요청, 응답){
  응답.send('반갑습니다.');
});
```
## 서버에 데이터를 보내는 법
* `<form action="/add" method="POST">`
* body-parser 설치 `npm install body-parser` or `yarn add body-parser`
```
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
```
* `<input type="text" class="form-control" id="todo" name="title">` `name=""` 속성 필요
```
app.post('/add', function(req, res){
  res.send('전송완료');
  console.log(req.body.title);
  console.log(req.body.date);
});
```

## Rest API
### API 
* 통신 규약
* 서버와 고객간의 요청 방식

### Rest API 6가지 원칙
1. Uniform interface⭐️
    * 하나의 자료는 하나의 url로
    * URL 하나를 알면 둘을 알 수 있어야 함
    * 요청(req)과 응답(res)은 정보가 충분히 들어있어야 함
```
ex_
www.example.com/products/66231
instagram.com/explore/tags/kpop
facebook.com/natgeo/photoes

- url을 명사로 작성
- 하위 문서를 나타낼 땐 /
- 파일 확장자(.html) 쓰지말것 
- 띄어쓰기는 대시(-)이용
- 자료 하나당 하나의 url
```
2. Client-Server 역할구분
    * 브라우저는 요청만 할 뿐
    * 서버는 응답만 할 뿐
3. Stateless
    * 요청1과 요청2는 의존성이 없어야 함
4. Cacheable (크롬이 알아서..)
    * 서버에서 보내주는 정보들은 캐싱이 가능해야 함
    * 캐싱을 위한 버전 같은 것도 관리를 잘해야 함 
5. Layered System
6. Code on Demand