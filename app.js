var express = require('express');
var app = express();
var path = require('path');
//------------------------------------------ postgres
// // var pg = require('pg');


// // // $ npm i pg
// // // psql> $ CREATE DATABASE briandb;
// // // psql> $ \c briandb;
// // var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/briandb';

// // var client = new pg.Client(connectionString);
// // client.connect();
// // var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// // query.on('end', function(){
// // 	client.end();
// // });

// const pg = require('pg');
// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/briandb';

// const client = new pg.Client(connectionString);
// client.connect();
// const query = client.query(
//   'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// // query.on('end', () => { client.end(); });




//------------------------------------------ mongo
// // npm i mongodb
// var MongoClient = require('mongodb').MongoClient
 
// // Connection URL 
// var url = 'mongodb://localhost:27017/briandb';

// // Use connect method to connect to the Server 
// MongoClient.connect(url, function(err, db) {
//   console.log("-------> Connected correctly to server");

//   var collection = db.collection('users');

//   collection.find({name: 'erich'})
//   .toArray(function(err, docs){
//     console.log("\n\n\n");
//     console.log(docs);
//     console.log("\n\n\n");
//   });


//   // collection.insert({name: 'erich', dob: new Date(1988, 0, 16)})
//   // .then(function(res){
//   //   console.log("\n\n\n");
//   //   console.log(res);
//   //   console.log("\n\n\n");
//   // });


//   db.close();
// });


//// CREATE A ROLE WITH YOUR USERNAME (IN THE TERMINAL)
// db.createRole(
//    {
//      role: "prg",
//      privileges: [
//        // { resource: { cluster: true }, actions: [ "addShard" ] },
//        // { resource: { db: "config", collection: "" }, actions: [ "find", "update", "insert", "remove" ] },
//        // { resource: { db: "users", collection: "usersCollection" }, actions: [ "update", "insert", "remove" ] },
//        // { resource: { db: "", collection: "" }, actions: [ "find" ] }
//      ],
//      roles: [
//        { role: "read", db: "briandb" }
//      ]
//    },
//    { w: "majority" , wtimeout: 5000 }
// )



//--------------------------------------- mongoose

// npm i mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/briandb', {
    useMongoClient: true, // this prevents some errors messages...
});
mongoose.Promise = global.Promise; // because mongoose's primise internal library is depricated
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {type: String, required: true},
  address: String,
}, {collection: 'users'});

var User = mongoose.model('User', userSchema);


app.get('/getUsers', function(req, res, next) {
  User.find()
      .then(function(doc) {
        res.json(doc);
      });
});


//---------------------------------------

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