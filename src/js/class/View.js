import Cotizador from './Cotizador'
import spinner from '../../images/loader.gif'

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
        const select = document.getElementById('criptomonedas')

        arrCoins.forEach(coin => {
          const option = document.createElement('option')
          option.value = coin.id
          option.appendChild(document.createTextNode(coin.name))
          select.appendChild(option)
        })
      })
  }
  showMessageError (message, classNames) {
    const div = document.createElement('div')
    div.className = classNames
    div.appendChild(document.createTextNode(message))

    const boxMessage = document.getElementById('boxMessage')
    boxMessage.appendChild(div)

    setTimeout(() => {
      document.querySelector('.box-message div').remove()
    }, 3000)
  }
  showResult (result, coin) {
    console.log('coin' + coin)
    const keyCoin = `price_${coin}`
    const value = result[keyCoin]
    const boxResult = document.querySelector('.result')
    console.log(value)

    boxResult.style.display = 'flex'
    boxResult.classList.add('loading')
    this.showSpinner()

    const hour = new Date(result.last_updated * 1000)

    const lastUpdated = `${hour.getHours()}:${hour.getMinutes()} horas`

    let templateHtml = ''

    templateHtml += `
        <p>
          <span class="label">Precio ${result.name}</span>
          <span> ${value}</span>
        </p>
        <p>
          <span class="label">Ultima hora</span>
          <span> ${result.percent_change_1h} </span>
        </p>
        <p>
          <span class="label">Ultimo dia</span>
          <span> ${result.percent_change_24h} </span>
        </p>
        <p>
          <span class="label">Ultimos 7 dias</span>
          <span> ${result.percent_change_7d} </span>
        </p>
        <p>
          <span class="label">Ultima actualizacion</span>
          <span>${lastUpdated}</span>
        </p>
    `
    boxResult.classList.remove('loading')
    document.querySelector('.box-result').innerHTML = templateHtml
  }
  showSpinner () {
    const img = document.createElement('img')
    img.className = 'loader'
    img.src = spinner
    img.alt = 'Loader..'
    document.querySelector('.box-loader').appendChild(img)
  }
}
