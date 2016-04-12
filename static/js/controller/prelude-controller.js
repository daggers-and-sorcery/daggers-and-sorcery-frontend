'use strict';

module.exports = function ($scope, $state) {
    $scope.next = function() {
        $state.go('character');
    }
};