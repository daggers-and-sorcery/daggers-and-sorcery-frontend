'use strict';

module.exports = function ($scope, $http, skillTypes, ladderInfo) {
    $scope.skillTypes = skillTypes;
    $scope.ladderData = ladderInfo;
    $scope.selected = skillTypes[0];

    $scope.getSkillImage = function (skill) {
        return require('image/icon/skill/' + skill.replace(new RegExp('\\s', 'g'), '_') + '.png');
    };

    $scope.select = function(type) {
        $scope.selected = type;

        $http.get('http://api.daggersandsorcery.com/ladder/skill/'+$scope.selected.id).then(function (response) {
            $scope.ladderData = response.data.data.ladder_info;
        });
    }
};