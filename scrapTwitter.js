String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');}
String.prototype.ltrim=function(){return this.replace(/^\s+/,'');};
String.prototype.rtrim=function(){return this.replace(/\s+$/,'');};
String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};

Date.prototype.MMDDYYYY = function() {         
                            
    var yyyy = this.getUTCFullYear().toString();                                    
    var mm = (this.getUTCMonth()+1).toString(); // getMonth() is zero-based         
    var dd  = this.getUTCDate().toString();             
                        
    return (mm[1]?mm:"0"+mm[0]) + "/" + (dd[1]?dd:"0"+dd[0]) + "/" + yyyy;
};

SanitizeString = function(str){

    if(str==null){

       str = '';

    }

    str = str.trim();

    var returnstring = str.replace(/"/g,'');
	returnstring = returnstring.replace(/\n/g," ");
	returnstring = '"' + returnstring.fulltrim() + '"';

    return returnstring;
}

var utils = require('utils');
var fs = require('fs');
var casper = require('casper').create({
	verbose: true,
  	logLevel: 'error',
	pageSettings: {
		loadImages: false,
		loadPlugins: false,
		userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36'
  
  }

});

var tweet_account_name;

if(!casper.cli.has("account_name")){
	casper.echo("account name is missing");
	casper.echo("Use like this:   casperjs.exe tweet_scrap.js --account_name=Karachi_Update");
	casper.exit(1);

}

tweet_account_name = casper.cli.get("account_name");
outputfilename = "scraped_tweets.csv";

var header = "Tweet,Timetamp";

if(fs.exists(outputfilename)){
	fs.remove(outputfilename);
}

var stream = fs.open(outputfilename,"w");

stream.writeLine(header);

function RecursiveTriverse(thecasper,newurl,stream)
{
	thecasper.wait(1000);
	thecasper.thenOpen(newurl,function(){

	var timestamps = this.getElementsInfo("td.timestamp a");
	var tweets = this.getElementsInfo('div.tweet-text div.dir-ltr');

	this.echo("Scraping tweets from " + this.getCurrentUrl());

	for( var index in  tweets){
		var tweet = tweets[index].text;
		var time_stamp = timestamps[index].text;
		tweet = SanitizeString(tweet);
		time_stamp = SanitizeString(time_stamp);
		stream.writeLine(tweet + "," + time_stamp);
	}


		if(this.exists("div.w-button-more")){
			thea = this.getElementInfo("div.w-button-more a");
			RecursiveTriverse(this,thea.attributes.href,stream);
		}
	});
    return;
}

casper.start('https://mobile.twitter.com/' + tweet_account_name,function(){
	RecursiveTriverse(this,this.getCurrentUrl(),stream);
});

casper.then(function(){
	stream.close();
	stream.flush();

});


casper.run();