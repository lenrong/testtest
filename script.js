const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');

let playerPosition = 225; // Posisi awal player dalam piksel (dari kiri)
let score = 0;
let gameOver = false;
let obstaclePosition = 500; // Posisi awal obstacle dalam piksel (dari kiri)
let obstacleSpeed = 2; // Kecepatan obstacle
let obstacleInterval;

// Set initial positions
player.style.left = playerPosition + 'px';
obstacle.style.left = obstaclePosition + 'px';

// Function to start the game
function startGame() {
    gameOver = false;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    obstaclePosition = 500; // Reset obstacle position
    obstacle.style.left = obstaclePosition + 'px';
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
        playerPosition -= 10; // Gerak ke kiri
    } else if (event.key === "ArrowRight" && playerPosition < 450) {
        playerPosition += 10; // Gerak ke kanan
    }

    player.style.left = playerPosition + 'px';
}

// Function to move the obstacle
function moveObstacle() {
    if (gameOver) {
        clearInterval(obstacleInterval);
        return;
    }

    obstaclePosition -= obstacleSpeed; // Gerak obstacle ke kiri

    if (obstaclePosition <= -50) {
        obstaclePosition = 500; // Reset obstacle ke kanan
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    obstacle.style.left = obstaclePosition + 'px';

    // Deteksi tabrakan
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.bottom > obstacleRect.top
    ) {
        gameOver = true;
        alert("Game Over! Final Score: " + score);
        startButton.style.display = 'block';
        document.removeEventListener('keydown', movePlayer);
    }
}

// Attach the start game function to the button
startButton.addEventListener('click', startGame);
