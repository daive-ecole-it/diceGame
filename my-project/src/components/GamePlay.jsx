import { useState, useEffect } from "react";
import RollDice from "./RollDice";
import TotalScore from "./TotalScore";
import { Rules } from "./Rules";

const GamePlay = ({ config }) => {
    const [rollCount, setRollCount] = useState(0); // État pour le nombre de lancers
    const [showRules, setShowRules] = useState(false);
    const [numDice, setNumDice] = useState(config.numberOfDices); // Utiliser le nombre de dés de la configuration
    const [diceValues, setDiceValues] = useState(Array(config.numberOfDices).fill(1)); // Initialiser les valeurs des dés
    const [totalScore, setTotalScore] = useState(0); // État pour le score total
    const [sumScore, setSumScore] = useState(0);

    useEffect(() => {
        setNumDice(config.numberOfDices);
        setDiceValues(Array(config.numberOfDices).fill(1));
    }, [config]);

    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const rollDice = () => {
        const newValues = Array.from({ length: numDice }, () => generateRandomNumber(1, 7));
        setDiceValues(newValues);
        const newTotalScore = newValues.reduce((acc, curr) => acc + curr, 0);
        setTotalScore(newTotalScore);
        setSumScore(prev => prev + newTotalScore);
        setRollCount(prevRolls => prevRolls + 1);
    };

    const resetScore = () => {
        setTotalScore(0);
        setRollCount(0);
        setSumScore(0);
    }

    const passtour = () => {
        setTotalScore(0);
    }

    const totalAverageScore = rollCount > 0 ? Math.floor(sumScore / rollCount) : 0;

    return (
      <>
            <div className="top_section">
                <TotalScore 
                    score={totalScore}
                    clickNumber={rollCount}
                    totalAverageScoreverage={totalAverageScore}
                />
            </div>
            <RollDice 
                numDice={numDice}
                diceValues={diceValues}
                rollDice={rollDice}
                
            />
            <div className="btns">
                <button onClick={passtour}>Pass</button>
                <button onClick={resetScore}>Reset</button>
                <button onClick={() => setShowRules((prev) => !prev)}>
                    {showRules ? "Hide" : "Show" } Rules
                </button>
            </div>
            {showRules && <Rules />}
        </>
    )
}

export default GamePlay;
