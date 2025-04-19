// Base level class for a card

class PlayingCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isFlipped = false;
  }

  /*
  connectedCallback(): Called each time the element is added to the document. 
  The specification recommends that, asfar as possible, developers should implement 
  custom element setup in this callback rather than the constructor.
  */
  connectedCallback() {
    const suit = this.getAttribute("suit");
    const value = this.getAttribute("value");
    const cardName = this.#formatCardName(value, suit);
    
    this.shadowRoot.innerHTML = `
    <style>
      .card {
        width: 100px;
        height: 140px;
        position: relative;
        perspective: 1000px;
        cursor: pointer;
      }
      .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
  
        /* ⇢ show back by default */
        transform: rotateY(0deg);
      }
      .card.flipped .card-inner {
        /* ⇢ when “flipped” is added, rotate to show front */
        transform: rotateY(180deg);
      }
  
      .card-front,
      .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }
      .card-back {
        background-color: #1a1a1a;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .card-front {
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 1.5em;
  
        /* front sits flipped until you rotate its parent .inner */
        transform: rotateY(180deg);
      }
      .suit {
        color: ${suit === '♥' || suit === '♦' ? 'red' : 'black'};
        font-size: 1.2em;
      }
      .value {
        font-weight: bold;
      }
    </style>
    <div class="card">
      <div class="card-inner">
        <div class="card-front">
          <span class="value">${value}</span>
          <span class="suit">${suit}</span>
        </div>
        <div class="card-back">
          <img src="card_back_blue.png"
               alt="Card Back"
               style="width:100%;height:100%;object-fit:cover">
        </div>
      </div>
    </div>
  `;
  

    this.addEventListener('click', () => this.flip());
  }

  flip() {
    this.isFlipped = !this.isFlipped;
    this.shadowRoot.querySelector('.card').classList.toggle('flipped');
  }

  // How we will attach cards to their images
  #formatCardName(value, suit) {
    // You can modify this to match your image naming scheme
    const suits = {
      "♠": "spades",
      "♥": "hearts",
      "♦": "diamonds",
      "♣": "clubs"
    };
    return `${value}_of_${suits[suit]}`.toLowerCase();
  }
}
// How the custom element is put into HTML
//        element tag name----V           V--------the class attached to it to define behavior
customElements.define("playing-card", PlayingCard);