//=============================================================================
// UTILS METHODS TO HANDLE REQUESTS AND RESPONSES
//=============================================================================
'use strict';

var prop = require('../config');
var i18n = require('i18n');
var jsonUtils = require('./json-utils');
var errorUtils = require('./error-utils');
var HTTPUtils = {};

/**
 * Validate request body.
 * @param req - HTTP Request object.
 * @throws error.
 */
HTTPUtils.validateBody = function(req) {

	if (!req || !req.body) {
		throw errorUtils.getValidationError(prop.http.bad_request, i18n.__('validation').http_utils_invalid_request_body);
	} else {
		if (req.body._id) {
			throw errorUtils.getValidationError(prop.http.bad_request, i18n.__('validation').http_utils_invalid_request_body_id);
		}
		if (req.body.changeDateTime) {
			throw errorUtils.getValidationError(prop.http.bad_request, i18n.__('validation').http_utils_invalid_request_body_changeDateTime);
		}
		if (req.body.createDateTime) {
			throw errorUtils.getValidationError(prop.http.bad_request, i18n.__('validation').http_utils_invalid_request_body_createDateTime);
		}
	}
};

/**
 * Validate request id parameter.
 * @param req - HTTP Request object.
 * @throws error.
 */
HTTPUtils.idParamIsValid = function(req) {
	if (!req || !req.params || !req.params.id) {
		throw errorUtils.getValidationError(prop.http.bad_request, i18n.__('validation').http_utils_invalid_request_parameter_id);
	}
};

/**
 * Validate request origin parameter.
 * @param req - HTTP Request object.
 * @throws error.
 */
HTTPUtils.validateDeliveryLowerCostParams = function(req) {
	var re = /^[0-9]{1,5}(\.[0-9]{1,2})?$/;
	if (!req.query) {
		throw errorUtils.getValidationError(prop.http.bad_request, i18n.__('validation').http_utils_invalid_request);
	}
	if (!req.query.origin) {
		throw errorUtils.getValidationError(prop.http.bad_request, i18n.__('validation').http_utils_invalid_request_origin);
	}
	if (!req.query.destination) {
		throw errorUtils.getValidationError(prop.http.bad_request, i18n.__('validation').http_utils_invalid_request_destination);
	}
	if (!req.query.autonomy) {
		throw errorUtils.getValidationError(prop.http.bad_request, i18n.__('validation').http_utils_invalid_request_autonomy);
	} else {		 
    	 if(!re.test(req.query.autonomy)) {
 			throw errorUtils.getValidationError(prop.http.bad_request, i18n.__('validation').http_utils_invalid_request_autonomy);
    	 }
	}
	if (!req.query.pricePerLiter) {
		throw errorUtils.getValidationError(prop.http.bad_request, i18n.__('validation').http_utils_invalid_request_pricePerLiter);
	} else {
    	 if(!re.test(req.query.pricePerLiter)) {
 			throw errorUtils.getValidationError(prop.http.bad_request, i18n.__('validation').http_utils_invalid_request_pricePerLiter);
    	 }
	}
};

exports = module.exports = HTTPUtils;