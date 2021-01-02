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