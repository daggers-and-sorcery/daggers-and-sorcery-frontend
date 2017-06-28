'use strict';

module.exports = function ($scope, $http, $sce, $state, $stateParams, $log, explorationResult) {
    $scope.explorationResult = explorationResult;
    $scope.usableSpells = [];
    $scope.usableItems = [];
    $scope.spellToUse = {};
    $scope.itemToUse = {};

    //TODO: Somehow use the same as the main explore does!
    $scope.mapImageInfo = {
        field: ['field-0', 'field-1', 'field-2', 'field-3'],
        inn: ['inn-0'],
        forest: ['forest-0', 'forest-1', 'forest-2', 'forest-3'],
        mountain: ['mountain-0', 'mountain-1', 'mountain-2', 'mountain-3'],
        forester: ['forester-0', 'forester-1'],
        farm: ['farm-0', 'farm-1', 'farm-2', 'farm-3'],
        city: ['city-0', 'city-1', 'city-2', 'city-3']
    };

    $scope.activeMapIcon = $scope.mapImageInfo[$scope.explorationResult.info.terrain.toLowerCase()][Math.floor(Math.random() * $scope.mapImageInfo[$scope.explorationResult.info.terrain.toLowerCase()].length)];

    $scope.getTerrainImage = function () {
        return require('image/icon/map/' + $scope.activeMapIcon + '.png');
    };

    $scope.getRarityIcon = function() {
        return require('image/icon/rarity/' + $scope.explorationResult.info.rarity.toLowerCase() + '.png');
    };

    //TODO: Somehow use the same as the main explore does!
    $scope.getRarityText = function() {
        var eventRarity = $scope.explorationResult.info.rarity.toLowerCase();

        switch(eventRarity) {
            case 'common':
                return 'Common event';
            case 'uncommon':
                return'Uncommon event';
            case 'rare':
                return 'Rare event';
            case 'epic':
                return 'Epic event';
        }
    };

    $http.get('https://api.daggersandsorcery.com/combat/usable/spell').then(function (response) {
        $scope.usableSpells = response.data.data.spellList;
        if ($scope.usableSpells.length > 0) {
            $scope.spellToUse.target = $scope.usableSpells[0];
        }
    });

    $http.get('https://api.daggersandsorcery.com/combat/usable/item').then(function (response) {
        $scope.usableItems = response.data.data.itemList;
        if ($scope.usableItems.length > 0) {
            $scope.itemToUse.target = $scope.usableItems[0];
        }
    });

    $scope.cast = function () {
        $log.debug('Casting the spell with id: ' + $scope.spellToUse.target.id);

        $http.get('https://api.daggersandsorcery.com/combat/quest_'+$stateParams.questId+'/cast/' + $scope.spellToUse.target.id).then(function (response) {
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages = $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages.concat(response.data.data.combatSteps);
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].status = response.data.data.status;
        });
    };

    $scope.use = function () {
        $log.debug('Use the item with id: ' + $scope.itemToUse.target.id);

        $http.get('https://api.daggersandsorcery.com/combat/quest_'+$stateParams.questId+'/use/' + $scope.itemToUse.target.id).then(function (response) {
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages = $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages.concat(response.data.data.combatSteps);
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].status = response.data.data.status;
        });
    };

    $scope.flee = function () {
        $log.debug('Trying to flee!');

        $http.get('https://api.daggersandsorcery.com/combat/quest_'+$stateParams.questId+'/flee').then(function (response) {
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages = $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages.concat(response.data.data.combatSteps);
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].status = response.data.data.status;
        });
    };

    $scope.convertCombatMessage = function (message) {
        return $sce.trustAsHtml(message);
    };

    $scope.attack = function () {
        $log.debug('Attacking the opponent!');

        $http.get('https://api.daggersandsorcery.com/combat/quest_'+$stateParams.questId+'/attack').then(function (response) {
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages = $scope.explorationResult.events[$scope.explorationResult.events.length - 1].combatMessages.concat(response.data.data.combatSteps);
            $scope.explorationResult.events[$scope.explorationResult.events.length - 1].status = response.data.data.status;
        });
    };

    $scope.continueExploring = function () {
        $state.go('quest-explore', {'questId': $stateParams.questId}, {reload: true});
    };

    $scope.getCombatIcon = function (icon) {
        if (icon !== undefined) {
            return require('image/icon/' + icon + '.png');
        }
    };

    $scope.callOption = function (nextStage) {
        console.log("quest");

        $state.go('quest-explore', {
            'questId': $stateParams.questId,
            'nextStage': nextStage
        });
    };

    $scope.explore = function(questId) {
        $state.go('quest-explore', {'questId': questId}, {reload: true});
    }
};