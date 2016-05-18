'use strict';

module.exports = angular.module('swordssorcery', ['ui.router', 'ui.bootstrap', 'ngMessages', 'rzModule', 'hc.marked', 'ngFlash']).config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
});