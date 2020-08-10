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