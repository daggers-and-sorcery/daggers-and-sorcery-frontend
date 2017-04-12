'use strict';

module.exports = require('js/app.js').factory('preloadInterceptor', function ($injector) {
    return {
        response: function (response) {
            if (response.data.charinfo !== undefined && response.data.charinfo !== null) {
                var $state = $injector.get('$state');

                if (!response.data.charinfo.preludeShown) {
                    $state.go('prelude');
                }
            }

            return response;
        }
    };
});