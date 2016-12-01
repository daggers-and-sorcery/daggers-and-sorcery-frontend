'use strict';

module.exports = function ($scope, $location, $anchorScroll) {

    $scope.scrollTo = function(location) {
        $location.hash(location);
        $anchorScroll.yOffset = 10;
        $anchorScroll();
    }
};