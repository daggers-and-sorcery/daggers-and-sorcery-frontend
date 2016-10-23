'use strict';

module.exports = function ($scope, marketData) {
    $scope.marketData = marketData;

    $scope.sell = function () {
        console.log("sell")
    };
};