let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');


//------------------------------------------ Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// CORS middleware
//
// This way we can work on the DEVELOPMENT environment on the 
// client-side angular app (http://localhost:4200), using `$ ng serve`, (so we can get automatic recompilation)
// and the back-end using `$ nodemon app.js` (http://localhost:5000)
//
// BUT, remember to use `$ ng build --prod` before sending to Heroku.
//
let allowCrossDomain = (req, res, next) => {
    let client = 'http://localhost:4200'
    res.header('Access-Control-Allow-Origin', client); // allow 'localhost:4200' to access this API
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

//------------------------------------------ postgres
// $ npm i pg

// github
// https://github.com/brianc/node-postgres

// depricated:
// https://www.youtube.com/watch?v=ijSzX3S5Qco&list=PLillGF-RfqbaEmlPcX5e_ejaK7Y5MydkW&index=3





// https://node-postgres.com/features/connecting
const { Pool, Client } = require('pg')
const connectionString = 'postgresql://prg:password@localhost:5432/briandb2'

const pool = new Pool({
  connectionString: connectionString,
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

app.get('/pg', (req, res) => {
  console.log("--------------------- PG:");

  const client = new Client({
    connectionString: connectionString,
  })
  client.connect()

  client.query('SELECT * FROM users', (err, res) => {
    // console.log(err, res)
    console.log(res.rows)
    client.end()
  })

})



// // // psql> $ CREATE DATABASE briandb;
// // // psql> $ \c briandb;
// // let connectionString = process.env.DATABASE_URL || 'postgres://username:password@localhost:5432/briandb';

// // let client = new pg.Client(connectionString);
// // client.connect();
// // let query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// // query.on('end', () => {
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
// https://github.com/mschwarzmueller/nodejs-basics-tutorial/blob/master/09-mongodb/routes/index.js
// // npm i mongodb
// let MongoClient = require('mongodb').MongoClient
 
// // Connection URL 
// let url = 'mongodb://localhost:27017/briandb';

// // Use connect method to connect to the Server 
// MongoClient.connect(url, (err, db) => {
//   console.log("-------> Connected correctly to server");

//   let collection = db.collection('users');

//   collection.find({name: 'erich'})
//   .toArray((err, docs) => {
//     console.log("\n\n\n");
//     console.log(docs);
//     console.log("\n\n\n");
//   });


//   // collection.insert({name: 'erich', dob: new Date(1988, 0, 16)})
//   // .then((res) => {
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
// https://github.com/mschwarzmueller/nodejs-basics-tutorial/blob/master/11-mongoose/routes/index.js

// npm i mongoose
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/briandb', {
    useMongoClient: true, // this prevents some errors messages...
});
mongoose.Promise = global.Promise; // because mongoose's primise internal library is depricated
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {type: String, required: true},
  address: String,
}, {collection: 'users'});

let User = mongoose.model('User', userSchema);


app.get('/hello', (req, res, next) => {
    console.log('HEY');
    res.json("HEY");
});

app.get('/getUsers', (req, res, next) => {
  User.find()
      .then((doc) => {
        res.json(doc);
      });
});

app.post('/insertUser', (req, res, next) => {
    console.log('insertUser');
  let item = {
    name: "dude", //req.body.name,
    address: "foobar 123" //req.body.address
  };

  console.log(item);

  let data = new User(item);
  data.save();

  console.log(data);

  // res.redirect('/');
});

app.post('/updateUser', (req, res, next) => {
  let id = '59bc1c0f22be482adcbcbe00'; //req.body.id;

  User.findById(id, (err, doc) => {
    if (err) {
      console.error('error, no entry found');
    }
    doc.name = "dude2", //req.body.name;
    doc.address = "foobar2 456" //req.body.address;
    doc.save();
  })
  res.redirect('/');
});

app.post('/deleteUser', (req, res, next) => {
  let id = '59bc1c0f22be482adcbcbe00'; //req.body.id;
  User.findByIdAndRemove(id).exec();
  res.redirect('/');
});




//---------------------------------------

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/dist'));


//------------------------------------------ routes
let apiRoute = require('./server/routes/api');
app.use('/api', apiRoute)
// curl -i http://localhost:5000/api/
// curl -i http://localhost:5000/api/foo



app.get('*', (request, response) => {
  response.sendFile(__dirname + '/dist/index.html');
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});