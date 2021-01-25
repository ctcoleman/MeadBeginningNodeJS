import request from 'postman-request'

const forecast = (location, callback) => {
  const urlWeather = `http://api.weatherstack.com/current?access_key=d1ee9110b966f4502078ff9844790e05&query=${location}&units=f`

  request({ url:urlWeather, json:true }, (err, { body }, { error, location, current } = {}) => {

  if(err) {
    callback('Unable to connect to weather service...', undefined)
  } else if(error) {
    callback('Unable to find location...', undefined)
  } else {
    const { name } = location
    const { temperature, feelslike, precip:precipitation } = current
    callback(undefined, { name, temperature, feelslike, precipitation })
  }
})
}

export default forecast
