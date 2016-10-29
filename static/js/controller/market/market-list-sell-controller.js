'use strict';

module.exports = function ($scope, marketData) {
    $scope.shopData = marketData;
    $scope.inventoryPopover = require('html/popover/inventory-popover.html');
};