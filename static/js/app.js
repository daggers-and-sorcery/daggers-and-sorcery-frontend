'use strict';

module.exports = angular.module('swordssorcery', ['ui.router', 'ui.bootstrap', 'ngMessages', 'rzModule', 'hc.marked']).config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
});