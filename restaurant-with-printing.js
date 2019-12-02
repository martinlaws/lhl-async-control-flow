// Today we'll be building out a restaurant simulator with the following requirements:
// - The app should present us with a menu
// - Users should press a number to select an option from the menu
//   - When selected an item will start being processed
// - Users should be able to select more items while others are being processed
// - When an item is done processing, it should be served to us (via `console.log` 🤷‍♂️)
// - press 'p' to save a receipt

const fs = require('fs')

console.log('Welcome to our restaurant!')

const menu = {
  b: { name: 'Burger', time: 5000, price: 5 },
  f: { name: 'Fries', time: 4000, price: 4 },
  m: { name: 'Milkshake', time: 2000, price: 3 },
  h: { name: 'Hot Dog', time: 350, price: 2 },
  c: { name: 'Coke', time: 20, price: 0.5 },
  s: { name: 'Sprite', time: 20, price: 0.5 }
}


const printMenu = () => {
  for (let menuItem in menu) {
    console.log(`Press ${menuItem} to order ${menu[menuItem].name}`)
  }
  console.log(`Press p to save your order receipt`)
}

printMenu()

const orders = []

const printReceipt = orders => {
  let recieptRows = []
  let orderTotal = 0

  for (let orderItem of orders) {
    recieptRows.push(`
      - ${orderItem.name}: $${orderItem.price}
    `)
    
    orderTotal += orderItem.price
  }

  recieptRows.push(`
    ----------
    Total: $${orderTotal}

    We thank you kindly for your business.
  `)

  return recieptRows.join('')
}

// now, let's handle user input using process.stdin, don't worry about what the next three lines do at all:
const userInput = process.stdin
userInput.setRawMode(true)
userInput.setEncoding('utf8')

// all you need to know is that `userInput` has a special way of listening for key presses
// we'll need to wait for user input and provide a way to quit

userInput.on('data', data => {
  if (data === '\u0003') {
    process.exit()
  } else if (menu[data]) {
    console.log(`Right on dude! We have that item!`)
    
    orders.push(menu[data])

    setTimeout(() => {
      console.log(`🔔 Here's your ${menu[data].name}`)
    }, menu[data].time)
  } else if (data === 'p') {
    console.log('🧾 Printing receipt...')
    console.log(orders)

    fs.appendFile('receipt.txt', printReceipt(orders), err => {
      if (err) throw err;
      console.log('saved!');
    })
  } else {
    console.log(`Sorry brah, it doesn't look like we have that item`)
  }
})
