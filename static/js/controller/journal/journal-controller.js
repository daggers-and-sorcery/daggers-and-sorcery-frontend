'use strict';

module.exports = function ($scope) {
    $scope.subtitle = 'Quests';

    $scope.setSubtitle = function(subtitle) {
        $scope.subtitle = subtitle;
    }
};