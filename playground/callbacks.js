const doWorkCallback = (callback) => {
  setTimeout(() => {
    // callback('error, sir...') // error
    callback(undefined, 'sucess, sir...') // success
  }, 2000)
}

doWorkCallback((err, result) => {
  if(err) {
    return console.log(err)
  }

  console.log(result)
})






// setTimeout(() => {
//   console.log('2 seconds are up')
// }, 2000)

// const names = ['Andrew', 'Jen', 'Christopher', 'Sam']
// const shortNames = names.filter( name => name.length <= 4)

// const geocode = (address, callback) => {
//   setTimeout(() => {
//     const data = {
//       latitude: 0,
//       longitude: 0
//     }
    
//     callback(data)
//   }, 2000)
// }

// geocode('Philadelphia', (data) => {
//   console.log(data)
// })

// const add = (addend, addendTwo, callback) => {
//   const sum = addend + addendTwo
//   callback(sum)
// }

// add(1, 4, (sum) => {
//   console.log(sum) // should print 5
// })

