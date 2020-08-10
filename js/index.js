const backButton = document.querySelector("#back");
const forwardButton = document.querySelector("#forward");
const createMonsterContainer = document.querySelector("#create-monster")
const monsterContainer = document.querySelector("#monster-container");

let allMonstersArr = [],
  firstIndexOnPage = 0;

forwardButton.addEventListener("click", (evt) => {
  displayFiftyOnClick(evt);
});

backButton.addEventListener("click", (evt) => {
  displayFiftyOnClick(evt);
});

// Function that fetchs all monsters from server, add them to allMonstersArr, and displays the first 50 on the page
function getAllMonsters() {
  fetch("http://localhost:3000/monsters")
    .then((response) => response.json())
    .then((allMonsters) => {
      allMonsters.forEach((monster) => allMonstersArr.unshift(monster));

      displayMonsters(firstIndexOnPage);
    });
}

// Function to take in the first index of allMonstersArr, and display 50 monsters starting at that index
function displayMonsters() {
  const fiftyMonsters = allMonstersArr.slice(firstIndexOnPage, firstIndexOnPage + 50);

  monsterContainer.innerHTML = "";

  fiftyMonsters.forEach((monster) =>
    monsterContainer.append(createMonsterUl(monster))
  );
}

// Function that takes in a monster object and return a Ul element created from the monster's attributes
function createMonsterUl(monster) {
  const monsterUl = document.createElement("ul"),
    ageLi = document.createElement("li"),
    descriptionLi = document.createElement("li");

  monsterUl.innerText = monster.name;
  ageLi.innerText = monster.age;
  descriptionLi.innerText = monster.description;

  monsterUl.append(ageLi, descriptionLi);
  return monsterUl;
}

// Will display the next 50 or last 50 monsters
const displayFiftyOnClick = (evt) => {
  if (evt.target.id === "back") {
    firstIndexOnPage -= 50;
  } else {
    firstIndexOnPage += 50;
  }
  displayMonsters();
};

function renderMonsterForm() {
  const monsterForm = document.createElement("form"),
  monsterNameInput = document.createElement("input");
  monsterNameInput.type = "text";
  monsterNameInput.placeholder = "name...";
  monsterNameInput.id = "monster-name";

  const monsterAgeInput = document.createElement("input");
  monsterAgeInput.type = "number";
  monsterAgeInput.placeholder = "age...";
  monsterAgeInput.id = "monster-age";

  const monsterDescriptionInput = document.createElement("input");
  monsterDescriptionInput.type = "text";
  monsterDescriptionInput.placeholder = "description...";
  monsterDescriptionInput.id = "monster-description";

  const monsterSubmitInput = document.createElement("input")
  monsterSubmitInput.setAttribute("type","submit")

  monsterForm.append(monsterNameInput,monsterAgeInput,monsterDescriptionInput,monsterSubmitInput);

  createMonsterContainer.append(monsterForm)

  monsterForm.addEventListener("submit",(evt) => {
    createANewMonster(evt);
  })
}


const createANewMonster = (evt) => {
  evt.preventDefault();
  const monsterNameValue = evt.target["monster-name"].value
  const monsterAgeValue = evt.target["monster-age"].value
  const monsterDescriptionValue = evt.target["monster-description"].value

  const newMonsterObject = {
    name: monsterNameValue,
    age: monsterAgeValue,
    description: monsterDescriptionValue
  };

  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(newMonsterObject)
  })
    .then(response => response.json())
    .then(newMonsterObj => {
      monsterContainer.prepend(createMonsterUl(newMonsterObj));
      allMonstersArr.unshift(newMonsterObj);
    })
}

getAllMonsters();
renderMonsterForm();