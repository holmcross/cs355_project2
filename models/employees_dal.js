var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.getActiveOrders = function (callback) {
    // queries the customersToContact VIEW to see all orders and custom order quests that aren't closed.
    var query = 'SELECT * FROM customersToContact;';

    connection.query(query, function (err, result) {
        callback(err, result);
    });
};