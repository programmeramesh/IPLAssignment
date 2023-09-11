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

for (var i = 0; i < playersDetails.length; i++) {
  if (teamFull == playersDetails[i].from) {
    var isPlay = "";
    if (playersDetails[i].isPlaying == true) {
      isPlay = "Playing";
    } else {
      isPlay = "On Bench";
    }
    var currentP = playersDetails[i].playerName;
    cnt++;
    teamMainBox.innerHTML += `
  <div class="player" onclick="makethisinclick('${currentP}')">
    <div class="player-img">
        <img src="${playersDetails[i].playerImg}" alt="${playersDetails[i].from}">
        <div class="overlay"></div>
    </div>

    <div class="player-info">
      <p class="player-name">${playersDetails[i].playerName}</p>
      <p class="price">Worth : ${playersDetails[i].price} </p>
      <p class="playing">Playing : ${isPlay} </p>
      <p class="desc">${playersDetails[i].description} </p>
    </div>
</div>

`;
  }

  function makethisinclick(res) {
    window.open(`./playerDetails.html?name=${res}`, "_self");
  }
}

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
