'use strict';

module.exports = function ($scope, $http, $state, $sce, ATTRIBUTE_BONUS_MAP, characterData, $rootScope, characterDataFormatter) {
    $scope.subtitle = 'Inventory';

    $scope.setSubtitle = function (subtitle) {
        $scope.subtitle = subtitle;
    };

    $scope.user = characterData;
    $scope.attributeBonusNameMap = ATTRIBUTE_BONUS_MAP;

    $scope.attributePopover = require('html/popover/attribute-popover.html');
    $scope.statusEffectPopover = require('html/popover/status-effect-popover.html');
    $scope.attributeDescriptionPopover = require('html/popover/attribute-description-popover.html');
    $scope.incrementedAttributePopover = require('html/popover/incremented-attribute-popover.html');
    $scope.equipmentPopover = require('html/popover/equipment-popover.html');

    $scope.attributeDescribtionMap = {};

    require('data/attribute/definition.xml').attributes.attribute.forEach(function (item, index) {
        $scope.attributeDescribtionMap[item.id[0]] = item.description[0];
    });

    $scope.combatAttributeDescriptionMap = function (attribute) {
        if ($scope.attributeDescribtionMap[attribute.toLowerCase()] != undefined) {
            return $scope.attributeDescribtionMap[attribute.toLowerCase()];
        }

        return "No description ***(yet)***.";
    };

    $scope.type = 'empty';
    $scope.setType = function (newType) {
        $scope.type = newType;
    };

    $scope.shouldShowSpecialAttributes = function () {
        return $scope.user.attribute.SPECIAL !== undefined && Object.keys($scope.user.attribute.SPECIAL).length > 0;
    };

    $scope.getSkillImage = function (skill) {
        return require('image/icon/skill/' + skill.replace(new RegExp('\\s', 'g'), '_') + '.png');
    };

    $scope.getStatusEffectImage = function (statusEffectId) {
        return require('image/icon/statuseffect/' + statusEffectId + '.png');
    };

    $scope.getEquipmentImage = function (item) {
        return require('image/inventory/item/' + item + '.png');
    };

    $scope.getAttributeImage = function (attribute) {
        return require('image/attribute/icon/' + attribute + '.png');
    };

    $scope.getCombatImage = function (attribute) {
        return require('image/combat/icon/' + attribute + '.png');
    };

    $scope.$on('profile-update-needed', function (event, args) {
        $http.get('https://api.daggersandsorcery.com/character/info').then(function (response) {
            $scope.user = characterDataFormatter.format(response.data);
        });
    });

    $scope.unequip = function (slot) {
        $http.get('https://api.daggersandsorcery.com/unequip/' + slot).then(function (response) {
            if (response.data.data.success) {
                $rootScope.$broadcast('profile-update-needed');
            } else {
                //TODO: error happened
            }
        });
    };

    $scope.equip = function (itemId) {
        $http.get('https://api.daggersandsorcery.com/equip/' + itemId).then(function (response) {
            if (response.data.data.success) {
                $rootScope.$broadcast('profile-update-needed');
            } else {
                $rootScope.$broadcast('error', {message: 'You can\'t equip that item!'});
            }
        });
    };

    $scope.use = function (item) {
        $http.get('https://api.daggersandsorcery.com/item/use/' + item).then(function (response) {
            if (response.data.data.result.successful) {
                $rootScope.$broadcast('profile-update-needed');
            }
        });
    };

    $scope.cast = function (spell) {
        $http.get('https://api.daggersandsorcery.com/spell/cast/' + spell).then(function (response) {
            if (response.data.data.success) {
                $rootScope.$broadcast('profile-update-needed');
            }
        });
    };

    $scope.openPage = function (spell) {
        $state.go("spellpage", {'spell': spell});
    };
};