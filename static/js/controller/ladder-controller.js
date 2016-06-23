'use strict';

module.exports = function ($scope, $http, skillTypes, ladderInfo) {
    $scope.skillTypes = skillTypes;
    $scope.ladderData = ladderInfo.ladder_info;
    $scope.pageData = ladderInfo.page_info;
    $scope.selected = skillTypes[0];

    $scope.currentPage = 1;
    $scope.itemsPerPage = 20;
    $scope.totalItems =  ($scope.pageData.pageCount + 1) * 20;

    $scope.getSkillImage = function (skill) {
        return require('image/icon/skill/' + skill.replace(new RegExp('\\s', 'g'), '_') + '.png');
    };

    $scope.$watch('currentPage', function () {
        $http.get('http://api.daggersandsorcery.com/ladder/skill/' + $scope.selected.id + '/' + $scope.currentPage).then(function (response) {
            $scope.ladderData = response.data.data.ladder_info;
            $scope.pageData = response.data.data.page_info;
        });
    });

    $scope.select = function (type) {
        $scope.selected = type;
        $scope.currentPage = 1;

        $http.get('http://api.daggersandsorcery.com/ladder/skill/' + $scope.selected.id + '/' + $scope.currentPage).then(function (response) {
            $scope.ladderData = response.data.data.ladder_info;
            $scope.pageData = response.data.data.page_info;
        });
    }
};