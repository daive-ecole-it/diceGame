import React from 'react';

const TotalScore = ({ score, clickNumber, totalAverageScore }) => {
  return (
    <div className="text-left">
      <h1 className="text-lg italic">Score actuel de la session: {totalAverageScore}</h1>
      <h1 className="text-sm">Nombre de partie déjà jouer: {clickNumber}</h1>
      <h2 className="text-sm">Score actuel: {score}</h2>
    </div>
  );
};

export default TotalScore;
