const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const path=require('path');
var passport = require('passport');
var authenticate = require('./authenticate');
const dotenv=require('dotenv');
mongoose.set('strictQuery', false);
dotenv.config()


// Loading routers
const bookRouter = require('./routes/api/bookRouter');
const userRouter = require('./routes/api/userRouter');
const issueRouter = require('./routes/api/issueRouter');
const app= express();

app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});

// Bodyparser Middleware
app.use(bodyParser.json());

// DB config 
const mongoURI = "mongodb+srv://bky07:Bharath@cluster0.niox0r7.mongodb.net/";
//const mongoURI=process.env.mongoURI
//const mongoURI='mongodb+srv://Rishi:Rishi@cluster0.f2f1iv8.mongodb.net/?retryWrites=true&w=majority'
// Connect to mongo
mongoose.connect(mongoURI)
.then(()=> {console.log("MongoDB Connected");
           const port =3001||process.env.port;

            app.listen(port, ()=> console.log(`Server started running on port ${port}`));
           })
.catch(err => console.log(err));

app.use(passport.initialize());

// Use routesax
app.use('/api/books',bookRouter);

app.use('/api/users',userRouter);
app.use('/api/issues',issueRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

//const port =3001||process.env.port;

//app.listen(port, ()=> console.log(`Server started running on port ${port}`));
