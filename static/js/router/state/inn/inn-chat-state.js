'use strict';

module.exports = {
    name: 'inn-chat',
    url: '/inn/chat/',
    data: {
        visibleWhenNotLoggedIn: true
    },
    template: require('partial/main/inn/inn-chat.html'),
    resolve: {
        chatList: function ($http) {
            return $http({method: 'GET', url: 'http://api.daggersandsorcery.com/inn/chat/list'}).then(function (response) {
                return response.data.data;
            });
        }
    },
    controller: require('js/controller/inn/inn-chat-controller.js')
};