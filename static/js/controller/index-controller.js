'use strict';

module.exports = function ($scope, $http, $sce, newslist) {
     for (var i = 0; i < newslist.data.length; i++) {
         newslist.data[i].title = $sce.trustAsHtml(newslist.data[i].title);
     }

     $scope.newslist = newslist.data;

    $scope.newsImage = function(icon) {
        return require('image/icon/news/' + icon + '.png');
    }
};