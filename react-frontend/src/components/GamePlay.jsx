import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import RollDice from "./RollDice";
import TotalScore from "./TotalScore";
import { Rules } from "./Rules";
import flaskApi from '../utils/flaskApi';

const GamePlay = ({ config }) => {
    const [rollCount, setRollCount] = useState(0); 
    const [showRules, setShowRules] = useState(false);
    const [numDice, setNumDice] = useState(config.numberOfDices); 
    const [diceValues, setDiceValues] = useState(Array(config.numberOfDices).fill(1)); 
    const [totalScore, setTotalScore] = useState(0);
    const [sumScore, setSumScore] = useState(0);
    const [timer, setTimer] = useState(config.waitTimeBetweenGames); 
    const navigate = useNavigate();

    useEffect(() => {
        setNumDice(config.numberOfDices);
        setDiceValues(Array(config.numberOfDices).fill(1));
    }, [config]);

    useEffect(() => {
        if (rollCount >= config.numberOfGames) {
            handleEndGame();
        }
    }, [rollCount, config.numberOfGames]);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    passtour();
                    return config.waitTimeBetweenGames; 
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [config.waitTimeBetweenGames]);

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
        setTimer(config.waitTimeBetweenGames); 
    };

    const resetScore = () => {
        setTotalScore(0);
        setRollCount(0);
        setSumScore(0);
        setTimer(config.waitTimeBetweenGames); 
    }

    const passtour = () => {
        setTotalScore(0);
    }

    const handleQuit = async () => {
        await endSession();
        navigate('/configuration');
    };

    const handleEndGame = async () => {
        await endSession();
        alert('Jeu terminé!');
        navigate('/configuration');
    };

    const endSession = async () => {
        const sessionId = localStorage.getItem('sessionId');
        const totalAverageScore = rollCount > 0 ? Math.floor(sumScore / rollCount) : 0;
        try {
            await flaskApi.post(`/end-session/${sessionId}`, { score: totalAverageScore });
        } catch (error) {
            console.error('Failed to end session:', error);
        }
    };

    const totalAverageScore = rollCount > 0 ? Math.floor(sumScore / rollCount) : 0;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="w-full flex justify-between items-center mb-4">
                <div className="text-sm italic text-gray-700">
                    <TotalScore score={totalScore} clickNumber={rollCount} totalAverageScore={totalAverageScore} />
                </div>
                <div className="text-lg font-bold text-red-500 animate-pulse">
                    Timer: {timer}s
                </div>
            </div>
            <div className="flex justify-between w-full max-w-md mb-4">
                <button onClick={passtour} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Pass
                </button>
                <button onClick={resetScore} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Reset
                </button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center mb-4">
                <RollDice diceValues={diceValues} rollDice={rollDice} />
            </div>
            <button onClick={handleQuit} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
                Quitter
            </button>
            <div className="mt-4">
                <button onClick={() => setShowRules((prev) => !prev)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    {showRules ? "Hide" : "Show"} Rules
                </button>
            </div>
            {showRules && <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
                <Rules />
            </div>}
        </div>
    )
}

export default GamePlay;
