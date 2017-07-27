'use strict';

module.exports = function ($scope, marketData) {
    $scope.marketData = marketData;

    $scope.floor = function(value) {
        return Math.floor(value);
    };

    $scope.getItemTypeImage = function (itemType) {
        return require('image/icon/inventory/' + itemType.toLowerCase() + '.png');
    };
};