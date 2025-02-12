const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');

let playerPosition = 50; // Percentage of screen width (0-100)
let score = 0;
let gameOver = false;
let obstaclePosition = 100; // Initial position of the obstacle outside the screen
let obstacleSpeed = 2; // Kecepatan obstacle
let obstacleInterval;

// Set initial position for obstacle
obstacle.style.left = obstaclePosition + '%';

// Function to start the game
function startGame() {
    gameOver = false;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    obstaclePosition = 100; // Reset obstacle position to outside the screen
    obstacle.style.left = obstaclePosition + '%';

    // Hide the start button after starting the game
    startButton.style.display = 'none';

    // Start moving the obstacle
    obstacleInterval = setInterval(moveObstacle, 20); // Start the interval to move obstacle

    // Listen for player movement
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
        clearInterval(obstacleInterval); // Stop obstacle movement when game is over
        return;
    }

    obstaclePosition -= obstacleSpeed; // Move the obstacle to the left

    if (obstaclePosition <= -50) {
        obstaclePosition = 100; // Reset the obstacle to the right
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    obstacle.style.left = obstaclePosition + "%";

    // Check for collision
    if (obstaclePosition >= playerPosition - 5 && obstaclePosition <= playerPosition + 50) {
        gameOver = true;
        alert("Game Over! Final Score: " + score);
        startButton.style.display = 'block'; // Show the start button again
    }
}

// Attach the start game function to the button
startButton.addEventListener('click', startGame);
