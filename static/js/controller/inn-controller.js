'use strict';

module.exports = function ($scope, $state, chatList) {
    $scope.messages = chatList;

    $scope.writeMessage = function() {
       //TODO: send
    };

    $scope.showServices = function() {
        $state.go('inn-services');
    }
};