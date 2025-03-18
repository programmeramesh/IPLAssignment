let localTeam = JSON.parse(localStorage.getItem("teamArray")) || [];
let localPlayers = JSON.parse(localStorage.getItem("playerArray"));

document.getElementById("addTeamForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const teamName = document.getElementById("teamName").value;
    let teamCode = document.getElementById("teamCode").value.toUpperCase();
    
    // If team code is not provided, generate it from team name
    if (!teamCode) {
        teamCode = "";
        const words = teamName.split(" ");
        for (let word of words) {
            if (word.length > 0) {
                teamCode += word[0].toUpperCase();
            }
        }
    }

    const addData = {
        id: localTeam.length,
        teamFullName: teamName,
        sName: teamCode,
        teamIcon: document.getElementById("teamIcon").value,
        WonCount: document.getElementById("wonCount").value,
        topBatsman: document.getElementById("topBatsman").value,
        topBowler: document.getElementById("topBowler").value
    };

    localTeam.push(addData);
    localStorage.setItem("teamArray", JSON.stringify(localTeam));

    // Redirect to teams page with the new team code
    window.location.href = `teams.html?name=${addData.sName}`;
});
