'use strict';

module.exports = function ($scope) {
    $scope.getItemTypeImage = function (itemType) {
        return require('image/icon/inventory/' + itemType.toLowerCase() + '.png');
    };
};