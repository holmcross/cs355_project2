var express = require('express');
var router = express.Router();
var albums_dal = require('../models/albums_dal');

router.get('/catalog', function (req, res, next) {

    albums_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('albums/albumsCatalog', { 'result':result });
        }
    });

});

module.exports = router;