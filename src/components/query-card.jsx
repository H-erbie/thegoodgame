import React, { useEffect } from "react";

const QueryCard = ({
  question,
  chosen,
  onProceed,
  onSelection,

  difficulty,
  options,
}) => {
  const shuffleOptions = () => {
    const shuffledOptions = options.slice();
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [
        shuffledOptions[j],
        shuffledOptions[i],
      ];
    }
  };
  useEffect(() => {
    shuffleOptions();
  }, []);

  return (
    <div className="query-card">
      <p className="query-card-info">Choose to proceed</p>
      <p className="query-difficulty">{difficulty}</p>
      <p className="question">{question}</p>
      <ul>
        {options.map((option, index) => (
          <button
            onClick={() => onSelection(option)}
            key={index}
            className={`query-option ${chosen.option === option && "selected"}`}
          >
            {" "}
            <li>
              {/* Render your option here (e.g., radio button, checkbox, etc.) */}
              {option}
            </li>
          </button>
        ))}
      </ul>
      <button
        disabled={!chosen.isChosen}
        onClick={onProceed}
        className="proceed"
      >
        Proceed
      </button>
    </div>
  );
};

export default QueryCard;
