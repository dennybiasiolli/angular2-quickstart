(function(app) {
  app.HeroList = ng.core
    .Component({
      selector: 'my-heroes',
      template: '<ul><li *ngFor="#hero of heroes">{{hero}}</li></ul>',
      directive: [ng.common.NgFor]
    })
    .Class({
      constructor: function() {
        this.asd = 'asd';
        this.heroes = ['Batman', 'Superman'];
      }
    });
  app.AppComponent =
    ng.core
    .Component({
      selector: 'my-app',
      template: '<h1>{{title}}</h1><h2>{{hero}} details!</h2><my-heroes></my-heroes>',
      directive: [app.HeroList]
    })
    .Class({
      constructor: function() {
        this.title = 'Tour of Heroes';
        this.hero = 'Windstorm';
      }
    });
})(window.app || (window.app = {}));
