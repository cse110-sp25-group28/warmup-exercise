const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let deck = [];
let cards_dealt = [];
let dealtCount = 0;

let isShuffling = false;
let isDealing = false;
const shuffleBtn = document.getElementById('shuffle');
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