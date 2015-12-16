'use strict';

module.exports = {
    name: 'registration',
    url: '/registration/',
    data: {
        visibleWhenNotLoggedIn: true
    },
    resolve: {
        racelist: function ($http) {
            return $http({method: 'GET', url: '/user/race/list'});
        }
    },
    template: require('partial/main/register.html'),
    controller: function ($scope, $http, racelist) {
        $scope.user = {};
        $scope.visibleRace = 0;
        $scope.errorList = [];
        $scope.successfulRegistration = false;
        $scope.race = ['HUMAN', 'ORC', 'DWARF', 'ELF', 'DARK_ELF', 'LIZARDMEN', 'GNOME', 'DRACONIC'];

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

                dataToSend.race = $scope.race[$scope.visibleRace];

                $http.post('/user/register', dataToSend).success(function (data, status, headers, config) {
                    $scope.errorList = [];
                    $scope.successfulRegistration = true;
                }).error(function (data, status, headers, config) {
                    $scope.errorList = data;
                });
            }
        };
        $scope.raceAttributeModifierCount = function(raceId) {
            return Object.keys($scope.race[raceId].racialAttributeModifiers).length;
        };
    }
};