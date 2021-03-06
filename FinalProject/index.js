var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3001);

app.get('/',function(req,res){
  res.render('home');
});

app.get('/setup',function(req,res){
  res.render('setup');
});

app.get('/summonerInfo',function(req,res){
  res.render('summonerInfo');
});

app.get('/matchHistory',function(req,res){
  res.render('matchHistory');
});

app.get('/conclusion',function(req,res){
  res.render('conclusion');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});



app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
