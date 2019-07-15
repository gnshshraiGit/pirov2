var app = require('express')();
var server = require('http').createServer(app);
var SSDP = require('node-ssdp').Server;
var io = require('socket.io')(server);
var ioroute = require('./index')(io); // all routes are setup here
// adding our unique service name (usn) and unique device name (udn) for device type identification
var SSDPServer = new SSDP({allowWildcards:true , udn:'f40c2981-7329-40b7-8b04-2837aecfb8'});

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