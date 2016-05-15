'use strict';

module.exports = function ($scope, $state, innInfo) {
    console.log(innInfo);

    $scope.showChat = function() {
        $state.go('inn');
    }
};