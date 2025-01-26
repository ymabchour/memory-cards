import React, { useState } from "react";
import "../styles/History.css";

function History({ history }) {
  const [filter, setFilter] = useState("all");

  const filteredHistory = history.filter(
    (entry) => filter === "all" || entry.mode === parseInt(filter, 10)
  );

  return (
    <div className="history">
      <h2>📜 Historique</h2>

      <label>Filtrer par mode :</label>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">Tous</option>
        <option value="4">4 Cartes</option>
        <option value="16">16 Cartes</option>
        <option value="32">32 Cartes</option>
      </select>

      {filteredHistory.length === 0 ? (
        <p>Aucune partie jouée.</p>
      ) : (
        <ul>
          {filteredHistory.map((entry, index) => (
            <li key={index}>
              Mode: {entry.mode} - {entry.date} - {entry.moves} mouvements en {entry.time} sec
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
