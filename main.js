const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const container = document.getElementById("deck");

for (const suit of suits) {
  for (const value of values) {
    const card = document.createElement("playing-card");
    card.setAttribute("suit", suit);
    card.setAttribute("value", value);
    container.appendChild(card);
  }
}
