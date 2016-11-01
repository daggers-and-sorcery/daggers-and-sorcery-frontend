'use strict';

module.exports = function ($scope, $http, $log, marketData) {
    $scope.marketData = marketData;

    $scope.floor = function (value) {
        return Math.floor(value);
    };

    $scope.buyItem = function (id) {
        $log.debug("Posting buy offer for an item with marketing entity id: " + id);

        var payload = {
            marketEntityId: id
        };

        $http.post('http://api.daggersandsorcery.com/market/buy', payload).then(function (response) {
            $log.debug("Got response for buying attempt!");

            $scope.refreshMarketData();
        });
    };

    $scope.refreshMarketData = function () {
        $log.debug("Refreshing the buylist for item: " + $scope.marketData.item.id);

        $http.get('http://api.daggersandsorcery.com/market/show/buy/' + $scope.marketData.item.id).then(function (response) {
            $log.debug("Buylist refresh finished.")

            $scope.marketData = response.data.data;
        });
    }
};