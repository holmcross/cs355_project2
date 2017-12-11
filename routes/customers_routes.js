var express = require('express');
var router = express.Router();
var customers_dal = require('../model/customers_dal');

router.get('/add', function (req, res, next) {
    res.render('customers/customersAdd', {title: 'Add A New Customer'});
});

router.get('customers/insert', function(req, res){

    if(req.query.CustomerName == null) {
        res.send('A name must be provided.');
    }
    else if(req.query.AddressLine1 == null) {
        res.send('Address Line 1 cannot be empty');
    }
    else if(req.query.Zip == null) {
            res.send('Zip Code cannot be empty');
    }
    else {
        customers_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                res.redirect(302, '/');
            }
        });
    }
});

module.exports = router;