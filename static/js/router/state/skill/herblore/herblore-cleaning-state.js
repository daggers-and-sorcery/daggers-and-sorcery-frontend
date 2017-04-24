'use strict';

module.exports = {
    name: 'skill-herblore-cleaning',
    url: '/skill/herblore/cleaning',
    template: require('partial/main/skill/herblore/cleaning.html'),
    resolve: {
        cleaningInfo: function ($http) {
            return $http({method: 'GET', url: 'http://api.daggersandsorcery.com/skill/herblore/cleaning/info'}).then(function(response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/skill/herblore/herblore-cleaning-controller.js')
};