'use strict';

module.exports = {
    name: 'skill-tailoring.gemcutting',
    url: 'skill/tailoring/weaving',
    template: require('partial/main/skill/tailoring/tailoring-weaving.html'),
    resolve: {
        weavingInfo: function ($http) {
            return $http({method: 'GET', url: 'https://api.daggersandsorcery.com/skill/tailoring/weaving/info'}).then(function(response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/skill/tailoring/jewelcrafting-tailoring-controller.js')
};