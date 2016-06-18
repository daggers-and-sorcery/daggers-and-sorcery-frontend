'use strict';

module.exports = {
    name: 'skill-smithing',
    url: '/skill/smithing/',
    template: require('partial/main/skill/smithing.html'),
    resolve: {
        smithingRecipeList: function ($http) {
            return $http({method: 'GET', url: 'http://api.daggersandsorcery.com/skill/smithing/smelting/info'}).then(function(response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/skill/smithing-controller.js')
};