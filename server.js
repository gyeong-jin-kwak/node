const express = require('express');
const app = express();

app.listen(8080, function(){
  console.log('listening on 8080');
});

// app.get('/example', function(req, res){
//   res.send('반갑습니다.');
// });

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/write', function(req, res){
  res.sendFile(__dirname + '/write.html');
})

app.use('/css', express.static(__dirname+"/css"));