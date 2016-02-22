(function(app) {
  'use strict';
  class Heroo {
    constructor(nickName, realName) {
      this.nickName = nickName;
      this.realName = realName;
    }
    toString() {
      return (this.realName + ' is ' + this.nickName);
    }
  }
  app.Hero = ng.core
    .Component({
      selector: 'my-hero',
      template: `<b>{{hero.realName}} is {{hero.nickName}}</b>`,
      inputs: ['hero']
    })
    .Class({
      constructor: function() {},
      ngOnInit: function() {
        // console.log(this.hero)
      }
    });
  app.HeroList = ng.core
    .Component({
      selector: 'my-heroes',
      template: `<ul><li *ngFor="#h of heroes"><my-hero [hero]="h"></my-hero></li></ul>`,
      directives: [
        ng.common.NgFor,
        app.Hero
      ]
    })
    .Class({
      constructor: function() {
        this.heroes = [
          new Heroo('Batman', 'Bruce Wayne'),
          new Heroo('Superman', 'Clark Kent')
        ];
      }
    });
  app.AppComponent =
    ng.core
    .Component({
      selector: 'my-app',
      template: `<h1>{{title}}</h1><h2>{{hero}} details!</h2><my-heroes></my-heroes>
      <p>
        <label>PDF url</label> <input type="text" [(ngModel)]="pdfUrl" />
        <label>PDF page</label> <input type="text" [(ngModel)]="page" />
      </p>
      <ng2-pdf [url]="pdfUrl" [page]="page"></ng2-pdf>`,
      directives: [
        app.HeroList,
        app.ng2Pdf
      ],
      inputs: ['test']
    })
    .Class({
      constructor: function() {
        this.title = 'Tour of Heroes';
        this.hero = 'Windstorm';
        this.pdfUrl = 'pdf/relativity.pdf';
        this.page = 16;
      },
      ngOnInit: function() {}
    });
})(window.app || (window.app = {}));
