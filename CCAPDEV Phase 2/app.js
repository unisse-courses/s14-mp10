var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.set('port', (process.env.PORT || 3000));

app.get('/login', (req, res)=>{
    res.render('login');
});

app.get('/', (req, res)=>{
    res.render('home');
});

app.listen(app.get('port'), function(){
  console.log('server started on port ' + app.get('port'));
});
