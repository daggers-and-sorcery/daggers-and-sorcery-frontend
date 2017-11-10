'use strict';

module.exports = {
    name: 'skill-tailoring.recipes',
    url: 'skill/tailoring/recipes',
    template: require('partial/main/skill/tailoring/tailoring-recipes.html'),
    resolve: {
        recipesInfo: function ($http) {
            return $http.get('https://api.daggersandsorcery.com/skill/tailoring/recipe/info').then(function(response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/skill/tailoring/tailoring-recipes-controller.js')
};
