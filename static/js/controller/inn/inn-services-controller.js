'use strict';

module.exports = function ($scope, $state, $http, $sce, marked, Notification, innInfo) {
    $scope.inn = innInfo;

    $scope.getServiceImage = function (service) {
        return require('image/inn/' + service.toLowerCase().replace(/_/g, "-") + '.jpg');
    };

    var descriptions = require('data/inn/sevgard/descriptions.xml').descriptions.description;
    $scope.description = descriptions[Math.floor(Math.random() * descriptions.length)];
    $scope.inn.showShortDescription = true;

    $scope.switchDescription = function () {
        $scope.inn.showShortDescription = !$scope.inn.showShortDescription;
    };

    $scope.orderService = function (serviceId) {
        $http.get('https://api.daggersandsorcery.com/inn/service/' + serviceId).then(function (response) {

            if (response.data.data.result.successful) {
                Notification.success({
                    message: 'You successfully paid for the service and enjoy it\'s benefits.',
                    icon: 'inn',
                    title: 'Inn',
                    templateUrl: require('html/popup/popup-with-image.html')
                });
            } else {
                Notification.error({
                    message: 'Something went wrong! Maybe you don\'t have enough coins or movement points?',
                    icon: 'inn',
                    title: 'Inn',
                    templateUrl: require('html/popup/popup-with-image.html')
                });
            }
        });
    };

    $scope.getDetails = function (serviceId) {
        if (serviceId === 'SMALL_SERVING_FOOD') {
            return $sce.trustAsHtml(
                '<p>Simple meal consisting of black bread and vegetable soup. Simple, but fills the stomach enough to keep going.</p>' +
                '<dl>' +
                '<dt>Cost</dt><dd>3 Bronze coins and 1 movement point.</dd>' +
                '<dt>Effect</dt><dd>You restore 5 health points.</dd>' +
                '<dd>You restore 2 mana points.</dd>' +
                '</dl>'
            );
        } else if (serviceId === 'COMMON_ROOM') {
            return $sce.trustAsHtml(
                '<p>Simple room with straw bed and nothing else inside.With simple stick to secure door from inside, you can be sure you aren´t robbed of your possessions while asleep.</p>' +
                '<dl>' +
                '<dt>Cost</dt><dd>7 Bronze coins and 2 movement point.</dd>' +
                '<dt>Effect</dt><dd>You restore 12 health points.</dd>' +
                '<dd>You restore 4 mana points.</dd>' +
                '</dl>'
            );
        }
    }
};