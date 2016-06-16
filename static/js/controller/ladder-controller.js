'use strict';

module.exports = function ($scope, $http, skillTypes, ladderInfo) {
    $scope.skillTypes = skillTypes;
    $scope.ladderData = ladderInfo.ladder_info;
    $scope.pageData = ladderInfo.page_info;
    $scope.selected = skillTypes[0];
    $scope.actualPage = 0;

    $scope.getSkillImage = function (skill) {
        return require('image/icon/skill/' + skill.replace(new RegExp('\\s', 'g'), '_') + '.png');
    };

    $scope.select = function (type) {
        $scope.selected = type;

        $http.get('http://api.daggersandsorcery.com/ladder/skill/' + $scope.selected.id + '/' + $scope.actualPage).then(function (response) {
            $scope.ladderData = response.data.data.ladder_info;
            $scope.pageData = response.data.data.page_info;
        });
    }
};