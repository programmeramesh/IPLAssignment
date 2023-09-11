let urlData = location.href;
let newUrl = new URL(urlData);
let playerUrl = newUrl.searchParams.get("name");
console.log(playerUrl);

// geting data from local storage

teamsDetails = JSON.parse(localStorage.getItem("teamArray"));
playersDetails = JSON.parse(localStorage.getItem("playerArray"));

let playerData = document.getElementById("player-details-con");
for (var i = 0; i < playersDetails.length; i++) {
  if (playersDetails[i].playerName == playerUrl) {
    var playingOrN = "";
    if (playersDetails[i].isPlaying == true) {
      playingOrN = "Playing";
    } else {
      playingOrN = "On Bench";
    }
    playerData.innerHTML += `

  <div class="player-left">
  <div class="player-image">
      <img src="${playersDetails[i].playerImg}" alt="${playersDetails[i].from}">
      <div class="player-name">
          <center><h2>${playersDetails[i].playerName}</h2></center>
      </div>
  </div>

  
  
</div>
<div class="player-right">
  <div class="team-details-right">
      <div class="details-2">
          <p><span><i class="fa-solid fa-angles-right"></i> Team Name</span> <b>-</b> ${playersDetails[i].playerTeam}</p>
          <p><span><i class="fa-solid fa-angles-right"></i> Team Code</span> <b>-</b> ${playersDetails[i].from}</p>
          <p><span><i class="fa-solid fa-angles-right"></i> Worth Price</span> <b>-</b> ${playersDetails[i].price}</p>
          <p><span><i class="fa-solid fa-angles-right"></i> Is Playing</span> <b>-</b> ${playingOrN}</p>
      </div>
  </div>
</div>
    
        `;
  }
}
