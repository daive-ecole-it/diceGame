 export const RollDice = ({ diceValues, rollDice, }) => {
  return (
      <div className="dice-display">
        {diceValues.map((value, index) => (
          <div key={index} className="dice" onClick={rollDice}>
            <img src={`/images/dices/dice_${value}.png`} alt={`dice ${value}`} />
          </div>
        ))}
      </div>
  );
}

export default RollDice;
 