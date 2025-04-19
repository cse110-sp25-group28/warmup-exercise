// Base components for the cards, we will dynamically create cards
const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// This is how you connect the deck HTML element to the javascript, give the element the id=deck
const deck = document.getElementById("deck");
const shuffleButton = document.getElementById("shuffleDeck");
const flipAllButton = document.getElementById("flipAll");
const resetButton = document.getElementById("resetDeck");

// function for creating the deck
function createDeck() {
  deck.innerHTML = "";
  const cards = [];
  
  for (const suit of suits) {
    for (const value of values) {
      const card = document.createElement("playing-card");
      card.setAttribute("value", value);
      card.setAttribute("suit", suit);
      cards.push(card);
    }
  }
  
  // Add cards to the deck in a stacked layout
  cards.forEach((card, index) => {
    card.style.position = 'absolute';
    card.style.left = '50%';
    card.style.top = '50%';
    card.style.transform = `translate(-50%, -50%) translateY(${-index * 2}px)`;
    card.style.zIndex = index;
    deck.appendChild(card);
  });
}

function flipAllCards() {
  const cards = Array.from(deck.children);
  cards.forEach(card => {
    const cardElement = card.shadowRoot.querySelector('.card');
    const isFlipped = cardElement.classList.contains('flipped');
    if (!isFlipped) {
      cardElement.classList.add('flipped');
    } else {
      cardElement.classList.remove('flipped');
    }
  });
}

function resetDeck() {
  // Remove all cards and recreate the deck
  deck.innerHTML = "";
  createDeck();
  
  // Ensure all cards are face down
  const cards = Array.from(deck.children);
  cards.forEach(card => {
    const cardElement = card.shadowRoot.querySelector('.card');
    cardElement.classList.remove('flipped');
  });
}

async function shuffleDeck() {
  const cards = Array.from(deck.children);
  
  // Animate cards spreading out
  cards.forEach((card, index) => {
    const angle = (index / cards.length) * 360;
    const radius = 200;
    const x = Math.cos(angle * Math.PI / 180) * radius;
    const y = Math.sin(angle * Math.PI / 180) * radius;
    
    card.style.transition = 'all 0.5s ease-out';
    card.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`;
  });

  // Wait for spread animation to complete
  await new Promise(resolve => setTimeout(resolve, 500));

  // Shuffle the cards array
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  // Animate cards back to stack
  cards.forEach((card, index) => {
    card.style.transition = 'all 0.5s ease-in';
    card.style.transform = `translate(-50%, -50%) translateY(${-index * 2}px)`;
    card.style.zIndex = index;
  });
}

window.addEventListener('DOMContentLoaded', () => {
  createDeck();
  shuffleButton.addEventListener('click', shuffleDeck);
  flipAllButton.addEventListener('click', flipAllCards);
  resetButton.addEventListener('click', resetDeck);
});


