let urlData = location.href;
let newUrl = new URL(urlData);
let teamFull = newUrl.searchParams.get("name");

// console.log(teamFull);

// --------------------- GETTING DATA FROM LOCAL STORAGE --------------------- //

teamsDetails = JSON.parse(localStorage.getItem("teamArray"));
playersDetails = JSON.parse(localStorage.getItem("playerArray"));
var teamMainBox = document.getElementById("container_teams");
var teamDetailsTable = document.getElementById("team-details");

var cnt = 0;

// Find team details
let teamDetails = teamsDetails.find(team => team.sName === teamFull);
if (!teamDetails) {
    window.location.href = 'index.html';
}

// Update team banner
document.getElementById('team-logo').src = teamDetails.teamIcon;
document.getElementById('team-name').textContent = teamDetails.teamFullName;
document.getElementById('team-wins').textContent = teamDetails.WonCount;

// Get players for this team
let teamPlayers = playersDetails.filter(player => player.from === teamFull);
document.getElementById('player-count').textContent = teamPlayers.length;

// Render players
const playerContainer = document.getElementById('player-container');
teamPlayers.forEach(player => {
    const playerCard = document.createElement('div');
    playerCard.className = 'player-box';
    playerCard.innerHTML = `
        <div class="player-image">
            <img src="${player.playerImg}" alt="${player.playerName}">
        </div>
        <div class="player-info">
            <h3 class="player-name">${player.playerName}</h3>
            <p class="player-role">${player.description}</p>
            <p class="player-price">₹ ${player.price} Cr</p>
        </div>
    `;
    
    // Add click event to view player details
    playerCard.addEventListener('click', () => {
        window.location.href = `playerDetails.html?name=${player.playerName}`;
    });
    
    playerContainer.appendChild(playerCard);
});

// Interactive card effects
document.addEventListener('mousemove', function(e) {
    document.querySelectorAll('.player-box').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

// search for top batsman

var topBatsman = "";
for (var j = 0; j < playersDetails.length; j++) {
  if (
    playersDetails[j].description == "Batsman" &&
    playersDetails[j].from == teamFull
  ) {
    topBatsman = playersDetails[j].playerName;

    break;
  } else {
    topBatsman = "No Player";
  }
}

// search for top bowler

var topBowler = "";
for (var j = 0; j < playersDetails.length; j++) {
  if (
    playersDetails[j].description == "Bowler" &&
    playersDetails[j].from == teamFull
  ) {
    topBowler = playersDetails[j].playerName;

    break;
  } else {
    topBowler = "No Player";
  }
}

// team table

console.log(cnt);
teamsDetails.map((item) => {
  if (teamFull === item.sName) {
    return (teamDetailsTable.innerHTML += `
  <div class="team-details-left">
    <div class="details-1">
        <div class="team-heading">
            <h1>${item.teamFullName}</h1>
            <img src="line1.png" alt="">
        </div>

        <div class="team-logo">
            <center>
            <img src=${item.teamIcon} alt="${item.sName}">
            </center>
            
        </div>
        
    </div>
</div>

<div class="team-details-right">
  <div class="details-2">
      <p><span>Top Batsman</span> <b>-</b>${topBatsman}</p>
      <p><span>Top Bowler</span> <b>-</b> ${topBowler}</p>
      <p><span>Matches Win</span> <b>-</b> ${item.WonCount}</p>
      <p><span>Player Count</span> <b>-</b> ${cnt}</p>
  </div>
</div>
`);
  }
});
