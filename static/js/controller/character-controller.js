'use strict';

module.exports = function ($scope, $http, $state, $sce, ATTRIBUTE_BONUS_MAP, characterData, $rootScope, characterDataFormatter) {
    $scope.user = characterData;
    $scope.attributeBonusNameMap = ATTRIBUTE_BONUS_MAP;

    $scope.inventoryPopover = require('html/popover/inventory-popover.html');
    $scope.attributePopover = require('html/popover/attribute-popover.html');
    $scope.attributeDescriptionPopover = require('html/popover/attribute-description-popover.html');
    $scope.incrementedAttributePopover = require('html/popover/incremented-attribute-popover.html');
    $scope.equipmentPopover = require('html/popover/equipment-popover.html');
    $scope.spellPopover = require('html/popover/spell-popover.html');

    $scope.combatAttributeDescriptionMap = function(attribute) {
        switch(attribute) {
            case 'MANA':
                return $sce.trustAsHtml("Mana points are used for spellcasting. A starting character's MP is 0 + half of the <b><i>intelligence</i></b>, <b><i>wisdom</i></b>, <b><i>charisma</i></b>, <b><i>willpower</i></b> attributes.");
            case 'LIFE':
                return $sce.trustAsHtml("Life points shows the amount of damage a character can receive before dying. If the character's LP reach 0 then it dies. The base life point is 15 + half of the <b><i>vitality</i></b> and <b><i>endurance</i></b> attributes.");
            case 'INITIATION':
                return $sce.trustAsHtml("The initiation attribute determines who attack first in combat. The starting initiation is 5 + half of the <b><i>swiftness</i></b> and <b><i>perception</i></b> attributes.");
            case 'ATTACK':
                return $sce.trustAsHtml("The attack attribute determines the chance of damaging the enemy in meele combat. The starting attack is 5 + half of the <b><i>dexterity</i></b> and <b><i>swiftness</i></b>.");
            case 'MAGIC_ATTACK':
                return $sce.trustAsHtml("The magic attack attribute determines the chance of damaging the enemy in magic combat. The starting attack is 5 + half of the <b><i>intelligence</i></b> and <b><i>wisdom</i></b>.");
            case 'AIMING':
                return $sce.trustAsHtml("The aiming attribute determines the chance of damaging the enemy in ranged combat. The starting aiming is 5 + half of the <b><i>dexterity</i></b> and <b><i>perception</i></b>.");
            case 'DAMAGE':
                return $sce.trustAsHtml("The damage attribute determines the amount of casualty the character can deal to it's opponent in meele combat. The starting damage is 1 + the quarter of the <b><i>strength</i></b> attribute.");
            case 'RANGED_DAMAGE':
                return $sce.trustAsHtml("The damage attribute determines the amount of casualty the character can deal to it's opponent in ranged combat. The starting ranged damage is 1 + the quarter of the <b><i>dexterity</i></b> attribute.");
            case 'MAGIC_DAMAGE':
                return $sce.trustAsHtml("The damage attribute determines the amount of casualty the character can deal to it's opponent in magical combat. The starting ranged damage is 1 + the quarter of the <b><i>willpower</i></b> attribute.");
            case 'DEFENSE':
                return $sce.trustAsHtml("The defense attribute determines the chance of avoiding the opponents attacks in combat. The starting defense is 5 + half of the <b><i>endurance</i></b> and <b><i>dexterity</i></b>.");
            case 'SPELL_RESISTANCE':
                return $sce.trustAsHtml("The spell resistance attribute determines the chance of avoiding or decreasing the opponents magical attacks or damage in combat. The starting spell resistance is 5 + half of the <b><i>willpower</i></b> and <b><i>intelligence</i></b>.");
            default:
                return $sce.trustAsHtml("No description <b><i>(yet)</i></b>.");
        }
    };

    $scope.type = 'empty';
    $scope.setType = function(newType) {
        $scope.type = newType;
    };

    $scope.getSkillImage = function (skill) {
        return require('image/icon/skill/' + skill.replace(new RegExp('\\s', 'g'), '_') + '.png');
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
        $http.get('http://api.daggersandsorcery.com/character/info').then(function (response) {
            $scope.user = characterDataFormatter.format(response.data);
        });
    });

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

    $scope.cast = function (spell) {
        $http.get('http://api.daggersandsorcery.com/spell/cast/' + spell).then(function (response) {
            if (response.data.data.success) {
                $rootScope.$broadcast('profile-update-needed');
            }
        });
    };

    $scope.openPage = function (spell) {
        $state.go("spellpage", {'spell': spell});
    };
};