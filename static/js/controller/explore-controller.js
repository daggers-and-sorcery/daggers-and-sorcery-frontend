'use strict';

module.exports = function ($scope, $http, $sce, $state, $stateParams, explorationResult) {
    $scope.explorationResult = explorationResult;
    $scope.usableSpells = [];
    $scope.usableItems = [];
    $scope.spellToUse = {};
    $scope.itemToUse = {};

    $http.get('http://api.daggersandsorcery.com/combat/usable/spell').then(function (response) {
        $scope.usableSpells = response.data.data.spellList;
        if ($scope.usableSpells.length > 0) {
            $scope.spellToUse.target = $scope.usableSpells[0];
        }
    });

    $http.get('http://api.daggersandsorcery.com/combat/usable/item').then(function (response) {
        $scope.usableItems = response.data.data.itemList;
        if ($scope.usableItems.length > 0) {
            $scope.itemToUse.target = $scope.usableItems[0];
        }
    });

    $scope.cast = function () {
        $http.get('http://api.daggersandsorcery.com/combat/cast/' + $scope.spellToUse.target.id).then(function (response) {
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages = $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages.concat(response.data.data.combatSteps);
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].status = response.data.data.status;
        });
    };

    $scope.use = function () {
        $http.get('http://api.daggersandsorcery.com/combat/use/' + $scope.itemToUse.target.id).then(function (response) {
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages = $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages.concat(response.data.data.combatSteps);
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].status = response.data.data.status;
        });
    };

    $scope.flee = function () {
        $http.get('http://api.daggersandsorcery.com/combat/flee').then(function (response) {
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages = $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages.concat(response.data.data.combatSteps);
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].status = response.data.data.status;
        });
    };

    $scope.convertCombatMessage = function (message) {
        return $sce.trustAsHtml(message);
    };

    $scope.attack = function () {
        $http.get('http://api.daggersandsorcery.com/combat/attack').then(function (response) {
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages = $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages.concat(response.data.data.combatSteps);
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].status = response.data.data.status;
        });
    };

    $scope.continueExploring = function () {
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
        $state.go('explore', {
            'explorationId': $stateParams.explorationId,
            'nextStage': nextStage,
            'explorationInfo': null
        });
    };
};