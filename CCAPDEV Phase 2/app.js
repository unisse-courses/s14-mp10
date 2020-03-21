var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyparser = require('body-parser');
var session = require('express-session');
var accounts = require('./models/account.model');
var cookieParser = require('cookie-parser');
var router = express.Router();

require('./models/db');
// require('./seed/product-seeder');
var profileController = require('./controllers/profileController');
var registerController = require('./controllers/registerController');
var loginController = require('./controllers/loginController');
var homeController = require('./controllers/homeController');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost:27017/ShopHub', {useNewUrlParser: true, useUnifiedTopology: true});

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

app.get('/', function(req,res,next){ 
    console.log(req.session.username); //For testing purposes
    res.render('welcome',{
      title : 'Welcome To ShopHub!',
    });
})

app.get('/logout', function(req,res,next){ 
    req.session.destroy();
    res.redirect("/");
})

app.listen(app.get('port'), function(){
  console.log('server started on port ' + app.get('port'));
});

app.use('/home', homeController);
app.use('/register', registerController);
app.use('/login', loginController);
app.use('/profile', profileController);