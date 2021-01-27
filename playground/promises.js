const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('error, sir...')
    resolve('success, sir...')
  }, 2000)
})

doWorkPromise
  // runs if(resolve)
  .then(result => {
    console.log(result)
  })
  // runs if(reject)
  .catch(err => {
    console.log(err)
  })