const forwardBut = document.getElementById('forward')
const backwardBut = document.getElementById('back')
let num = 1
const submitMon = document.querySelector('form')

document.addEventListener("DOMContentLoaded", function(){
    forwardBut.addEventListener("click", nextPage)
    backwardBut.addEventListener("click", backPage)
    showMonster()
    submitMon.addEventListener("submit", newMonster)
})

let container = document.getElementById("monster-container")

function showMonster(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num}`)
    .then(res => res.json())
    .then(monArray => monArray.forEach(getMon))
}

function getMon(mon){
    let monDiv = document.createElement('div')
    container.appendChild(monDiv)

    let monH2 = document.createElement('h2')
    monDiv.appendChild(monH2)
     monH2.innerText = mon.name
let monH5 = document.createElement('h5')
monDiv.appendChild(monH5)
monH5.innerText = `Age: ${mon.age}`
     let monP = document.createElement('p')
     monDiv.appendChild(monP)
     monP.innerText = mon.description
}


function nextPage(){
    container.innerText = " "
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num+=1}`)
     .then(res => res.json())
     .then(monArray => monArray.forEach(getMon))
}

function backPage(){
    if (num > 1){
    container.innerText = " "
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num-=1}`)
     .then(res => res.json())
     .then(monArray => monArray.forEach(getMon))
    }
}

function newMonster(e){
    e.preventDefault()
    let data = {
        name: e.target.name.value,
        age: e.target.age.value,
        description:  e.target.description.value
    }
fetch('http://localhost:3000/monsters/',{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'content-type': 'application/JSON'
    }
})
.then(res => res.json())

}

// YOOOOOOOO NEW





const monsterDiv = document.querySelector("#monster-container")
const newMonsterForm = document.querySelector("#create-monster")
let currentPage = 1
monList(currentPage)
createNewMonster()
const form = newMonsterForm.querySelector("form")
const forwardBtn = document.querySelector("#forward")
const backBtn = document.querySelector("#back")

function monList(page) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(data =>{
        data.forEach(monObj =>{
            displayMon(monObj)
        })
        console.log(page)
    })
}

function displayMon(obj){

    let newMonDiv = document.createElement("div")
        let monsName = document.createElement("h2")
        monsName.innerText = obj.name
        let monsAge = document.createElement("span")
        monsAge.innerText = `Age: ${obj.age}`
        let monsDesc = document.createElement("p")
        monsDesc.innerText = `BIO: ${obj.description}`

    newMonDiv.append(monsName, monsAge, monsDesc)
    monsterDiv.append(newMonDiv)
}

function createNewMonster(){
    const createMon = document.createElement("form")
    createMon.classList.add("create-mon")
        const nameInput = document.createElement("input")
            nameInput.name = "name"
            nameInput.placeholder = "name"
        const ageInput = document.createElement("input")
            ageInput.name = "age"
            ageInput.placeholder = "age"
        const descInput = document.createElement("input")
            descInput.name = "description"
            descInput.placeholder = "description"
        const submitBtn = document.createElement("button")
            submitBtn.innerText = "Create"
    createMon.append(nameInput, ageInput, descInput,submitBtn)
    newMonsterForm.append(createMon)  

}

form.addEventListener("submit", function(e){
    e.preventDefault()
    let newMonObj = {}
    this.querySelectorAll("input").forEach(input => newMonObj[input.name] = input.value)

    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newMonObj)
    })
    .then(response => response.json())
    .then(newMon => {
        displayMon(newMon)
    })
})


forwardBtn.addEventListener("click", e =>{
    changeThePage("forward")
    monList(currentPage)  
})

backBtn.addEventListener("click", e =>{
    changeThePage("back")
    monList(currentPage)
})


function changeThePage(input){
    if(currentPage >= 1  && currentPage <= 25){
        if (input === "back") {
            currentPage -= 1
        }else {
            currentPage += 1
        }
    }else{

        alert("STOP!!")
    }
}


///// KAREMS FORM


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
    createMonsterForm.addEventListener("submit", (evt) => {
        evt.preventDefault()
        let userInput = {
            name: evt.target.name.value,
            age: evt.target.age.value,
            description: evt.target.name.value,
        }
        fetch(`http://localhost:3000/quotes`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInput)       
                })
                .then(res => res.json())
                .then((newQuote) => {
                    convertToHTML(newQuote)
                    newquoteForm.reset()
                })
    }); // END OF EVENT LISTENER
    }; // END OF FORM