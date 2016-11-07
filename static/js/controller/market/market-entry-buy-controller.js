'use strict';

module.exports = function ($scope, $http, $log, Flash, marketData) {
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
            var buyingResult = response.data.data.result.result;

            $log.debug("Got response for buying attempt!");

            Flash.clear();
            Flash.create($scope.getFlashColorFromResponse(buyingResult), $scope.getFlashMessageFromResponse(buyingResult));

            $scope.refreshMarketData();
        });
    };

    $scope.refreshMarketData = function () {
        $log.debug("Refreshing the buylist for item: " + $scope.marketData.item.id);

        $http.get('http://api.daggersandsorcery.com/market/show/buy/' + $scope.marketData.item.id).then(function (response) {
            $log.debug("Buylist refresh finished.");

            $scope.marketData = response.data.data;
        });
    };

    $scope.getFlashMessageFromResponse = function (result) {
        if (result === 'SUCCESSFUL_TRANSACTION') {
            return "You successfully bought an item.";
        } else if (result === 'INSUFFICIENT_RESOURCES') {
            return "You don't have enough coins to buy this item.";
        }

        return "Unknown result!";
    };

    $scope.getFlashColorFromResponse = function (result) {
        if ($scope.successfulResult(result)) {
            return 'success';
        }

        return 'danger';
    };

    $scope.successfulResult = function (result) {
        return result === 'SUCCESSFUL_TRANSACTION';
    }
};