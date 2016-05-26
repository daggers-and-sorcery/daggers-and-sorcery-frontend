// Vendor
//TODO: maybe we can remove jquery altogether? Investigate please
var $ = require('vendor/jquery/js/jquery.min.js');
window.jQuery = $;
window.$ = $;
window.marked = require('vendor/marked/js/marked.min.js');

var angular = require('vendor/angular/js/angular.min.js');

require('vendor/angular-messages/js/angular-messages.min.js');

require('vendor/angular-ui-router/js/angular-ui-router.min.js');
require('vendor/angular-ui-bootstrap/js/angular-ui-bootstrap.min.js');
require('vendor/angular-ui-bootstrap/js/angular-ui-bootstrap-tpls.min.js');

require('vendor/angular-marked/js/angular-marked.min.js');

require('vendor/angular-flash/js/angular-flash.js');

require('vendor/angular-sanitize/js/angular-sanitize.js');
require('vendor/angular-animate/js/angular-animate.js');
require('vendor/angular-readmore/js/angular-readmore.js');

require('vendor/angular-slider/js/rzslider.min.js');
require('vendor/angular-slider/css/rzslider.min.css');

require('vendor/bootstrap/css/bootstrap.min.css');
require('vendor/bootstrap/css/bootstrap-theme.min.css');

// Controllers
require('js/controller/main-controller.js');

// Service
require('js/service/character-data-formatter.js');

// Router
require('js/router/router.js');

// Filter
require('js/filter/capitalize-filter.js');

// Directive
require('js/directive/bind-html-compile.js');
require('js/directive/unsafe-html-popover.js');

// Interceptors
require('js/interceptor/combat-update-interceptor.js');
require('js/interceptor/combat-update-interceptor-config.js');

// Constants
require('js/constant/attribute-bonus-map.js');

// Scss
require('sass/partial/news/news.scss');
require('sass/partial/news/news-entry.scss');
require('sass/partial/header/header.scss');
require('sass/partial/footer/footer.scss');
require('sass/partial/footer/sticky-footer.scss');
require('sass/partial/login/login-form.scss');

// Character scss
require('sass/partial/character/skills.scss');
require('sass/partial/character/inventory.scss');
require('sass/partial/character/character.scss');
require('sass/partial/character/attribute.scss');
require('sass/partial/character/equipment.scss');
require('sass/partial/character/general.scss');

//Skill scss
require('sass/partial/character/skill/cooking.scss');

// Registration scss
require('sass/partial/registration/registration.scss');

// Inn scss
require('sass/partial/inn/chat.scss');
require('sass/partial/inn/inn-service.scss');

// Shop scss
require('sass/partial/shop/shop.scss');

// Explore scss
require('sass/partial/explore/explore.scss');

// Journal
require('sass/partial/journal/journal.scss');

require('sass/common/form/input.scss');
require('sass/common/form/button.scss');

require('sass/common/panel/panel.scss');

require('sass/common/holder/description-holder.scss');

require('sass/common/component/popover.scss');

require('sass/common/flash/flash.scss');

require('sass/core.scss');