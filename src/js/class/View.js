import Cotizador from './Cotizador'
import spinner from '../../images/loader.gif'
import clock from '../../images/top-clock.png'
import arrowUp from '../../images/arrow-up.png'
import arrowDown from '../../images/arrow-down.png'
import checkList from '../../images/check-list.jpg'

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
    document.querySelector('.box-result').innerHTML = ''
    if (boxMessage.childElementCount === 0) {
      boxMessage.appendChild(div)
      boxMessage.classList.add('pullUp')

      setTimeout(() => {
        document.querySelector('.box-message div').remove()
        boxMessage.classList.remove('pullUp')
      }, 3000)
    }
  }
  showResult (result, coin) {
    const keyCoin = `price_${coin}`
    const value = result[keyCoin]
    const boxResult = document.querySelector('.result')

    const hour = new Date(result.last_updated * 1000)

    const lastUpdated = `${hour.getHours()}:${hour.getMinutes()} horas`

    let templateHtml = ''

    templateHtml += `
        <p id="price" class="pullUp">
          <img src="${checkList}" alt="Check list">
          <span class="label">Precio ${result.name}</span>
          <span> ${value}</span>
        </p>
        <p id="lastHour" class="pullUp">
          <img src="${result.percent_change_1h > 0 ? arrowUp : arrowDown}" alt="Ultima Hora">
          <span class="label">Ultima hora</span>
          <span> ${result.percent_change_1h} </span>
        </p>
        <p id="lastDay" class="pullUp">
          <img src="${result.percent_change_24h > 0 ? arrowUp : arrowDown}" alt="Ultimo Dia">
          <span class="label">Ultimo dia</span>
          <span> ${result.percent_change_24h} </span>
        </p>
        <p id="lastSevenDay" class="pullUp">
          <img src="${result.percent_change_7d > 0 ? arrowUp : arrowDown}" alt="Ultimos 7 dias">
          <span class="label">Ultimos 7 dias</span>
          <span> ${result.percent_change_7d} </span>
        </p>
        <p id="lastUpdated" class="pullUp">
          <img src="${clock}" alt="Last updated">
          <span class="label">Ultima actualización</span>
          <span>${lastUpdated}</span>
        </p>
    `
    document.querySelector('.box-result').innerHTML = templateHtml
    boxResult.classList.remove('loading')
  }
  showSpinner () {
    const img = document.createElement('img')
    const boxLoader = document.querySelector('.box-loader')
    const boxResult = document.querySelector('.result')
    img.className = 'loader'
    img.src = spinner
    img.alt = 'Loader..'
    if (boxLoader.childElementCount === 0) {
      document.querySelector('.box-loader').appendChild(img)
      document.querySelector('.box-result').innerHTML = ''
    }
    boxResult.style.display = 'flex'
    boxResult.classList.add('loading')
  }
}
