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
* `npm install mongodb`
* `npm install ejs`


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

## MongoDB
* 관계형 데이터베이스 (MySQL, MariaDB, Oracle, MS SQL Server) 와는 다름
* No SQL 
1. mongodb atlas 검색
2. 가입- free cluster 선택
3. aws(상관 x) - singapore 선택 (미국 같은 나라 선택하면 전송이 오래 걸림)
4. 만들고 난 후 **Database Access** - id pw 생성 (누가 데이터베이스에 접근 가능하게 할 것인지)
    * kgj / a4... / atlas admin 택
5. **Network Access** 어떤 ip를 갖은 사람이 접근할 수 있는지
    * 모든 ip에서 접근 가능하도록 or 현재 컴퓨터 ip에서 접근 가능하도록 둘 중 택1
6. **Clusters** `CONNECT` `Connect Your Application`, connection string 복사해놓기
    * `mongodb+srv://kgj:여기에비번적기@cluster0.yepff.mongodb.net/<dbname>?retryWrites=true&w=majority`
7. `npm install mongodb`
8. `server.js` `const MongoClient = require('mongodb').MongoClient;`
9. `MongoClient.connect('복사해두었던URL', function(err, client){});`
```
MongoClient.connect('mongodb+srv://kgj:여기에비번적기@cluster0.yepff.mongodb.net/<dbname>?retryWrites=true&w=majority', function(err, client){
  // db 연결이 되면 코드 실행
  if(err) return console.log(err);
  app.listen(8080, function(){
    console.log('listening on 8080');
  });
});
```
10. `collection` - `add my own data` - database name (ex_ todoapp) - collection name (ex_ post)
11. `var db` `db = client.db('todoapp');` 데이터베이스 (폴더) 명
```
  db.collection('post').insertOne('저장할 데이터', function(err, result){
    console.log('저장완료')
  });
```

```
과제_ 
클라이언트가 /add 라는 경로로 post 요청을 하면, 
데이터 2개(날짜, 제목)을 보내줌.
이 때, 'post'라는 이름을 가진 collection에 두개의 데이터 저장
```

## EJS
* `npm install ejs`
* `app.set('view engine', 'ejs');`
* 확장자명 변경 `list.ejs`
    * html 과 모두 같음
    * 서버 데이터를 ejs 문법을 사용해서 삽입 가능
* `<h2>title : <%=  %></h2>`
```
app.get('/list', function(req, res){
  res.render('list.ejs');
});
```
* ejs 파일은 views 라는 폴더 안에 위치해야한다 (에러의 원인)
* `db.collection('post').find().toArray(function(err, result));` : 모든 데이터를 가지고 옴
* 위코드 에러 (옛날 코드) / 아래 코드 적용 
```
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb+srv://kgj:a48624862@cluster0.yepff.mongodb.net/<dbname>?retryWrites=true&w=majority', {useUnifiedTopology: true});

client.connect().then((client)=>{
  var db = client.db('todoapp')
  db.collection('post').find().toArray(function (err, result) {
      if (err) throw err
      console.log(result);
  })
})
```
* ejs 파일 안에서 javascript 코드는 `<%= %>` 문법 필요 참고_ `list.ejs`