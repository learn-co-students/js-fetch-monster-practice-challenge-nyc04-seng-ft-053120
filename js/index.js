const monsterContainerDiv = document.querySelector('div#monster-container');
const createMonsterDiv = document.querySelector('div#create-monster');
const forwardBtn = document.querySelector('button#forward');
const backBtn = document.querySelector('button#back');
let currentPage = 1
backBtn.disabled = true

createForm();
const monsterForm = createMonsterDiv.querySelector('form');

getMonsters(currentPage);

function getMonsters(page) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(monsterArrayObjs => monsterArrayObjs.forEach(monsterObj => {
        displayMonster(monsterObj)
    }))
};

function displayMonster(monsterObj) {
    let monsterDiv = document.createElement('div')

    let monsterName = document.createElement('h2')
        monsterName.innerText = monsterObj.name

    let monsterAge = document.createElement('small')
        monsterAge.innerText = `Age: ${monsterObj.age}`

    let monsterDesc = document.createElement('p')
        monsterDesc.innerText = monsterObj.description

    monsterDiv.append(monsterName, monsterAge, monsterDesc)
    monsterContainerDiv.append(monsterDiv)

};

function createForm() {
    let form = document.createElement('form')

    let nameInput = createInput("name")
    let ageInput = createInput("age")
    let descriptionInput = createInput("description")

    let createButton = document.createElement('button')
        createButton.innerText = 'Create Monster'

    form.append(nameInput, ageInput, descriptionInput, createButton)
    createMonsterDiv.append(form)
    
};

function createInput(paramName) {
    let input = document.createElement('input')
        input.name = paramName
        input.placeholder = paramName

    return input
};

monsterForm.addEventListener('submit', function(e) {
    e.preventDefault()
    let newMonsterInputObj = {
        name: this.name.value,
        age: this.age.value,
        description: this.description.value
    }

    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newMonsterInputObj)
    })
    .then(response => response.json())
    .then(newMonsterObj => {
        displayMonster(newMonsterObj)
        this.reset()
    })

});

forwardBtn.addEventListener('click', e => {
    currentPage += 1
    monsterContainerDiv.innerText = ""
    getMonsters(currentPage)
    backBtn.disabled = false
});

backBtn.addEventListener('click', e => {
    if (currentPage !== 1) {
        currentPage -= 1
        monsterContainerDiv.innerText = ""
        getMonsters(currentPage);
        if (currentPage === 1) {
            backBtn.disabled = true
        }
    }
});