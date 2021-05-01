//Express 

var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
//Express o
var app = express();

//setting port
app.set('port', process.env.PORT || 3000);


app.use(static(path.join(__dirname, 'public')));


//Express server starts
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server has started : '+ app.get('port'));
});
