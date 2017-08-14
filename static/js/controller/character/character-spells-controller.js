'use strict';

module.exports = function ($scope, spells) {
    $scope.spellPopover = require('html/popover/definition/spell-definition-popover.html');

    $scope.spells = spells;
};