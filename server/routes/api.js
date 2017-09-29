let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

// to be changed and added to an ENV variable
const MY_SECRET_JWT_TOKEN = "YWEzOGJlOWMyNjIxZGNlMzJjM2MzNWRi"; // $ date +%s | sha256sum | base64 | head -c 32 ; echo



router.route('/')
    .get((req, res) => {
        res.send('hello from /blocks/');
    })
    // .post(...)

router.route('/foo/:id')
    .get((req, res) => {
        let myId = req.params.id;
        res.json({id: myId, success: true});
    })
    // .post(...)

router.route('/foo')
    .get((req, res) => {
        let myData = {name: 'brian', age: 27};
        res.json(myData);
    })
    // .post(...)

router.route('/pass') // like a signup url
    .post((req, res) => {

        let password = req.body.password

        const saltRounds = 10;
        const myPlaintextPassword = password;

        bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
            // Store hash in your password DB.
            let myData = {hash: hash, password: myPlaintextPassword};
            res.json(myData);
        });

            
    })
    // .post(...)

router.route('/checkpass') // check if password is correct
    .get((req, resp) => {

        const password = 's0m3P4$$w0rD';
        const otherPassword = 'not_bacon';
        const hash = "$2a$10$eAZroHTbos/rceLg6oPLiepu80pEEybrXiJCALw./Gsnlg3Q5yubu";

        // Load hash from your password DB.
       
        // bcrypt.compare(password, hash, (err, res) => {
        //     // res == true
        //     // res.json({success: res, pass: password});
        //     console.log('hash', {success: res, pass: password});
        // });

        let myObj = {};

        bcrypt.compare(otherPassword, hash, (err, res) => {
            // res == false
            // res.json({success: res, pass: otherPassword});

            myObj = {
                success: res, 
                pass: otherPassword,
                hash: hash
            };

            console.log('hash', myObj);

            resp.json({test: true, myObj: myObj})
        }); 

        // resp.json({test: true, myObj: myObj})
    })
    // .post(...)


    //======================================================= Postgresql

    // https://node-postgres.com/features/connecting
    const { Pool, Client } = require('pg')
    const connectionString = 'postgresql://prg:password@localhost:5432/briandb2'

    const pool = new Pool({
      connectionString: connectionString,
    })

    //======================================================= Login with credentials

    router.route('/auth')
    .post((req, resp) => {

        //======================================================= get credentials
        let email = req.body.email;
        let password = req.body.password;

        // email = "brian@hotmail.com"
        // password = "password";
        // password_digest = "$2a$10$kuM1Tuxbu5cfNkgeBAX4yupgC8dMQkQVXUhtwTsj1d9gPnJxHdF7q";

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
                                    
                                    // Generate JWT token:
                                    let token = jwt.sign({
                                        name: user.name,
                                        email: user.email
                                    }, MY_SECRET_JWT_TOKEN);

                                    resp.json({data: {token: token}, success: true, errors: []});
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

    //======================================================= verify jwt token
    router.route('/verify')
    .get((req, resp) => { // verify jwt token
        let token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, MY_SECRET_JWT_TOKEN, (err, decoded) => {
            if(err){
                console.log("ERROR: ", "JWT error");
                resp.json({data: null, success: false, errors: ["JWT error"]});
            }else{
                if(decoded){
                    resp.json({data: decoded, success: true, errors: []});
                }else{
                    resp.json({data: null, success: false, errors: ["Bad JWT token"]});
                }
            }
        });
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
    .get((req, resp) => { // get a collection

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
    .post((req, resp) => { // save item

        // let id = req.body.id;
        let text = req.body.text;
        let is_done = req.body.is_done;

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

        let id = req.params.id;

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
    .put((req, resp) => { // update item
        let id = req.params.id;
        let text = req.body.text;
        let is_done = req.body.is_done;

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
    .delete((req, resp) => { // delete item
        let id = req.params.id;

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