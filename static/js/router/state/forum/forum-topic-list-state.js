'use strict';

module.exports = {
    name: 'forum-topic-list',
    url: '/forum/:category',
    template: require('partial/main/forum/forum-topic-list.html'),
    resolve: {
        topics: function ($http, $stateParams) {
            return $http.get('http://api.daggersandsorcery.com/forum/list/category/' + $stateParams.category).then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/forum/forum-topic-list-controller.js')
};