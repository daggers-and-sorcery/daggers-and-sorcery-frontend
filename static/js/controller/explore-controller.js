'use strict';

module.exports = function ($scope, $sce, explorationResult) {
    $scope.explorationResult = explorationResult;

    $scope.convertCombatMessage = function (messageData) {
        var message = messageData.message;

        angular.forEach(messageData, function (value, key) {
            message = message.replace("${" + key + "}", '<b>' + value + '</b>');
        });

        return $sce.trustAsHtml(message);
    };

    $scope.getCombatIcon = function (messageData) {
        if (messageData.icon != undefined) {
            if (messageData.icon_color != undefined) {
                return require('image/icon/' + messageData.icon + '_' + messageData.icon_color + '.png');
            }

            return require('image/icon/' + messageData.icon + '.png');
        }
    };

    $scope.callOption = function (option) {
        console.log("Call option: " + option)
    };
};