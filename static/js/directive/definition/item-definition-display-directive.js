require('js/app.js').directive('itemDefinitionDisplay', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            item: "=item"
        },
        template: require('html/directive/definition/item-definition-display-directive.html'),
        link: function (scope, element, attrs) {
            scope.itemDefinitionPopover = require('html/popover/definition/item-definition-popover.html');
        }
    };
});