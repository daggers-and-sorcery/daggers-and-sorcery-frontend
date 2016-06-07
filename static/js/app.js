'use strict';

module.exports = angular.module('swordssorcery', ['ui.router', 'ui.bootstrap', 'ngMessages', 'rzModule', 'hc.marked', 'ngAnimate', 'ngFlash', 'hm.readmore'])
    .config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .filter('secondsToDateTime', [function() {
        return function(seconds) {
            return new Date(1970, 0, 1).setSeconds(seconds);
        };
    }]);