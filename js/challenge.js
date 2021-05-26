// grabbing the basic counter element for the incrementing
const counter = document.getElementById('counter');

// getting all of the button elements
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const heart = document.getElementById('heart');
const submit = document.getElementById('submit');

// putting them in an array so I can do things to them
const buttons = [minus, plus, heart, submit];

// keeping the pauseButton out of the array because it is special
const pauseButton = document.getElementById('pause');

// dealing with incrementing likes
const likesList = document.querySelector('body > ul');
const likeCounter = {};

// all of the elements I needed to deal with comments
const commentForm = document.getElementById('comment-form');
const commentDiv = document.getElementById('list');
const commentList = document.createElement('ul');
commentList.id = 'comment-ul';
commentDiv.append(commentList);
const commentArea = document.getElementById('comment-input');

//listening for the DOM to be loaded 
document.addEventListener("DOMContentLoaded", () => {
  // setting the timer by calling incrementCounter every 1000 ms
  let intervalID = window.setInterval(incrementCounter, 1000);

  // all of the button event listeners EXCEPT comment submission
  minus.addEventListener('click', decrementCounter);
  plus.addEventListener('click', incrementCounter);
  heart.addEventListener('click', liker);
  pauseButton.addEventListener('click', pause);

  // listening for comment submission
  document.addEventListener('submit', (event) => {
    // stopping form submission from reloading the page
    event.preventDefault();

    // making a bullet point and setting its value to whatever the user entered
    const li = document.createElement('li');
    li.innerText = commentArea.value;
    // appending the bullet to the comment list
    commentList.append(li);
    // clearing the comment form text area so the user gets a regular experience
    commentArea.value = '';
  })

  // dealing with all the funky stuff the pause button has to do
  // had to be inside the DOM event handler because of block-scoped intervalID variable
  function pause () {
    if (pauseButton.innerText === 'pause') {
      // pausing the timer if the user clicks and the button says 'pause'
      window.clearInterval(intervalID);
      // disabling all of the other buttons
      buttons.forEach(button => button.disabled = true);
      // making the pause button say 'resume'
      pauseButton.innerText = 'resume';
    } else if (pauseButton.innerText === 'resume') {
      // restarting the counter if the user clicks and the button says 'resume'
      intervalID = window.setInterval(incrementCounter, 1000);
      // reenabling all of the buttons
      buttons.forEach(button => button.disabled = false);
      // resetting the button text to 'pause'
      pauseButton.innerText = 'pause';
    }
  };
});

// increases the timer number - can be used with the interval or the plus button
function incrementCounter() {
  return counter.innerText = `${parseInt(counter.innerText) + 1}`;
};

// decreases the timer number - for the minus button
function decrementCounter() {
  return counter.innerText = `${parseInt(counter.innerText) - 1}`;
};

// handles likes
function liker() {
  const currentTime = counter.innerText;
  //checks if the likeCounter object already has a key for the current timer number
  if (likeCounter[`${currentTime}`]){
    // if it does, it increments the value by 1 for the click
    likeCounter[`${currentTime}`] += 1;
    // grabs the relevant list item based on the current time when clicked
    const liUpdate = document.getElementById(`${currentTime}`);
    // updates the list item with the current number of likes
    liUpdate.innerText = `${currentTime} has ${likeCounter[`${currentTime}`]} likes`
  } else {
    // if likeCounter does NOT have a key for the curren timer number, create it and set 
    // number of likes to '1' for the single click
    likeCounter[`${currentTime}`] = 1;
    // create a new list element for the likes
    const li = document.createElement('li');
    // give it a unique id based on the timer number so it can be identified for updating
    li.id = `${currentTime}`;
    // set the list element text to display the new 'like'
    li.innerText = `${currentTime} has ${likeCounter[`${currentTime}`]} like`;
    // add the list element to the list
    likesList.append(li);
  };
};