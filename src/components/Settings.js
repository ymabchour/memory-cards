// src/components/Settings.js
import React from "react";
import "../styles/Settings.css";

function Settings({ setGameMode, setBackground, resetGame }) {
  return (
    <div className="settings">
      <h2>⚙️ Paramètres</h2>

      <label>Mode de jeu :</label>
      <select onChange={(e) => setGameMode(Number(e.target.value))}>
        <option value={4}>4 Cartes</option>
        <option value={16}>16 Cartes</option>
        <option value={32}>32 Cartes</option>
      </select>

      <label>Arrière-plan :</label>
      <input type="color" onChange={(e) => setBackground(e.target.value)} />

      <hr />

      <button className="reset-btn" onClick={resetGame}>
        🔄 Réinitialiser
      </button>
    </div>
  );
}

export default Settings;
