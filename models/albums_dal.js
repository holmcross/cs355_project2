var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.getAll = function (callback) {
    var query = 'SELECT * FROM albums;';

    connection.query(query, function (err, result) {
        callback(err, result);
    });
};

exports.insert = function (params, callback) {
    var query = 'INSERT INTO addresses (AddressLine1, AddressLine2, City, State, Zip) VALUES ?';
    var addressData = [params.AddressLine1, params.AddressLine2, params.City, params.State, params.Zip];

    connection.query(query, [addressData], function(err, result) {

        var InsertedAddressId = result.insertId;

        var query = 'INSERT INTO customers (CustomerName, EmailAddress, PhoneNumber, MailingAddress) VALUES ?';
        var customerData = [params.CustomerName, params.EmailAddress, params.PhoneNumber, params.MailingAddress, InsertedAddressId]

        connection.query(query, [addressData], function(err, result) {
            callback(err, result);
        });
    });
};