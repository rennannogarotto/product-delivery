//=============================================================================
// DEFINE APP ERROS HANDLERS
//=============================================================================
'use strict';
var prop = require('../config');
var i18n = require('i18n');
var logUtils = require('../utils/log-utils');
var errorsConfig = {};

/**
 * Configure application error handlers.
 * @param app - Express instance initialized.
 */
errorsConfig.init = function(app) {
    if (!app) {
        throw (prop.message.routes.missing_application);
    }
    app.use(function(err, req, res, next) {
        var responseBody = getResponseBody(err);
        var responseStatus = getResponseStatus(err);
        res.status(responseStatus).send(responseBody);

        logUtils.logInfo(getLogMessage(req, responseBody, responseStatus, err));
    });
};

module.exports = errorsConfig;

/**
 * Define response body by error.
 * @param err - Application error.
 * @return Json with error message.
 */
function getResponseBody(err) {

    if (err) {
        if (err.name === prop.error.validation_error) {
            return err;
        } else {
            if (!err.external) {
                logUtils.logInfo(err);
                throw i18n.__('internal_error').errors_utils_internal_error;
            }
            return {
                'message': err.external.message
            };
        }
    }
}

/**
 * Define response status by error.
 * @param err - Application error.
 * @return Error status code.
 */
function getResponseStatus(err) {
    return err.status || prop.http.bad_request;
}

function getLogMessage(req, responseBody, responseStatus, err) {

    //FIX ME request body is null
    var logMessage = {
        request: {
            body: req.body,
            url: req.url
        },
        response: {
            body: responseBody,
            status: responseStatus
        }
    };

    if (err && err.internal) {
        logMessage.internal = err.internal.toString().replace('[', '').replace(']', '');
    }

    if (err && err.origin) {
        logMessage.origin = err.origin;
    }

    return JSON.stringify(logMessage);
}