import { request } from 'http'

const url = `http://api.weatherstack.com/current?access_key=d1ee9110b966f4502078ff9844790e05&query=Buffalo&units=f`

const http = request(url, response => {
  let data = ''

  response.on('data', chunk => {
    data = data + chunk.toString()
  })

  response.on('end', () => {
    const body = JSON.parse(data)
    console.log(body)
  })
})

http.on('error', error => {
  console.log('Error..', error)
})

http.end()