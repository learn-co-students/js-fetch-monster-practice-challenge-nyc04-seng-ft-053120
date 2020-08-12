document.addEventListener('DOMContentLoaded', (event) => {
    createMonster();
});

let amount = 50

fetch(`http://localhost:3000/monsters/?_limit=${amount}`) 
.then(res => res.json())
.then(monsterArr => monsterArr.forEach((monster) => {
    renderMonster(monster)
}))






let allMonsters = document.querySelector('#monster-container')
let formContainer = document.querySelector('#create-monster')

//Still have not solved load more button
let forwardButton = document.querySelector('#forward')
    forwardButton.addEventListener('click', (evt) => {
         amount += 50
        console.log(amount)
        return allMonsters
    })



let renderMonster = (monsterObj) => {

    // create div container for each monster
    let newDiv = document.createElement('div')

    // Create h2 for name
    let newH2 = document.createElement('h2')
        newH2.innerText = monsterObj.name

    // create h4 for age
    let newH4 = document.createElement('h4')
        newH4.innerText = monsterObj.age

    // create paragraph for description example = Bio: monsterObj.descriptiopn
    let newPar = document.createElement('p')
        newPar.innerText = monsterObj.description

    // append to monster div
        newDiv.append(newH2, newH4, newPar)

    // appened to allMonster container
        
       allMonsters.append(newDiv)
       
    formContainer.innerHTML = ""

    
       
    createMonster();
}

let createMonster = () => {
    //new form to create monster with #monster-form
    let newDiv = document.createElement('div')
    let newH2 = document.createElement('h2')
    let newH4 = document.createElement('h4')

    let newForm = document.createElement('form')
        newForm.id = "monster-form"

    //create input for name with #name id and placeholder = 'name...'
    let nameInput = document.createElement('input')
        nameInput.id = 'name'
        nameInput.placeholder = 'name...' 

    //create input for age with #age id and placeholder = 'age..'
    let ageInput = document.createElement('input')
        ageInput.id = 'age'
        ageInput.placeholder = 'age...'

    //create input for description with #descriptipo id and placeholder = 'description..'
    let desInput = document.createElement('input')
        desInput.id = 'description'
        desInput.placeholder = 'description...'

    let createButton = document.createElement('button')
        createButton.innerText = 'create'

    newForm.append(nameInput, ageInput, desInput, createButton)
    formContainer.append(newForm)

    createButton.addEventListener("click", (evt) => {
        evt.preventDefault()
        console.log('I CLicked button')

       
        fetch('http://localhost:3000/monsters', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nameInput.value,
                age: ageInput.value,
                description: desInput.value,
            })
        })
        .then(res => res.json())
        .then(newMonster => 
            renderMonster(newMonster)

        )
    })
}


// Could not figure out the load next page feature