'use strict';

module.exports = function ($scope, $http, ATTRIBUTE_BONUS_MAP, characterData, $rootScope, characterDataFormatter) {
    $scope.attributePopoverUrl = '/partial/popover/attribute.html';
    $scope.user = characterData;
    $scope.attributeBonusNameMap = ATTRIBUTE_BONUS_MAP;
    $scope.scavengingSlider = 0;
    $scope.maxScavengingPointsToConvert = Math.floor((50 - $scope.user.scavengingPoints) / 5) * 5;

    //Skill images for webpack
    $scope.image = {};
    $scope.image['Two Handed Axes'] = require('../../image/icon/skill/Two_Handed_Axes.png');
    $scope.image['Longbows'] = require('../../image/icon/skill/Longbows.png');
    $scope.image['Shortbows'] = require('../../image/icon/skill/Shortbows.png');
    $scope.image['Staff'] = require('../../image/icon/skill/Staff.png');
    $scope.image['Shortswords'] = require('../../image/icon/skill/Shortswords.png');
    $scope.image['Longswords'] = require('../../image/icon/skill/Longswords.png');
    $scope.image['One Handed Axes'] = require('../../image/icon/skill/One_Handed_Axes.png');
    $scope.image['Crossbows'] = require('../../image/icon/skill/Crossbows.png');
    $scope.image['Daggers'] = require('../../image/icon/skill/Daggers.png');
    $scope.image['Polearms'] = require('../../image/icon/skill/Polearms.png');
    $scope.image['Two Handed Crushing Weapons'] = require('../../image/icon/skill/Two_Handed_Crushing_Weapons.png');
    $scope.image['One Handed Crushing Weapons'] = require('../../image/icon/skill/One_Handed_Crushing_Weapons.png');
    $scope.image['Robe Armor'] = require('../../image/icon/skill/Robe_Armor.png');
    $scope.image['Heavy Armor'] = require('../../image/icon/skill/Heavy_Armor.png');
    $scope.image['Shield Defense'] = require('../../image/icon/skill/Shield_Defense.png');
    $scope.image['Light Armor'] = require('../../image/icon/skill/Light_Armor.png');

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
        $http.get('/character/info').then(function (response) {
            $scope.user = characterDataFormatter.format(response.data);
        });

        $scope.scavengingSlider = 0;
    });

    $scope.calculateNeededMovementPoints = function (scavengingSlider) {
        return Math.ceil(scavengingSlider / 5);
    };

    $scope.unequip = function (slot) {
        $http.get('/unequip/' + slot).then(function (response) {
            if (response.data.data.success) {
                $rootScope.$broadcast('profile-update-needed');
            } else {
                //TODO: error happened
            }
        });
    };
};