'use strict';

module.exports = function ($scope) {
    $scope.subtitle = 'Items';

    $scope.setSubtitle = function(subtitle) {
        $scope.subtitle = subtitle;
    }
};