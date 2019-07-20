var configuration = require('./config')
var express = require('express');
var expressroutes = express.Router();
var walky = require('pirov2-plugins-walky')();//init with config or defaults will be applied
//var walky = require('./walky.js')(configuration.walkyConf);
var streamer = require('pirov2-plugins-avstreamer')();//init with config or defaults will be applied
//var streamer = require('./avstreamer.js')(configuration.avstreamerConf);

var iosockroutes = function (io) {
    // Put all your socketio routes here, check plugins page on git or npm to see samples
    io.of('/walky').on('connection',walky);
    io.of('/avstream').on('connection',streamer);
}

// middleware providing rout to handle http requests
expressroutes.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  });
  // define the home page route
expressroutes.get('/', function (req, res) {
    res.send('we will serve the browser version of app on this endpoint')
  });
// this route for serving the recorded files
expressroutes.get('/recordings' + '/:name', function (req, res, next) {
    var options = {
        root: configuration.avstreamerConf.recordingFolder, // this should be same as passed to avstreamer
        dotfiles: 'deny',
        headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
        }
    }

    var fileName = req.params.name
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err)
        } else {
            console.log('Sent:', fileName)
        }
    });
});

module.exports = {
    iosockRoutes: iosockroutes,
    expressRoutes: expressroutes
};