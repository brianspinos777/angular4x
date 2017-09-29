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

router.route('/pass') // like a signup url
    .get((req, res) => {

        const saltRounds = 10;
        const myPlaintextPassword = 's0m3P4$$w0rD';
        const hash = "$2a$10$eAZroHTbos/rceLg6oPLiepu80pEEybrXiJCALw./Gsnlg3Q5yubu";

        bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
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
       
        // bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
        //     // res == true
        //     // res.json({success: res, pass: myPlaintextPassword});

        //     console.log('hash', {success: res, pass: myPlaintextPassword});
        // });

        var myObj = {};

        bcrypt.compare(someOtherPlaintextPassword, hash, (err, res) => {
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


    //======================================================= POSTGRES

    // https://node-postgres.com/features/connecting
    const { Pool, Client } = require('pg')
    const connectionString = 'postgresql://prg:password@localhost:5432/briandb2'

    const pool = new Pool({
      connectionString: connectionString,
    })


    //======================================================= Login with credentials

    router.route('/auth')
    .post((req, resp) => {
        console.log("--------------------- POST /api/auth:");
        console.log("PARAMS", req.params)
        console.log("BODY", req.body)

        //======================================================= get credentials
        let email = req.body.email;
        let password = req.body.password;

        // email = "brian@hotmail.com"
        // password = "s0m3P4$$w0rD";
        // password_digest = "$2a$10$eAZroHTbos/rceLg6oPLiepu80pEEybrXiJCALw./Gsnlg3Q5yubu";

        //=========================================== Find user with email
        const client = new Client({
            connectionString: connectionString,
        })
        client.connect()

        client.query(
            'SELECT * FROM users WHERE email = $1', 
            [email], 
            (err, res) => {
                if(err){
                    //error
                    console.log("ERROR:", err)
                    resp.json({data: null, success: false, errors: ["Query error"]});
                }else{
                    // console.log(res.rows)

                    let user = res.rows[0]

                    if(user){
                        let hash = user.password_digest

                        //======================================================= check password
                        bcrypt.compare(password, hash, (err, success) => {
                            if(err){
                                console.log("Error: ", error)
                                resp.json({data: null, success: false, errors: ["Password hashing error"]});
                            }else{
                                if(success){
                                    console.log("Correct credentials")
                                    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
                                    resp.json({data: {token: token, user: user}, success: true, errors: []});
                                }else{
                                    resp.json({data: null, success: false, errors: ["Hashing password error"]});
                                }
                            }
                        });
                    }else{
                        resp.json({data: null, success: false, errors: ["No such user found"]});
                    }
                }

                client.end()
            }
        )
    })

    //======================================================= Items

    // index - show list of items                     GET /items  - view
    // show - show single item                        GET /items/1  - view
    // new - show form for new item                   GET /items/new  - view
    // edit - show form for editing existing item     GET /items/1/edit  - view
    // create - create item                           POST /items - form
    // update - update item                           PUT /items/1 - form
    // destroy - delete item                          DELETE /items/1 - form

    router.route('/items')
    .get((req, resp) => {
        console.log("--------------------- GET /api/items:"); // get a collection
        console.log("PARAMS", req.params)
        console.log("BODY", req.body)

        const client = new Client({
            connectionString: connectionString,
        })
        client.connect()

        client.query('SELECT * FROM items', (err, res) => {
            if(err){
                //error
                console.log("ERROR:", err)
                resp.json({data: null, success: false, errors: []});
            }else{
                // console.log(res.rows)
                resp.json({data: res.rows, success: true, errors: []});
            }
            client.end()
        })
    })
    .post((req, resp) => {
        console.log("--------------------- POST /api/items:"); // save item
        console.log("PARAMS", req.params)
        console.log("BODY", req.body)

        // var id = req.body.id;
        var text = req.body.text;
        var is_done = req.body.is_done;

        const client = new Client({
            connectionString: connectionString,
        })
        client.connect()

        client.query(
            'INSERT INTO items(text, is_done) values($1, $2)', 
            [text, is_done], 
            (err, res) => {
                if(err){
                    //error
                    console.log("ERROR:", err)
                    resp.json({data: null, success: false, errors: []});
                }else{
                    // console.log(res.rows)
                    resp.json({data: null, success: true, errors: []});
                }
                client.end()
            }
        )
    })

    router.route('/items/:id')
    .get((req, resp) => {
        console.log("--------------------- GET /api/items/:id:");
        console.log("PARAMS", req.params)
        console.log("BODY", req.body)

        var id = req.params.id;

        const client = new Client({
            connectionString: connectionString,
        })
        client.connect()

        client.query("SELECT * FROM items WHERE id = $1", [id], (err, res) => {
            if(err){
                //error
                console.log("ERROR:", err)
                resp.json({data: null, success: false, errors: []});
            }else{
                // console.log(res.rows)
                resp.json({data: res.rows, success: true, errors: []});
            }
            client.end()
        })
    })
    .put((req, resp) => {
        console.log("--------------------- PUT /api/items/:id:"); // update item
        console.log("PARAMS", req.params)
        console.log("BODY", req.body)

        var id = req.params.id;
        var text = req.body.text;
        var is_done = req.body.is_done;

        const client = new Client({
            connectionString: connectionString,
        })
        client.connect()

        client.query(
            `UPDATE items SET 
                text = $1, 
                is_done = $2
             WHERE id = $3;`, 
            [text, is_done, id], 
            (err, res) => {
                if(err){
                    //error
                    console.log("ERROR:", err)
                    resp.json({data: null, success: false, errors: []});
                }else{
                    // console.log(res.rows)
                    resp.json({data: null, success: true, errors: []});
                }
                client.end()
            }
        )
    })
    .delete((req, resp) => {
        console.log("--------------------- DELETE /api/items/:id:"); // delete item
        console.log("PARAMS", req.params)
        console.log("BODY", req.body)

        var id = req.params.id;

        const client = new Client({
            connectionString: connectionString,
        })
        client.connect()

        client.query(
            "DELETE FROM items WHERE id = $1", 
            [id], 
            (err, res) => {
                if(err){
                    //error
                    console.log("ERROR:", err)
                    resp.json({data: null, success: false, errors: []});
                }else{
                    // console.log(res.rows)
                    resp.json({data: res.rows, success: true, errors: []});
                }
                client.end()
            }
        )
    })

    // // THIS IS JUST FOR THE FRONT END
    // router.route('/items/new')
    // .get((req, resp) => {
    //     //...
    // })


    // // THIS IS JUST FOR THE FRONT END
    // router.route('/items/:id/edit')
    // .get((req, resp) => {
    //     //...
    // })


    //=======================================================


module.exports = router;