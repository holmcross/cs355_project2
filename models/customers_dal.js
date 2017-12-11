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

    // FIRST INSERT THE COMPANY
    var query = 'INSERT INTO company (company_name) VALUES (?)';

    var queryData = [params.company_name];

    connection.query(query, queryData, function(err, result) {

        // THEN USE THE COMPANY_ID RETURNED AS insertId AND THE SELECTED ADDRESS_IDs INTO COMPANY_ADDRESS
        var company_id = result.insertId;

        // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
        var query = 'INSERT INTO company_address (company_id, address_id) VALUES ?';

        // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
        var companyAddressData = [];
        if (params.address_id.constructor === Array) {
            for (var i = 0; i < params.address_id.length; i++) {
                companyAddressData.push([company_id, params.address_id[i]]);
            }
        }
        else {
            companyAddressData.push([company_id, params.address_id]);
        }

        // NOTE THE EXTRA [] AROUND companyAddressData
        connection.query(query, [companyAddressData], function(err, result){
            callback(err, result);
        });
    });

};