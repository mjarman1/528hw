const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Austin:Kable@cluster0.d7vwk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

//cookies
app.get('/set-cookies', (req, res) => {
  
//res.setHeader('Set-Cookie', 'newUser=true');

res.cookie('newUser', false);
res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

res.send('you got the cookies, check the Application tab in the inspect tool!')

});

app.get('/read-cookies', (req, res) =>{

const cookies = req.cookies;
console.log(cookies.newUser);

res.json(cookies);


});
