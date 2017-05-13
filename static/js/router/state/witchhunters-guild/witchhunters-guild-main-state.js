'use strict';

module.exports = {
    name: 'witchhunters-guild-main',
    url: '/witchhunters-guild/guild-hall',
    resolve: {
        guildHallInfo: function ($http) {
            return $http.get('https://api.daggersandsorcery.com/witchhunters-guild/guild-hall')
                .then(function (response) {
                    return response.data.data;
                });
        }
    },
    template: require('partial/main/witchhunters-guild/witchhunters-guild-main.html'),
    controller: require('js/controller/witchhunters-guild/witchhunters-guild-main-controller.js')
};