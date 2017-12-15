var express = require('express');
var router = express.Router();
var employees_dal = require('../models/employees_dal');
var orders_dal = require('../models/orders_dal');

router.get('/', function (req, res, next) {
    res.render('employees/employeesIndex', {title: 'Index of employee actions'});
});

router.get('/getActiveIssues', function (req, res, next) {

    employees_dal.getActiveOrders(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('employees/ordersToResolve', {'result': result});
        }
    });
});

router.get('/findAlbumsPresentInMoreThenOneOrder', function (req, res){
    orders_dal.findAlbumsInMultipleOrders(function(err,result) {
        res.render('employees/displayAlbumsInMultipleOrders', {'result': result});
    });
});

module.exports = router;