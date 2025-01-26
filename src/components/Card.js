// src/components/Card.js
import React from "react";
import "../styles/Card.css";

function Card({ card, isFlipped, onClick }) {
  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={onClick}>
      {isFlipped ? (
        <img src={card.image} alt="Card" />
      ) : (
        <div className="card-back"></div>
      )}
    </div>
  );
}

export default Card;
