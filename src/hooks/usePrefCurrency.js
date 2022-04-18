import {useState, useEffect} from 'react';

function UsePrefCurrency(currency = 'usd') {
  const [prefCurrency, setPrefCurrency] = useState(currency);

  /*
  * Searches localStorage for prefCurrency, if not found uses navigator
  * to determine currency, defaults to USD
  * */
  useEffect(() => {
    let prefCurrencyFromCache = localStorage.getItem('prefCurrency');
    if (prefCurrencyFromCache) {
      setPrefCurrency(prefCurrencyFromCache);
    } else if (navigator) {
      let userLanguage = navigator.language;
      let userCurrency = getUserCurrency(userLanguage);
      setPrefCurrency(userCurrency);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('prefCurrency', prefCurrency);
  })

  // Get user locale
  // If locale is not supported default to en-US
  // function getUserRegion(region) {
  //
  // }

  // get the user's currency based on their region.  If region not supported default to USD
  function getUserCurrency(region) {
    switch (region) {
      case "en-US":
        return 'usd';
      case "en-CA":
      case "fr-CA":
        return 'cad';
      case "en-GB":
        return 'gbp'
      case "en-AU":
        return "aud"
      case "de-CH":
      case "gsw-CH":
      case "fr-CH":
      case "it-CH":
        return 'chf'
      case "europe":
      case "fr-FR":
      case "de-BE":
      case "de-DE":
      case "it-IT":
        return 'eur'
      default:
        return "usd"
    }
  }

  return [prefCurrency, setPrefCurrency];
}

export default UsePrefCurrency;
