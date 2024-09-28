import React, { useState, useEffect } from 'react';

function SimpleGame() {
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setScore((prevScore) => prevScore + 1);
      }, 1000);
    } else if (!isRunning && score !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, score]);

  return (
    <div>
      <h1>Score: {score}</h1>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setScore(0)}>Reset</button>
    </div>
  );
}

export default SimpleGame;