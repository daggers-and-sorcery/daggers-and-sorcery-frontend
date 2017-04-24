'use strict';

module.exports = require('js/app.js').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('combatUpdateInterceptor');
    $httpProvider.interceptors.push('preloadInterceptor');
}]);