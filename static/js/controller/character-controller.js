'use strict';

module.exports = function ($scope, $http, ATTRIBUTE_BONUS_MAP, characterData, $rootScope, characterDataFormatter) {
    $scope.attributePopoverUrl = '/partial/popover/attribute.html';
    $scope.user = characterData;
    $scope.attributeBonusNameMap = ATTRIBUTE_BONUS_MAP;
    $scope.scavengingSlider = 0;
    $scope.maxScavengingPointsToConvert = Math.floor((50 - $scope.user.scavengingPoints) / 5) * 5;

    $scope.inventoryPopover = require('html/popover/inventory-popover.html');
    $scope.attributePopover = require('html/popover/attribute-popover.html');
    $scope.attributeDescriptionPopover = require('html/popover/attribute-description-popover.html');
    $scope.incrementedAttributePopover = require('html/popover/incremented-attribute-popover.html');
    $scope.equipmentPopover = require('html/popover/equipment-popover.html');

    $scope.type = 'empty';
    $scope.setType = function(newType) {
        $scope.type = newType;
    };

    $scope.getSkillImage = function (skill) {
        return require('image/icon/skill/' + skill.replace(new RegExp('\\s', 'g'), '_') + '.png');
    };

    $scope.getAttributeImage = function (attribute) {
        return require('image/attribute/icon/' + attribute + '.png');
    };

    $scope.calculateMaxScavengingPointsToConvert = function () {
        var pountsUntilMax = Math.floor((50 - $scope.user.scavengingPoints) / 5) * 5;

        if (pountsUntilMax / 5 > $rootScope.user.movement) {
            pountsUntilMax = $rootScope.user.movement * 5;
        }

        return pountsUntilMax;
    };

    $scope.convertScavengingPoints = function () {
        if ($scope.scavengingSlider == 0) {
            return;
        }

        var requestConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        var requestData = {
            pointsToConvert: $scope.scavengingSlider / 5
        };

        $http.post('/skill/scavenging/convert', $.param(requestData), requestConfig).success(function (data, status, headers, config) {
            $rootScope.$broadcast('profile-update-needed');
        });
    };

    $scope.$on('profile-update-needed', function (event, args) {
        $http.get('http://api.daggersandsorcery.com/character/info').then(function (response) {
            $scope.user = characterDataFormatter.format(response.data);
        });

        $scope.scavengingSlider = 0;
    });

    $scope.calculateNeededMovementPoints = function (scavengingSlider) {
        return Math.ceil(scavengingSlider / 5);
    };

    $scope.unequip = function (slot) {
        $http.get('http://api.daggersandsorcery.com/unequip/' + slot).then(function (response) {
            if (response.data.data.success) {
                $rootScope.$broadcast('profile-update-needed');
            } else {
                //TODO: error happened
            }
        });
    };

    $scope.equip = function(itemId) {
        $http.get('http://api.daggersandsorcery.com/equip/'+itemId).then(function(response) {
            if(response.data.data.success) {
                $rootScope.$broadcast('profile-update-needed');
            } else {
                $rootScope.$broadcast('error', {message: 'You can\'t equip that item!'});
            }
        });
    };

    $scope.use = function(item) {
        $http.get('http://api.daggersandsorcery.com/item/use/'+item).then(function(response) {
            if(response.data.data.success) {
                $rootScope.$broadcast('profile-update-needed');
            }
        });
    };
};