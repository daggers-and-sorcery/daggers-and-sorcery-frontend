'use strict';

module.exports = {
    name: 'skill-cooking',
    url: '/skill/cooking/',
    template: require('partial/main/skill/cooking.html'),
    resolve: {
        cookingInfo: function ($http) {
            return $http({method: 'GET', url: 'https://api.daggersandsorcery.com/skill/cooking/info'});
        }
    },
    controller: require('js/controller/skill/cooking-controller.js')
};