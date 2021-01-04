const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb+srv://kgj:a48624862@cluster0.yepff.mongodb.net/<dbname>?retryWrites=true&w=majority', {useUnifiedTopology: true});
app.set('view engine', 'ejs');

var db;
client.connect().then((client)=>{
  db = client.db('todoapp')
  db.collection('post').find().toArray(function (err, result) {
      if (err) throw err
      console.log(result);
  })
})

app.listen(8080, function(){
  console.log('listening on 8080');
});

/////////////////////////////////////////////////////////////////////////////////////////
// var db;
// MongoClient.connect('mongodb+srv://kgj:a48624862@cluster0.yepff.mongodb.net/<dbname>?retryWrites=true&w=majority', function(err, client){
//   // 에러처리
//   if(err) return console.log(err);

//   // db 연결이 되면 코드 실행
//   app.listen(8080, function(){
//     console.log('listening on 8080');
//   });
 
//   db = client.db('todoapp');
//   // db.collection('post').insertOne({name: 'kgj', age: 29}, function(err, result){
//   //   console.log('저장완료')
//   // }); todoapp 이라는 폴더 안에 있는 post 라는 엑셀 (mongodb에서 제작)
// });

// mongodb+srv://kgj:a48624862@cluster0.yepff.mongodb.net/<dbname>?retryWrites=true&w=majority

/////////////////////////////////////////////////////////////////////////////////////////

// app.get('/example', function(req, res){
//   res.send('반갑습니다.');
// });

// ** url 생성 **
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/write', function(req, res){
  res.sendFile(__dirname + '/write.html');
});

app.get('/list', function(req, res){
  db.collection('post').find().toArray(function(err, result){
    console.log(result);
    res.render('list.ejs', { posts_ : result});
  });
});

// ** css 참조 **
app.use('/css', express.static(__dirname+"/css"));

// ** /add 경로로 POST 요청을 하면 ~ 실행 **
app.post('/add', function(req, res){
  res.send('전송완료');
  console.log(req.body.title);
  console.log(req.body.date);

  db.collection('post').insertOne({title: req.body.title, date: req.body.date}, function(err, result){
    console.log('저장완료')
  })
});  