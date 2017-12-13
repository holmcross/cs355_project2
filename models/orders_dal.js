var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.getOrderInfoByCustomerId = function (CustomerId, callback) {
    var query = 'CALL getOrderInfoByCustomerId(?);';
    var queryData = CustomerId;

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

// STUCK ON THE STEP OF GETTING CUSTOMER ID... MAYBE IT'T NOT PROPERLY BEING SENT OVER BY THE ROUTES FILE?