'use strict';

module.exports = function ($scope, $sce, explorationResult) {
    console.log(explorationResult);

    $scope.explorationResult = explorationResult;

    $scope.convertCombatMessage = function(messageData) {
        var message = messageData.message;

        angular.forEach(messageData, function (value, key) {
            message = message.replace("${" + key + "}", '<b>' + value + '</b>');
        });

        return $sce.trustAsHtml(message);
    };

    $scope.getCombatIcon = function(messageData) {
        if (messageData.icon != undefined) {
            return require('image/icon/' + messageData.icon + '_' + messageData.icon_color + '.png');
        }
    }
}