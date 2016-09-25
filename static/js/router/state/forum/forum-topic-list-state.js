'use strict';

module.exports = {
    name: 'forum-topic-list',
    url: '/forum/:category',
    template: require('partial/main/forum/forum-topic-list.html'),
    resolve: {
        topics: function ($http, $stateParams) {
            console.log($stateParams.category);
            return $http.get('http://api.daggersandsorcery.com/forum/list/categories').then(function (response) {
                return response.data.data.categories;
            });
        }
    },
    controller: require('js/controller/forum/forum-topic-list-controller.js')
};