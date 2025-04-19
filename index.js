const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let deck = [];
let currentCard = null;

const dealBtn = document.getElementById('deal');
const shuffleBtn = document.getElementById('shuffle');
const flipBtn = document.getElementById('flip');

const dealtCard = document.querySelectorAll('.card')[0];
const showCard = document.querySelectorAll('.card')[1];

const dealtFront = dealtCard.querySelector('.front');
const dealtBack = dealtCard.querySelector('.back');

const showFront = showCard.querySelector('.front');
const showBack = showCard.querySelector('.back');

//Unshuffled deck reation
function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push(`${value}${suit}`);
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}
//Unshuffled deck reation
function makeDeck() {
    deck = [];
    for (let suit of suits) {
      for (let value of values) {
        deck.push(`${value}${suit}`); // ''10H', 'QS''
      }
    }
  }

// Shuffle Card Animation
document.getElementById("shuffle").addEventListener("click", () => {
  const leftCard = document.querySelectorAll(".card")[0]; // first card on the left

  leftCard.classList.add("shuffle-animation");

  leftCard.addEventListener("animationend", () => {
    leftCard.classList.remove("shuffle-animation");
  }, { once: true });
});

// Deal Card Animation
document.getElementById("deal").addEventListener("click", () => {
  const leftCard = document.querySelectorAll(".card")[0];
  const rightCard = document.querySelectorAll(".card")[1];

  const flyingCard = leftCard.cloneNode(true);
  const rect = leftCard.getBoundingClientRect();

  flyingCard.style.position = "absolute";
  flyingCard.style.top = `${rect.top + window.scrollY}px`;
  flyingCard.style.left = `${rect.left + window.scrollX}px`;
  flyingCard.style.width = `${rect.width}px`;
  flyingCard.style.height = `${rect.height}px`;
  flyingCard.classList.add("deal-animation");

  document.body.appendChild(flyingCard);

  flyingCard.addEventListener("animationend", () => {
    flyingCard.remove();

    rightCard.querySelector(".front").style.backgroundColor = "goldenrod";
    rightCard.querySelector(".front").textContent = "🂡"; 
  });
});