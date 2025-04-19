const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let deck = [];
let cards_dealt = [];
let dealtCount = 0;

let isShuffling = false;
let isDealing = false;

//Unshuffled deck reation
function makeDeck() {
    deck = [];
    for (let suit of suits) {
      for (let value of values) {
        deck.push(`${value}${suit}`); // ''10H', 'QS''
      }
    }
  }