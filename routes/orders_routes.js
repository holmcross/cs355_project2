var express = require('express');
var router = express.Router();
var orders_dal = require('../models/orders_dal');
var albums_dal = require('../models/albums_dal');
var customers_dal = require('../models/customers_dal');

router.get('/displayOrdersByCustomerId', function (req, res) {

    if(req.query.customerId == "") {
        res.send('CustomerId cannot be empty');
    }
    else {
        orders_dal.getOrderInfoByCustomerId(req.query.customerId, function (err, result) {
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
    albums_dal.getAll(function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('orders/newOrderForm', {result: result});
        }
    });
});

router.get('/newCustomOrder', function (req, res) {
    customers_dal.getAll(function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('orders/newCustomOrder', {allCustomers: result});
        }
    });
});


router.get('/addQuantityToOrder', function (req, res) {
    albums_dal.getAll(function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            //contains [AlbumId, AlbumName, UnitPrice]
            var resultArray = [];
            //iterate over albumId array and make a new array

            for(var i = 0; req.query.AlbumId.length > i; i++){
                for (var j = 0; result.length > j; j++){
                    //if the album id's match up, extract data and add to our new array to be passed to the ejs file.
                    if (req.query.AlbumId[i] == result[j].AlbumId){
                        var arrayElement = [ req.query.AlbumId[i], result[j].AlbumName, result[j].UnitPrice ];
                        resultArray.push(arrayElement);
                    }
                }
            }
            customers_dal.getAll(function(err, customersResult) {

                if(err) {
                    res.send(err);
                }
                else {
                    res.render('orders/newOrderFormAddQuantity', {allAlbumsArray: resultArray, allCustomers:customersResult});
                }
            });
        }
    });
});

//two parts to this: insert a new entry into the order table, then use that order ID and bulk insert records into the
//album_orders table with that order ID. Check the companyAddressInsert DAL function
router.get('/insert', function (req, res){

    orders_dal.insert(req.query, function(err,result) {
        if (err) {
            console.log(err)
            res.send(err);
        }
        else {
            res.render('success', {title:'New Order Submitted!'});
        }
    });

});

router.get('/insertCustomOrder', function (req, res) {

    orders_dal.insertCustomOrder(req.query, function(err,result) {
        if (err) {
            console.log(err)
            res.send(err);
        }
        else {
            res.render('success', {title:'Custom Order Successfully Submitted!'});
        }
    });

});

module.exports = router;