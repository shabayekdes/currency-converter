
let arr; 
var dbPromise = idb.open('currencies-convert-db', 1, function(upgradeDb) {

        var keyValStore = upgradeDb.createObjectStore('keyval');
        keyValStore.put("world", "hello");


  });
  
  // read "hello" in "keyval"
  dbPromise.then(function(db) {
    var tx = db.transaction('keyval');
    var keyValStore = tx.objectStore('keyval');
    return keyValStore.get('hello');
  }).then(function(val) {
    console.log('The value of "hello" is:', val);
  });

  
