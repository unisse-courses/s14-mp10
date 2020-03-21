var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyparser = require('body-parser');
var session = require('express-session');
var accounts = require('./models/account.model');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var router = express.Router();
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

// app.use(expressValidator());

app.use(cookieParser());

// app.use(
//     session({
//         secret:'ssshhh', 
//         name: 'ShopHub',
//         saveUninitialized: true, 
//         resave: true
//     }));

app.get('/', function(req,res,next){ 
    // res.render('welcome', {titile: 'Welcome to ShopHub!', success: false,errors: req.session.errors});
    // req.sessions.errors = null;
})

router.post('/submit', function(req,res,next){
    
});


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