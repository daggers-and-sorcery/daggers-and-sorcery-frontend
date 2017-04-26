'use strict';

module.exports = require('js/app.js').controller('MainController', function ($scope, $rootScope, $state, $http, $timeout, $interval, $log) {
    $scope.loadContent = function () {
        return require('html/main-content.html');
    };

    //TODO: move this to server side
    $scope.getHealthPercent = function () {
        return $rootScope.user.life / ($rootScope.user.max_life / 100);
    };

    $scope.getManaPercent = function () {
        return $rootScope.user.mana / ($rootScope.user.max_mana / 100);
    };

    $scope.getMovementPercent = function () {
        return $rootScope.user.movement / ($rootScope.user.max_movement / 100);
    };

    $rootScope.user = {
        loggedIn: false
    };

    $rootScope.previouslyLoggedIn = false;

    $http.get('https://api.daggersandsorcery.com/user/info').success(function (data, status, headers, config) {
        $log.debug('Got new user info response: ' + angular.toJson(data.data));

        $rootScope.user.loggedIn = data.data.loggedIn;
        $rootScope.previouslyLoggedIn = $rootScope.user.loggedIn;
        $state.go('home');
    });

    $interval(function () {
        $http.get('https://api.daggersandsorcery.com/user/info').success(function (data, status, headers, config) {
            $log.debug('Refreshing the user data!');

            $rootScope.user.loggedIn = data.data.loggedIn;
            if (!$rootScope.user.loggedIn && $rootScope.previouslyLoggedIn) {
                $state.go('home');
            }

            $rootScope.previouslyLoggedIn = $rootScope.user.loggedIn;
        });
    }, 120000);

    $rootScope.$on('error', function (event, args) {
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
            $http.get('https://api.daggersandsorcery.com/user/logout').success(function (data, status, headers, config) {
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
            $rootScope.previouslyLoggedIn = true;

            event.preventDefault();
            $state.go('home');
        }
    });

    $scope.user = {};
    $scope.error = '';

    $scope.submit = function () {
        $http.post('https://api.daggersandsorcery.com/user/login', $scope.user).success(function (data, status, headers, config) {
            if (data.data.result.successful === true) {
                $log.debug('Successful login!');

                $rootScope.previouslyLoggedIn = true;
                $scope.error = false;

                $http.get('https://api.daggersandsorcery.com/user/info').success(function (data2, status, headers, config) {
                    $rootScope.user.loggedIn = data2.data.loggedIn;

                    $state.go('home');
                });
            } else {
                $scope.error = true;
            }
        });
    };
});