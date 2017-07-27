'use strict';

module.exports = function ($scope, marketData) {
    $scope.shopData = marketData;

    $scope.getItemTypeImage = function (itemType) {
        return require('image/icon/inventory/' + itemType.toLowerCase() + '.png');
    };
};