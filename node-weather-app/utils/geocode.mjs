import request from 'postman-request'

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiY3Rjb2xlbWFuIiwiYSI6ImNrazNjN215NzE2Mm8yb290ZjR1N296MTEifQ.G1-cUosv0LXJNCt68607GA&limit=1`

  request({ url, json: true }, (err, response, { features }) => {
    if(err) {
      callback('Unable to connect to location services...')
    } else if (features.length === 0) {
      callback('Unable to find any matching locations...')
    } else {
      const { center:latlong, place_name:location } = features[0]
      callback(undefined, { latlong, location })
    }
  })
}

export default geocode