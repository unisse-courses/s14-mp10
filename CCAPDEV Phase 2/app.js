var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyparser = require('body-parser');
var session = require('express-session');
var accounts = require('./models/account.model');
var cookieParser = require('cookie-parser');
var router = express.Router();
var MongoStore = require('connect-mongo')(session);

require('./models/db');
// require('./seed/product-seeder');
var profileController = require('./controllers/profileController');
var registerController = require('./controllers/registerController');
var loginController = require('./controllers/loginController');
var homeController = require('./controllers/homeController');
var checkoutController1 = require('./controllers/checkoutController1');
var editProfileController = require('./controllers/editProfileController');
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
        resave: true,
        store: new MongoStore({mongooseConnection: mongoose.connection}),
        cookie: {maxAge: 180*60*100}
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

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

app.listen(app.get('port'), function(){
  console.log('server started on port ' + app.get('port'));
});

app.use('/home', homeController);
app.use('/register', registerController);
app.use('/login', loginController);
app.use('/profile', profileController);
app.use('/checkout1', checkoutController1);
app.use('/editProfile', editProfileController);