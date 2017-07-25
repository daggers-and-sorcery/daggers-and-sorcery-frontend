'use strict';

module.exports = function ($scope, $http, $state, witchhuntersGuildInfo) {
    $scope.showGuild = witchhuntersGuildInfo.info.accessible;
    $scope.showQuest = !witchhuntersGuildInfo.info.questStarted;

    if ($scope.showGuild) {
        $scope.subtitle = 'Guild hall';
        $state.go('witchhunters-guild.witchhunters-guild-main');
    } else {
        $scope.subtitle = 'Entrance';
    }

    $scope.acceptVampireQuest = function () {
        var payload = {
            questId: 2
        };

        $http.post('https://api.daggersandsorcery.com/quest/accept', payload).then(function (response) {
            $scope.showQuest = false;
        });
    };

    $scope.setSubtitle = function (subtitle) {
        $scope.subtitle = subtitle;
    };

    $scope.hideQuest = function () {
        $scope.showQuest = false;
    }
};