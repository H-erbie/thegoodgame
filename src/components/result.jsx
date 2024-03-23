import React from "react";

const Result = ({ score, onRestart }) => {
  return (
    <div className="result-card">
      <p className="score"> SCORE : {score}</p>
      <button onClick={onRestart} className="proceed">
        Restart
      </button>
    </div>
  );
};

export default Result;
