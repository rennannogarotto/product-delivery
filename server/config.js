//=============================================================================
// APPLICATION CONFIGURATION
//=============================================================================
module.exports = {
    port: 8080,
    title: 'Product Delivery',
    name: 'product-delivery',
    i18n: {
        locales: ['en', 'pt'],
        defaultLocale: 'en',
        base_directory: './server/resources/',
        bundles_directory: 'bundles',
        updateFiles: false
    },
    http: {
        allowed_methods: 'GET,PUT,POST,DELETE,OPTIONS',
        allowed_headers: 'Content-type,Accept,X-Access-Token,X-Key',
        allow_origin: '*',
        ok: 200,
        bad_request: 400,
        unauthorized: 401,
        forbidden: 403,
        not_found: 404,
        precondition_failed: 412,
        internal_server_error: 500
    },
    path: {
        default_version: 'v1',
        apply_authentication_all_endpoints: '/api/:version/*',
        apply_authorization_all_endpoints: '/api/:version/*'
    },
    database: {
        mongo_url: 'mongodb://localhost/test',
        max_result: 100,
        default_sort: {
            'changeDateTime': 1
        }
    },
    error: {
        validation_error: 'ValidationError'
    },
    message: {
        server: {
            listening: 'Serving listening on port'
        },
        database: {
            mongo_connected: 'Connected to MongoDB ...'
        },
        route: {
            missing_application: 'Missing application.'
        },
        services: {
            index_invalid_func: 'Function attribute can not be null.',
            index_invalid_req: 'Request attribute can not be null.',
            index_invalid_method: 'Method attribute can not be null.',
            index_method_not_implemented: 'Method not implemented.'
        },
        error: {
            error_message_null: 'Error message can not be null.'
        },
        i18n: {
            json_file_with_invalid_format: 'Please, verify the format of resource bundles files.'
        }
    }
};