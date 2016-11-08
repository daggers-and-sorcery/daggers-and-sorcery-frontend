'use strict';

module.exports = function ($scope, $http, $log, Flash, marketData) {
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

    $scope.display = {
        maximumAmount: marketData.sellData.maximumAmount,
        sellingFormDisabled: false
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
            $log.debug("The selling form is valid, doing the selling logic.");

            $http.post('http://api.daggersandsorcery.com/market/sell', payload).then(function (response) {
                var sellingResult = response.data.data.result.sellingResult;

                $log.debug("Got response for selling attempt! The result is: " + sellingResult + ".");

                if ($scope.successfulResult(sellingResult)) {
                    if ($scope.display.maximumAmount - $scope.item.amount < 1) {
                        $scope.display.sellingFormDisabled = true;
                        $scope.display.maximumAmount = 0;

                        $log.debug("This was the last item to sell, disabling the selling form.");
                    } else {
                        $scope.display.maximumAmount -= $scope.item.amount;

                        $log.debug("Decreasing the sellable amount by one. The amount left to sell is: " + $scope.marketData.sellData.maximumAmount);
                    }
                }

                Flash.clear();
                Flash.create($scope.getFlashColorFromResponse(sellingResult), $scope.getFlashMessageFromResponse(sellingResult));
            });
        }
    };

    $scope.getFlashMessageFromResponse = function (result) {
        if (result === 'BAD_PRICE') {
            return "Invalid price! The price must be higher than zero.";
        } else if (result === 'SUCCESSFUL_TRANSACTION') {
            return "You successfully posted an item for sale.";
        } else if (result === 'INSUFFICIENT_RESOURCES') {
            return "You don't have any from the item!";
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