'use strict';

module.exports = {
    name: 'witchhunters-guild',
    url: '/witchhunters-guild/',
    resolve: {
        witchhuntersGuildInfo: function ($http) {
            return $http.get('https://api.daggersandsorcery.com/witchhunters-guild/info')
                .then(function (response) {
                    return response.data.data;
                });
        }
    },
    template: require('partial/main/witchhunters-guild/witchhunters-guild.html'),
    controller: require('js/controller/witchhunters-guild/witchhunters-guild-controller.js')
};