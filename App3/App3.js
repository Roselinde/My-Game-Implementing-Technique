var express = require('express')
var mysql = require('mysql')
var app = express()

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'app'
})

connection.connect(function (err) {
    if (err) {
        console.log('Error Connecting', err.stack);
        return;
    }
    console.log('Connected as id', connection.threadId)
})


app.get('/users', function (req, res) {
    //res.end('Hello')

    queryAllUser(function (err, result) {
        res.end(result)
    })
})

app.get('/user', function (req, res) {
    //res.end('Hello')

    queryUser(function (err, result) {
        res.end(result)
    })
})

app.get('/user/:name', function (req, res) {
    var name = req.params.name
    console.log(name)
})


var server = app.listen(8081, function () {
    console.log('Server Running')
})

function queryAllUser(callback) {
    var json = ''
    connection.query('SELECT * FROM user',
        function (err, rows, fields) {
            if (err) throw err

            json = JSON.stringify(rows)

            callback(null, json)
        })
}

function queryUser(callback) {
    var json = ''
    connection.query('SELECT * FROM user WHERE name = "Yolo"',
        function (err, rows, fields) {
            if (err) throw err

            json = JSON.stringify(rows)

            callback(null, json)
        })
}