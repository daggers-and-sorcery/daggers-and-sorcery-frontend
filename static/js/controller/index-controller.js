'use strict';

module.exports = function ($scope, $http, $sce, newslist) {
    $scope.newslist = newslist.data.data.news;

    $scope.newsImage = function (icon) {
        return require('image/icon/news/' + icon + '.png');
    }
};