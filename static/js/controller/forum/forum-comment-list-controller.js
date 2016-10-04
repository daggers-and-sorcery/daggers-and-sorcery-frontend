'use strict';

module.exports = function ($scope, $http, comments) {
    $scope.comments = comments;

    $scope.newMessageContent = '';

    $scope.newComment = function() {
        console.log("new comm");

        var payload = {
            content: $scope.newMessageContent,
            parentTopic: $scope.comments.parent.id
        };


        console.log(payload);

        $http.post('http://api.daggersandsorcery.com/forum/new_comment', payload);
    };
};