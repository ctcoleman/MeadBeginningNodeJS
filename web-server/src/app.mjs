import express from 'express'
import hbs from 'hbs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import geocode from '../utils/geocode.mjs'
import forecast from '../utils/forecast.mjs'

const app = express()
const port = process.env.PORT || 3000

// define root paths
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// define paths for express config
const publicDirPath = join(__dirname, '../public')
const viewsPath = join(__dirname, '../templates/views')
const partialsPath = join(__dirname, '../templates/partials')

// set up handlebars with express and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

// express uses public dir to serve static files
app.use(express.static(publicDirPath))

// serve weather api
app.get('/weather', (req, res) => {
  let address = req.query.address

  // if no query string for address return error
  if(!address) {
    return res.send({
      error: 'Please enter an address query for the location you wish to get the weather for, sir...'
    })
  }

  geocode(address, (err, { latlong, location } = {}) => {
    if(err) {
      return res.send({ error:err })
    }

    forecast(location, (err, { name, temperature, feelslike, precipitation } = {}) => {
      if(err) {
        return res.send({
          error: err
        })
      }
      
      return res.send({
        name,
        temperature,
        feelslike,
        precipitation,
        address
      })
    })
    
  })
})

// // serve products
// app.get('/products', (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: 'Please enter a valid search query, sir...'
//     })
//   }

//   return res.send({
//     products: []
//   })
// })

// serve user api
app.get('/users', (req, res) => {
  res.send([
    {
      name: 'christopher',
      id: 0,
      age: 27 
    },
    {
      name: 'jenkins',
      id: 1,
      age: 48
    }
  ])
})


// get handlebars view and serve up as home page
app.get('', (req, res) => {
  // render for dynamic content
  res.render('index', {
    title: 'node weather app',
    location: 'Buffalo',
    name: 'christopher coleman',
    msg: 'welcome to your personalized weather app, sir...'
  })
})

// render about page - handlebar view file
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about me',
    name: 'christopher coleman',
    msg: '~custom creative solutions built with peace and love in mind~'
  })
})

// render help page - handlebar view file
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'help docs',
    name: 'christopher coleman',
    msg: 'here is displayed the help docs????'
  })
})

// render contact page - handlebar view file
app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'contact us',
    name: 'christopher coleman',
    github: 'ctcoleman'
  })
})

// render 404 error handling for help pages
app.get('/help/*', (req, res) => {
  res.render('error404', {
    title: '404 Error - Page not found',
    name: 'christopher coleman',
    msg: 'i couldn\'t find the help article you were looking for, sir...'
  })
})

// render generic 404 error handling
app.get('*', (req, res) => {
  res.render('error404', {
    title: '404 Error - Page not found',
    name: 'christopher coleman',
    msg: 'i couldn\'t find the page you were looking for, sir...'
  })
})

// start server on heruko server or local port
app.listen(port, () => {
  console.log(`server started on port ${port}`)
})

