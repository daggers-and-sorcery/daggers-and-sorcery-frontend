'use strict';

module.exports = {
    name: 'registration',
    url: '/registration/',
    data: {
        visibleWhenNotLoggedIn: true
    },
    template: require('partial/main/register.html'),
    controller: function ($scope, $http) {
        $scope.user = {};
        $scope.visibleRace = 0;
        $scope.errorList = [];
        $scope.successfulRegistration = false;
        $scope.race = [
            {
                id: 'HUMAN',
                name: 'Human',
                attributeBonus: [],
                description: ''
            },
            {
                id: 'ORC',
                name: 'Orc',
                attributeBonus: [
                    {
                        id: 'STRENGTH',
                        attribute: 'Strength',
                        value: '20'
                    },
                    {
                        id: 'ENDURANCE',
                        attribute: 'Endurance',
                        value: '10'
                    },
                    {
                        id: 'VITALITY',
                        attribute: 'Vitality',
                        value: '10'
                    },
                    {
                        id: 'INTELLIGENCE',
                        attribute: 'Intelligence',
                        value: '-30'
                    },
                    {
                        id: 'WISDOM',
                        attribute: 'Wisdom',
                        value: '-10'
                    },
                    {
                        id: 'WILLPOWER',
                        attribute: 'Willpower',
                        value: '-10'
                    }
                ],
                description: ''
            },
            {
                id: 'DWARF',
                name: 'Dwarf',
                attributeBonus: [
                    {
                        id: 'PERCEPTION',
                        attribute: 'Perception',
                        value: '20'
                    },
                    {
                        id: 'STRENGTH',
                        attribute: 'Strength',
                        value: '10'
                    },
                    {
                        id: 'VITALITY',
                        attribute: 'Vitality',
                        value: '10'
                    },
                    {
                        id: 'SWIFTNESS',
                        attribute: 'Swiftness',
                        value: '-20'
                    },
                    {
                        id: 'DEXTERITY',
                        attribute: 'Dexterity',
                        value: '-10'
                    },
                    {
                        id: 'CHARISMA',
                        attribute: 'Charisma',
                        value: '-10'
                    },
                    {
                        id: 'BEAUTY',
                        attribute: 'Beauty',
                        value: '-10'
                    }
                ],
                 description: ''
            },
            {
                id: 'ELF',
                name: 'Elf',
                attributeBonus: [
                    {
                        id: 'INTELLIGENCE',
                        attribute: 'Intelligence',
                        value: '20'
                    },
                    {
                        id: 'WILLPOWER',
                        attribute: 'Willpower',
                        value: '10'
                    },
                    {
                        id: 'BEAUTY',
                        attribute: 'Beauty',
                        value: '10'
                    },
                    {
                        id: 'STRENGTH',
                        attribute: 'Strength',
                        value: '-20'
                    },
                    {
                        id: 'ENDURANCE',
                        attribute: 'Endurance',
                        value: '-20'
                    },
                    {
                        id: 'VITALITY',
                        attribute: 'Vitality',
                        value: '-10'
                    }
                ],
                 description: ''
            },
            {
                id: 'DARK_ELF',
                name: 'Dark Elf',
                attributeBonus: [
                    {
                        id: 'DEXTERITY',
                        attribute: 'Dexterity',
                        value: '20'
                    },
                    {
                        id: 'SWIFTNESS',
                        attribute: 'Swiftness',
                        value: '10'
                    },
                    {
                        id: 'PERCEPTION',
                        attribute: 'Perception',
                        value: '10'
                    },
                    {
                        id: 'STRENGTH',
                        attribute: 'Strength',
                        value: '-20'
                    },
                    {
                        id: 'WISDOM',
                        attribute: 'Wisdom',
                        value: '-20'
                    },
                    {
                        id: 'CHARISMA',
                        attribute: 'Charisma',
                        value: '-10'
                    }
                ],
                 description: ''
            },
            {
                id: 'LIZARDMEN',
                name: 'Lizardmen',
                attributeBonus: [
                    {
                        id: 'DEXTERITY',
                        attribute: 'Dexterity',
                        value: '30'
                    },
                    {
                        id: 'PERCEPTION',
                        attribute: 'Perception',
                        value: '10'
                    },
                    {
                        id: 'STRENGTH',
                        attribute: 'Strength',
                        value: '-30'
                    },
                    {
                        id: 'INTELLIGENCE',
                        attribute: 'Intelligence',
                        value: '-20'
                    },
                    {
                        id: 'VITALITY',
                        attribute: 'Vitality',
                        value: '-10'
                    }
                ],
                description: ''
            },
            {
                id: 'GNOME',
                name: 'Gnome',
                attributeBonus: [
                    {
                        id: 'INTELLIGENCE',
                        attribute: 'Intelligence',
                        value: '30'
                    },
                    {
                        id: 'WILLPOWER',
                        attribute: 'Willpower',
                        value: '10'
                    },
                    {
                        id: 'STRENGTH',
                        attribute: 'Strength',
                        value: '-30'
                    },
                    {
                        id: 'VITALITY',
                        attribute: 'Vitality',
                        value: '-20'
                    },
                    {
                        id: 'DEXTERITY',
                        attribute: 'Dexterity',
                        value: '-10'
                    }
                ],
                 description: ''
            },
            {
                id: 'DRACONIC',
                name: 'Draconic',
                attributeBonus: [
                    {
                        id: 'WILLPOWER',
                        attribute: 'Willpower',
                        value: '30'
                    },
                    {
                        id: 'ENDURANCE',
                        attribute: 'Endurance',
                        value: '10'
                    },
                    {
                        id: 'DEXTERITY',
                        attribute: 'Dexterity',
                        value: '-30'
                    },
                    {
                        id: 'SWIFTNESS',
                        attribute: 'Swiftness',
                        value: '-20'
                    },
                    {
                        id: 'PERCEPTION',
                        attribute: 'Perception',
                        value: '-10'
                    }
                ],
                description: ''
            }
        ];

        $scope.decreaseRace = function () {
            if ($scope.visibleRace == 0) {
                $scope.visibleRace = $scope.race.length - 1;
            } else {
                $scope.visibleRace--;
            }
        };

        $scope.increaseRace = function () {
            if ($scope.visibleRace == $scope.race.length - 1) {
                $scope.visibleRace = 0;
            } else {
                $scope.visibleRace++;
            }
        };

        $scope.submit = function (valid) {
            if (valid) {
                var dataToSend = $scope.user;

                dataToSend.race = $scope.race[$scope.visibleRace].id;

                $http.post('http://api.daggersandsorcery.com/user/register', dataToSend).success(function (data, status, headers, config) {
                    $scope.errorList = [];
                    $scope.successfulRegistration = true;
                }).error(function (data, status, headers, config) {
                    $scope.errorList = data;
                });
            }
        };

        $scope.raceAttributeModifierCount = function (raceId) {
            return Object.keys($scope.race[raceId].attributeBonus).length;
        };

        $scope.getAttributeImage = function (attribute) {
            return require('image/attribute/icon/' + attribute + '.png');
        }
    }
};