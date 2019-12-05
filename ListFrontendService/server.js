const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
let list = require('./src/routes/list');
let user = require('./src/routes/user');

let mongoose=require('mongoose');
var passport = require('passport');
var MongoStore = require('connect-mongo')(session);

const app = express();

app.use(passport.initialize());


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://'+"localhost"+':3000', credentials: true }));



allowCrossDomain=(req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', 'http://'+"localhost"+':3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(session({
  secret: 'grubhub',
  resave: false, 
  saveUninitialized: false, 
  store: new MongoStore({ mongooseConnection : mongoose.connection })
}));

app.use(allowCrossDomain);
app.use(function(req,res,next){
  res.locals.session=req.session;
  next();
})

app.use('/', list);
app.use('/', user);


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);