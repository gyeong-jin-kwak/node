const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
const MongoClient = require('mongodb').MongoClient;
const { request } = require('express');
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
// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

app.get('/', function(req, res){
  // res.sendFile(__dirname + '/index.html');
  res.render('index.ejs');
});

app.get('/write', function(req, res){
  // res.sendFile(__dirname + '/write.html');
  res.render('write.ejs');
});

app.get('/list', function(req, res){
  db.collection('post').find().toArray(function(err, result){
    console.log(result);
    res.render('list.ejs', { posts_ : result});
  });
});

// ** css 참조 - 미들웨어 **
// app.use('/css', express.static(__dirname+"/css"));
app.use('/public', express.static('public'));

// ** /add 경로로 POST 요청을 하면 ~ 실행 **
app.post('/add', function(req, res){
  res.send('전송완료');
  console.log(req.body.title);
  console.log(req.body.date);

  db.collection('counter').findOne({name: '게시물 개수'}, function(err, result){
    console.log(result.totalPost);
    let totalPost_ = result.totalPost;

    db.collection('post').insertOne({_id: totalPost_ + 1 , title: req.body.title, date: req.body.date}, function(err, result){
      console.log('저장완료');
      db.collection('counter').updateOne({name: '게시물 개수'}, {$inc: {totalPost: 1}}, function(err, result){
        if(err){return console.log(err)}
      });
    });
  });
});

// 삭제기능 구현
app.delete('/delete', function(req, res){
  console.log(req.body);
  req.body._id = parseInt(req.body._id);

  db.collection('post').deleteOne(req.body, function(err, result){
    console.log('삭제완료');
    res.status(200).send({ message: '성공했습니다.' });
    // res.status(400).send({ message: '실패했습니다.' });
  })
});

// /detail로 접속했을때 detail.ejs 보여줌
// :id 어떠한 문자열로 입력시 들어가도록 
// _id: req.params.id 파라미터 중 :id 라는 뜻
app.get('/detail/:id', function(req, res){
  db.collection('post').findOne({_id: parseInt(req.params.id)}, function(err, result){
    console.log(result);
    res.render('detail.ejs', { data_: result });
  });
  // res.render('detail.ejs', {});
});