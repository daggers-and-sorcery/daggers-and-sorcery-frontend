'use strict';

module.exports = function ($scope) {

    $scope.calculateSkillStateId = function (skill) {
        if (skill === 'JEWELCRAFTING') {
            return 'skill-jewelcrafting.gemcutting';
        } else if (skill === 'CRAFTING') {
            return 'skill-crafting.resource';
        }

        return 'skill-' + skill.toLowerCase();
    }
};