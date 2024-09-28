// src/Pong.js
import React, { useRef, useEffect } from 'react';

const Pong = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Game Constants
    const WIDTH = 800;
    const HEIGHT = 400;
    const PADDLE_WIDTH = 10;
    const PADDLE_HEIGHT = 100;
    const BALL_RADIUS = 10;

    // Game Variables
    let playerPaddleY = (HEIGHT - PADDLE_HEIGHT) / 2;
    let aiPaddleY = (HEIGHT - PADDLE_HEIGHT) / 2;
    let ballX = WIDTH / 2;
    let ballY = HEIGHT / 2;
    let ballSpeedX = 5;
    let ballSpeedY = 5;

    let playerPaddleSpeed = 0;
    let aiPaddleSpeed = 0;

    // Draw everything
    const draw = () => {
      // Clear canvas
      context.clearRect(0, 0, WIDTH, HEIGHT);

      // Draw player paddle
      context.fillStyle = 'white';
      context.fillRect(0, playerPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);

      // Draw AI paddle
      context.fillRect(WIDTH - PADDLE_WIDTH, aiPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);

      // Draw ball
      context.beginPath();
      context.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
      context.fill();
    };

    // Update game objects
    const update = () => {
      // Move paddles
      playerPaddleY = Math.max(0, Math.min(HEIGHT - PADDLE_HEIGHT, playerPaddleY + playerPaddleSpeed));
      aiPaddleY = Math.max(0, Math.min(HEIGHT - PADDLE_HEIGHT, aiPaddleY + aiPaddleSpeed));

      // Move ball
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Ball collision with top and bottom walls
      if (ballY - BALL_RADIUS < 0 || ballY + BALL_RADIUS > HEIGHT) {
        ballSpeedY = -ballSpeedY;
      }

      // Ball collision with player paddle
      if (
        ballX - BALL_RADIUS < PADDLE_WIDTH &&
        ballY > playerPaddleY &&
        ballY < playerPaddleY + PADDLE_HEIGHT
      ) {
        ballSpeedX = -ballSpeedX;
      }

      // Ball collision with AI paddle
      if (
        ballX + BALL_RADIUS > WIDTH - PADDLE_WIDTH &&
        ballY > aiPaddleY &&
        ballY < aiPaddleY + PADDLE_HEIGHT
      ) {
        ballSpeedX = -ballSpeedX;
      }

      // Ball out of bounds
      if (ballX - BALL_RADIUS < 0 || ballX + BALL_RADIUS > WIDTH) {
        ballX = WIDTH / 2;
        ballY = HEIGHT / 2;
        ballSpeedX = -ballSpeedX;
      }
    };

    // Game loop
    const gameLoop = () => {
      update();
      draw();
      requestAnimationFrame(gameLoop);
    };

    // Event listeners for paddle controls
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'w':
          playerPaddleSpeed = -5;
          break;
        case 's':
          playerPaddleSpeed = 5;
          break;
        case 'ArrowUp':
          aiPaddleSpeed = -5;
          break;
        case 'ArrowDown':
          aiPaddleSpeed = 5;
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case 'w':
        case 's':
          playerPaddleSpeed = 0;
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          aiPaddleSpeed = 0;
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    gameLoop();

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    };
}, []);

return <canvas ref={canvasRef} width={800} height={400} style={{ backgroundColor: 'black' }} />;
};

export default Pong;
