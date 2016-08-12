'use strict';

module.exports = function ($scope, $http, $sce, $state, $stateParams, explorationResult) {
    $scope.explorationResult = explorationResult;

    console.log(explorationResult);

    $scope.convertCombatMessage = function (message) {
        return $sce.trustAsHtml(message);
    };

    $scope.attack = function() {
        $http.get('http://api.daggersandsorcery.com/combat/attack').then(function (response) {
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages = $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages.concat(response.data.data.combatSteps);
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].status = response.data.data.status;
        });
    };

    $scope.continueExploring = function() {
        $http.get('http://api.daggersandsorcery.com/explore/next').then(function (response) {
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].status.continued = true;
            $scope.explorationResult.events = $scope.explorationResult.events.concat(response.data.data.events);
        });
    };

    $scope.getCombatIcon = function (icon) {
        if (icon != undefined) {
            return require('image/icon/' + icon + '.png');
        }
    };

    $scope.callOption = function (nextStage) {
        $state.go('explore', {'explorationId': $stateParams.explorationId, 'nextStage': nextStage, 'explorationInfo': null});
    };
};