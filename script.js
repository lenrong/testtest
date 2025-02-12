const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('startButton');
const nicknameInput = document.getElementById('nicknameInput');
const gameElement = document.getElementById('game');
const rankingList = document.getElementById('rankingList');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;
let nickname = '';
let questions = []; // Pertanyaan akan diisi nanti

// Data ranking (disimpan di localStorage)
let ranking = JSON.parse(localStorage.getItem('ranking')) || [];

// Fungsi untuk menampilkan ranking
function displayRanking() {
    rankingList.innerHTML = ranking
        .slice(0, 10) // Ambil top 10
        .map((entry, index) => `<li>${index + 1}. ${entry.nickname} - ${entry.score}</li>`)
        .join('');
}

// Fungsi untuk memulai game
function startGame() {
    nickname = document.getElementById('nickname').value.trim();
    if (!nickname) {
        alert("Masukkan nickname terlebih dahulu!");
        return;
    }

    nicknameInput.style.display = 'none';
    gameElement.style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = `Skor: ${score}`;
    loadQuestion();
}

// Fungsi untuk memuat pertanyaan
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('div');
        button.classList.add('option');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(button);
    });
    startTimer();
}

// Fungsi untuk memulai timer
function startTimer() {
    timeLeft = 10;
    timerElement.textContent = `Waktu: ${timeLeft}`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Waktu: ${timeLeft}`;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

// Fungsi untuk memeriksa jawaban
function checkAnswer(selectedAnswer) {
    clearInterval(timerInterval);
    const question = questions[currentQuestionIndex];
    if (selectedAnswer === question.correctAnswer) {
        const points = 100 - (10 - timeLeft) * 5;
        score += points;
        alert(`Benar! Anda mendapatkan ${points} poin.`);
    } else {
        alert(`Salah! Jawaban yang benar adalah ${question.correctAnswer}.`);
    }
    scoreElement.textContent = `Skor: ${score}`;
    nextQuestion();
}

// Fungsi untuk menangani waktu habis
function handleTimeout() {
    alert("Waktu habis! Tidak ada poin yang didapat.");
    nextQuestion();
}

// Fungsi untuk memuat pertanyaan berikutnya
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < 10) { // 10 pertanyaan per game
        loadQuestion();
    } else {
        endGame();
    }
}

// Fungsi untuk mengakhiri game
function endGame() {
    // Tambahkan skor ke ranking
    ranking.push({ nickname, score });
    ranking.sort((a, b) => b.score - a.score); // Urutkan dari skor tertinggi
    localStorage.setItem('ranking', JSON.stringify(ranking)); // Simpan ke localStorage
    displayRanking(); // Perbarui tampilan ranking

    alert(`Permainan selesai! Skor akhir Anda: ${score}`);
    nicknameInput.style.display = 'flex';
    gameElement.style.display = 'none';
}

// Event listener untuk tombol mulai
startButton.addEventListener('click', startGame);

// Tampilkan ranking saat pertama kali load
displayRanking();
