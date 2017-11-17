//http://www.tutorialsteacher.com/nodejs/access-mongodb-in-nodejs
//http://www.tutorialsteacher.com/nodejs/access-mongodb-in-nodejs
//https://stackoverflow.com/questions/6831918/node-js-read-a-text-file-into-an-array-each-line-an-item-in-the-array
//http://blog.koalite.com/2011/10/javascript-diferencias-entre-declaracion-de-funcion-y-expresion-con-funcion/
//http://www.etnassoft.com/2011/09/02/funciones-declaradas-vs-funciones-expresadas-en-javascript/


var MongoClient = require('mongodb').MongoClient;

var saveData = function (data){
	// Connect to the db
	MongoClient.connect("mongodb://usuariogeneric:sharkesink139@ds041603.mlab.com:41603/generic", function (err, db) {
	    
	    db.collection('images', function (err, collection) {
	        
	        /*collection.find().toArray(function(err, items) {
	            if(err) throw err;    
	            console.log(items);            
	        });*/

	        collection.insert(data);
	        db.close();
	        
	        

	        /*db.collection('Persons').count(function (err, count) {
	            if (err) throw err;
	            
	            console.log('Total Rows: ' + count);
	        });*/
	        
	    });
	                
	});

return;
};



var fs = require('fs');

var readFile = function(name){
	var file = __dirname + '/scraped_data/'+ name +'.json';

	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			console.log('Error: ' + err);
	    	return;
	  	}

	  	data = JSON.parse(data);
		saveData(data);
	});
};


fs.readFile(__dirname + '/links.txt', function(err, f){
    var array = f.toString().split('\n');
    for(i in array) {
    	readFile(array[i].replace(/(\n|\r)+$/, ''));
    }
});




