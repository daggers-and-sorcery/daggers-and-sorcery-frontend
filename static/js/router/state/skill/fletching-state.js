'use strict';

module.exports = {
    name: 'skill-fletching',
    url: '/skill/fletching/',
    template: require('partial/main/skill/fletching.html'),
    resolve: {
        fletchingInfo: function ($http) {
            return $http({method: 'GET', url: 'http://api.daggersandsorcery.com/skill/fletching/info'}).then(function(response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/skill/fletching-controller.js')
};