var express = require('express');
var app = express();

const { arr } = require('./userData');
var bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


app.get('/', function (req, res) {
  return res.json({ message: "API is working successfully" });
});

app.get('/api/userData', function (req, res) {
  return res.json(arr);
});

app.post('/api/userData', function (req, res) {
  console.log(req.body)
  const { emailid, lname, fname, city } = req.body;
  const user = {
    id: arr.length + 1,
    fname: req.body.fname,
    lname: req.body.lname,
    city: req.body.city,
    emailid: req.body.emailid
  }
  console.log(arr)
  console.log(fname);

  const findRecord = arr.find(function (element) {
    return element.emailid === emailid;
  });
  if (findRecord) {
    var errorMessage = 'A user with that email has already registered. Please use a different email..';
    const err = { status: 400, error: errorMessage };
    return res.json(err);
  } else {
    arr.push(user);
    return res.json(arr);
  }
});

app.put('/userData/:id', function (req, res) {
  let id = req.params.id;
  fname = req.body.fname,
    lname = req.body.lname,
    city = req.body.city,
    emailid = req.body.emailid
  let index = arr.findIndex((data) => {
    return (data.id == id)
    
  });
   console.log(index)
  if (index >= 0) {
    let addData = arr[index]
    addData.fname = fname;
    addData.lname = lname;
    addData.city = city;
    addData.emailid = emailid;
    res.json(addData);
    
  }

  else {
    res.status(400);
  }
  
});

app.delete('/userData/:id', function (req, res) {
  let found = arr.find(function (item) {
    return item.id === parseInt(req.params.id);
  });
  if (found) {

    let targetIndex = arr.indexOf(found);

    // splice means delete item from `data` array using index
    arr.splice(targetIndex, 1);
  }

  console.log('item deleted')
  // return with status 204
  // success status response code 204 indicates
  // that the request has succeeded
  res.json(arr)

});

app.listen(8085, function () {
  console.log('Example app listening on port 8085!');
});





// let user = await User.findOne({ email: req.body.email });
//     if (user)
//       return res.status(400).send("User with given email already exist!");

//     user = await new User({
//       name: req.body.name,
//       email: req.body.email,
//     }).save();