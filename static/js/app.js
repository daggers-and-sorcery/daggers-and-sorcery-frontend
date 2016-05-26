'use strict';

module.exports = angular.module('swordssorcery', ['ui.router', 'ui.bootstrap', 'ngMessages', 'rzModule', 'hc.marked', 'ngFlash', 'hm.readmore']).config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
});