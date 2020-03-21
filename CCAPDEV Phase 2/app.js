var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyparser = require('body-parser');
var session = require('express-session');
var accounts = require('./models/account.model');
var cookieParser = require('cookie-parser');
require('./models/db');
var registerController = require('./controllers/registerController');
var loginController = require('./controllers/loginController');

var app = express();

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');


app.set('port', (process.env.PORT || 3000));

app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());

app.use(cookieParser());

app.use(
    session({
        secret:'ssshhh', 
        name: 'ShopHub',
        saveUninitialized: true, 
        resave: true
    }));

var logout = function(req,res,next){
    debugger("logout()");
    req.session.loggedIn = false;
    res.redirect('/');
}

app.get('/', (req,res) => res.render('welcome',{
    title: 'Welcome to ShopHub!'
}));


app.get('/home', (req, res)=>{
    res.render('home');
});

app.get('/profile', (req,res) => res.render('profile',{
    
}));

// app.get('/register', (req, res)=>{
//     res.render('register');
// });

// app.post('/', (req,res)=>{

// });

app.listen(app.get('port'), function(){
  console.log('server started on port ' + app.get('port'));
});


app.use('/register', registerController);
app.use('/login', loginController)