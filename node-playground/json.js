const fs = require('fs')

// const book = {
//   title: 'The Raven',
//   author: 'Edgar Alan Poe'
// }

// const bookJSON = JSON.stringify(book)

// fs.writeFileSync('json.json', bookJSON)

// const dataBuffer = fs.readFileSync('json.json')
// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON)

// console.log(data)

// Fetch and Parse data -- dirtyData => newData
const dirtyData = fs.readFileSync('json.json')
const parseData = data => JSON.parse(data.toString())
const cleanData = parseData(dirtyData)

// Hack data with my info -- newData === myData
cleanData.name = 'Christopher'
cleanData.planet = 'Jupiter'

// Stingify and replace undetected -- myData --> thereData === myData
const jsonData = JSON.stringify(cleanData)
fs.writeFileSync('json.json', jsonData)

console.log(cleanData)
console.log(jsonData)