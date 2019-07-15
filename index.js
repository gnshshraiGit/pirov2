var configuration = require('./config')
var walky = require('./walky')(configuration.walkyConf);

const iosock = function (io) {
    io.of('/walky').on('connection',walky);
    //io.of('/av').on('connection',avfunc);
}
module.exports = iosock