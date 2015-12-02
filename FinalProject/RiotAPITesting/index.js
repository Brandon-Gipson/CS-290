var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  res.render('home');
});

app.get('/match',function(req,res){
  res.render('match');
});

app.post('/match',function(req,res){
	var context = {};
	console.log(req.body);
	if(req.body['summoner']){
	request('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/'+ req.body.name +'?api_key=05d6825e-a0c3-40e7-bdfa-475b4d8d7b56', function(err, response, body){
	 if(!err && response.statusCode < 400){
      var summoner = JSON.parse(body);
	  for (i in summoner){
		  var summonerID = summoner[i]["id"];
	  }
	  console.log(summonerID);
	  
	  //request('https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/' + summoner[]["id"] + '?api_key=05d6825e-a0c3-40e7-bdfa-475b4d8d7b56', function(err, response, body){
	//	  var matchList = JSON.parse(body);
	//	  console.log(matchlist);
	 // });
		  
	  
    } else {
     if(response){
       console.log(response.statusCode);
      }
      next(err);
	}
	});
	
  res.render('match', context);
	}
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
