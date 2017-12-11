var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('about', { title: 'Info on The Triangular Department' });
});

module.exports = router;