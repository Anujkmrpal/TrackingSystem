var express = require("express");
var path = require('path');
var socket = require("socket.io");
var app = express();
//app.use(express.static("public"));
var server = app.listen(1000, function () {
    console.log("Server Start....");
})
var io = socket(server);
var trackeeArray = [];
io.sockets.on('connection', function (socket) {
    console.log('connection :', socket.request.connection._peername);
    socket.on('send', function (data) {
        console.log("geolocation", data);
        trackeeArray.push(data);
        for (var i = 0; i < trackeeArray.length; i++) {
            console.log(trackeeArray[i].latitude);
        }
        io.emit('adminmsg', {
            trackeeArray: trackeeArray
        });
    });
});
app.get('/', function (req, res) {
    res.send("welcome to website");
});
app.get('/trackee', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, './public/admin.html'));
    console.log("aaaa", socket.longitude);
});