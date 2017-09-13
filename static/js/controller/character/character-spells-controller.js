'use strict';

module.exports = function ($scope, spells) {
    $scope.spellPopover = require('html/popover/definition/spell-definition-popover.html');

    $scope.getSpellTypeIcon = function (spellType) {
        return require('image/spell/type/icon/' + spellType.toLowerCase() + '.png');
    };

    $scope.getSpellIcon = function (spellId) {
        return require('image/spell/icon/' + spellId + '.png')
    };

    $scope.hasSpellIcon = function (spellId) {
        try {
            return require.resolveWeak('image/spell/icon/' + spellId + '.png');
        } catch (err) {
            return false;
        }
    };


    $scope.spells = spells;
};