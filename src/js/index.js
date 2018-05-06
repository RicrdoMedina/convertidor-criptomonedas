import '../css/main.css'
import View from './class/View'
import Cotizador from './class/Cotizador'

window.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    document.querySelector('.container').classList.add('slideDown')
  }, 2000)
})

const view = new View()
const cotizador = new Cotizador()
const form = document.getElementById('formCriptomonedas')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const selectCoins = document.getElementById('monedas')
  const selectedCoin = selectCoins.options[selectCoins.selectedIndex].value
  const selectCripto = document.getElementById('criptomonedas')
  const selectedCripto = selectCripto.options[selectCripto.selectedIndex].value

  if (selectedCoin === '' || selectedCripto === '') {
    const message = 'Los campos moneda y criptomoneda son obligatorios'
    const className = 'has-warning'
    view.showMessageError(message, className)
  } else {
    view.showSpinner()
    cotizador.getSelectedCoins(selectedCoin, selectedCripto)
      .then(data => {
        console.log(data.result)
        view.showResult(data.result[0], selectedCoin)
      })
  }
})
