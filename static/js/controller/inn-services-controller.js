'use strict';

module.exports = function ($scope, $state, $http, $sce, Flash, innInfo) {
    $scope.inn = innInfo;

    $scope.getServiceImage = function (service) {
        return require('image/inn/' + service.toLowerCase().replace(/_/g, "-") + '.jpg');
    };

    $scope.showChat = function () {
        $state.go('inn');
    };

    $scope.orderService = function (serviceId) {
        $http.get('http://api.daggersandsorcery.com/inn/service/' + serviceId).then(function (response) {
            if (response.data.data.result.successful) {
                Flash.create('success', 'You successfully paid for the service and enjoy it\'s benefits.');
            } else {
                Flash.create('danger', 'Something went wrong! Maybe you don\'t have enough coins or too tired?');
            }
        });
    };

    $scope.getDetails = function (serviceId) {
        if (serviceId === 'SMALL_SERVING_FOOD') {
            return $sce.trustAsHtml(
                '<dl>' +
                '<dt>Cost</dt><dd>3 Bronze coins and 1 movement point.</dd>' +
                '<dt>Effect</dt><dd>You are healed for 5 health points.</dd>' +
                '</dl>'
            );
        } else if (serviceId === 'COMMON_ROOM') {
            return $sce.trustAsHtml(
                '<dl>' +
                '<dt>Cost</dt><dd>7 Bronze coins and 2 movement point.</dd>' +
                '<dt>Effect</dt><dd>You are healed for 12 health points.</dd>' +
                '</dl>'
            );
        }
    }
};