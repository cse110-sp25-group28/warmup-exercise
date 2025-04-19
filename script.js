const cardContainer = document.getElementById('card-container');
const cards = Array.from(cardContainer.children);
const shuffleButton = document.getElementById('shuffle-button');
const stackButton = document.getElementById('stack-button');



function getCards() {
  return Array.from(cardContainer.children);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function spread(){
  const cards = getCards();
  const shuffledCards = [...cards];
  shuffleArray(shuffledCards);

  shuffledCards.forEach((card, index) => {
    // Calculate new position for the card (example: spread out in a circle)
    const angle = (index / cards.length) * 2 * Math.PI;
    const radius = 150;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    // Apply the transform (transition will handle the animation)
    card.style.transform = `translate(${x}px, ${y}px)`;
  });
}

  
function shuffle() {
  const cards = getCards();

  const shuffledCards = [...cards];
  shuffleArray(shuffledCards);
  shuffledCards.forEach(card => cardContainer.appendChild(card));
  shuffledCards.forEach(card => card.style.left = 0);
  shuffledCards.forEach(card => card.style.top = 0);
  checkCardFlipAndUnflip();
  
}

function checkCardFlipAndUnflip() {
    const cards = document.querySelectorAll('.card');
  
    cards.forEach(card => {
      if (card.classList.contains('flip')) {
        card.classList.remove('flip'); // Unflip the card
        console.log('Unflipping card:', card);
      }
    });
  }
  
function animateShuffle() {


const cards = document.querySelectorAll('.card');
  shuffle();

  setTimeout(() => {
    spread();
  }, 100);

  setTimeout(() => {
    spread();
  }, 500);

  setTimeout(() => {
    spread();
  }, 900);

  setTimeout(() => {
    recombine();
  }, 1300);

}



function recombine(){
    const cards = getCards();
    //const cards = document.querySelectorAll('.card');
    
    const x = 0;
    const y = 0;
    cards.forEach(card => {
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
}


shuffleButton.addEventListener('click', animateShuffle);
stackButton.addEventListener('click', recombine);

function flipCard(card) {
  card.classList.toggle('flip');
}
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => flipCard(card));
});


function makeCardsDraggable() {
    const cards = document.querySelectorAll('.card');
  
    cards.forEach(card => {
      let isDragging = false;
      let offsetX, offsetY;
  
      // When mouse is pressed on the card
      card.addEventListener('mousedown', (e) => {
        isDragging = true;
        // Calculate the mouse offset within the card
        offsetX = e.clientX - card.offsetLeft;
        offsetY = e.clientY - card.offsetTop;
        
        // Bring the card to the top visually (optional)
        card.style.zIndex = 1000;
  
        // Change cursor style
        card.style.cursor = "grabbing";
      });
  
      // When mouse moves
      document.addEventListener('mousemove', (e) => {
        if (isDragging) {
          // Get the position of the mouse on the page
          const mouseX = e.clientX + window.scrollX;
          const mouseY = e.clientY + window.scrollY;
  
          // Calculate the new position for the card
          const x = mouseX - offsetX;
          const y = mouseY - offsetY;
  
          // Update the position using left/top
          card.style.left = `${x}px`;
          card.style.top = `${y}px`;
        }
      });
  
      // When mouse is released
      document.addEventListener('mouseup', () => {
        isDragging = false;
        // Reset the cursor and z-index
        card.style.cursor = "grab";
        card.style.zIndex = ""; // Reset to normal stacking
      });
    });
  }
  
  // Make the cards draggable when the page loads
  makeCardsDraggable();
  
  

// shuffledCards.forEach(card => cardContainer.appendChild(card));
