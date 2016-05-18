'use strict';

module.exports = function ($scope, $state, $interval, $http, chatList) {
    $scope.messages = chatList.messages;
    $scope.textToSend = "";

    var refreshChat = function() {
        $http.get('http://api.daggersandsorcery.com/inn/chat/list').then(function (response) {
            $scope.messages = response.data.data.messages;
        });
    };

    $interval(function () {
        refreshChat();
    }, 5000);

    $scope.writeMessage = function () {
        var payload = {
            chatMessage: $scope.textToSend
        };

        $http.post('http://api.daggersandsorcery.com/inn/chat/send', payload).then(function (response) {
            refreshChat();
        });

        $scope.textToSend = "";
    };

    $scope.showServices = function () {
        $state.go('inn-services');
    }
};