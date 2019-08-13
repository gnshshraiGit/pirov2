var configuration = require('./config')
var express = require('express');
var cors = require('cors');
var expressroutes = express.Router();
var walky = require('pirov2-plugins-walky')(configuration.walkyConf);//init with config or defaults will be applied
//var walky = require('./walky.js')(configuration.walkyConf);
var streamer = require('pirov2-plugins-avstreamer')(configuration.avstreamerConf);//init with config or defaults will be applied
//var streamer = require('./avstreamer.js')(configuration.avstreamerConf);
var ambient = require('pirov2-plugins-ambient')(configuration.ambientConf);//init with config or defaults will be applied
//var ambient = require('./ambient.js')(configuration.ambientConf);

var iosockroutes = function (io) {
    // Put all your socketio routes here, check plugins page on git or npm to see samples
    io.of('/walky').on('connection',walky);
    io.of('/avstream').on('connection',streamer);
    io.of('/ambient').on('connection',ambient);
}

// middleware providing rout to handle http requests
expressroutes.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  });

//Setting Static route
expressroutes.use(express.static(__dirname + '/dist/pirov2-webapp'));
// define the home page route
expressroutes.get('/', function (req, res) {
    res.sendFile(path.resolve('index.html'));
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

expressroutes.get('/uiconfig', cors(), function (req, res) {
    res.json(configuration.uiConfig);
  });

module.exports = {
    iosockRoutes: iosockroutes,
    expressRoutes: expressroutes
};