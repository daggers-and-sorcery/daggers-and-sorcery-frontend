'use strict';

module.exports = function ($scope,skillTypes) {
    $scope.skillTypes = skillTypes;
    $scope.selected = skillTypes[0];

    $scope.getSkillImage = function (skill) {
        return require('image/icon/skill/' + skill.replace(new RegExp('\\s', 'g'), '_') + '.png');
    };

    $scope.select = function(type) {
        $scope.selected = type;

        //TODO: load data here!
    }
};