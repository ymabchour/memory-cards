import React, { useState, useEffect } from "react";
import Card from "./Card";
import "../styles/GameBoard.css";

function GameBoard({ gameMode, saveResult, reset }) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  // Générer les cartes quand le mode ou reset change
  useEffect(() => {
    const newCards = Array.from({ length: gameMode / 2 }, (_, i) => ({
      id: i,
      image: `https://robohash.org/${i}?set=set5&size=120x120`,
    })).flatMap((card) => [card, { ...card, id: card.id + gameMode }]);

    setCards(shuffleArray(newCards));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setStartTime(Date.now());
  }, [gameMode, reset]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      saveResult({
        date: new Date().toLocaleString(),
        moves: moves, 
        time: timeTaken,
      });
    }
  }, [matchedCards]);

  // Mélanger les cartes
  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  // Gérer le clic sur une carte
  function handleCardClick(index) {
    if (flippedCards.length === 2 || matchedCards.includes(cards[index].id)) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);
    setMoves((prev) => prev + 1);

    if (newFlippedCards.length === 2) {
      checkMatch(newFlippedCards);
    }
  }

  // Vérifier si deux cartes correspondent
  function checkMatch(selectedCards) {
    const [first, second] = selectedCards;
    if (cards[first].image === cards[second].image) {
      setMatchedCards([...matchedCards, cards[first].id, cards[second].id]);
    }

    setTimeout(() => setFlippedCards([]), 1000);
  }

  return (
    <div className={`game-board game-${gameMode}`}>
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          isFlipped={flippedCards.includes(index) || matchedCards.includes(card.id)}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
}

export default GameBoard;
