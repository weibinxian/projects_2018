function generateHTMLForBoardSquares()
{
  const numberOfSquares = 16;
  let squaresHTML = '';

  // generate HTML for board squares
  for (let i = 0; i < numberOfSquares; i++)
{
    squaresHTML +=
      '<div class="col-3 board-square">\n' +
      '<div class="face-container">\n' +
      '<div class="facedown"></div>\n' +
      '<div class="faceup"></div>\n' +
      '</div>\n' +
      '</div>\n';
}

  // insert squares HTML in DOM
  const boardElement = document.getElementById('gameboard');
  boardElement.innerHTML = squaresHTML;
}
//call the function Generater
generateHTMLForBoardSquares();


class BoardSquare{
//called the constructor
constructor(element, color)
{
  //set the (div)element equal to *This, so the pointer can point to it
    this.element = element;
  //we add an event listen to our .board-square DOM element
  //so that whenever it's clicked, our BoardSquare object is sent a notification.
    this.element.addEventListener("click", this, false);
    this.isFaceUp = false;
    this.isMatched = false;
    this.setColor(color);
}

reset()
{
    this.isFaceUp = false;
    this.isMatched = false;
    this.element.classList.remove('flipped');
  }

matchFound()
{
    this.isFaceUp = true;
    this.isMatched = true;
}

//We add a new method to our BoardSquare class definition named handleEvent().
handleEvent(event)
{
  //Check that the event that we're handling is a click event.
  // If the event is not a click event, we don't handle it.
      switch (event.type)
{
          case "click":

          //Check that both isFaceUp and isMatched are false.
          if (this.isFaceUp || this.isMatched)
          ////If either is true, return and do nothing else.
          {return;}
         //If both are false, set isFaceUp to true and add .flipped to the .board-square DOM element.
          this.isFaceUp = true;
          this.element.classList.add('flipped');
          //Call a function to handle the game logic for flipping a square.
          //If you're wondering, we haven't implemented this yet.
          squareFlipped(this);
}
}
//Create a new function named setColor for some better organization and potential future reusablility
setColor(color)
{

//Access the DOM element of the .faceup <div> for the respective .board-square
const faceUpElement = this.element.getElementsByClassName('faceup')[0];

// remove the previous color if it exists
   faceUpElement.classList.remove(this.color)
//Set the BoardSquare object with the new color class.
this.color = color;
//Add the CSS color class to the .faceup <div> DOM element to set the .board-square element's faceup color.
faceUpElement.classList.add(color);
}
}

const colorPairs = [];
/*generate an array of matching pairs for each of our CSS color classes.
Since concentration requires BoardSquare objects
 with matching faceup colors, we'll need to add two of each color to our array.*/
function generateColorPairs() {
  if (colorPairs.length > 0) {
    return colorPairs;
  } else {
    // generates matching pair for each color
    for (let i = 0; i < 8; i++) {
      colorPairs.push('color-' + i);
      colorPairs.push('color-' + i);
    }

    return colorPairs;
  }
}
//it takes an array as input and returns the same element with it's elements shuffled as output.
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function shuffleColors() {
  const colorPairs = generateColorPairs()
  return shuffle(colorPairs);
}

const boardSquares = [];

function setupGame() {

  generateHTMLForBoardSquares();

  const randomColorPairs = shuffleColors();
  // 1
  //use document.getElementsByClassName to retrieve an array of all the
  //.board-square elements in our DOM. We'll need these in order to create each BoardSquare object.
  const squareElements = document.getElementsByClassName("board-square");

  // 2
  //Using a for-loop, we loop through each .board-square element
  //in our #gameboard to create it's respective BoardSquare objec
  for (let i = 0; i < squareElements.length; i++) {
    const element = squareElements[i];
    const color = randomColorPairs[i];
    // 3
    //Create a new BoardSquare object using the DOM elements and shuffled colors
    //at the specified position i.
    const square = new BoardSquare(element, color)

    // 4
    //Add the new BoardSquare object that was created into the boardSquares array.
    boardSquares.push(square);
  }
}
setupGame();

// 1
//we create a variable to hold a reference to the first faceup square.
//This will help us keep track of whether the square is the first or second square to be flipped.
let firstFaceupSquare = null;

function squareFlipped(square)
{
  // 2
  //Check if the square is the first square to be flipped faceup.
  //If it is, set a reference to it using the firstFaceupSquare variable and return from the function.
  if (firstFaceupSquare === null)
   {
    firstFaceupSquare = square;
    return
  }

  // 3
  //If the square is the second square to be flipped,
  //check if it's faceup color matches the first faceup square's color.
  if (firstFaceupSquare.color === square.color)
  {
    // 4
    //if both faceup colors for each square is the same, a match is made.
    //Set both BoardSquare objects to matched using the matchFound() function
    // and clear the firstFaceupSquare variable so the player can keep playing.
    firstFaceupSquare.matchFound();
    square.matchFound();

    firstFaceupSquare = null;
  }
  else {
    // 5
    //If the faceup colors aren't the same, reset each square to it's default (facedown) state.
    const a = firstFaceupSquare;
    const b = square;

    firstFaceupSquare = null;

    setTimeout(function()
    {
      a.reset();
      b.reset();
    }, 400);
  }
}



//-----------------------------------------------------------------------------

// 1
//Get a reference to the DOM element using the #reset-button id.
const resetButton = document.getElementById("reset-button");

// 2
//Add an event listener that monitors the element for click events.
resetButton.addEventListener('click', () =>
{
  // 3
  //Log reset button clicked to the JavaScript console each time a click event occurs.
  resetGame();
});



function resetGame()
{
  // 1
  //Reset the firstFaceupSquare variable back to null.
  firstFaceupSquare = null;

  // 2
  //Use the reset() method of BoardSquare to set both isFaceUp
  //and isMatched back to false, as well as setting each square back to facedown.
  boardSquares.forEach((square) => {
    square.reset()
  });

  // 3
  //calling the reset() on each BoardSquare object will trigger the .face-container animation transition property.
  //By delaying the shuffling of colors by 500ms, we don't interrupt the flipping animation.
  setTimeout(() => {

    // 4
    //Shuffle and randomize a new order for the color pairs.
    const randomColorPairs = shuffleColors();

    // 5
    //Set each BoardSquare object in our boardSquares array
    //with a new color based on our new shuffled colors
    for (let i = 0; i < boardSquares.length; i++) {
      const newColor = randomColorPairs[i];
      const square = boardSquares[i];

      square.setColor(newColor);
    }
  }, 500);
}
