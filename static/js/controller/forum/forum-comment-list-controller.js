'use strict';

module.exports = function ($scope, $http, comments) {
    $scope.comments = comments;

    $scope.newMessageContent = '';

    $scope.newComment = function() {
        var payload = {
            content: $scope.newMessageContent,
            parentTopic: $scope.comments.parent.id
        };

        $scope.newMessageContent = '';
        $http.post('http://api.daggersandsorcery.com/forum/new_comment', payload).then(function (response) {
                $http.get('http://api.daggersandsorcery.com/forum/list/topic/' + $scope.comments.parent.id).then(function (response) {
                    $scope.comments = response.data.data;
                })
            }
        );
    };
};