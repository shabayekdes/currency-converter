var dbPromise = idb.open('currencies-convert-db', 3, function(upgradeDb) {
  switch(upgradeDb.oldVersion) {
    case 0:
      var keyValStore = upgradeDb.createObjectStore('currencies');

    case 1:
      var keyValStore = upgradeDb.transaction.objectStore('currencies');
      keyValStore.createIndex('currencie', 'currencie');
  }
});



// read currencies
dbPromise.then(function(db) {
  var tx = db.transaction('currencies');
  var peopleStore = tx.objectStore('currencies');

  return peopleStore.get('results');
}).then(function(currencies) {

  //let currencies = data.results; // Get the results
  console.log(currencies);
  const selectFrom = document.getElementById('inputFrom');
  const selectTo = document.getElementById('inputTo');

  for( key in currencies){
    let optionFrom = createNode('option'),
        optionTo = createNode('option');

    optionFrom.innerHTML = `${key}`;
    optionTo.innerHTML = `${key}`;

    append(selectFrom, optionFrom);
    append(selectTo, optionTo);
  }

});