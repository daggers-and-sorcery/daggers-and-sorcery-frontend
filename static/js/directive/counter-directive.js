require('js/app.js').directive('countdown', [
    'Util',
    '$interval',
    function (Util, $interval) {
        return {
            restrict: 'A',
            scope: {date: '@'},
            link: function (scope, element) {
                $interval(function () {
                    var diff;
                    diff = Math.floor((scope.date - (new Date().getTime() / 1000)));
                    return element.text(Util.dhms(diff));
                }, 1000);
            }
        };
    }
]).factory('Util', [function () {
    return {
        dhms: function (t) {
            if(t < 0) {
                return 'Expired!';
            }

            var days, hours, minutes, seconds;
            days = Math.floor(t / 86400);
            t -= days * 86400;
            hours = Math.floor(t / 3600) % 24;
            t -= hours * 3600;
            minutes = Math.floor(t / 60) % 60;
            t -= minutes * 60;
            seconds = t % 60;
            return [
                //days + 'd',
                hours + 'h',
                minutes + 'm',
                seconds + 's'
            ].join(' ');
        }
    };
}]);