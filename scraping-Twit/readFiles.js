//http://www.tutorialsteacher.com/nodejs/access-mongodb-in-nodejs

/*
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://usuariogeneric:sharkesink139@ds041603.mlab.com:41603/generic", function (err, db) {
    
    db.collection('usuarios', function (err, collection) {
        
        /*collection.find().toArray(function(err, items) {
            if(err) throw err;    
            console.log(items);            
        });*/

  /*       collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
        collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
        collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });
        
        

        /*db.collection('Persons').count(function (err, count) {
            if (err) throw err;
            
            console.log('Total Rows: ' + count);
        });*/
        
   // });
                
//});




var fs = require('fs');
var file = __dirname + '/scraped_data/sopitas.json';

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }

  data = JSON.parse(data);

  console.log(data);
});