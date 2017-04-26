'use strict';

module.exports = {
    name: 'forum-comment-list',
    url: '/forum/topic/:topic',
    template: require('partial/main/forum/forum-comment-list.html'),
    resolve: {
        comments: function ($http, $stateParams) {
            return $http.get('https://api.daggersandsorcery.com/forum/list/topic/' + $stateParams.topic).then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/forum/forum-comment-list-controller.js')
};