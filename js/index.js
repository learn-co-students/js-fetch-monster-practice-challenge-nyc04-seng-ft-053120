const BASE_URL = 'http://localhost:3000/monsters';
let page = 1;

const createMonster = document.querySelector('#create-monster');
const monsterContainer = document.querySelector('#monster-container');
const backButton = document.querySelector('#back');
const forwardButton = document.querySelector('#forward');

const fetchMonsters = () => {
  fetch(`${BASE_URL}/?_limit=50&_page=${page}`)
    .then((response) => response.json())
    .then((monsterArray) => {
      monsterContainer.innerHTML = '';
      monsterArray.forEach((monster) => {
        displayMonster(monster);
      });
    });
};

const displayMonster = (monster) => {
  const monsterDiv = document.createElement('div');
  monsterDiv.id = `monster-${monster.id}-div`;

  const monsterH2 = document.createElement('h2');
  monsterH2.innerText = monster.name;

  const monsterH4 = document.createElement('h4');
  monsterH4.innerText = monster.age;

  const monsterP = document.createElement('p');
  monsterP.innerText = monster.description;

  monsterDiv.append(monsterH2, monsterH4, monsterP);
  monsterContainer.append(monsterDiv);
};

backButton.addEventListener('click', (event) => {
  page -= 1;
  fetchMonsters();
});

forwardButton.addEventListener('click', (event) => {
  page += 1;
  fetchMonsters();
});

const createMonsterForm = () => {
  createMonster.innerHTML = '';

  const form = document.createElement('form');
  form.method = 'post';
  form.action = 'submit';
  const name = document.createElement('input');
  name.id = 'name';
  name.type = 'text';
  name.placeholder = 'Name';
  const age = document.createElement('input');
  age.id = 'age';
  age.type = 'number';
  age.placeholder = 'Age';
  const description = document.createElement('input');
  description.id = 'description';
  description.type = 'text';
  description.placeholder = 'Description';
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.innerText = 'Submit';

  form.append(name, age, description, submitButton);
  createMonster.append(form);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const age = event.target.age.value;
    const description = event.target.description.value;

    const attributePost = {
      name,
      age,
      description,
    };

    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(attributePost),
    })
      .then((response) => response.json())
      .then((monster) => {
        createMonsterForm();
        displayMonster(monster);
      });
  });
};

fetchMonsters();
createMonsterForm();
