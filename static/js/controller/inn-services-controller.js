'use strict';

module.exports = function ($scope, $state, $http, innInfo) {
    $scope.inn = innInfo;

    $scope.getServiceImage = function (service) {
        return require('image/inn/' + service.toLowerCase().replace(/_/g, "-") + '.jpg');
    };

    $scope.showChat = function () {
        $state.go('inn');
    };

    $scope.orderService = function (serviceId) {
        $http.get('http://api.daggersandsorcery.com/inn/service/'+serviceId).then(function(response) {
            console.log("Handleresponse")
        });
    }
};