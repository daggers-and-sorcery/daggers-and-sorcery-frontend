'use strict';

module.exports = function ($scope, $rootScope, $http, equipmentInfo) {
    $scope.getItemTypeImage = function (itemType) {
        return require('image/icon/inventory/' + itemType.toLowerCase() + '.png');
    };

    $scope.unequip = function (slot) {
        $http.get('https://api.daggersandsorcery.com/unequip/' + slot).then(function (response) {
            if (response.data.data.result.successful) {
                $http.get('https://api.daggersandsorcery.com/character/equipment').then(function (response) {
                    $rootScope.$broadcast('profile-update-needed');

                    $scope.processEquipmentInfo(response.data.data.equipment);
                });
            } else {
                //TODO: error happened
            }
        });
    };

    $scope.equip = function (itemId) {
        $http.get('https://api.daggersandsorcery.com/equip/' + itemId).then(function (response) {
            if (response.data.data.result.successful) {
                $http.get('https://api.daggersandsorcery.com/character/equipment').then(function (response) {
                    $rootScope.$broadcast('profile-update-needed');

                    $scope.processEquipmentInfo(response.data.data.equipment);
                });
            } else {
                $rootScope.$broadcast('error', {message: 'You can\'t equip that item!'});
            }
        });
    };

    $scope.equipment = {};
    $scope.processEquipmentInfo = function (equipmentInfo) {
        equipmentInfo.forEach(function (equipment) {
            $scope.equipment[equipment.slot] = equipment;
        });
    };
    $scope.processEquipmentInfo(equipmentInfo);

    console.log($scope.equipment);
};