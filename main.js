var index = require('./index');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var SSDP = require('node-ssdp').Server;
var io = require('socket.io')(server);
index.iosockRoutes(io); // setup iosocket routes

//Static file path
app.use(express.static(__dirname + '/dist/pirov2-webapp'))
app.use('/app', index.expressRoutes); // routes for http requests

//used for SSDP/uPnP service dicovery
locationObj = {
    protocol:"http://",
    port:8080,
    path:"/app/uiconfig"
}
// adding our unique service name (usn) and unique device name (udn) for device type identification
var SSDPServer = new SSDP({allowWildcards:true , udn:'My Pirov2', location: locationObj});

SSDPServer.addUSN('pirov2');

onError =  function(err){
    console.log(err);
}
onListening = function(){
    console.log("Listening...");
}

SSDPServer.start(); // starting ssdp server to make our pirov2 device discoverable
server.listen(8080);
server.on('error', onError);
server.on('listening', onListening);
process.on('exit', function(){
    SSDPServer.stop() // advertise shutting down and stop listening
});
// WARNING: app.listen(80) will NOT work here!
