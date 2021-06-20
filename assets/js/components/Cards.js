import React, { useEffect, useState } from "react";

const styles = {
    card: {
        width: "50px",
        height: "75px",
        borderRadius: "5px",
        border: "1px solid #000",
        overflow: "hidden",
        display: "inline-block",
        margin: "10px",
        backgroundColor: "white",
    },
    cardTop: {
        textAlign: "left",
        fontSize: "12px",
        height: "25px",
        paddingBottom: "5px",
        paddingLeft: "7px"
    },
    cardMiddle: {
        textAlign: "center",
        fontSize: "12px",
        height: "25px",
        paddingTop: "5px"
    },
    cardBottom: {
        textAlign: "right",
        fontSize: "12px",
        height: "25px",
        paddingTop: "5px",
        paddingRight: "7px"
    }
};

const Cards = ({ cards }) => {
    return (
        <div style={styles.container}>
            {cards.map(function(card, i){
                return (
                    <div key={i} style={styles.card}>
                        <div style={styles.cardTop}>
                            {card.suit}
                        </div>
                        <div style={styles.cardMiddle}>
                            {card.number}
                        </div>
                        <div style={styles.cardBottom}>
                            {card.suit}
                        </div>
                    </div>
                );
            })}
            {cards.length ? null : (
                <div style={styles.card}>
                    <div style={styles.cardTop}>
                        ?
                    </div>
                    <div style={styles.cardMiddle}>
                        ?
                    </div>
                    <div style={styles.cardBottom}>
                        ?
                    </div>
                </div>
            )}
        </div>
    )
}
export default Cards;