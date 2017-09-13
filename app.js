var express = require('express');
var app = express();
var path = require('path');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/dist'));


//------------------------------------------ routes
var apiRoute = require('./server/routes/api');
app.use('/api', apiRoute)
// curl -i http://localhost:5000/api/
// curl -i http://localhost:5000/api/foo


app.get('*', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});