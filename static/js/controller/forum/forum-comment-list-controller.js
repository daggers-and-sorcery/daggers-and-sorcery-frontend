'use strict';

module.exports = function ($scope, $http, $log, comments) {
    $scope.comments = comments;

    $scope.newMessageContent = '';

    $scope.newComment = function () {
        if ($scope.validateComment()) {
            var payload = $scope.buildPayload();

            $log.debug('Sending new comment with payload: ' + angular.toJson(payload));

            $http.post('https://api.daggersandsorcery.com/forum/new_comment', payload).then(function () {
                    $http.get('https://api.daggersandsorcery.com/forum/list/topic/' + $scope.comments.parent.id).then(function (response) {
                        $scope.comments = response.data.data;

                        $scope.resetCommentData();
                    })
                }
            );
        } else {
            $log.debug('Not sending comment because it\'s empty!');
        }
    };

    $scope.buildPayload = function () {
        return {
            content: $scope.newMessageContent,
            parentTopic: $scope.comments.parent.id
        }
    };

    $scope.validateComment = function () {
        return $scope.newMessageContent.trim().length > 0;
    };

    $scope.resetCommentData = function () {
        $scope.newMessageContent = '';
    }
};