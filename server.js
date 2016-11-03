/**
 * Created by andyfeng on 11/3/16.
 */

// Require Modules ----------------------------------------------
var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var colors = require("colors");
var save;
var querystring = require("querystring");


// Use Modules  -------------------------------------------------
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');




// Routes -------------------------------------------------------
app.get('/', function(req, res) {
    res.render("index");
});

app.post('/submit', function(req, res) {

    console.log("------------------------".yellow);
    console.log("POST DATA", req.body);
    save = req.body;


    // This is where we would add the user to the database
    // Then redirect to the root route
    res.redirect('/result');
});

app.get('/result', function(req, res) {


    console.log("------------------------".red);
    console.log(save);



    res.render("result", { data: save });

});










// Server Listen  -----------------------------------------------
var server = app.listen(9000, function() {
    console.log("It's over 9000!!!!".blue);
});



// SOCKETS ::::::::::::::::::::::::::::::::::::
var io = require('socket.io').listen(server);


io.sockets.on('connection', function (socket) {
    console.log("WE ARE USING SOCKETS!".red);
    console.log(socket.id);
    //all the socket code goes in here!


    socket.on("button_clicked", function (data){
        console.log('Someone clicked a button!  Reason: ' + data.reason);
        socket.emit('server_response', {response: "sockets are the best!"});
    });


    socket.on("form_submitted", function(data){
        var result = querystring.parse(data);

        console.log("------------------------".red);
        console.log(result);

        result.rand = Math.floor(Math.random() * (1000)) + 1;


        socket.emit('server_response', result);



    });





});
















