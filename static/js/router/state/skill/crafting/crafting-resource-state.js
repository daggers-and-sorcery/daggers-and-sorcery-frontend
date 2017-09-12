'use strict';

module.exports = {
    name: 'skill-crafting.resource',
    url: 'skill/crafting/resource',
    template: require('partial/main/skill/crafting/crafting-resource.html'),
    resolve: {
        resourceInfo: function ($http) {
            return $http({method: 'GET', url: 'https://api.daggersandsorcery.com/skill/crafting/resource/info'}).then(function(response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/skill/crafting/crafting-resource-controller.js')
};