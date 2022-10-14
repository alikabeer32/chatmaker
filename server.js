if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

//require('dotenv').config()
const url = require('url');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const httpReq = require('http');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser:true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to mongoose"))




const urlencoderParser = bodyParser.urlencoded({extended: false})
const port = process.env.PORT || 3000;

//const { ExpressPeerServer } = require('peer');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('create')
})

app.get('/node', (req, res) => {
  res.render('node');
  console.log(url.parse(req.url, true).query);
})

app.get('/login', (req, res) => {
  res.render('login');
  console.log(url.parse(req.url, true).query);
})

app.post('/save',urlencoderParser, function (req, res) {

  console.log(req.body);
  console.log(url.parse(req.url, true).query);
  if (db.collection('convos').countDocuments({"userid":"0"})){
    db.collection('convos').findOneAndUpdate({
      "userid":"0"
    },{$set:{
      "chatdat":req.body}
    }, function(err,docs){
      if(err){
        return console.log(err);
      } else {
        return console.log("success2");
      }
    })
  }
  else{  
    db.collection('convos').insertOne({
    "userid":"0",
    "chatdat":req.body
  }, function(err,docs){
    if(err){
      return console.log(err);
    } else {
      return console.log("success1");
    }
  })
}

})



// app.get('/request', (req, res) => {
//   var options = {
//     host: 'www.example.com',
//     //port: 80,
//     path: '/hookpost',
//     method: 'GET'
//   };
  
//   var req = httpReq.request(options, function(res) {
//     console.log('STATUS: ' + res.statusCode);
//     console.log('HEADERS: ' + JSON.stringify(res.headers));
//     res.setEncoding('utf8');
//     res.on('data', function (chunk) {
//       console.log('BODY: ' + chunk);
//     });
//   });
  
//   req.on('error', function(e) {
//     console.log('problem with request: ' + e.message);
//   });
  
//   // write data to request body
//   req.write('data\n');
//   req.write('data\n');
//   req.end();
// });


app.post('/endpoint',urlencoderParser, function (req, res) {

  console.log(req.body);
  console.log(Object.keys(req.body)[0]);
})

app.post('/fetch',urlencoderParser, function (req, res) {

  //console.log(req.body);
  //console.log(url.parse(req.url, true).query);

  var cursor  = db.collection('convos').find({
    "userid":"0"
  }).toArray(function(err, result){
    if(err){
      res.send(err);
    } else if(result.length){
      res.send(result);
    }
  });

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/node`)
})
