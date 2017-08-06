'use strict';

module.exports = {
    name: 'skill-jewelcrafting.recipes',
    url: 'skill/jewelcrafting/recipes',
    template: require('partial/main/skill/jewelcrafting/jewelcrafting-recipes.html'),
    resolve: {
        recipesInfo: function ($http) {
            return $http.get('https://api.daggersandsorcery.com/skill/jewelcrafting/recipe/info').then(function(response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/skill/jewelcrafting/jewelcrafting-recipes-controller.js')
};
