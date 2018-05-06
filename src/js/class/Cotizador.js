export default class Cotizador {
  async urlGetCoinsAPI () {
    const urlGetCoins = await window.fetch('https://api.coinmarketcap.com/v1/ticker/')
    const data = await urlGetCoins.json()
    return {
      data
    }
  }

  async getSelectedCoins (selectedCoin, selectedCripto) {
    const urlConvert = await window.fetch(`https://api.coinmarketcap.com/v1/ticker/${selectedCripto}/?convert=${selectedCoin}`)
    const result = await urlConvert.json()

    return {
      result
    }
  }
}
