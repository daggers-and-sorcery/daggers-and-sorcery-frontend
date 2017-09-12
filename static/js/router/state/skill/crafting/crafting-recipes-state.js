'use strict';

module.exports = {
    name: 'skill-crafting.recipes',
    url: 'skill/crafting/recipes',
    template: require('partial/main/skill/crafting/crafting-recipes.html'),
    resolve: {
        recipesInfo: function ($http) {
            return $http.get('https://api.daggersandsorcery.com/skill/crafting/recipe/info').then(function(response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/skill/crafting/crafting-recipes-controller.js')
};
