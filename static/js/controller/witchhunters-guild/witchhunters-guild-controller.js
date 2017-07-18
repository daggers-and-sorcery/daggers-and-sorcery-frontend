'use strict';

module.exports = function ($scope, $state, witchhuntersGuildInfo) {
    $scope.showGuild = witchhuntersGuildInfo.info.accessible;

    if ($scope.showGuild) {
        $scope.subtitle = 'Guild hall';
        $state.go('witchhunters-guild.witchhunters-guild-main');
    } else {
        $scope.subtitle = 'Entrance';
    }

    $scope.setSubtitle = function (subtitle) {
        $scope.subtitle = subtitle;
    }
};