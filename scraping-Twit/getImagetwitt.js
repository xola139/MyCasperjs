
var fs = require('fs');
var casper = require("casper").create({
  verbose: true,
  logLevel: 'error',     // debug, info, warning, error
  pageSettings: {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  }
});

var outputfilename = "scraped_data/"+casper.cli.get(0) + ".txt";



var stream = fs.open(outputfilename,"w");
var title;
var url = "http://twitter.com/"+casper.cli.get(0);

casper.start(url, function() {
  this.echo(this.getTitle());
  title = this.getTitle();
});

casper.waitForSelector('li.js-stream-item', function() {
  console.log('search results loaded' );
});

casper.then(function() {
  this.emit('results.log');
});

casper.on('results.log', function() {
    var elementos = this.getElementsInfo('.AdaptiveMedia-photoContainer');
    var item = [];
    var data = {};
    for(index in elementos){
      var obj = elementos[index].attributes;
      this.echo(obj["data-image-url"]);

      item.push(obj["data-image-url"]);
      
    }

    data[casper.cli.get(0)] = item;
    stream.writeLine(JSON.stringify(data));
    
});

casper.then(function(){
  stream.close();
  stream.flush();

});

casper.run();