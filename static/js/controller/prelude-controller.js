'use strict';

module.exports = function ($scope, $state) {
    $scope.page = 'introduction';
    $scope.armor = undefined;
    $scope.weapon = undefined;

    $scope.showChooseArmorPage = function () {
        $scope.page = 'armor';
    };

    $scope.chooseArmor = function (armor) {
        $scope.armor = armor;
        $scope.page = 'weapon';
    };

    $scope.chooseWeapon = function (weapon) {
        $scope.weapon = weapon;
        $scope.page = 'ending';
    };

    $scope.finish = function () {
        //TODO: send the character data to the server and if everything goes correctly go to the character page.
    };
};