const weatherForm = document.querySelector('form')
const searchbar = document.querySelector('input')
const locationUI = document.querySelector('#location')
const temperatureUI = document.querySelector('#temperature')
const feelslikeUI = document.querySelector('#feelslike')
const precipitationUI = document.querySelector('#precipitation')

weatherForm.addEventListener('submit', e => {
  fetch(`http://localhost:3000/weather?address=${searchbar.value}`)
  .then(res => {
    res.json()
      .then( ({ name, temperature, feelslike } = {}) => {
        locationUI.textContent = `${name}`
        temperatureUI.textContent = `${temperature} deg F`
        feelslikeUI.textContent = `Feels like: ${feelslike} deg F`
      })
      .catch(err => {
        console.log(err)
      })
  })
  .catch(err => {
    console.log(err)
  })

  e.preventDefault()
})