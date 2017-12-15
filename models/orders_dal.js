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

exports.findAlbumsInMultipleOrders = function (callback) {
    var query = 'SELECT a.AlbumId, a.AlbumName FROM albums a ' +
    'WHERE (SELECT COUNT(*) FROM album_orders ao WHERE ao.AlbumId = a.AlbumId GROUP BY ao.AlbumId) > 1;';
    connection.query(query, function (err, result) {
        callback(err, result);
    });
};

exports.insert = function (params, callback) {

    var query = 'INSERT INTO orders (CustomerId) VALUES (?)';
    var queryData = [params.customerId];

    connection.query(query, queryData, function(err, result) {

        var OrderId = result.insertId;

        var query = 'INSERT INTO album_orders (QuantityOrdered, AlbumId, OrderId) VALUES ?';

        // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
        var albumOrdersData = [];
        if (params.albumId.constructor === Array) {
            for (var i = 0; i < params.albumId.length; i++) {
                albumOrdersData.push([params.quantity[i], params.albumId[i], OrderId ]);
            }
        }
        else {
            albumOrdersData.push([params.quantity, params.albumId, OrderId ]);
        }

        // NOTE THE EXTRA [] AROUND companyAddressData
        connection.query(query, [albumOrdersData], function(err, result){
            callback(err, result);
        });
    });
};

exports.insertCustomOrder = function (params, callback) {

    var query = 'INSERT INTO customOrders (Description, CustomerId) VALUES (?);';
    var queryData = [params.Description, params.customerId];
    connection.query(query, [queryData], function(err, result) {
        callback(err, result);
    });
};
