'use strict';

module.exports = {
    name: 'skill-herblore-gathering',
    url: '/skill/herblore/gathering',
    template: require('partial/main/skill/herblore/gathering.html'),
    resolve: {
        gatheringInfo: function ($http) {
            return $http({method: 'GET', url: 'https://api.daggersandsorcery.com/skill/herblore/gathering/info'}).then(function(response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/skill/herblore/herblore-gathering-controller.js')
};