'use strict';

module.exports = {
    name: 'market-entry-buy',
    url: '/market/buy/:itemId',
    template: require('partial/main/market/market-entry-buy.html'),
    resolve: {
        marketData: function ($http, $stateParams) {
            return $http.get('https://api.daggersandsorcery.com/market/show/buy/' + $stateParams.itemId).then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/market/market-entry-buy-controller.js')
};