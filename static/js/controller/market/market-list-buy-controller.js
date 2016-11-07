'use strict';

module.exports = function ($scope, marketData) {
    $scope.marketData = marketData;
    $scope.inventoryPopover = require('html/popover/inventory-popover.html');

    $scope.floor = function(value) {
        return Math.floor(value);
    };
};