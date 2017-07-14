require('js/app.js').directive('displayRecipe', function () {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            recipe: "=recipe",
            create: "&create"
        },
        template: require('html/directive/recipe-directive.html'),
        link: function (scope, element, attrs) {
        }
    };
});