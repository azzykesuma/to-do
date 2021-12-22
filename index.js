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

    if(todo.deleted) {
        item.remove();
        return
    }
    node.innerHTML = 
    `
            <div class="priority ${todo.priority}"></div>
            ${todo.text}
            <div class="tag">${todo.tag}</div>
            <button class='mark'>Mark as done</button>
            <button class='close-btn'>Delete</button>
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
        console.log(`list wrapper not null`);
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

listWrapper.addEventListener('click', (e) => {
    if(e.target.classList.contains('close-btn')) {
        const key = e.target.parentElement.dataset.key;
        console.log(e.target.parentElement);
        const index = todo.findIndex(el => el.id === Number(key));
        todo[index].deleted = true;
        e.target.parentElement.remove();
    }
    // marking as done
    if(e.target.classList.contains('mark')) {
        const key = e.target.parentElement.dataset.key;
        const index = todo.findIndex(el => el.id === Number(key));
        todo[index].checked = true;
        e.target.parentElement.classList.add('done');
    }

})

function deleteList(item) {
    const index = todo.findIndex(el => el.id === Number(item));
    
    const todoNew = {
        deleted : true,
        ...todo[index]
    }
    todo = todo.filter(el => el.id !== Number(item));
    makeList(todoNew);
}


