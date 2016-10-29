'use strict';

module.exports = function ($scope, $http, $log, marketData) {
    $scope.marketData = marketData;

    $scope.item = {
        id: marketData.item.id,
        amount: 1,
        price: {
            bronzePrice: 0,
            silverPrice: 0,
            goldPrice: 0
        }
    };

    $scope.sellItem = function () {
        $log.debug("Posting sell offer for item: " + $scope.item.id + " on market with amount: " + $scope.item.amount + " and price: " + angular.toJson($scope.item.price));

        var payload = {
            item: $scope.item.id,
            amount: $scope.item.amount,
            priceBronze: $scope.item.price.bronzePrice,
            priceSilver: $scope.item.price.silverPrice,
            priceGold: $scope.item.price.goldPrice
        };

        if ($scope.sellForm.$valid) {
            $scope.marketData.sellData.maximumAmount -= $scope.item.amount;

            $http.post('http://api.daggersandsorcery.com/market/sell', payload).then(function (response) {
                $log.debug("Got response for selling attempt!");
            });
        }
    };
};