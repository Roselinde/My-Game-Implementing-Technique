
var express = require('express');
var app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'',
    user:'ab12yz89',
    password:'yz89ab12',
    database:'game1'
   
    });
    var putname;
    
    connection.connect(function (err)
    {
        if(err){
            console.log('Error Connecting',err.stack);
            return;
        }
        console.log('Connected as id',connection.threadId);
    })
    app.get ('/user/add/user',function(req,res)
    {
        var Name = req.query.Name;
        var Pasword = req.query.Pasword;

        var user =[[Name,Pasword]];
        queryAddUser(user,function(err,result)
        {
            res.end(result);
        });
    });
app.get ('/users',function(req,res)
{
queryAllUser(function(err,result)
{
    res.end(result);
});
});

app.get ('/Topusers',function(req,res)
{
queryTopTenUser(function(err,result)
{
    res.end(result);
});
});
app.get ('/user/:Name',function(req,res)
{
var Name = req.params.Name;
putname = req.params.Name;
console.log(Name);
queryUser(function(err,result)
{
    res.end(result);
});
});

app.get ('/userpass/:Name',function(req,res)
{
var Name = req.params.Name;
putname = req.params.Name;
console.log(Name);
queryCheckUser(function(err,result)
{
    res.end(result);
});
});
var server = app.listen (8081,function()
{
    console.log('Server: Running');
});

function queryAllUser (Callback)
{
    var json = '';
    connection.query('SELECT * FROM user',function(err ,rows,fields)
{
    if(err)throw err;
    json = JSON.stringify(rows);
    Callback(null,json);
    
});
}

function queryUser (Callback)
{
    var json = '';
    connection.query("SELECT * FROM user WHERE Name ='"+putname+"';",function(err ,rows,fields)
{
    if(err)throw err;
    json = JSON.stringify(rows);
    Callback(null,json);
    
});
}
function queryAddUser (user,Callback)
{
    var sql = 'INSERT INTO user (Name,Pasword) values ?';
    connection.query(sql,[user],
        function(err){
            var result = '[{"success":"true"}]'
            
    if(err)
    {
        var result = '[{"success":"false"}]'
        throw err;
    }
    Callback(null,null);
    
});
}
function queryCheckUser (Callback)
{
    var json = '';
    connection.query("SELECT *  FROM user  WHERE Name ='"+putname+"';",function(err ,rows,fields)
{
    if(err)throw err;
    json = JSON.stringify(rows);
    Callback(null,json);
    
});
}

function queryTopTenUser (Callback)
{
    var json = '';
    connection.query('SELECT Name,Score FROM user ORDER BY length(Score) DESC , Score DESC LIMIT 10;',function(err ,rows,fields)
{
    if(err)throw err;
    json = JSON.stringify(rows);
    Callback(null,json);
    
});
}