'use strict';

module.exports = angular.module('swordssorcery', ['ui.router', 'ui.bootstrap'/*, 'ngMessages', 'rzModule' */]).config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
});