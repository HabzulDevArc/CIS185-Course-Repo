let currentPlayer = null;

// function to create a player object to format into json format
function createPlayer(name, pawn) {
    return {
    key: Date.now(),
    name: name,
    pawn: pawn,
    clicks: 0,
    escaped: false
    };
}

// saves player object in local storage
function savePlayer(player) {
    let scoreboard = getScoreboard();
    scoreboard.push(player);
    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
}

// return array of all the data stored in local storage
function getScoreboard() {
    let data = localStorage.getItem('scoreboard');
    return data ? JSON.parse(data) : [];
}

// updates scoreboard
function updatePlayer(key, updates) {
    let scoreboard = getScoreboard();
    let playerIndex = scoreboard.findIndex(p => p.key === key);

    if (playerIndex !== -1) {
        scoreboard[playerIndex] = {...scoreboard[playerIndex], ...updates};
        localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
    }
}

// ensures valid player entry then displays the labyrinth
function startGame() {
    let name = document.querySelector('textarea').value;
    let pawn = document.querySelector('input[name="pawnRadio"]:checked');

    // validates proper player entry to start
    if (!name || name === "Who ~are~ you?" || !pawn) {
        alert('Select a pawn and enter a name');
        return;
    }

    currentPlayer = createPlayer(name, pawn.value);
    savePlayer(currentPlayer);
    console.log('Game started:', currentPlayer)

    // hide character select inputs after picking
    const charSelect1 = document.getElementById('charSelect1');
    charSelect1.style.display = 'none';
    const charSelect2 = document.getElementById('charSelect2');
    charSelect2.style.display = 'none';

    // reveal labyrinth when character is selected
    const canvas = document.getElementById('labyCanvas');
    canvas.style.display = 'unset';
    alert('You find yourself in a dank dungeon. Silence permeates the stale air. Can you escape or will you die in obscurity, forgotten by time?')
}

// updates player click property on each move in the json
function updateClicks(clicks) {
    if (currentPlayer) {
        updatePlayer(currentPlayer.key, {clicks: clicks});
    }
}

// updates player escaped property when they complete the labyrinth
function markEscaped() {
    if (currentPlayer) {
        updatePlayer(currentPlayer.key, {escaped: true});
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // clears textbox on focus for name input
    var textarea = document.querySelector('textarea');
    textarea.addEventListener('focus', function() {
        if (this.value === "Who ~are~ you?") {
            this.value = "";
        }
        this.select();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var pHeroes = document.getElementById('heroes');
    var pFallen = document.getElementById('fallen');
    const scoreboard = getScoreboard();
    
    if (scoreboard.length > 0){
        let heroesText = '';
        let fallenText = '';

        for (var i = 0; i < scoreboard.length; i++){
            var player = scoreboard[i];
            if (player.escaped){
                heroesText += player.name + " escaped in " + player.clicks + " moves as " + player.pawn + "." + "<br>";
            }
            else {
                fallenText += player.name + " fell at the hands of the Minotaur as " + player.pawn + "." + "<br>";
            }
        }

        pHeroes.innerHTML = heroesText;
        pFallen.innerHTML = fallenText;
    }
    else {
        pHeroes.textContent = "It's awfully lonely in here." 
        pFallen.textContent = "Anyone home?"
    }
});