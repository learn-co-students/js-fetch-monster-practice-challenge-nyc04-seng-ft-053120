let monsterArr = []
let monsterContainer = document.querySelector("#monster-container")
let monsterFormContainer = document.querySelector("#create-monster")
let forwardButton = document.querySelector("#forward")
let backButton = document.querySelector("#back")
let page = 1
let limit = 100


let monsterFetch = (page) => {
  fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
  .then(res => res.json())
  .then((monsterObjArr) => {
    monsterArr = monsterObjArr
    renderMonster()
  })  
}

let createMonsterHTML = (monster) => {
  let monsterDiv = document.createElement("div")

  let monsterNameH2 = document.createElement("h2")
  monsterNameH2.innerText = `Name: ${monster.name}`

  let monsterAgeH4 = document.createElement("h4")
  monsterAgeH4.innerText = `Age: ${monster.age}`

  let monsterDesP = document.createElement("p")
  monsterDesP.innerText = `Description: ${monster.description}`

  monsterDiv.append(monsterNameH2, monsterAgeH4, monsterDesP)
  
  monsterContainer.append(monsterDiv)
}

let renderMonster = () => {
  monsterArr.forEach((monster) => {
   createMonsterHTML(monster) 
  })
}

monsterFetch()



let monsterFormHTML = () => {
  let monsterForm = document.createElement("form")

  let monsterNameLabel = document.createElement("label")
  monsterNameLabel.innerText = "Name: "
  let monsterNameInput = document.createElement("input")
  monsterNameInput.name = "name"

  let monsterAgeLabel = document.createElement("label")
  monsterAgeLabel.innerText = "Age: "
  let monsterAgeInput = document.createElement("input")
  monsterAgeInput.name = "age"

  let monsterDesLabel = document.createElement("label")
  monsterDesLabel.innerText = "Description: "
  let monsterDesInput = document.createElement("input")
  monsterDesInput.name = "description"

  let monsterSubmit = document.createElement("button")
  monsterSubmit.innerText = "Create Monster Button"

  monsterForm.append(monsterNameLabel, monsterNameInput, monsterAgeLabel, monsterAgeInput, monsterDesLabel, monsterDesInput, monsterSubmit)

  monsterFormContainer.append(monsterForm)

  monsterForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: evt.target.name.value,
        age: evt.target.age.value,
        description: evt.target.description.value
      })
    })
    .then(res => res.json())
    .then((newMonster) => {
      createMonsterHTML(newMonster)
      evt.target.reset()
    })
  })
}

monsterFormHTML()

forwardButton.addEventListener("click", (evt) => {
  if (monsterArr.length < limit) {
    window.alert("No more monsters")
  }
  else {
    page += 1
    monsterContainer.innerHTML = ""
    monsterFetch(page)
  }
})

backButton.addEventListener("click", (evt) => {
  if (page === 1) {
    window.alert("This is the first page of monsters")
  }
  else {
    page -= 1
    monsterContainer.innerHTML = ""
    monsterFetch(page)
  }
})