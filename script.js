// --- Class ที่ 1: Class แม่สำหรับผู้เล่นทุกคน ---
class Player {
    constructor(name) {
        this.name = name;
        this.wins = 0;
        this.losses = 0;
        this.draws = 0;
    }
    getStats() { return `สถิติ: ชนะ ${this.wins}, แพ้ ${this.losses}, เสมอ ${this.draws}`; }
    recordWin() { this.wins++; }
    recordLoss() { this.losses++; }
    recordDraw() { this.draws++; }
}

// --- Class ที่ 2: Class ผู้เล่น (สืบทอดจาก Player) ---
class HumanPlayer extends Player {
    constructor(name) {
        super(name);
    }
}

// --- Class ที่ 3: Class คอมพิวเตอร์ (สืบทอดจาก Player) ---
class ComputerPlayer extends Player {
    constructor(name = "คอมพิวเตอร์") {
        super(name);
        this.choices = ['rock', 'paper', 'scissors'];
    }
    makeChoice() {
        const randomIndex = Math.floor(Math.random() * this.choices.length);
        return this.choices[randomIndex];
    }
}

// --- Class ที่ 4: Class สำหรับจัดการ Leaderboard ---
class Leaderboard {
    getRankings(players) {
        const sortedPlayers = [...players];
        sortedPlayers.sort((a, b) => b.wins - a.wins);
        return sortedPlayers;
    }
}

// --- Class ที่ 5: Class จัดการเกมและผู้เล่นทั้งหมด ---
class GameManager {
    constructor() {
        this.players = []; 
        this.currentPlayer = null;
        this.computerPlayer = new ComputerPlayer();
        this.leaderboard = new Leaderboard();
    }

    addPlayer(name) {
        if (!name) return { success: false, message: "กรุณาใส่ชื่อผู้เล่น" };
        if (this.findPlayer(name)) return { success: false, message: `มีผู้เล่นชื่อ '${name}' อยู่แล้ว` };
        
        const newPlayer = new HumanPlayer(name);
        this.players.push(newPlayer);
        this.startGame(name);
        return { success: true, message: `เพิ่มผู้เล่น '${name}' สำเร็จ! เริ่มเกมได้เลย`, player: newPlayer };
    }

    findPlayer(name) {
        return this.players.find(p => p.name.toLowerCase() === name.toLowerCase());
    }

    deletePlayer(name) {
        const playerIndex = this.players.findIndex(p => p.name.toLowerCase() === name.toLowerCase());
        if (playerIndex > -1) {
            const deletedPlayerName = this.players[playerIndex].name;
            this.players.splice(playerIndex, 1);
            if (this.currentPlayer && this.currentPlayer.name === deletedPlayerName) {
                this.currentPlayer = null;
            }
            return { success: true, message: `ลบผู้เล่น '${deletedPlayerName}' เรียบร้อย` };
        }
        return { success: false, message: `ไม่พบผู้เล่นชื่อ '${name}'` };
    }
    
    startGame(playerName) {
        const player = this.findPlayer(playerName);
        if (player) {
            this.currentPlayer = player;
            return true;
        }
        return false;
    }

    playRound(humanChoice) {
        if (!this.currentPlayer) return { success: false, message: "ไม่มีผู้เล่นปัจจุบัน" };

        const computerChoice = this.computerPlayer.makeChoice();
        let resultMessage = "";

        if (humanChoice === computerChoice) {
            this.currentPlayer.recordDraw();
            resultMessage = "เสมอ!";
        } else if ((humanChoice === 'rock' && computerChoice === 'scissors') ||
                   (humanChoice === 'paper' && computerChoice === 'rock') ||
                   (humanChoice === 'scissors' && computerChoice === 'paper')) {
            this.currentPlayer.recordWin();
            resultMessage = "คุณชนะ!";
        } else {
            this.currentPlayer.recordLoss();
            resultMessage = "คุณแพ้!";
        }
        
        return {
            success: true, playerChoice: humanChoice, computerChoice: computerChoice,
            message: resultMessage, stats: this.currentPlayer.getStats()
        };
    }
}


// --- DOM Manipulation ---
document.addEventListener('DOMContentLoaded', () => {
    const gameManager = new GameManager();

    // DOM Elements
    const playerNameInput = document.getElementById('playerNameInput');
    const addPlayerBtn = document.getElementById('addPlayerBtn');
    const searchPlayerInput = document.getElementById('searchPlayerInput');
    const searchPlayerBtn = document.getElementById('searchPlayerBtn');
    const deletePlayerBtn = document.getElementById('deletePlayerBtn');
    const playerInfo = document.getElementById('playerInfo');
    const gameSection = document.getElementById('game-section');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const choiceBtns = document.querySelectorAll('.choice-btn');
    const playerChoiceDisplay = document.getElementById('playerChoiceDisplay');
    const computerChoiceDisplay = document.getElementById('computerChoiceDisplay');
    const resultText = document.getElementById('resultText');
    const themeToggle = document.getElementById('checkbox'); // เพิ่มมา

    // Leaderboard Elements
    const leaderboardBtn = document.getElementById('leaderboardBtn');
    const modal = document.getElementById('leaderboardModal');
    const closeBtn = document.querySelector('.close-btn');
    const leaderboardBody = document.getElementById('leaderboardBody');

    const choiceToEmoji = { rock: '✊', paper: '🖐️', scissors: '✌️' };

    function updatePlayerInfo(message, isError = false) {
        playerInfo.textContent = message;
        playerInfo.style.color = isError ? 'var(--danger-color)' : 'var(--info-text-color)';
    }

    function resetGameUI() {
        playerChoiceDisplay.textContent = '-';
        computerChoiceDisplay.textContent = '-';
        resultText.textContent = 'ผลลัพธ์: ตาของคุณ!';
        resultText.className = '';
    }

    addPlayerBtn.addEventListener('click', () => {
        const name = playerNameInput.value.trim();
        const result = gameManager.addPlayer(name);
        if (result.success) {
            updatePlayerInfo(result.message);
            welcomeMessage.textContent = `ยินดีต้อนรับ, ${result.player.name}!`;
            gameSection.classList.remove('hidden');
            playerNameInput.value = '';
            searchPlayerInput.value = name;
            resetGameUI();
        } else {
            updatePlayerInfo(result.message, true);
        }
    });
    
    searchPlayerBtn.addEventListener('click', () => {
        const name = searchPlayerInput.value.trim();
        if(!name) {
             updatePlayerInfo("กรุณาใส่ชื่อเพื่อค้นหา", true);
             return;
        }
        const player = gameManager.findPlayer(name);
        if (player) {
            gameManager.startGame(name);
            updatePlayerInfo(player.getStats());
            welcomeMessage.textContent = `ถึงตาคุณแล้ว, ${player.name}!`;
            gameSection.classList.remove('hidden');
            resetGameUI();
        } else {
            updatePlayerInfo(`ไม่พบผู้เล่นชื่อ '${name}'`, true);
            gameSection.classList.add('hidden');
        }
    });

    deletePlayerBtn.addEventListener('click', () => {
        const name = searchPlayerInput.value.trim();
        const { success, message } = gameManager.deletePlayer(name);
        updatePlayerInfo(message, !success);
        if (success && (!gameManager.currentPlayer || gameManager.currentPlayer.name === name)) {
            gameSection.classList.add('hidden');
            updatePlayerInfo(`ลบผู้เล่น '${name}' แล้ว กรุณาเพิ่มหรือค้นหาผู้เล่นใหม่`);
        }
    });

    choiceBtns.forEach(button => {
        button.addEventListener('click', () => {
            const playerChoice = button.dataset.choice;
            const roundResult = gameManager.playRound(playerChoice);

            if (roundResult.success) {
                playerChoiceDisplay.textContent = choiceToEmoji[roundResult.playerChoice];
                computerChoiceDisplay.textContent = choiceToEmoji[roundResult.computerChoice];
                resultText.textContent = `ผลลัพธ์: ${roundResult.message}`;
                
                resultText.className = '';
                if (roundResult.message === "คุณชนะ!") resultText.classList.add('result-win');
                else if (roundResult.message === "คุณแพ้!") resultText.classList.add('result-lose');
                else resultText.classList.add('result-draw');

                updatePlayerInfo(roundResult.stats);
            } else {
                updatePlayerInfo(roundResult.message, true);
            }
        });
    });

    // Leaderboard Logic
    leaderboardBtn.addEventListener('click', () => {
        const rankedPlayers = gameManager.leaderboard.getRankings(gameManager.players);
        leaderboardBody.innerHTML = ''; 

        if(rankedPlayers.length === 0) {
            leaderboardBody.innerHTML = '<tr><td colspan="5">ยังไม่มีผู้เล่น</td></tr>';
        } else {
            rankedPlayers.forEach((player, index) => {
                const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${player.name}</td>
                        <td>${player.wins}</td>
                        <td>${player.losses}</td>
                        <td>${player.draws}</td>
                    </tr>
                `;
                leaderboardBody.innerHTML += row;
            });
        }
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Dark Mode Toggle Logic (เพิ่มมาใหม่)
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        if(document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme in localStorage (เพิ่มมาใหม่)
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }
});