'use strict';

module.exports = {
    name: 'market-entry-sell',
    url: '/market/sell/:itemId',
    template: require('partial/main/market/market-entry-sell.html'),
    resolve: {
        marketData: function ($http, $stateParams) {
            return $http.get('https://api.daggersandsorcery.com/market/show/sell/' + $stateParams.itemId).then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/market/market-entry-sell-controller.js')
};