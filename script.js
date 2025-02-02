document.getElementById("shuffle-btn").addEventListener("click", shuffleAndDeal);

function shuffleAndDeal() {
    // Initial card set-up (5 unique cards, using 5 cards for 4 players)
    const cards = [
        "img/cards/ace.png", 
        "img/cards/joker.png", 
        "img/cards/king.png", 
        "img/cards/queen.png", 
    ];

    // Multiply the cards to make 20 cards
    const deck = [...cards, ...cards, ...cards, ...cards, ...cards];

    // Shuffle the deck
    shuffle(deck);

    // Start the shuffle animation on the background card
    const shuffleBg = document.getElementById("shuffle-bg");
    shuffleBg.style.animation = "shuffleAnimation 1s ease-out";

    // Wait for the animation to finish, then deal the cards
    setTimeout(() => {
        dealCards(deck);
        shuffleBg.style.animation = ""; // Reset animation after shuffle
    }, 1000); // Delay to match the shuffle animation duration
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

function dealCards(deck) {
    // Deal cards to 4 players, 5 cards per player
    for (let i = 1; i <= 4; i++) {
        const playerHand = document.getElementById(`player${i}-hand`);
        for (let j = 0; j < 5; j++) {
            const card = document.createElement("img");
            card.src = deck.pop();
            card.classList.add("card");
            playerHand.appendChild(card);

            // Set card positions relative to each player
            setCardPosition(playerHand, j, card);

            // Show the card with fade-in effect
            setTimeout(() => {
                card.style.opacity = 1;
                card.style.transform = 'scale(1)';  // Transition the scale to normal size
            }, j * 200); // Stagger the fade-in effect
        }
    }
}

function setCardPosition(playerHand, cardIndex, card) {
    const spacing = 20; // Space between cards
    const offsetX = (cardIndex - 2) * spacing; // Spread cards across the hand

    card.style.left = `${offsetX}%`;
    card.style.top = "0";  // Keep them aligned horizontally within the hand
}
