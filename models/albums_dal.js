var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.getAll = function (callback) {
    var query = 'SELECT * FROM albums;';

    connection.query(query, function (err, result) {
        callback(err, result);
    });
};

exports.getAlbumInfoByIds = function (albumIdArray, callback) {

    var query = 'SELECT * FROM albums ' +
        'WHERE AlbumId = ?;';
    var querydata = albumId;
    connection.query(query, querydata, function (err, result) {
        callback(err, result);
    });

};

exports.checkFormatsInStock = function (callback) {
   var query =  'SELECT Format, SUM(NumberInStock) AS Total_In_Stock FROM albums GROUP BY Format HAVING Total_In_Stock > 1;'
    connection.query(query, function (err, result) {
        callback(err, result);
    });
}

exports.insert = function (params, callback) {

};