# Intro to asynchronous control flow

Today we'll be building out a restaurant simulator with the following requirements:
- The app should present us with a menu
- Users should press a key to select an option from the menu
  - When selected an item will start being processed
- Users should be able to select more items while others are being processed
- When an item is done processing, it should be served to us (via `console.log` 🤷‍♂️)
- press 'p' to save a receipt