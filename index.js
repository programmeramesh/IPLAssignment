// --------------------- SLIDER FUNCTIONALITY STARTS HERE --------------------- //

let slider_list = document.querySelector(".slider .slider-list");
let slider_item = document.querySelectorAll(
  ".slider .slider-list .slider-item"
);
let dots = document.querySelectorAll(".slider .dots li");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let active1 = 0;
let lengthItems = slider_item.length - 1;

next.onclick = function () {
  if (active1 + 1 > lengthItems) {
    active1 = 0;
  } else {
    active1 = active1 + 1;
  }
  reloadSlider();
};

prev.onclick = function () {
  if (active1 - 1 < 0) {
    active1 = lengthItems;
  } else {
    active1 = active1 - 1;
  }
  reloadSlider();
};

let refreshSlider = setInterval(() => {
  next.click();
}, 3000);

function reloadSlider() {
  let checkLeft = slider_item[active1].offsetLeft;
  slider_list.style.left = -checkLeft + "px";

  let lastActiveDot = document.querySelector(".slider .dots li.active1");

  lastActiveDot.classList.remove("active1");
  dots[active1].classList.add("active1");
  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => {
    next.click();
  }, 3000);
}

dots.forEach((li, key) => {
  li.addEventListener("click", function () {
    active1 = key;
    reloadSlider();
  });
});

// --------------------- SLIDER FUNCTIONALITY ENDS HERE --------------------- //

// ---------------------  --------------------- //

let detailofTeam = [];
let detailOfPlayer = [];
var teamGrid = document.getElementById("container_teams");

if (localStorage.getItem("teamArray") === null)
  localStorage.setItem("teamArray", JSON.stringify(teamData));

if (localStorage.getItem("playerArray") === null)
  localStorage.setItem("playerArray", JSON.stringify(playerData));

detailofTeam = JSON.parse(localStorage.getItem("teamArray"));
detailOfPlayer = JSON.parse(localStorage.getItem("playerArray"));

// ---------------------  --------------------- //

// --------------------- SEARCH FUNCTIONALITY STARTS HERE --------------------- //

var suggestArray = [];
for (var i = 0; i < detailofTeam.length; i++) {
  suggestArray.push(detailofTeam[i].sName);
}
let searchBar = document.querySelector(".search-input");
let inputBox = searchBar.querySelector("input");
let suggBox = searchBar.querySelector(".autocom-box");
let icon = searchBar.querySelector(".icon");

inputBox.onkeyup = (e) => {
  if (e.keyCode == 13) {
    icon.click();
  }
  let userData = e.target.value;
  let emptyArray = [];
  if (userData) {
    emptyArray = suggestArray.filter((data) => {
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      return (data = `<li>${data}</li>`);
    });
    searchBar.classList.add("active");
    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      allList[i].setAttribute("onclick", "currentLi(this)");
    }
  } else {
    searchBar.classList.remove("active");
  }
};
function currentLi(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
  icon.onclick = () => {
    window.open(`./teams.html?name=${element.textContent}`, "_self");
  };
  searchBar.classList.remove("active");
}
function showSuggestions(list) {
  let listData;
  if (!list.length) {
    userValue = inputBox.value;
    listData = `<li>${userValue}</li>`;
  } else {
    listData = list.join("");
  }
  suggBox.innerHTML = listData;
}

// --------------------- SEARCH FUNCTIONALITY ENDS HERE --------------------- //

// --------------------- CARD RENDERING STARTS HERE --------------------- //

var teamMainBox = document.getElementById("container_teams");
for (var i = 0; i < detailofTeam.length; i++) {
  teamMainBox.innerHTML += `

 <div class="team" onclick="makethisinclick('${i}')">
    <div class="team-img">
        <img src="${detailofTeam[i].teamIcon}" alt="${detailofTeam[i].sName}">
        <div class="overlay"></div>
    </div>

    <div class="team-info">
        <p class="team-name">${detailofTeam[i].teamFullName}</p>
        <p class="Count">Won Count : ${detailofTeam[i].WonCount} </p>
    </div>
</div

`;
}

/*
var teamMainBox = document.getElementById('container_teams');
for (var i = 0; i < detailofTeam.length; i++) {
 teamMainBox.innerHTML += `
<div    onclick="makethisinclick('${i}')"    class="minibox">

<img src="${detailofTeam[i].teamIcon}" class="mainimage" alt=""/> 
<div class="dataodcard">

  <p class="text1"> ${detailofTeam[i].teamFullName}   </p>
  <p class="text2"> Won Count : ${detailofTeam[i].WonCount} </p>
 
</div>

</div>

`;
}

function makethisinclick(res) {
 var clickedCard = detailofTeam[res].sName;

 window.open(`./teams.html?name=${clickedCard}`, '_self');
} */

// --------------------- CARD RENDERING ENDS HERE --------------------- //

// --------------------- CARD CLICK -> TEAM DETAILS PAGE --------------------- //

function makethisinclick(res) {
  var clickedCard = detailofTeam[res].sName;

  window.open(`./teams.html?name=${clickedCard}`, "_self");
}

// ------------------------------------------ //

var addteamclicked = () => {
  window.open("./addTeam.html", "_self");
};
var addPlayerClicked = () => {
  window.open("./addPlayer.html", "_self");
};
