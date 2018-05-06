import '../css/main.css'
import View from './class/View'
import Cotizador from './class/Cotizador'

console.log('ready!')

const view = new View()
const cotizador = new Cotizador()

const form = document.getElementById('formCriptomonedas')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const selectCoins = document.getElementById('monedas')
  const selectedCoin = selectCoins.options[selectCoins.selectedIndex].value

  const selectCripto = document.getElementById('criptomonedas')
  const selectedCripto = selectCripto.options[selectCripto.selectedIndex].value

  console.log(selectedCripto)

  if (selectedCoin === '' || selectedCripto === '') {
    console.log('falta datos')
    const message = 'Seleccione la moneda y la criptomoneda'
    const className = 'has-warning'
    view.showMessageError(message, className)
  } else {
    console.log('cotizar')
    cotizador.getSelectedCoins(selectedCoin, selectedCripto)
      .then(data => {
        console.log(data.result)
        view.showResult(data.result[0], selectedCoin)
      })
  }
})
