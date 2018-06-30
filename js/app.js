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


/*Fetch currencies*/
const getcurrencies = () => {
  fetch(currencies)
  .then(response => response.json())
  .then(data => {

    let currencies = data.results; // Get the results

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
  }).catch(error => console.log(error));
}


getcurrencies();