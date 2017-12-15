var express = require('express');
var router = express.Router();
var customers_dal = require('../models/customers_dal');

router.get('/add', function (req, res, next) {
    res.render('customers/customersAdd', {title: 'Add A New Customer'});
});

router.get('/checkOrdersByCustomerId', function (req, res, next) {
    customers_dal.getAll(function (err, result){
        res.render('customers/customersLookupOrderById', {title: 'Lookup by Customer Id', allCustomers: result});
    })
});

router.get('/insert', function(req, res){


    if(req.query.CustomerName == "") {
        res.send('A name must be provided.');
    }
    else if(req.query.AddressLine1 == "") {
        res.send('Address Line 1 cannot be empty.');
    }
    else if(req.query.Zip.length >= 6 || req.query.Zip.length <= 4) {
            res.send('A valid zip code must be provided.');
    }
    else {
        customers_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                res.render('success', {title:'Successfully Saved User Data!'});
                //res.redirect(302, '/');
            }
        });
    }
});

module.exports = router;