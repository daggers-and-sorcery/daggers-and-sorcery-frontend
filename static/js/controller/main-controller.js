'use strict';

module.exports = require('js/app.js').controller('MainController', function ($scope, $rootScope, $state, $http, $timeout, $interval, $log, Lightbox, webStorage) {
    $scope.landingPageShown = webStorage.get('landingShown');

    $scope.goToRegistration = function() {
        $scope.landingPageShown = true;
        webStorage.set('landingShown', true);
        $state.go('registration');
    };

    $scope.goToLogin = function() {
        $scope.landingPageShown = true;
        webStorage.set('landingShown', true);
        $state.go('index');
    };

    $scope.loadContent = function () {
        return require('html/main-content.html');
    };

    $scope.loadLanding = function () {
        return require('html/landing-content.html');
    };

    $scope.getImage = function (id) {
        return require('image/landing/landing-image-' + id + '.png');
    };

    $scope.images = [
        {
            'url': $scope.getImage(1)
        },
        {
            'url': $scope.getImage(2)
        },
        {
            'url': $scope.getImage(3)
        }
    ];
    $scope.openLightboxModal = function (index) {
        Lightbox.openModal($scope.images, index);
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

    $http.get('https://api.daggersandsorcery.com/user/info').then(function (response) {
        $log.debug('Got new user info response: ' + angular.toJson(response.data.data));

        $rootScope.user.loggedIn = response.data.data.loggedIn;
        $rootScope.previouslyLoggedIn = $rootScope.user.loggedIn;
        $rootScope.user.witchuntersGuildUnlocked = response.data.data.witchuntersGuildInfo.witchhuntersGuildUnlocked;
        $state.go('home');
    });

    $interval(function () {
        $http.get('https://api.daggersandsorcery.com/user/info/refresh').then(function (response) {
            $log.debug('Refreshing the user data!');

            $rootScope.user.loggedIn = response.data.data.loggedIn;
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
            $http.get('https://api.daggersandsorcery.com/user/logout').then(function (response) {
                $rootScope.user.loggedIn = false;
                $state.go('index', {}, {reload: true});
            });
            event.preventDefault();
        }

        //Always redirect to index if not logged in
        if (!(toState.hasOwnProperty('data') && toState.data.hasOwnProperty('visibleWhenNotLoggedIn') && toState.data.visibleWhenNotLoggedIn) && !$rootScope.user.loggedIn && toState.name !== 'index') {
            event.preventDefault();
            $state.go('index', {}, {reload: true});
        }

        //If logged in redirect index to home
        if (toState.name === 'index' && $rootScope.user.loggedIn) {
            $rootScope.previouslyLoggedIn = true;

            event.preventDefault();
            $state.go('home', {}, {reload: true});
        }
    });

    $scope.user = {};
    $scope.error = '';

    $scope.submit = function () {
        $http.post('https://api.daggersandsorcery.com/user/login', $scope.user).then(function (response) {
            if (response.data.data.result.successful === true) {
                $log.debug('Successful login!');

                $rootScope.previouslyLoggedIn = true;

                $scope.error = false;

                $http.get('https://api.daggersandsorcery.com/user/info').then(function (infoResponse) {
                    $rootScope.user.loggedIn = infoResponse.data.data.loggedIn;
                    $rootScope.user.witchuntersGuildUnlocked = infoResponse.data.data.witchuntersGuildInfo.witchhuntersGuildUnlocked;

                    //Remove sensitive data from the login form
                    $scope.user.username = '';
                    $scope.user.password = '';

                    $state.go('home');
                });
            } else {
                $scope.error = true;
            }
        });
    };
});