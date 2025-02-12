
const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');

let playerPosition = 50; // Percentage of screen width (0-100)
let score = 0;
let gameOver = false;
let obstaclePosition = 100; // Initial position of the obstacle outside the screen

// Set initial position for obstacle
obstacle.style.left = obstaclePosition + '%';

function movePlayer(event) {
    if (gameOver) return;

    if (event.key === "ArrowLeft" && playerPosition > 0) {
        playerPosition -= 5;
    } else if (event.key === "ArrowRight" && playerPosition < 95) {
        playerPosition += 5;
    }

    player.style.left = playerPosition + "%";
}

function moveObstacle() {
    if (gameOver) return;

    obstaclePosition -= 2; // Move the obstacle to the left

    if (obstaclePosition <= -50) {
        obstaclePosition = 100; // Reset the obstacle to the right
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    obstacle.style.left = obstaclePosition + "%";

    // Check for collision only when the obstacle is in range of the player
    if (
        obstaclePosition >= playerPosition && 
        obstaclePosition <= playerPosition + 5
    ) {
        gameOver = true;
        alert("Game Over! Final Score: " + score);
    }
}

// Initialize player and obstacle movements
document.addEventListener('keydown', movePlayer);
setInterval(moveObstacle, 20);
