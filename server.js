const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
const MongoClient = require('mongodb').MongoClient;

// app.listen(8080, function(){
//   console.log('listening on 8080');
// });
MongoClient.connect('mongodb+srv://kgj:a48624862@cluster0.yepff.mongodb.net/<dbname>?retryWrites=true&w=majority', function(err, client){
  // db 연결이 되면 코드 실행
  app.listen(8080, function(){
    console.log('listening on 8080');
  });
});
// mongodb+srv://kgj:a48624862@cluster0.yepff.mongodb.net/<dbname>?retryWrites=true&w=majority

// app.get('/example', function(req, res){
//   res.send('반갑습니다.');
// });

// ** url 생성 **
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/write', function(req, res){
  res.sendFile(__dirname + '/write.html');
})

// ** css 참조 **
app.use('/css', express.static(__dirname+"/css"));

// ** /add 경로로 POST 요청을 하면 ~ 실행 **
app.post('/add', function(req, res){
  res.send('전송완료');
  console.log(req.body.title);
  console.log(req.body.date);
});
