angular.module( 'ui.bootstrap.popover' )
    .directive( 'popoverHtmlUnsafePopup', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&'},
            controller: function($scope){
                //Ugly hack to access to the parent scope this popup sits in.
                $scope.data = $scope.$parent.$parent.$parent;
            },
            template: '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title" bind-html-compile="title" ng-show="title"></h3><div class="popover-content" bind-html-compile="content"></div></div></div>'
        };
    })
    .directive( 'popoverHtmlUnsafe', [ '$tooltip', function ( $tooltip ) {
        return $tooltip('popoverHtmlUnsafe', 'popover', 'click' );
    }]);