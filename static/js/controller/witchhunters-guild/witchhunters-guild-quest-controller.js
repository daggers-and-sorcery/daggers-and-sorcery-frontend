'use strict';

module.exports = function ($scope, $http, questInfo) {
    $scope.questInfo = questInfo;

    $scope.handInQuest = function() {
        $http.get('https://api.daggersandsorcery.com/witchhunters-guild/quest/hand-in')
            .then(function(response) {
                $scope.questInfo = response.data.data;
            });
    }
};