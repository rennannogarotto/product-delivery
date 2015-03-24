//=============================================================================
// START THE SERVER
//=============================================================================
var prop = require('./server/config');
var i18n = require('i18n');
var LogUtils = require('./server/utils/log-utils');

// Define server port before start application
var port = process.env.NODE_PORT || prop.port;
// Define application configurations
var server = require('./server/app')();
server.listen(port);
console.log(prop.message.server.listening, port, '...');