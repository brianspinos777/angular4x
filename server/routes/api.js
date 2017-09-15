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





        

module.exports = router;