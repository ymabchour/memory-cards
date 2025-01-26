import React, { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import Settings from "./components/Settings";
import History from "./components/History";
import "./App.css";

function App() {
  const [gameMode, setGameMode] = useState(4);
  const [background, setBackground] = useState("#f39c12");
  const [history, setHistory] = useState([]);
  const [reset, setReset] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("memoryHistory")) || [];
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    let timer;

    if (!reset) {
      setElapsedTime(0); 
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer); 
  }, [reset]);

  const saveResult = (result) => {
    const resultWithMode = {
      ...result,
      mode: gameMode,
    };

    const newHistory = [...history, resultWithMode];
    setHistory(newHistory);
    localStorage.setItem("memoryHistory", JSON.stringify(newHistory));
  };

  const resetGame = () => {
    setReset(true);
    setTimeout(() => setReset(false), 100);
  };

  return (
    <div className="app-container" style={{ background }}>
      <header className="top-bar">
        <h1>Memory Card</h1>
        <p>Créé par Youssef Mabchour</p>

      </header>

      <div className="main-layout">
        <div className="game-container">
          <GameBoard
            gameMode={gameMode}
            saveResult={saveResult}
            reset={reset}
          />
        </div>

        <div className="sidebar">
          <div className="settings-container">
            <Settings setGameMode={setGameMode} setBackground={setBackground} resetGame={resetGame} />
          </div>
          <div className="history-container">
            <History history={history} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
