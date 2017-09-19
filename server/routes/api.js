var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

router.route('/')
    .get((req, res) => {
        res.send('hello from /blocks/');
    })
    // .post(...)

router.route('/foo/:id')
    .get((req, res) => {
        var myId = req.params.id;
        res.json({id: myId, success: true});
    })
    // .post(...)

router.route('/foo')
    .get((req, res) => {
        var myData = {name: 'brian', age: 27};
        res.json(myData);
    })
    // .post(...)

router.route('/pass')
    .get((req, res) => {

        const saltRounds = 10;
        const myPlaintextPassword = 's0m3P4$$w0rD';
        const hash = "$2a$10$eAZroHTbos/rceLg6oPLiepu80pEEybrXiJCALw./Gsnlg3Q5yubu";

        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            var myData = {hash: hash, password: myPlaintextPassword};
            res.json(myData);
        });

            
    })
    // .post(...)

router.route('/checkpass')
    .get((req, resp) => {

        const myPlaintextPassword = 's0m3P4$$w0rD';
        const someOtherPlaintextPassword = 'not_bacon';
        const hash = "$2a$10$eAZroHTbos/rceLg6oPLiepu80pEEybrXiJCALw./Gsnlg3Q5yubu";

        // Load hash from your password DB.
       
        // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
        //     // res == true
        //     // res.json({success: res, pass: myPlaintextPassword});

        //     console.log('hash', {success: res, pass: myPlaintextPassword});
        // });

        var myObj = {};

        bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
            // res == false
            // res.json({success: res, pass: someOtherPlaintextPassword});

            myObj = {
                success: res, 
                pass: someOtherPlaintextPassword,
                hash: hash
            };

            console.log('hash', myObj);

            resp.json({test: true, myObj: myObj})
        }); 

        // resp.json({test: true, myObj: myObj})

            
    })
    // .post(...)

    //======================================================= Items


    // https://node-postgres.com/features/connecting
    const { Pool, Client } = require('pg')
    const connectionString = 'postgresql://prg:password@localhost:5432/briandb2'

    const pool = new Pool({
      connectionString: connectionString,
    })

 

    // index - show list of items                     GET /items  - view
    // show - show single item                        GET /items/1  - view
    // new - show form for new item                   GET /items/new  - view
    // edit - show form for editing existing item     GET /items/1/edit  - view
    // create - create item                           POST /items
    // update - update item                           PUT /items/1
    // destroy - delete item                          DELETE /items/1

    router.route('/items')
    .get((req, resp) => {
        console.log("--------------------- GET /api/items:");

        const client = new Client({
            connectionString: connectionString,
        })
        client.connect()

        client.query('SELECT * FROM items', (err, res) => {
            if(err){
                //error
                console.log("ERROR:", err)
                resp.json({data: null, success: false});
            }else{
                // console.log(res.rows)
                resp.json({data: res.rows, success: true});
            }
            client.end()
        })
    })

    router.route('/items/:id')
    .get((req, resp) => {
        console.log("--------------------- GET /api/items/:id:");

        var id = req.params.id;

        const client = new Client({
            connectionString: connectionString,
        })
        client.connect()

        client.query("SELECT * FROM items WHERE id = $1", [id], (err, res) => {
            if(err){
                //error
                console.log("ERROR:", err)
                resp.json({data: null, success: false});
            }else{
                // console.log(res.rows)
                resp.json({data: res.rows, success: true});
            }
            client.end()
        })
    })
    .put((req, resp) => {
        console.log("--------------------- PUT /api/items/:id:");
    })
    .delete((req, resp) => {
        console.log("--------------------- DELETE /api/items/:id:");
    })

    router.route('/items/new')
    .get((req, resp) => {
        //...
    })

    router.route('/items/:id/edit')
    .get((req, resp) => {
        //...
    })


    // create
    router.route('/itemx')
    .get((req, resp) => {
        console.log("--------------------- GET /api/items/:id:");

        var id = req.params.id;

        const client = new Client({
            connectionString: connectionString,
        })
        client.connect()

        client.query('INSERT INTO items(text, is_done) values($1, $2)', ["aaa", false], (err, res) => {
            if(err){
                //error
                console.log("ERROR:", err)
                resp.json({data: null, success: false});
            }else{
                // console.log(res.rows)
                resp.json({data: res.rows, success: true});
            }
            client.end()
        })
    })




    //=======================================================





        

module.exports = router;