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

var twitterId = 'BullyingFutbol';


casper.start(url + twitterId, function() {
  this.echo(this.getTitle());
});

casper.waitForSelector('.trends-inner', function() {
  console.log('search results loaded' );
});

casper.then(function() {
  this.emit('results.log');
});

casper.on('results.log', function() {
  this.captureSelector('twitPic.png', 'div.stream-container');
});

casper.run();