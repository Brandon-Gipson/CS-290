var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM workouts', funtion(err, rows, fields){
	if(err){
		next(err);
		return;
	}
	context.exercise = 	rows;
	res.render('exercise', context);
  });
});

app.post('/',function(req,res){
  var context = {};

  if(req.body['Add Entry']){
	mysql.pool.query("INSERT INTO workouts (`name`,`reps`,`weight`,`date`,`lbs`) VALUES (?????)", [req.query.c], function(err, result){
    if(err){
      next(err);
      return;
    } 
    } else {
      if(response){
        console.log(response.statusCode);
      }
      next(err);
	}
	});
    context.exercise.push({"name":req.body.name, "city":req.body.city, "temp":req.body.temp,});
  }

  if(req.body['Done']){
    req.session.toDo = req.session.toDo.filter(function(e){
      return e.id != req.body.id;
    })
  }
  console.log(context.exercise);
  res.render('exercise',context);
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