'use strict';

module.exports = function ($scope) {

    $scope.calculateSkillStateId = function (skill) {
        if (skill === 'JEWELCRAFTING') {
            return 'skill-jewelcrafting.gemcutting';
        }

        return 'skill-' + skill.toLowerCase();
    }
};