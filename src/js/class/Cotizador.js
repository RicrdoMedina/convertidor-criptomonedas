export default class Cotizador {
  async urlGetCoinsAPI () {
    const urlGetCoins = await fetch ('https://api.coinmarketcap.com/v1/ticker/');

    const data  = await urlGetCoins.json();
    
    return {
      data
    }

  }
}
