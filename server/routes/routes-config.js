//=============================================================================
// DEFINE APP ROUTES
//=============================================================================
'use strict';
var i18n = require('i18n');
var prop = require('../config');
var path = require('path');
var RouteEndpoint = require('../endpoints/routes-endpoint.js');
var routesConfig = {};

/**
 * Configure application routes.
 * @param app - Express instance initialized.
 */
routesConfig.init = function(app) {

  if (!app) {
    throw (prop.message.routes.missing_application);
  }

  // Define basic HTTP configuration for rest endpoints
  app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', prop.http.allow_origin);
    res.header('Access-Control-Allow-Methods', prop.http.allowed_methods);
    res.header('Access-Control-Allow-Headers', prop.http.allowed_headers);
    //res.setHeader("content-type", "application/json")
    //res.end(JSON.stringify(res));
    if (req.method == 'OPTIONS') {
      res.status(prop.http.ok).end();
    } else {
      next();
    }
  });

  app.get('/api/routes', RouteEndpoint.findAll);
  app.get('/api/routes/:id', RouteEndpoint.findById);
  app.post('/api/routes', RouteEndpoint.save);
  app.put('/api/routes/:id', RouteEndpoint.update);
  app.delete('/api/routes/:id', RouteEndpoint.remove);

  app.get('/api/deliveryLowerCost', RouteEndpoint.deliveryLowerCost);

};

module.exports = routesConfig;