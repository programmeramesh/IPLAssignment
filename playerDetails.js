let urlData = location.href;
let newUrl = new URL(urlData);
let playerUrl = newUrl.searchParams.get("name");
console.log(playerUrl);

// geting data from local storage

teamsDetails = JSON.parse(localStorage.getItem("teamArray"));
playersDetails = JSON.parse(localStorage.getItem("playerArray"));

let playerData = document.getElementById("player-details-con");

// Find player details
let playerDetails = playersDetails.find(player => player.playerName === playerUrl);
if (!playerDetails) {
    window.location.href = 'index.html';
}

// Update player banner
document.getElementById('player-image').src = playerDetails.playerImg;
document.getElementById('player-name').textContent = playerDetails.playerName;
document.getElementById('player-role').textContent = playerDetails.description;
document.getElementById('player-price').textContent = `₹ ${playerDetails.price} Cr`;
document.getElementById('player-team').textContent = playerDetails.from;
document.getElementById('player-status').textContent = playerDetails.isPlaying ? 'Playing' : 'On Bench';

// Update statistics
const stats = playerDetails.statistics || {
    matches: 0,
    runs: 0,
    wickets: 0,
    average: 0
};

document.getElementById('matches-played').textContent = stats.matches.toLocaleString();
document.getElementById('total-runs').textContent = stats.runs.toLocaleString();
document.getElementById('total-wickets').textContent = stats.wickets.toLocaleString();
document.getElementById('batting-avg').textContent = stats.average.toFixed(2);

// Add animation delays to stat cards
document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Add hover effect for stats cards
document.addEventListener('mousemove', function(e) {
    document.querySelectorAll('.stat-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 10;
        const angleY = -(x - centerX) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
    });
});

// Reset card transform on mouse leave
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Edit and Delete Functions
function editPlayer() {
    const playerId = playerDetails.id;
    window.location.href = `editPlayer.html?id=${playerId}`;
}

function deletePlayer() {
    if (confirm('Are you sure you want to delete this player?')) {
        let playerArray = JSON.parse(localStorage.getItem("playerArray"));
        const index = playerArray.findIndex(p => p.id === playerDetails.id);
        
        if (index !== -1) {
            playerArray.splice(index, 1);
            localStorage.setItem("playerArray", JSON.stringify(playerArray));
            window.location.href = 'index.html';
        }
    }
}
