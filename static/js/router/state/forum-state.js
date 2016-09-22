'use strict';

module.exports = {
    name: 'forum',
    url: '/forum/',
    template: require('partial/main/forum.html'),
    resolve: {
        categories: function ($http) {
            return $http.get('http://api.daggersandsorcery.com/forum/list/categories').then(function (response) {
                return response.data.data.categories;
            });
        }
    },
    controller: require('js/controller/forum-controller.js')
};