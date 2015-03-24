//=============================================================================
// DEFINE APP INITIALIZATION
//=============================================================================
(function() {
  'use strict';

  var prop = require('./config');
  var express = require('express');
  var morgan = require('morgan');
  var bodyParser = require('body-parser');
  var routesConfig = require('./routes/routes-config');
  var dbConfig = require('./database/db-config');
  var i18nConfig = require('./resources/i18n-config');
  var errorsConfig = require('./errors/errors-config');
  var pkg = require('../package.json');
  var app = express();

  function init() {

    app.disable('x-powered-by');
    app.set('title', prop.title);
    app.set('name', pkg.name);
    app.set('version', pkg.version);
   
    app.use(bodyParser.urlencoded({'extended':'true'}));
    app.use(bodyParser.json({ limit: '3mb', type: 'application/json' }));
    app.use(morgan(':method :url :status :response-time ms'));

    //Configure application language resource bundle
    i18nConfig.init(app);
    //Configure application routes
    routesConfig.init(app);
    //Congigure application error handlers
    errorsConfig.init(app);
    //Configure application database
    dbConfig.init();

    return app;
  }

  exports = module.exports = init;

})();