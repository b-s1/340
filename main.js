/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use('/house_members', require('./house_members.js'));
app.use('/house_locations', require('./house_locations.js'));
app.use('/characters', require('./characters.js'));
app.use('/houses', require('./houses.js'));
<<<<<<< HEAD
app.use('/locations', require('./locations.js'));
=======
app.use('/lifestatus', require('./lifestatus.js'));
>>>>>>> 9a126efe250839e5d44636ba3dfee86db031e3a9
app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flipX.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
