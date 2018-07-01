const urlApi = 'https://free.currencyconverterapi.com/api/v5/';
const currencies = urlApi + 'currencies';
const createNode = ( element => document.createElement(element));
const append = ( (parent, el) => parent.appendChild(el) );

const myFunction = () => {
  var inputFromx = document.getElementById("inputFrom").selectedIndex;
  var inputFromy = document.getElementById("inputFrom").options;
  const currencyFrom = inputFromy[inputFromx].text;

  var inputTox = document.getElementById("inputTo").selectedIndex;
  var inputToy = document.getElementById("inputTo").options;
  const currencyTo = inputToy[inputTox].text;

  const inputMount = document.getElementById("inputMount").value;

  convertCurrency(inputMount, currencyFrom, currencyTo);
}


function convertCurrency(amount, fromCurrency, toCurrency) {
  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  let query = fromCurrency + '_' + toCurrency;
  let url = urlApi + 'convert?q='
            + query + '&compact=ultra';
fetch(url)
.then(response => response.json())
.then(data => {
    try{
      let val, total;
      const resultMount = document.getElementById('resultMount');

        for (const [key, value] of Object.entries(data)) {
          val = value;
        }

        if (val) {
          total = val * amount;
          total = Math.round(total * 100) / 100;
        } else {
          var err = new Error("Value not found for " + query);
          console.log(err);
        }
        resultMount.innerHTML = `${total}`;

    } catch(e) {
      console.log("Parse error: ", e);

    }

})
.catch(error => console.log(error));
}


let con = true;

if(con){
(function () {
  fetch(currencies)
  .then(response => response.json())
  .then(data => {
    let currencies = data.results; // Get the results
for( key in currencies){
  dbPromise.then(function(db) {
    var tx = db.transaction('currencies', 'readwrite');
    var keyValStore = tx.objectStore('currencies');
    keyValStore.put(currencies, "results");
    
    return tx.complete;
  }).then(function() {
    console.log(':Item added currencies');
	con = false;
  });
}
  }).catch(error => console.log(error));

})();
}


if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using a more restrictive scope.
  navigator.serviceWorker.register('/sw.js', {scope: './'}).then(function(registration) {
    console.log('Service worker registration succeeded:', registration);
  }).catch(function(error) {
    console.log('Service worker registration failed:', error);
  });
} else {
  console.log('Service workers are not supported.');
}


/*
function displayResult() {
  var x = document.getElementById("inputFrom");
  var txt = "All options: ";
  var i;
  for (i = 0; i < x.length; i++) {
      txt = txt + "\n" + x.options[i].text;
  }
  return txt;
}
*/

/*
document.getElementById('convert').addEventListener('click', function(event){
  //event.preventDefault();
  const selectFrom = document.getElementById('inputFrom');
  const selectTo = document.getElementById('inputTo');

let currency_from_selected = selectFrom.options[selectFrom.selectedIndex].value;
let currency_to_selected = selectTo.options[selectTo.selectedIndex].value;

console.log(selectFrom.selectedIndex);
console.log(currency_to_selected);

const inputMount = document.getElementById("inputMount").value;

console.log('don!!!!!!!!1');

convertCurrency(inputMount, currency_from_selected, currency_to_selected);


selectFrom.options[selectFrom.selectedIndex].setAttribute("selected", "selected");

});
*/


