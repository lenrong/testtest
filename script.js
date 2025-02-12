const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');

let playerPosition = 50; // Percentage of screen width (0-100)
let score = 0;
let gameOver = false;
let obstaclePosition = 100;
let obstacleSpeed = 2;
let obstacleInterval;

// Set initial positions
player.style.left = playerPosition + '%';
obstacle.style.left = obstaclePosition + '%';

// Function to start the game
function startGame() {
    gameOver = false;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    obstaclePosition = 100;
    obstacle.style.left = obstaclePosition + '%';
    startButton.style.display = 'none';
    
    // Clear existing interval before starting new one
    if (obstacleInterval) clearInterval(obstacleInterval);
    obstacleInterval = setInterval(moveObstacle, 20);
    
    document.addEventListener('keydown', movePlayer);
}

// Function to move the player
function movePlayer(event) {
    if (gameOver) return;

    if (event.key === "ArrowLeft" && playerPosition > 0) {
        playerPosition -= 5;
    } else if (event.key === "ArrowRight" && playerPosition < 95) {
        playerPosition += 5;
    }

    player.style.left = playerPosition + "%";
}

// Function to move the obstacle
function moveObstacle() {
    if (gameOver) {
        clearInterval(obstacleInterval);
        return;
    }

    obstaclePosition -= obstacleSpeed;
    
    if (obstaclePosition <= -50) {
        obstaclePosition = 100;
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    obstacle.style.left = obstaclePosition + "%";

    // Perbaikan deteksi tabrakan
    const playerRight = playerPosition + 5; // Asumsi lebar player 5%
    const obstacleRight = obstaclePosition + 50; // Asumsi lebar obstacle 50%
    
    if (
        playerPosition < obstacleRight &&
        playerRight > obstaclePosition
    ) {
        gameOver = true;
        alert("Game Over! Final Score: " + score);
        startButton.style.display = 'block';
        document.removeEventListener('keydown', movePlayer);
    }
}

startButton.addEventListener('click', startGame);
