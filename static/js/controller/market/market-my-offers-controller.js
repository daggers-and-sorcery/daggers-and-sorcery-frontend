'use strict';

module.exports = function ($scope, $http, marketData) {
    $scope.shopData = marketData;

    $scope.cancel = function (id) {
        var payload = {
            marketEntityId: id
        };

        $http.post('//api.daggersandsorcery.com/market/listing/cancel', payload).then(function (response) {
            $scope.refreshOfferList();
        });
    };

    $scope.refreshOfferList = function () {
        $http.get('http://api.daggersandsorcery.com/market/show/listings').then(function (response) {
            $scope.shopData = response.data.data;
        });
    }
};