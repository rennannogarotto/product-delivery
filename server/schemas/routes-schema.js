'use strict';
var i18n = require('i18n');
var prop = require('../config');
var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var errorUtils = require('../utils/error-utils');

//=============================================================================
// ROUTES VALIDATORS
//=============================================================================
var nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [1, 40],
        message: 'Name should have between 1 and 40 characters.'
    })
];

var locationValidator = [
    validate({
        validator: 'isLength',
        arguments: [1, 40],
        message: 'Origin and Destination should have between 1 and 40 characters.'
    })
];

var distanceValidator = [
    validate({
        validator: 'matches',
        arguments: ['^[0-9]{1,5}(\.[0-9]{1})?$', 'i'],
        message: 'Distance is invalid.'
    })
];

//=============================================================================
// ROUTES SCHEMA
//=============================================================================
var RoutesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        unique: true,
        validate: nameValidator
    },
    origin: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        validate: locationValidator
    },
    destination: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        validate: locationValidator
    },
    distance: {
        type: String,
        required: true,
        trim: true,
        validate: distanceValidator
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    createDateTime: {
        type: Number
    },
    changeDateTime: {
        type: Number
    },
    __v: {
        type: Number,
        select: false
    }
});

var RoutesModel = mongoose.model('RoutesSchema', RoutesSchema);

//=============================================================================
// ROUTES MIDDLEWARES
//=============================================================================
//Define change date time when schema is saved
RoutesSchema.pre('save', function(next) {
    this.createDateTime = new Date().getTime();
    this.changeDateTime = new Date().getTime();
    next();
});

//Validate duplicated origin/destination.
RoutesSchema.pre('save', function(next) {
    RoutesModel.findOne({
        $and: [{
            origin: this.origin
        }, {
            destination: this.destination
        }]
    }, function(err, route) {
        if (err) {
            next(err);
        } else {
            if (route && route.origin) {
                next(errorUtils.getValidationError(prop.http.bad_request, i18n.__('validation').routes_schema_save_duplicated));
            } else {
                next();
            }
        }
    });
});

module.exports = RoutesModel;