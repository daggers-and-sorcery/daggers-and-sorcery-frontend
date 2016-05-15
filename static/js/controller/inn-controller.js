'use strict';

module.exports = function ($scope, $state, innInfo) {
    console.log(innInfo);

    $scope.showServices = function() {
        $state.go('inn-services');
    }
};