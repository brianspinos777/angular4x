var express = require('express');
var router = express.Router();

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


module.exports = router;