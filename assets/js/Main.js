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
        width: "150px",
        overflow: "hidden",
        margin: "auto",
        marginTop: "25px",
        border: "1px solid #000",
        borderRadius: "50%",
        background: "#fff"
    },
    headerImage: {
        width: "80%",
        margin: "10px",
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
        margin: "10px"
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

function hit (tally, cards) {
    let card = pickCard(deck);
    let newDeck = deck.slice(1);
    setDeck(newDeck)

    if (card.number === "ACE") {
        tally = tally + 1;
    } else if (card.number === "Jack" || card.number === "Queen" || card.number === "King") {
        tally = tally + 10;
    } else {
        tally = tally + card.number;
    }
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

        if (card.number === "ACE") {
            tally = tally + 1;
        } else if (card.number === "Jack" || card.number === "Queen" || card.number === "King") {
            tally = tally + 10;
        } else {
            tally = tally + card.number;
        }
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
              <img style={styles.headerImage} src="data:image/png;base64,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" alt="doggos" />
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