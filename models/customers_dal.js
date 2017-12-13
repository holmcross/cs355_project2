var mysql   = require('mysql');
var db  = require('./db_connection.js');
var connection = mysql.createConnection(db.config);


exports.getAll = function(callback) {
    var query = 'SELECT * FROM customers;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(CustomerId, callback) {
    var query = 'SELECT * FROM customers ' +
        'WHERE CustomerId = ?;';
    var queryData = CustomerId;

    console.log(query);

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO addresses (AddressLine1, AddressLine2, City, State, Zip) VALUES (?)';
    var addressData = [params.AddressLine1, params.AddressLine2, params.City, params.State, params.Zip];

    connection.query(query, [addressData], function(err, result) {

        var InsertedAddressId = result.insertId;

        var query = 'INSERT INTO customers (CustomerName, EmailAddress, PhoneNumber, MailingAddress) VALUES (?)';
        var customerData = [params.CustomerName, params.EmailAddress, params.PhoneNumber, InsertedAddressId];

        connection.query(query, [customerData], function(err, result) {
            callback(err, result);
        });
    });

};

/*
//This may not work: it requires taking the value from a submitted form and passing it to a mySQL function which
//Then checks it's existence in a table. Getting a "BAD_FIELD_ERROR: Unknown column 'EmailAddress' in field list
//My guess is the data types do not match up - javascript would have to force text into a varchar

exports.checkEmail = function(EmailAddress, callback) {
    var query = 'SELECT checkExistenceOfEmail( EmailAddress );';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};
*/