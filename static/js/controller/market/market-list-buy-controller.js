'use strict';

module.exports = function ($scope, marketData) {
    $scope.marketData = marketData;

    $scope.floor = function(value) {
        return Math.floor(value);
    };
};