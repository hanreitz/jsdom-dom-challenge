const counter = document.getElementById('counter');

const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const heart = document.getElementById('heart');
const submit = document.getElementById('submit');
const buttons = [minus, plus, heart, submit];

const pauseButton = document.getElementById('pause');

const likesList = document.querySelector('body > ul');
const likeCounter = {};

const commentForm = document.getElementById('comment-form');
const commentDiv = document.getElementById('list');
const commentList = document.createElement('ul');
commentList.id = 'comment-ul';
commentDiv.append(commentList);
const commentArea = document.getElementById('comment-input');

document.addEventListener("DOMContentLoaded", () => {
  let intervalID = window.setInterval(incrementCounter, 1000);

  minus.addEventListener('click', decrementCounter);
  plus.addEventListener('click', incrementCounter);
  heart.addEventListener('click', liker);
  pauseButton.addEventListener('click', pause);

  document.addEventListener('submit', (event) => {
    event.preventDefault();

    const li = document.createElement('li');
    li.innerText = commentArea.value;
    commentList.append(li);
    commentArea.value = '';
  })

  function pause () {
    if (pauseButton.innerText === 'pause') {
      window.clearInterval(intervalID);
      buttons.forEach(button => button.disabled = true);
      pauseButton.innerText = 'resume';
    } else if (pauseButton.innerText === 'resume') {
      intervalID = window.setInterval(incrementCounter, 1000);
      buttons.forEach(button => button.disabled = false);
      pauseButton.innerText = 'pause';
    }
  };
});

function incrementCounter() {
  return counter.innerText = `${parseInt(counter.innerText) + 1}`;
};

function decrementCounter() {
  return counter.innerText = `${parseInt(counter.innerText) - 1}`;
};

function liker() {
  const currentTime = counter.innerText;
  if (likeCounter[`${currentTime}`]){
    likeCounter[`${currentTime}`] += 1;
    const liUpdate = document.getElementById(`${currentTime}`);
    liUpdate.innerText = `${currentTime} has ${likeCounter[`${currentTime}`]} likes`
  } else {
    likeCounter[`${currentTime}`] = 1;
    const li = document.createElement('li');
    li.id = `${currentTime}`;
    li.innerText = `${currentTime} has ${likeCounter[`${currentTime}`]} like`;
    likesList.append(li);
  };
};