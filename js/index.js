const monsterContainer = document.querySelector("#monster-container")
const createMonster = document.querySelector("#create-monster")
const forwardButton = document.querySelector("#forward")
const backButton = document.querySelector("#back")
let page = 1
// let only50 = []
// console.log(monstersArray);

// FETCH/GET MONSTERS
showMonsters(page)
function showMonsters() {
fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
.then((resp) => resp.json())
.then(monstersArr => monstersArr.forEach(convertToHTML))
}
// END OF FETCH FUNCTION


let convertToHTML = (singleMonster) => {
    const monsterNameH2 = document.createElement("h2")
        monsterNameH2.innerText = singleMonster.name 
    const monsterAgeH3 = document.createElement("h3")
        monsterAgeH3.innerText = "Age: " + singleMonster.age 
    const monsterDescriP = document.createElement("p") 
        monsterDescriP.innerText = "BIO: " + singleMonster.description
    // APPEND ELEMS TO UL
    monsterContainer.append(monsterNameH2, monsterAgeH3, monsterDescriP)
};

// ADD FORM TO CREATE MONSTER DIV
let createMonsterForm = () => {
const newMonsterForm = document.createElement("form")

const nameLabel = document.createElement("label")
    nameLabel.innerText = "Name: "
const nameInput = document.createElement("input")
    nameInput.name = "name"

const ageLabel = document.createElement("label")
    ageLabel.innerText = "Age: "
const ageInput = document.createElement("input")
    ageInput.name = "age"

const descripLabel = document.createElement("label")
    descripLabel.innerText = "Description: "
const descripInput = document.createElement("input")
    descripInput.name = "description"

const formButton = document.createElement("button")
    formButton.innerText = "Create New Monster"

newMonsterForm.append(nameLabel, nameInput, ageLabel, ageInput, descripLabel, descripInput, formButton)
createMonster.append(newMonsterForm)

newMonsterForm.addEventListener("submit", createNewMonster) 

// EVT LISTENER FUNCTION 
function createNewMonster(evt){
    evt.preventDefault()
    let userInput = {
        name: evt.target.name.value,
        age: evt.target.age.value,
        description: evt.target.description.value
    }
    fetch(`http://localhost:3000/monsters`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInput)       
            })
            .then(res => res.json())
            .then((newMonster) => {
                convertToHTML(newMonster)
                newMonsterForm.reset()
            })
        } // END OF FUNCTION FOR EVT LISTENER
}; // END OF FORM

createMonsterForm()

// ADD EVT LISTEMER TO FORWARD AND BACKWARD BUTTONS
forwardButton.addEventListener("click", evt => {
    nextPage("forward")
    showMonsters(page)
});

backButton.addEventListener("click", evt => {
    nextPage()
    showMonsters(page)
});

function nextPage(pageString) {
    if (page >= 0 ){pageString === "forward" ? page += 1 : page -= 1 } 
    else {
        alert("NO MORE PAGES MODAFOCKA")
    }
}
// AND THIS IS THE END MY FRIEND, MY ONLY FRIEND, THE END
