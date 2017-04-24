'use strict';

module.exports = {
    name: 'skill-herblore-recipes',
    url: '/skill/herblore/recipes',
    template: require('partial/main/skill/herblore/recipes.html'),
    resolve: {
        recipesInfo: function ($http) {
            return $http.get('http://api.daggersandsorcery.com/skill/herblore/recipe/info').then(function(response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/skill/herblore/herblore-recipes-controller.js')
};
