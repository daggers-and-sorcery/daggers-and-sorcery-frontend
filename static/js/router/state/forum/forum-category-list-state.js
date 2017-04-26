'use strict';

module.exports = {
    name: 'forum-category-list',
    url: '/forum/',
    template: require('partial/main/forum/forum-category-list.html'),
    resolve: {
        categories: function ($http) {
            return $http.get('https://api.daggersandsorcery.com/forum/list/categories').then(function (response) {
                return response.data.data.categories;
            });
        }
    },
    controller: require('js/controller/forum/forum-category-list-controller.js')
};