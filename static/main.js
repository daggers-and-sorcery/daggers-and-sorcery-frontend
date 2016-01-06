// Vendor
var $ = require('vendor/jquery/js/jquery.min.js');
window.jQuery = $;
window.$ = $;

require('vendor/angular/js/angular.min.js');

require('vendor/angular-ui-router/js/angular-ui-router.min.js');

require('vendor/bootstrap/css/bootstrap.min.css');
require('vendor/bootstrap/css/bootstrap-theme.min.css');

// Controllers
require('js/controller/main-controller.js');

// Service
require('js/service/character-data-formatter.js');

// Router
require('js/router/router.js');

// Directive
require('js/directive/bind-html-compile.js');

// Constants
require('js/constant/attribute-bonus-map.js');

// SASS
require('sass/partial/news/news.scss');
require('sass/partial/news/news-entry.scss');
require('sass/partial/header/header.scss');
require('sass/partial/footer/footer.scss');
require('sass/partial/footer/sticky-footer.scss');
require('sass/partial/login/login-form.scss');
require('sass/partial/character/skills.scss');
require('sass/partial/character/character.scss');

require('sass/common/form/input.scss');
require('sass/common/form/button.scss');
require('sass/common/panel/panel.scss');

require('sass/core.scss');