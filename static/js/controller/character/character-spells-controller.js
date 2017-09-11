'use strict';

module.exports = function ($scope, spells) {
    $scope.spellPopover = require('html/popover/definition/spell-definition-popover.html');

    $scope.getSpellTypeIcon = function(spellType) {
        console.log("getting img for" +spellType);
        return require('image/spell/type/icon/' + spellType.toLowerCase() + '.png');
    };

    $scope.spells = spells;
};