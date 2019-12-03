// App requirements:
// - The app should present us with a menu
// - Users should press a key to select an option from the menu
//   - When selected an item will start being processed
// - Users should be able to select more items while others are being processed
// - When an item is done processing, it should be served to us (via `console.log` 🤷‍♂️)
// - press 'r' to save a receipt

const fs = require('fs')

console.log(`👋 Welcome to the Pokemon Cafe!`)

const menu = {
  s: {
    name: 'Pikachu Steak',
    cookTime: 10000,
    price: 1000
  },
  b: {
    name: 'Beyond Bulbasaur Burger',
    cookTime: 2000,
    price: 200
  },
  p: {
    name: 'Peking Psyduck',
    cookTime: 1000,
    price: 500
  },
  f: {
    name: 'Magikarp Fish and Chips ',
    cookTime: 500,
    price: 150
  },
  d: {
    name: 'Drink',
    cookTime: 100,
    price: 50
  }
}

const printMenu = () => {
  for (let menuItemKey in menu) {
    console.log(`Press ${menuItemKey} for ${menu[menuItemKey].name} which costs $${menu[menuItemKey].price}`)
  }

  console.log(`Press r to print a receipt`)
  console.log(`Press m to show the menu again`)
}

printMenu()

const orders = []

// now, let's handle user input using process.stdin, don't worry about what the next three lines do at all:
const userInput = process.stdin
userInput.setRawMode(true)
userInput.setEncoding('utf8')

userInput.on('data', data => {
  if (data === '\u0003') {
    process.exit()
  } else if (data === 'r') {
    console.log(`🧾 printing receipt.....`)
    
    console.table(orders)
  } else if (data === 'm') {
    printMenu()
  } else if (menu[data]) {
    orders.push(menu[data])

    console.log(`ORDER IN!!!! We will start working on your ${menu[data].name} right away, you've been charged $${menu[data].price}`)

    setTimeout(() => {
      console.log(`🛎 Order up! Enjoy your ${menu[data].name}`)
    }, menu[data].cookTime)
  } else {
    console.log(`Sorry Master Pokemon Trainer, we don't have that item`)
  }
})