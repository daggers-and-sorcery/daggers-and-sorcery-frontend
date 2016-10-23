'use strict';

module.exports = {
    name: 'market-entry-sell',
    url: '/market-entry-sell/',
    template: require('partial/main/market/market-entry-sell.html'),
    resolve: {
        marketData: function ($http) {
            return $http.get('http://api.daggersandsorcery.com/market/show/sell/'+'107').then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/market/market-entry-sell-controller.js')
};