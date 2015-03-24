//=============================================================================
// CUSTOMERS SERVICE
//=============================================================================
'use strict';

var prop = require('../config');
var i18n = require('i18n');
var defaultStorage = require('../database/default-storage');
var errorUtils = require('../utils/error-utils');
var RoutesSchema = require('../schemas/routes-schema');
var LowerCostService = require('./lower-cost-service');
var RoutesService = {};

/**
 * Find route by id.
 * @param routeId - Route id object.
 * @param callback - Callback function.
 * @return Route object from database.
 */
RoutesService.findById = function(routeId, callback) {
	return defaultStorage.findById(routeId, RoutesSchema, callback);
};

/**
 * Find all routes.
 * @param fromPage - Page number.
 * @param limit - Maximum number of results.
 * @param callback - Callback function.
 * @return routes objects from database.
 */
RoutesService.findAll = function(callback) {
	return defaultStorage.findAll(RoutesSchema, callback);
};

/**
 * Save one route.
 * @param routeJSON - Route object to save.
 * @param callback - Callback function.
 * @return route object from database.
 */
RoutesService.save = function(routeJSON, callback) {
	defaultStorage.save(new RoutesSchema(routeJSON), function(err, routeFromDB) {
		if (err) {
			callback(err);
			return;
		} else {
			callback(null, routeFromDB);
			return;
		}
	});
};

/**
 * Update one route.
 * @param routeId - Route id.
 * @param routeJSON - Route object to save.
 * @param callback - Callback function.
 * @return routeId - Updated route id.
 */
RoutesService.update = function(routeId, routeJSON, callback) {
	new RoutesSchema(routeJSON).validate(function(err) {
		if (err) {
			callback(err);
			return;
		} else {
			defaultStorage.findById(routeId, RoutesSchema, function(err, route) {
				if (err) {
					callback(err);
					return;
				} else {
					if (!route) {
						callback(errorUtils.getValidationError(prop.http.bad_request, i18n.__('messages').route_not_found));
						return;
					} else {
						defaultStorage.findOneByCriteria({
							$and: [{
								'origin': this.origin
							}, {
								'destination': this.destination
							}]
						}, RoutesSchema, function(err, route) {
							if (err) {
								callback(err);
								return;
							} else {
								if (route && route._id.toString() !== routeId.toString()) {
									callback(errorUtils.getValidationError(prop.http.bad_request, i18n.__('validation').routes_schema_update_duplicated));
									return;
								} else {
									routeJSON.changeDateTime = new Date().getTime();
									defaultStorage.update(routeId, routeJSON, RoutesSchema, function(err) {
										if (err) {
											callback(err);
											return;
										} else {
											callback(null, routeId);
											return;
										}
									});
								}
							}
						});
					}
				}
			});
		}
	});
};

/**
 * Remove one route.
 * @param routeId - Route id to remove.
 * @param callback - Callback function.
 * @return routeId - Removed route id.
 */
RoutesService.remove = function(routeId, callback) {
	defaultStorage.remove(routeId, RoutesSchema, function(err, result) {
		if (err) {
			callback(err);
		} else {
			if (result === 0) {
				callback(errorUtils.getValidationError(prop.http.bad_request, i18n.__('validation').route_not_found));
				return;
			} else {
				callback(null, routeId);
				return;
			}
		}
	});
};

/**
 * Retrieve the lower cost between two routes.
 * @param origin - Origin point.
 * @param destination - Destination point.
 * @param autonomy - Autonomy.
 * @param pricePerLiter - Price per liter.
 * @param callback - Callback function.
 * @return route - Removed route id.
 */
RoutesService.deliveryLowerCost = function(origin, destination, autonomy, pricePerLiter, callback) {

	defaultStorage.findAll(RoutesSchema, function(err, routesFromDB) {
		if (err) {
			callback(err);
			return;
		} else {
			LowerCostService.buildRoutes(routesFromDB, function(err, routesObject) {
				if (err) {
					callback(err);
					return;
				} else {
					LowerCostService.getLowerCost(routesObject, origin, destination, autonomy, pricePerLiter, function(err, lowerCostRoute) {
						if (err) {
							callback(err);
							return;
						} else {
							callback(null, lowerCostRoute);
							return;
						}
					});
				}
			})
		}
	});
};

module.exports = RoutesService;