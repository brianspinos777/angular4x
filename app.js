var express = require('express');
var app = express();
var path = require('path');
//------------------------------------------ postgres
// var pg = require('pg');


// // $ npm i pg
// // psql> $ CREATE DATABASE briandb;
// // psql> $ \c briandb;
// var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/briandb';

// var client = new pg.Client(connectionString);
// client.connect();
// var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// query.on('end', function(){
// 	client.end();
// });

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/briandb';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// query.on('end', () => { client.end(); });
//------------------------------------------

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