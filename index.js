var express = require('express');
var app = express();
const {arr}= require('./userData');
var bodyParser =require('body-parser');
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.json());


app.get('/', function (req, res) {
  return res.json({message:"API is working successfully"});    
});

app.get('/api/userData', function (req, res) {
  return res.json(arr);    
});

app.post('/api/userData', function (req, res) {
   console.log(req.body)
   const user={
      id:arr.length +1,
      fname:req.body.fname,
      lname:req.body.lname,
      city:req.body.city
    }
   arr.push(user);
   console.log(arr);
   return res.json(arr);    

});


app.listen(8086, function () {
  console.log('Example app listening on port 8086!');
  
  
});