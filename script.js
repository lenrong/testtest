const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');

let playerPosition = 50; // Percentage of screen width (0-100)
let score = 0;
let gameOver = false;

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

    let obstaclePosition = parseInt(obstacle.style.left) || 100;
    obstaclePosition -= 2;

    if (obstaclePosition <= -50) {
        obstaclePosition = 100;
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    obstacle.style.left = obstaclePosition + "%";

    if (
        obstaclePosition >= playerPosition && 
        obstaclePosition <= playerPosition + 5
    ) {
        gameOver = true;
        alert("Game Over! Final Score: " + score);
    }
}

document.addEventListener('keydown', movePlayer);

setInterval(moveObstacle, 20);
