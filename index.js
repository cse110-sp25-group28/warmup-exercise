// Create a full deck of 52 cards
const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
const values = [
  'ace', '2', '3', '4', '5', '6', '7', '8', '9', '10',
  'jack', 'queen', 'king'
];

let deck = [];
let lastDealtCard = null;
let firstCardDealt = false;
let zIndexCounter = 1;

// Initialize the deck with all 52 cards
function initializeDeck() {
  deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push(`images/PNG-cards-1.3/${value}_of_${suit}.png`);
    }
  }
  lastDealtCard = null;
  firstCardDealt = false;
  
  // Hide the right card completely at startup
  hideRightCard();
  
  // Make sure the left card (deck) is visible
  showLeftCard();
  
  // Update button text to show remaining cards
  updateDealButtonText();
}

// Fisher-Yates shuffle algorithm
function shuffleDeck() {
  // Reinitialize the deck with all 52 cards
  initializeDeck();
  
  // Shuffle the deck
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  // Hide the right card since we're starting fresh
  hideRightCard();
  
  // Reset the first card dealt flag
  firstCardDealt = false;
  
  // Disable the flip button until a card is dealt
  flipBtn.disabled = true;
  
  // Update button text after shuffle
  updateDealButtonText();
}

// Get the next card from the deck (and remove it)
function getNextCard() {
  if (deck.length === 0) {
    return null; // Deck is empty
  }
  
  // Remove and return the top card (like popping from a stack)
  const card = deck.shift();
  lastDealtCard = card;
  firstCardDealt = true;
  
  // Update button text after dealing a card
  updateDealButtonText();
  
  // Check if the deck is now empty and update the left card visibility
  updateLeftCardVisibility();
  
  return card;
}

// Show or hide the left card (deck) based on remaining cards
function updateLeftCardVisibility() {
  if (deck.length <= 0) {
    // Hide the left card if the deck is empty
    hideLeftCard();
  } else {
    // Make sure the left card is visible if there are cards remaining
    showLeftCard();
  }
}

// Hide the left card (deck)
function hideLeftCard() {
  const leftCard = document.querySelector('.card-container:first-child .card');
  
  if (leftCard) {
    leftCard.style.visibility = 'hidden';
    leftCard.style.opacity = '0';
  }
}

// Show the left card (deck)
function showLeftCard() {
  const leftCard = document.querySelector('.card-container:first-child .card');
  
  if (leftCard) {
    leftCard.style.visibility = 'visible';
    leftCard.style.opacity = '1';
  }
}

// Hide the right card completely
function hideRightCard() {
  const cardFlip = document.getElementById('flip-card');
  
  // Hide the card visually
  if (cardFlip) {
    cardFlip.style.visibility = 'hidden';
    cardFlip.style.opacity = '0';
  }
  
  // Make sure the flip card is in its initial state (not flipped)
  flipCard.classList.remove('flip');
}

// Show the right card
function showRightCard() {
  const cardFlip = document.getElementById('flip-card');
  
  // Show the card
  if (cardFlip) {
    cardFlip.style.visibility = 'visible';
    cardFlip.style.opacity = '1';
  }
}

// Prepare the flip card with a specific card image (but don't flip it yet)
function prepareFlipCard(cardImage) {
  // Show the right card if it was hidden
  showRightCard();
  
  // Make sure the front is visible and styled correctly (card back)
  flipFront.style.backgroundImage = 'url(\'https://opengameart.org/sites/default/files/card%20back%20red.png\')';
  flipFront.style.backgroundColor = '#f3f3f3';
  flipFront.style.border = '2px solid black';
  
  // Set the back to show the card (will be revealed when flipped)
  flipBack.style.backgroundImage = `url('${cardImage}')`;
  flipBack.style.backgroundColor = '#f3f3f3';
  flipBack.style.border = '2px solid red';
  flipBack.innerHTML = '';
  
  // Ensure the card is face down (not flipped)
  flipCard.classList.remove('flip');
}

// Update the deal button text to show remaining cards
function updateDealButtonText() {
  const remainingCards = deck.length;
  dealBtn.textContent = remainingCards > 0 ? `Deal (${remainingCards})` : 'No Cards Left';
  dealBtn.disabled = remainingCards <= 0;
}

// Get DOM elements
const card = document.querySelector('.card');
const flipCard = document.getElementById('flip-card');
const cardInner = flipCard.querySelector('.card-inner');
const flipFront = cardInner.querySelector('.card.front');
const flipBack = cardInner.querySelector('.card.back');

const dealBtn = document.getElementById('deal');
const shuffleBtn = document.getElementById('shuffle');
const flipBtn = document.getElementById('flip');

// Function to perform the shuffle animation
function performShuffleAnimation() {
  // Remove any existing animation classes
  card.classList.remove('deal-animation');
  card.classList.remove('shuffle-animation');
  
  // Force reflow
  void card.offsetWidth;
  
  // Add the shuffle animation class
  card.classList.add('shuffle-animation');
  
  // Add a one-time event listener to remove the animation class when it's done
  card.addEventListener('animationend', function handleShuffleAnimationEnd(e) {
    // Only handle the shuffle animation
    if (e.animationName.includes('shuffle')) {
      card.removeEventListener('animationend', handleShuffleAnimationEnd);
      card.classList.remove('shuffle-animation');
    }
  });
}

// Function to perform the deal animation
function performDealAnimation(nextCard) {
  // Update the card that will be animated
  card.querySelector('.back').style.backgroundImage = `url('${nextCard}')`;
  
  // Remove any existing animation classes
  card.classList.remove('shuffle-animation');
  card.classList.remove('deal-animation');
  card.style.zIndex = zIndexCounter++;
  // Force reflow
  void card.offsetWidth;
  
  // Add the deal animation class
  card.classList.add('deal-animation');
  
  // Add a one-time event listener to remove the animation class when it's done
  card.addEventListener('animationend', function handleDealAnimationEnd(e) {
    // Only handle the deal animation
    if (e.animationName.includes('deal')) {
      card.removeEventListener('animationend', handleDealAnimationEnd);
      card.classList.remove('deal-animation');
      
      // Update the flip card with the last dealt card, but keep it face down
      if (lastDealtCard) {
        prepareFlipCard(lastDealtCard);
      }
      
      // Enable the flip button now that a card has been dealt
      flipBtn.disabled = false;
    }
  });
}

// Deal animation - slides the card to the side and uses the next card from the deck
dealBtn.addEventListener('click', () => {
  const nextCard = getNextCard();
  
  if (nextCard) {
    performDealAnimation(nextCard);
  }
});

// Shuffle animation and reset the deck
shuffleBtn.addEventListener('click', () => {
  performShuffleAnimation();
  
  // Shuffle the deck
  shuffleDeck();
});

// Flip animation to show/hide the card
flipBtn.addEventListener('click', () => {
  // Only allow flipping if a card has been dealt
  if (firstCardDealt) {
    flipCard.classList.toggle('flip');
  }
});

// Initialize the deck when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Initialize and shuffle the deck
  initializeDeck();
  shuffleDeck();
});