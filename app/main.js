(function(app) {
  document.addEventListener('DOMContentLoaded', function() {
    ng.platform.browser.bootstrap(app.AppComponent);
    // ng.platform.browser.bootstrap(app.HeroList);
    // ng.platform.browser.bootstrap(app.Hero);
  });
})(window.app || (window.app = {}));
