import request from 'postman-request'
import geocode from './utils/geocode.mjs'
import forecast from './utils/forecast.mjs'

const locations = process.argv

if(locations.length < 3) {
  console.log('Please enter a location...')
} else {
  locations.forEach((location, index) => {
    if(index >= 2) {
      geocode(location, (err, { latlong, location } = {}) => {
        if(err) {
          return console.log(err)
        } else {
          forecast(location, (err, { name, temperature, feelslike, precipitation } = {}) => {
            if(err) {
              console.log(err)
            } else {
              console.log('--------------------------------------------')
              console.log(`Name... ${name}`)
              console.log(`City center... ${latlong}`)
              console.log(`Temp... ${temperature}`)
              console.log(`Feels Like... ${feelslike}`)
              console.log(`Precipitation... ${precipitation}`)
              console.log('--------------------------------------------')
            }
          })
        }
      })
    }
  })
}


