'use strict';

module.exports = function ($scope, $http, topics) {
    $scope.topics = topics;

    $scope.newTopicTitle = '';
    $scope.newTopicContent = '';

    $scope.newTopic = function() {
        var payload = {
            name: $scope.newTopicTitle,
            content: $scope.newTopicContent,
            parentCategory: topics.parentCategory.id
        };

        $http.post('http://api.daggersandsorcery.com/forum/new_topic', payload);
    };
};