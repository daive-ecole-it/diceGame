import React from 'react';

const RollDice = ({ diceValues, rollDice }) => {
  const gridClasses = diceValues.length > 4 ? 'grid-cols-4' : `grid-cols-${diceValues.length}`;
  const diceSize = diceValues.length > 4 ? 'w-12 h-12' : 'w-16 h-16';

  return (
    <div className={`grid gap-4 ${gridClasses} justify-center`}>
      {diceValues.map((value, index) => (
        <div
          key={index}
          className={`dice p-4 border rounded flex items-center justify-center bg-gray-200 ${diceSize}`}
          onClick={rollDice}
        >
          <img src={`/images/dices/dice_${value}.png`} alt={`dice ${value}`} className="w-full h-full" />
        </div>
      ))}
    </div>
  );
}

export default RollDice;
