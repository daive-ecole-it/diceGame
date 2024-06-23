import React from 'react';

const TotalScore = ({ score, clickNumber, totalAverageScore }) => {
  return (
    <div className="text-left">
      <h1 className="text-lg italic">Your Average Score: {totalAverageScore}</h1>
      <h1 className="text-sm">Total Clicks: {clickNumber}</h1>
      <h2 className="text-sm">Current Score: {score}</h2>
    </div>
  );
};

export default TotalScore;
