'use strict';

module.exports = require('js/app.js').controller('MainController', function ($scope, $rootScope, $state, $http, $timeout) {
    $scope.loadContent = function() {
        return require('html/main-content.html');
    };

    //TODO: move this to server side
    $scope.getHealthPercent = function() {
        return $rootScope.user.life / ($rootScope.user.max_life / 100);
    };

    $scope.getManaPercent = function() {
        return $rootScope.user.mana / ($rootScope.user.max_mana / 100);
    };

    $scope.getMovementPercent = function() {
        return $rootScope.user.movement / ($rootScope.user.max_movement / 100);
    };

    $rootScope.user = {
        loggedIn: false
    };

    $http.get('http://api.daggersandsorcery.com/user/info').success(function (data, status, headers, config) {
        $rootScope.user = data.data;
        $state.go('home');
    });

    $rootScope.$on('error', function (event, args) {
        console.log("ERROR");
        $scope.errorText = args.message;
        $scope.errorVisible = true;

        $scope.timeout = $timeout(function () {
            $scope.errorVisible = false;
        }, 5000);
    });

    $scope.closeError = function () {
        $scope.errorVisible = false;
        $timeout.cancel($scope.timeout);
    };

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        //Logout the user
        if (toState.name === 'logout') {
            $http.get('http://api.daggersandsorcery.com/user/logout').success(function (data, status, headers, config) {
                $rootScope.user.loggedIn = false;
                $state.go('index');
            });
            event.preventDefault();
        }

        //Always redirect to index if not logged in
        if (!(toState.hasOwnProperty('data') && toState.data.hasOwnProperty('visibleWhenNotLoggedIn') && toState.data.visibleWhenNotLoggedIn) && !$rootScope.user.loggedIn && toState.name !== 'index') {
            event.preventDefault();
            $state.go('index');
        }

        //If logged in redirect index to home
        if (toState.name === 'index' && $rootScope.user.loggedIn) {
            event.preventDefault();
            $state.go('home');
        }
    });

    //MERGED FROM RIGHT MENU
    $scope.user = {};
    $scope.error = '';

    $scope.submit = function () {
        var requestConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };

        $http.post('http://api.daggersandsorcery.com/user/login', $.param($scope.user), requestConfig).success(function (data, status, headers, config) {
            if (data.success === 'true') {
                $http.get('http://api.daggersandsorcery.com/user/info').success(function (data, status, headers, config) {
                    $rootScope.user = data.data;
                    $state.go('home');
                });
            } else {
                $scope.error = data.error;
            }
        });
    };
});