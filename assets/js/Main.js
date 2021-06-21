import React, { useEffect, useState } from "react";
import Cards from './components/Cards'
const styles = {
    container: {
        margin: "auto",
        overflow: "hidden",
        textAlign: "center",
        alignContents: "center",
    },
    headerImageContainer: {
        width: "200px",
        overflow: "hidden",
        margin: "auto",
        marginTop: "25px",
        borderRadius: "50%",
        background: "#fff"
    },
    headerImage: {
        width: "90%",
    },
    para: {
        margin: "15px",
        fontSize: "14px",
        background: "#D61A3C",
        color: "white",
        padding: "10px"
    },
    button: {
        background: "#000",
        color: "#fff",
        width: "200px",
        margin: "10px",
        marginBottom: "20px",
        border: "1px solid #000"
    },
    message: {
        fontSize: "25px",
        fontWeight: "700",
        margin: "10px",
        marginTop: "0px"
    },
    table: {
        padding: "15px",
        background: "#35654d",
        borderRadius: "3px",
    },
    gameContainer: {
        padding: "0px"
    },
    warning: {
        color: "#fff",
        background: "#D61A3C",
        marginTop: "15px",
        padding: "10px",
        fontWeight: "500",
        letterSpacing: "1px",
        borderRadius: "3px",
    },
};

export default function Main() {

const [deck, setDeck] = useState([]);
const [bust, setBust] = useState(false);
const [message, setMessage] = useState(null);
const [playersTally, setPlayersTally] = useState(0);
const [dealersTally, setDealersTally] = useState(0);
const [playersCards, setPlayersCards] = useState([]);
const [dealersCards, setDealersCards] = useState([]);
const [playerActive, setPlayerActive] = useState(true);
  
useEffect(() => {
    const initiateDeck = createDeck();
    setDeck(initiateDeck)
}, []);

function createDeck () {
    const cards = ['ACE',2,3,4,5,6,7,8,9,10,'Jack','Queen','King'];
    const suit = ['♦','♣','♥','♠'];
    let deckOfCards = [];
    for (let i = 0; i < cards.length; i++) {
        for (let j = 0; j < suit.length; j++) {
            deckOfCards.push({number: cards[i], suit: suit[j]});
        }
    }
    //shuffle deck
    const deckOfCardsSuffled = deckOfCards.sort( () => Math.random() - 0.5);
    return deckOfCardsSuffled;
}

function pickCard (cardDeck) { 
    let card = cardDeck[0];
    return card;
}

function calculateCardTally (card, tally) {
    if (card.number === "ACE") {
        tally = tally + 1;
    } else if (card.number === "Jack" || card.number === "Queen" || card.number === "King") {
        tally = tally + 10;
    } else {
        tally = tally + card.number;
    }
    return tally
}

function hit (tally, cards) {
    let card = pickCard(deck);
    let newDeck = deck.slice(1);
    setDeck(newDeck)
    tally = calculateCardTally(card, tally);
    if(tally > 21){
        setPlayerActive(false);
        setBust(true);
        setMessage("You went bust!")
    }
    setPlayersTally(tally);
    setPlayersCards([...cards, card])
}

function stick (dealersTally, playersTally) {
    setPlayerActive(false);
    let i = 0;
    let cardArray = [];
    let cardDeck = deck;
    do {
        let card = pickCard(cardDeck);
        cardDeck = cardDeck.slice(1);
        let tally = dealersTally;
        tally = calculateCardTally(card, tally);
        cardArray.push(card)
        i = i + tally;
    }
    while (i < 21 && i < playersTally);
    setDeck(cardDeck)
    setDealersTally(i);
    setDealersCards(cardArray)
    result(playersTally, i)

}

function result (playersTally, dealersTally) {

    if(playersTally === 21 && dealersTally != 21){
        setMessage('You win the dealer got ' + dealersTally);
    }
    if(playersTally != 21 && dealersTally === 21){
        setMessage('You lose the dealer got ' + dealersTally);
    }
    if(playersTally === 21 && dealersTally === 21){
        setMessage('You tied the dealer got ' + dealersTally);
    }
    if(playersTally < 21 && dealersTally > 21){
        setMessage('You lose the dealer got ' + dealersTally);
    }
    if(playersTally < 21 && dealersTally > 21){
        setMessage('You win the dealer got ' + dealersTally);
    }
    if(playersTally > 21 && dealersTally < 21){
        setMessage('You lose the dealer got ' + dealersTally);
    }
    if(playersTally < 21 && dealersTally > playersTally && dealersTally < 21){
        setMessage('You lose the dealer got ' + dealersTally);
    }
    if(playersTally < 21 && dealersTally < playersTally && playersTally < 21){
        setMessage('You win the dealer got ' + dealersTally);
    }
    if(playersTally > 21 && dealersTally > 21){
        setMessage('You tied the dealer got ' + dealersTally);
    }
    if(playersTally === dealersTally){
        setMessage('You tied the dealer got ' + dealersTally);
    }

}

function restart() {
    setBust(false);
    setMessage(null);
    setPlayersTally(0);
    setDealersTally(0);
    setPlayersCards([]);
    setDealersCards([]);
    setPlayerActive(true);
    const reInitiateDeck = createDeck();
    setDeck(reInitiateDeck)
}

  return (
      <div style={styles.container}>
          <div style={styles.headerImageContainer}>
              <img style={styles.headerImage} src="https://machinegunexperience.com/wp-content/uploads/2015/07/001073w_x.png" alt="vegas" />
          </div>
        <div style={styles.gameContainer}>
        {playerActive === true ? (
            <div>
                <div style={styles.message}>
                    {playersTally === 0 ? (
                        <>{'Press "HIT" to start'}</>
                    ) : (
                        <>
                        {'Your score is '} {playersTally}
                        </>
                    )}
                    
                </div>
                <button 
                    style={styles.button}
                    onClick={() => {hit(playersTally, playersCards)}}
                >
                    HIT
                </button>
                <button 
                    style={styles.button}
                    onClick={() => {stick(dealersTally, playersTally)}}
                >
                    STICK
                </button>
            </div>
        ) : (
            <div>
                <div style={styles.message}>
                    {message}
                </div>
                <button 
                    style={styles.button}
                    onClick={() => {restart()}}
                >
                    RESTART GAME
                </button>
            </div>
            
        )} 
        </div>
        <div style={styles.table}>
            <Cards cards={playersCards}/>
            <Cards cards={dealersCards}/>
        </div>
        <div style={styles.warning}>
            {'WARNING! This game is super illegal! DO NOT PLAY!'}
        </div>
      </div>
  );
}