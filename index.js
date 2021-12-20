// opening hidden nav
const navBtn = document.querySelector('.navBtn');

navBtn.addEventListener('click', openNav)

function openNav() {
    const hiddenNav = document.querySelector('.hiddenNav');
    hiddenNav.classList.toggle('open');
}

// prompting user to enter their feedback
const feedback = document.getElementById('feedback');

feedback.addEventListener('click', promptFeedback);
function promptFeedback() {
    prompt('Please enter your feedback');
}

// opening add activity modal
const addActivity = document.querySelector('.add-activity');
addActivity.addEventListener('click', openModal);

function openModal() {
    const modal = document.querySelector('.modalActivity');
    modal.style.display = 'block';
}

// adding activity to the list
let todo = [];
const form = document.querySelector('form');
const submit = document.getElementById('submit');

const low = document.getElementById('low');
const medium = document.getElementById('medium');
const high = document.getElementById('high');



form.addEventListener('submit', (e) => {
    e.preventDefault();
    const act = document.getElementById('act');
    const actVal = act.value.trim();
    const tag = document.getElementById('tag');
    const tagVal = tag.value.trim();
    const priority = document.querySelector('input[name="priorityAct"]:checked');
    const priorityVal = priority.value;

    if(actVal !== '') {
        addList(actVal,tagVal,priorityVal);
        act.value = '';
        tag.value = '';
        act.focus();
    }
    const modalActivity = document.querySelector('.modalActivity');
    modalActivity.style.display = 'none';
})

function makeList(todo) {
    const listWrapper = document.getElementById('listWrapper');
    const node = document.createElement('li');
    const backImg = document.getElementById('backImg');
    const quotes = document.getElementById('quotes');
    const priority = document.querySelectorAll('.priority');
    node.setAttribute('data-key', todo.id);
    node.innerHTML = 
    `
            <div class="priority ${todo.priority}"></div>
            ${todo.text}
            ${todo.tag}
            <button class='close-btn'><ion-icon name="close-circle-outline"></ion-icon></button>
    `;
    listWrapper.appendChild(node);
    // setting the priority
    if(todo.priority === 'low') {
       priority.forEach(el => {
           el.classList.add('low');
       })
    }

    if(listWrapper !== null) {
        backImg.style.display = 'none';
        quotes.style.display = 'none';
    }
}

function addList(text,tag,priority) {    
    const todoData = {
        priority,
        text,
        checked : false,
        tag,
        id : Date.now()
    }
    todo.push(todoData);
    makeList(todoData);
    console.log(todo);
}

// deleting list
const listWrapper = document.getElementById('listWrapper');
listWrapper.addEventListener('click', e => {
    const target = e.target;
    if(target.classList.contains('close-btn')) {
        const itemKey = target.parentElement.dataset.key;
        deleteList(itemKey);
    }
});


