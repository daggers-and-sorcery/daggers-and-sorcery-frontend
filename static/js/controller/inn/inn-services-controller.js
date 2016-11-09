'use strict';

module.exports = function ($scope, $state, $http, $sce, marked, Flash, innInfo) {
    $scope.inn = innInfo;

    $scope.getServiceImage = function (service) {
        return require('image/inn/' + service.toLowerCase().replace(/_/g, "-") + '.jpg');
    };

    $scope.showChat = function () {
        $state.go('inn-chat');
    };

    var descriptions = require('data/inn/sevgard/descriptions.xml').descriptions.description;
    $scope.description = descriptions[Math.floor(Math.random() * descriptions.length)];
    $scope.inn.showShortDescription = true;

    $scope.switchDescription = function () {
        $scope.inn.showShortDescription = !$scope.inn.showShortDescription;
    };

    $scope.orderService = function (serviceId) {
        $http.get('http://api.daggersandsorcery.com/inn/service/' + serviceId).then(function (response) {
            Flash.clear();

            if (response.data.data.result.successful) {
                Flash.create('success', 'You successfully paid for the service and enjoy it\'s benefits.');
            } else {
                Flash.create('danger', 'Something went wrong! Maybe you don\'t have enough coins or movement points?');
            }
        });
    };

    $scope.getDetails = function (serviceId) {
        if (serviceId === 'SMALL_SERVING_FOOD') {
            return $sce.trustAsHtml(
                '<p>Simple meal consisting of black bread and vegetable soup. Simple, but fills the stomach enough to keep going.</p>' +
                '<dl>' +
                '<dt>Cost</dt><dd>3 Bronze coins and 1 movement point.</dd>' +
                '<dt>Effect</dt><dd>You will regenerate 5 health points.</dd>' +
                '<dd>You will regenerate 2 mana points.</dd>' +
                '</dl>'
            );
        } else if (serviceId === 'COMMON_ROOM') {
            return $sce.trustAsHtml(
                '<p>Simple room with straw bed and nothing else inside.With simple stick to secure door from inside, you can be sure you aren´t robbed of your possessions while asleep.</p>' +
                '<dl>' +
                '<dt>Cost</dt><dd>7 Bronze coins and 2 movement point.</dd>' +
                '<dt>Effect</dt><dd>You will regenerate 12 health points.</dd>' +
                '<dd>You will regenerate 4 mana points.</dd>' +
                '</dl>'
            );
        }
    }
};