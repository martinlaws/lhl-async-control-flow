// Today we'll be building out a restaurant simulator with the following requirements:
// - The app should present us with a menu
// - Users should press a number to select an option from the menu
//   - When selected an item will start being processed
// - Users should be able to select more items while others are being processed
// - When an item is done processing, it should be served to us (via `console.log` 🤷‍♂️)
// - press 'p' to save a receipt

console.log('Welcome to our restaurant!')

// console.log(`
//   1 - Menu item 1
//   2 - Menu item 2
//   3 - Menu item 3
// `)
// // ^ this is hacky and hardcoded, let's write it in a way we can reuse

const menu = {
  b: { name: 'Burger', time: 5000 },
  f: { name: 'Fries', time: 4000 },
  m: { name: 'Milkshake', time: 2000 },
  h: { name: 'Hot Dog', time: 350 },
  c: { name: 'Coke', time: 20 },
  s: { name: 'Sprite', time: 20 }
}


const printMenu = () => {
  for (let menuItem in menu) {
    console.log(`Press ${menuItem} to order ${menu[menuItem].name}`)
  }
  console.log(`Press p to save your order receipt`)
}

printMenu()

const orders = []

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
  } else {
    console.log(`Sorry brah, it doesn't look like we have that item`)
  }
})

