
const TotalScore = ({ score, clickNumber, totalAverageScore }) => {
  return (
    <>
      <h1>Your Average Score: {totalAverageScore}</h1>
      <h1>Total Clicks: {clickNumber}</h1>
      <h2>Current Score: {score}</h2>
    </>
  );
};

export default TotalScore;
 