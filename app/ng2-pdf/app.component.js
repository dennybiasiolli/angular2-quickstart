(function(app) {
  'use strict';
  class ng2Pdf {
    constructor(pdfUrl, creds, scale, page) {
      this.pdfUrl = pdfUrl;
      this.creds = creds;
      this.page = parseInt(page);
      this.pageCount = 0;
      this.scale = scale && scale > 0 ? scale : 1;
      // this.renderPDF();
      this.pdfDoc = null;
      this.renderTask = null;
      this.pdfLoaderTask = null;
    }
    toString() {
      return (this.pdfUrl);
    }
    renderPDF(htmlElement) {
      let self = this;
      self.htmlElement = htmlElement;
      self.container = htmlElement.nativeElement;
      self.container.style.position = 'relative';
      self.container.style.display = 'block';
      var params = {
        'url': this.pdfUrl,
        'withCredentials': this.creds
      };
      // if (httpHeaders) {
      //   params.httpHeaders = httpHeaders;
      // }
      if (self.pdfUrl && self.pdfUrl.length) {
        self.pdfLoaderTask = PDFJS.getDocument(params);
        self.pdfLoaderTask.then(
          function(_pdfDoc) {
            // if (typeof scope.onLoad === 'function') {
            //   scope.onLoad();
            // }

            self.pdfDoc = _pdfDoc;
            self.pageCount = _pdfDoc.numPages;
            self.renderPage(self.page);

            // scope.$apply(function() {
            //   this.pageCount = _pdfDoc.numPages;
            // });
          },
          function(error) {
            if (error) {
              // if (typeof scope.onError === 'function') {
              //   scope.onError(error);
              // }
            }
          }
        );
      }
    }
    renderPage(num) {
      num = parseInt(num);
      let self = this;
      if (self.pageCount > 0) {
        if (num < 1) num = 1;
        else if (num > self.pageCount) num = self.pageCount;
      }
      self.page = num;
      if (self.renderTask) {
        self.renderTask._internalRenderTask.cancel();
      }
      self.pdfDoc.getPage(num).then(function(page) {
          var viewport = page.getViewport(self.scale);
          // clear current container
          self.container.innerHTML = '';

          // Creating the page view with default parameters.
          var pdfPageView = new PDFJS.PDFPageView({
            container: self.container,
            id: num,
            scale: self.scale,
            defaultViewport: viewport,
            // We can enable text/annotations layers, if needed
            textLayerFactory: new PDFJS.DefaultTextLayerFactory(),
            annotationLayerFactory: new PDFJS.DefaultAnnotationLayerFactory()
          });
          // Associates the actual page with the view, and drawing it
          pdfPageView.setPdfPage(page);
          return pdfPageView.draw();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  app.ng2Pdf = ng.core
    .Component({
      selector: 'ng2-pdf',
      template: `<div #myElement></div>`,
      inputs: ['url', 'creds', 'scale', 'page'],
      queries: {
        myElement: new ng.core.ViewChild('myElement')
      }
    })
    .Class({
      constructor: function() {},
      ngOnInit: function() {
        this.pdf = new ng2Pdf(this.url, this.creds, this.scale, this.page);
      },
      ngAfterViewInit() {
        this.pdf.renderPDF(this.myElement);
      },
      ngOnChanges(changes) {
        if (changes.page && this.pdf) {
          this.pdf.renderPage(changes.page.currentValue);
        }
      }
    });
})(window.app || (window.app = {}));
