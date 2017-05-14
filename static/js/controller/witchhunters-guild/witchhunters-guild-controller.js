'use strict';

module.exports = function ($scope) {
    $scope.subtitle = 'Guild hall';

    $scope.setSubtitle = function (subtitle) {
        $scope.subtitle = subtitle;
    }
};