'use strict';

module.exports = function ($scope, $state, $http) {
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
        var payload = {
            startingWeapon: $scope.weapon,
            startingArmor: $scope.armor
        };

        $http.post('https://api.daggersandsorcery.com/user/starter-path', payload).success(function (data, status, headers, config) {
            $state.go('character');
        });
    };
};