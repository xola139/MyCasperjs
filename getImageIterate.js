/****************************************************************
* Log in to Twitter
* Submit search query
* Capture the results
* Use emit(), on() Event Methods
*****************************************************************/

var casper = require("casper").create({
  verbose: true,
  logLevel: 'error',     // debug, info, warning, error
  pageSettings: {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  }
});

var url = 'http://twitter.com/';

var twitterId = 'nomemesfutbol';
var accouts =['BullyingFutbol','nomemesfutbol','sopitas'];


  casper.start(url + accouts[i], function() {
    this.echo(this.getTitle());
  });

  
  casper.waitForSelector('li.js-stream-item', function() {
    console.log('search results loaded' );
  });

  casper.then(function() {
    this.echo('----------------------------------');
    this.emit('results.log');
  });

  casper.on('results.log', function() {
      var elementos = this.getElementsInfo('.AdaptiveMedia-photoContainer');
      
      for(index in elementos){
          var obj = elementos[index].attributes;
          this.echo(obj["data-image-url"]);
      }
      

      
  });

  
  casper.run();
    


