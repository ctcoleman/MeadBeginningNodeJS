// Object property shorthand

const name = 'Christopher'
const userAge = 27

const user = {
  name,
  age: userAge,
  location: 'Buffalo'
}

console.log(user)

// Object destructuring

const product = {
  label: 'Red notebook',
  price: 3,
  stock: 201,
  salePrice: undefined
}

// const label = product.label
// const stock = product.stock

// const { label:productLabel , price, stock, salesPrice, rating = 5 } = product
// console.log(productLabel)
// console.log(stock)
// console.log(salesPrice)
// console.log(price)
// console.log(rating)

const transaction = (type, { label, stock }) => {
  console.log(type)
  console.log(label)
  console.log(stock)
}

transaction('order', product)



