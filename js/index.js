//Stable Elements
const forwardButt = document.querySelector("#forward");
const backwardButt = document.querySelector("#back");
const monsterContainerDiv = document.querySelector("#monster-container");
const newMonsterForm = document.querySelector("#create-monster");
let num = 1;

showMonster(num);

function showMonster() {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num}`)
    .then((response) => response.json())
    .then((monsters) => monsters.forEach(monsterToHtml));
}

function monsterToHtml(monster) {
  let newMonsterDiv = document.createElement("div");

  let monsterName = document.createElement("h2");
  monsterName.innerText = monster.name;

  let monsterAge = document.createElement("span");
  monsterAge.innerText = `Age: ${monster.age}`;

  let monsterDesc = document.createElement("p");
  monsterDesc.innerText = `BIO: ${monster.description}`;

  newMonsterDiv.append(monsterName, monsterAge, monsterDesc);
  monsterContainerDiv.append(newMonsterDiv);
}

function createNewMonster() {
  const newMonsterForm = document.createElement("form");
  const nameLabel = document.createElement("label");
  nameLabel.innerText = "Name: ";
  const nameInput = document.createElement("input");
  nameInput.name = "name";
  const ageLabel = document.createElement("label");
  ageLabel.innerText = "Age: ";
  const ageInput = document.createElement("input");
  ageInput.name = "age";
  const descripLabel = document.createElement("label");
  descripLabel.innerText = "Description: ";
  const descripInput = document.createElement("input");
  descripInput.name = "description";
  const formButton = document.createElement("button");
  formButton.innerText = "Create New Monster";
}

forwardButt.addEventListener("click", (event) => {
  monsterPage("forward");
  showMonster(num);
});

backwardButt.addEventListener("click", (event) => {
  monsterPage();
  showMonster(num);
});

//no decrementing past 1
//dont go past 25 pages
//forward button, called
function monsterPage(string) {
  console.log(num);
  if (num >= 0) {
    if (string === "forward") {
      num += 1;
    } else {
      num -= 1;
    }
  } else {
    alert("STAAAHPPPP");
    //backwardButt.disabled
  }
}
