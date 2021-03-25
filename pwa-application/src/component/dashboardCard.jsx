import React, { useCallback } from 'react';

const DashboardCard = ({
  header = 'Header',
  value = 20,
  index = 0,
  cardValue,
  cardKey,
  changeCardValue,
}) => {
  const colorArray = ['#d6acf7', '#ff6598', '#a4aab5', '#e5da82', '#28e1ae'];
  const colorValue = (val) => colorArray[index % colorArray.length];
  const toggleCardState = useCallback(() => {
    if (cardValue && cardValue.includes(cardKey)) {
      changeCardValue([...cardValue.filter((val) => val !== cardKey)]);
    } else {
      changeCardValue([...cardValue, cardKey]);
    }
  }, [cardKey, cardValue, changeCardValue]);

  return (
    <div className="system-process-card">
      <div className="system-process-header">{header}</div>
      <div className="system-process-graph">
        <svg height="200" width="200">
          <g id="UrTavla">
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke={colorValue(index)}
              strokeWidth="20"
              fill="#fff0"
            ></circle>
            <text
              textAnchor="middle"
              x="50%"
              y="58%"
              stroke="#1a2435"
              strokeWidth="0.1rem"
              fontSize="3rem"
            >
              {value}
            </text>
          </g>
        </svg>
      </div>
      <div className="card-footer-container">
        <div
          className={`card-footer-button ${
            cardValue && cardValue.includes(cardKey)
              ? 'color-red'
              : 'color-green'
          }`}
          onClick={toggleCardState}
        >
          {cardValue && cardValue.includes(cardKey) ? 'Remove' : 'Add'}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
