'use strict';

module.exports = {
    name: 'witchhunters-guild.witchhunters-guild-shop',
    url: 'shop',
    resolve: {
        shopInfo: function ($http) {
            return $http.get('https://api.daggersandsorcery.com/witchhunters-guild/shop')
                .then(function (response) {
                    return response.data.data;
                });
        }
    },
    template: require('partial/main/witchhunters-guild/witchhunters-guild-shop.html'),
    controller: require('js/controller/witchhunters-guild/witchhunters-guild-shop-controller.js')
};