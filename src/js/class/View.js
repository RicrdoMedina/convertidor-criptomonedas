import Cotizador from './Cotizador'
const cotizador = new Cotizador()

export default class View {

  constructor () {
    this.init()
  }
  init () {
    this.buildCoinsSelect()
  }
  buildCoinsSelect () {
    cotizador.urlGetCoinsAPI()
      .then(data => {
        // console.log(data)
        const arrCoins = data.data
        const select = document.getElementById('criptomonedas');

        arrCoins.forEach(coin => {
          const option = document.createElement('option')
          option.value = coin.id
          option.appendChild(document.createTextNode(coin.name))
          select.appendChild(option)
        })
      })
  }
}
