"use strict";

window.addEventListener("load", start);

// ******** CONTROLLER ********

function start() {
  console.log(`Javascript kører`);

  document.addEventListener('keydown', keyPress)
  document.addEventListener('keyup', keyUp)

  // start ticking
  tick();
}

function tick() {
  // setup next tick
  setTimeout(tick, 500);

  for(const part of queue) {
    writeToCell(part.row, part.col, 0)
  }
  
  if(controls.right) {
    direction = 'right'
  } else if(controls.left) {
    direction = 'left'
  } else if(controls.up) {
    direction = 'up'
  } else if(controls.down) {
    direction = 'down'
  }

  const head = {
    row: queue[queue.length - 1].row,
    col: queue[queue.length - 1].col
  }
  
  switch(direction) {
    case 'left':
      head.col--
      if(head.col < 0 ) {
          head.col = 9
      }
      break;
    case 'right':
      head.col++
      if(head.col > 9) {
        head.col = 0
      }
      break;
    case 'up':
      head.row--
      if(head.row < 0) {
        head.row = 9
      }
      break;
    case 'down':
      head.row++
      if(head.row > 9) {
        head.row = 0
      }
      break;
  }

  queue.push(head)
  queue.shift()

  for(const part of queue) {
    writeToCell(part.row, part.col, 1)
  }
  
  // display the model in full
  displayBoard();
}

// ******** MODEL ********
const queue = [
  {
    row: 5,
    col: 5,
  }, 
  {
    row: 5,
    col: 6,
  },
  {
    row: 5,
    col: 7,
  }
]
const model = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let direction = 'left';

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}

// ******** VIEW ********

function keyUp(event) {
  if(event.key === 'w') {
    controls.up = false;
  } else if(event.key === 's') {
    controls.down = false;
  } else if(event.key === 'a') {
    controls.left = false;
  } else if(event.key === 'd'){
    controls.right = false;
  }
}

function keyPress(event) {
  if(event.key === 'w') {
    controls.up = true;
  } else if(event.key === 's') {
    controls.down = true;
  } else if(event.key === 'a') {
    controls.left = true;
  } else if(event.key === 'd'){
    controls.right = true;
  }
}

const controls = {
  left: false,
  right: false,
  up: false,
  down: false
}

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const index = row * 10 + col;

      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}
