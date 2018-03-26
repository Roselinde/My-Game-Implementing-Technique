var express = require('express')
var mysql = require('mysql')
var app = express()

var connection = mysql.createConnection({
    host: 'cgm276serverdata.c2a970tk0l08.ap-southeast-1.rds.amazonaws.com',
    user: 'snailsaz',
    password: 'avatar2142',
    database: 'cgm276serverdata'
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

app.get('/user/add/user', function (req,res){
    var name = req.query.name
    var password = req.query.pass

    var user = [[name,password]]
    InsertUser(user, function(err,result){
        res.end(result)
    })


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

function InsertUser(user, callback) {
    var sql = 'INSERT INTO user(name,password) values ?'
    
    connection.query(sql,[user],
        function (err) {

            var res = '[{"success" : "true"}]'
            if (err) {
                res = '[{"success" : "false"}]'

                throw err
            }
            callback(null, res)
        })
}