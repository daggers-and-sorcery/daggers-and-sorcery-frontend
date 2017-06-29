'use strict';

module.exports = angular.module('swordssorcery', ['ui.router', 'ui.bootstrap', 'ngMessages', 'rzModule', 'hc.marked', 'ngAnimate', 'ngFlash', 'hm.readmore', 'angular.filter', 'ec.stateloader'])
    .config(function ($httpProvider, $logProvider) {
        $httpProvider.defaults.withCredentials = true;

        $logProvider.debugEnabled(true);
    })
    .filter('secondsToDateTime', [function () {
        return function (seconds) {
            return new Date(1970, 0, 1).setSeconds(seconds);
        };
    }])
    .run(function ($templateCache) {
        $templateCache.put('market-header', require('../partial/main/market/market-header.html'));
    });