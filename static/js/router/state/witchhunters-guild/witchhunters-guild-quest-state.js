'use strict';

module.exports = {
    name: 'witchhunters-guild.witchhunters-guild-quest',
    url: 'quest',
    resolve: {
        questInfo: function ($http) {
            return $http.get('https://api.daggersandsorcery.com/witchhunters-guild/quest')
                .then(function (response) {
                    return response.data.data;
                });
        }
    },
    template: require('partial/main/witchhunters-guild/witchhunters-guild-quest.html'),
    controller: require('js/controller/witchhunters-guild/witchhunters-guild-quest-controller.js')
};