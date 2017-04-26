'use strict';

module.exports = function ($scope, $http, $log, topics) {
    $scope.topics = topics;

    $scope.newTopicTitle = '';
    $scope.newTopicContent = '';

    $scope.newTopic = function () {
        if ($scope.newTopicTitle.trim().length > 0 && $scope.newTopicContent.trim().length > 0) {
            var payload = {
                name: $scope.newTopicTitle,
                content: $scope.newTopicContent,
                parentCategory: $scope.topics.parentCategory.id
            };

            $log.debug('Sending new topic with payload: ' + angular.toJson(payload));

            $http.post('https://api.daggersandsorcery.com/forum/new_topic', payload).then(function (response) {
                    $http.get('https://api.daggersandsorcery.com/forum/list/category/' + $scope.topics.parentCategory.id).then(function (response) {
                        $scope.topics = response.data.data;

                        $scope.newTopicContent = '';
                        $scope.newTopicTitle = '';
                    })
                }
            );
        } else {
            $log.debug('Not sending topic because it\'s empty!');
        }
    };
};