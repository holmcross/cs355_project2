var express = require('express');
var router = express.Router();
var orders_dal = require('../models/orders_dal');

router.get('/checkOrdersById', function (req, res) {

    if(req.query.CustomerId == "") {
        res.send('CustomerId cannot be empty');
    }
    else {
        orders_dal.getOrderInfoByCustomerId(req.query.CustomerId, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('orders/showOrdersByCustomerId', {result: result[0], title: 'title'});
            }
        });
    }
});

router.get('/new', function (req, res) {
    res.render('orders/newOrderForm')
});

module.exports = router;