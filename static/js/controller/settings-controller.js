'use strict';

module.exports = function ($scope, $http) {
    $scope.settings = [];

    $scope.scavengingSlider = 0;
    $scope.maxScavengingPointsToConvert = Math.floor((50 - $scope.user.scavengingPoints) / 5) * 5;

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

        $http.post('http://api.daggersandsorcery.com/skill/scavenging/convert', $.param(requestData), requestConfig).success(function (data, status, headers, config) {
            $rootScope.$broadcast('profile-update-needed');
        });
    };

    $scope.calculateNeededMovementPoints = function (scavengingSlider) {
        return Math.ceil(scavengingSlider / 5);
    };

    $scope.remove = function (id) {
        $http.post('http://api.daggersandsorcery.com/combat/settings/remove', JSON.stringify({id: id})).success(function (data, status, headers, config) {
            $scope.refreshSettingList();
        });
    };

    $scope.saveNew = function () {
        var dataToSend = $scope.newSetting;

        if(dataToSend.trigger === 'monster') {
            dataToSend.target = dataToSend.targetMonster.id;
        }

        delete dataToSend.targetMonster;

        dataToSend.use = dataToSend.use.id;
        dataToSend.type = dataToSend.type.toUpperCase();
        dataToSend.trigger = dataToSend.trigger.toUpperCase();

        $http.post('http://api.daggersandsorcery.com/combat/settings/insert', JSON.stringify(dataToSend)).success(function (data, status, headers, config) {
            $scope.refreshSettingList();
        });

        $scope.clearNew();
    };

    $scope.refreshSettingList = function() {
        $http.get('http://api.daggersandsorcery.com/combat/settings/list').success(function (data, status, headers, config) {
            $scope.settings = data.data.settings;
            $scope.otherSettings = data.data.otherSettings;
        });
    };

    $scope.saveOtherSettings = function() {
        $http.post('http://api.daggersandsorcery.com/combat/settings/other/save', JSON.stringify($scope.otherSettings)).success(function (data, status, headers, config) {
            console.log("Sent stuff for saving");
        });
    };

    $scope.clearNew = function () {
        $scope.newSetting = {};

        $scope.newSetting.type = "item";

        $scope.refreshUse();

        $scope.newSetting.trigger = "turn";

        //$scope.targetType = "number";
        $scope.refreshTarget();
    };

    $scope.refreshUse = function() {
        if($scope.newSetting.type == "spell") {
            $scope.usables = [];
            $http.get('http://api.daggersandsorcery.com/combat/settings/usable/spell').then(function(response) {
                $scope.usables = response.data.data.spellList;

                if($scope.usables.length > 0) {
                    $scope.newSetting.use = $scope.usables[0];
                }
            });
        } else {
            $scope.usables = [];
            $http.get('http://api.daggersandsorcery.com/combat/settings/usable/item').then(function(response) {
                $scope.usables = response.data.data.itemList;

                if($scope.usables.length > 0) {
                    $scope.newSetting.use = $scope.usables[0];
                }
            });
        }
    };

    $scope.refreshTarget = function() {
        if ($scope.newSetting.trigger === 'monster') {
            $scope.showMonsterSelector = true;

            $http.get('http://api.daggersandsorcery.com/combat/settings/specific_monsters').then(function(response) {
                $scope.monsterList = response.data.data.monsterList;

                if($scope.monsterList.length > 0) {
                    $scope.newSetting.targetMonster = $scope.monsterList[0];
                }
            });
        } else {
            $scope.showMonsterSelector = false;
            $scope.newSetting.target = 1;
        }
    };

    //Initialise
    $scope.clearNew();
    $scope.refreshSettingList();
};