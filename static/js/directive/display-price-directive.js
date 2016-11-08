require('js/app.js').directive('displayPrice', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
        price: "=price",
    },
    template: require('html/directive/price-directive.html'),
    link: function (scope, element, attrs) {
        scope.floor = function(value) {
            return Math.floor(value);
        };
    }
  };
});