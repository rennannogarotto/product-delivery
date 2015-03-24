//=============================================================================
// SERVICE FOR CREATE, RETRIEVE, UPDATE AND DELETE ROUTES
//=============================================================================
'use strict';

var prop = require('../config');
var i18n = require('i18n');
var jsonUtils = require('../utils/json-utils');
var httpUtils = require('../utils/http-utils');
var RoutesService = require('../services/routes-service');
var RoutesEndpoint = {};

/**
 * Find one backoffice route by id.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
RoutesEndpoint.findById = function(req, res, next) {

  if (httpUtils.idParamIsValid(req)) {
    return jsonUtils.returnError(prop.http.bad_request, i18n.__('validation').routes_endpoint_invalid_id_param, 'RoutesEndpoint.findById', next, err);
  } else {
    RoutesService.findById(req.params.id, function(err, route) {
      if (err) {
        return jsonUtils.returnError(prop.http.bad_request, i18n.__('validation').routes_endpoint_findById_error, 'RoutesEndpoint.findById', next, err);
      } else {
        if (route) {
          return jsonUtils.returnSuccess(null, route, res, next);
        } else {
          return jsonUtils.returnError(prop.http.bad_request, i18n.__('validation').routes_endpoint_not_found, 'RoutesEndpoint.findById', next, err);
        }
      }
    });
  }
};

/**
 * List all backoffice routes.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
RoutesEndpoint.findAll = function(req, res, next) {

  RoutesService.findAll(function(err, routes) {
    if (err) {
      return jsonUtils.returnError(prop.http.bad_request, i18n.__('validation').routes_findAll_error, 'RoutesEndpoint.findAll', next, err);
    } else {
      return jsonUtils.returnSuccess(null, routes, res, next);
    }
  });
};

/**
 * Save a backoffice route.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
RoutesEndpoint.save = function(req, res, next) {

  RoutesService.save(req.body, function(err, route) {
    if (err) {
      return jsonUtils.returnError(prop.http.bad_request, i18n.__('validation').routes_save_error, 'RoutesEndpoint.save', next, err);
    } else {
      return jsonUtils.returnSuccess(route._id, null, res, next);
    }
  });
};

/**
 * Update a backoffice route.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
RoutesEndpoint.update = function(req, res, next) {
  if (httpUtils.idParamIsValid(req)) {
    return jsonUtils.returnError(prop.http.bad_request, i18n.__('validation').routes_endpoint_invalid_id_param, 'RoutesEndpoint.update', next, err);
  } else {
    RoutesService.update(req.params.id, req.body, function(err, routeId) {
      if (err) {
        return jsonUtils.returnError(prop.http.bad_request, i18n.__('validation').routes_update_error, 'RoutesEndpoint.update', next, err);
      } else {
        return jsonUtils.returnSuccess(routeId, null, res, next);
      }
    });
  }
};

/**
 * Remove a backoffice route.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
RoutesEndpoint.remove = function(req, res, next) {
  if (httpUtils.idParamIsValid(req)) {
    return jsonUtils.returnError(prop.http.bad_request, i18n.__('validation').routes_endpoint_invalid_id_param, 'RoutesEndpoint.update', next, err);
  } else {
    RoutesService.remove(req.params.id, function(err, routeId) {
      if (err) {
        return jsonUtils.returnError(prop.http.bad_request, i18n.__('validation').routes_delete_error, 'RoutesEndpoint.remove', next, err);
      } else {
        return jsonUtils.returnSuccess(routeId, null, res, next);
      }
    });
  }
};


/**
 * Retrieve the lower cost between two routes.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
RoutesEndpoint.deliveryLowerCost = function(req, res, next) {
  try {
    httpUtils.validateDeliveryLowerCostParams(req);

  } catch (err) {
    return jsonUtils.returnError(prop.http.bad_request, i18n.__('validation').routes_endpoint_invalid_origin_destination_params, 'RoutesEndpoint.deliveryLowerCost', next, err);
  }

  RoutesService.deliveryLowerCost(req.query.origin, req.query.destination, req.query.autonomy, req.query.pricePerLiter, function(err, route) {
    if (err) {
      return jsonUtils.returnError(prop.http.bad_request, i18n.__('validation').routes_endpoint_deliveryLowerCost_error, 'RoutesEndpoint.deliveryLowerCost', next, err);
    } else {
      if (route) {
        return jsonUtils.returnSuccess(null, route, res, next);
      } else {
        return jsonUtils.returnError(prop.http.bad_request, i18n.__('validation').routes_endpoint_cost_not_defined, 'RoutesEndpoint.deliveryLowerCost', next, err);
      }
    }
  });

};

module.exports = RoutesEndpoint;