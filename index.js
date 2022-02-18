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

submit.addEventListener('click', (e) => {
    e.preventDefault();
    const act = document.getElementById('act');
    const actVal = act.value.trim();
    const tag = document.getElementById('tag');
    const tagVal = tag.value.trim();
    const priority = document.querySelector('input[name="priorityAct"]:checked');
    const priorityVal = priority.value;
    const error = document.querySelector('.error');
    const modalActivity = document.querySelector('.modalActivity');

    if(actVal !== '') {
        console.log(actVal);
        addList(actVal,tagVal,priorityVal);
        act.value = '';
        tag.value = '';
        act.focus();
        modalActivity.style.display = 'none';
    } else {
        act.focus();
        error.style.display = 'block';
        modalActivity.style.display = 'block';
    }
})

function makeList(todo) {
    const listWrapper = document.getElementById('listWrapper');
    const node = document.createElement('li');
    const backImg = document.getElementById('backImg');
    const quotes = document.getElementById('quotes');
    const priority = document.querySelectorAll('.priority');
    const isDone = todo.checked ? 'checked' : '';
    const item = document.querySelector(`[data-key='${todo.id}']`);
    node.setAttribute('data-key', todo.id);
    node.setAttribute('class', `${isDone}`);

    if(todo.deleted) {
        item.remove();
        return
    } 
    node.innerHTML = 
    `
    <div class='tag'>${todo.tag}</div>
    <div class="listItemWrap">
            <div class="priority ${todo.priority}"></div>
            <p class='activity'>${todo.text}</p>
            <button class='mark'><ion-icon name="checkmark-circle-outline"></ion-icon></button>
            <button class='close-btn'><ion-icon name="close-circle-outline"></ion-icon></button>
    </div>
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
    if(item) {
        listWrapper.replaceChild(node, item);
    } else {
        listWrapper.appendChild(node);
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

// cancel button 
const cancel = document.getElementById('cancel');
cancel.addEventListener('click', (e) => {
    e.preventDefault();
    const modalActivity = document.querySelector('.modalActivity');
    modalActivity.style.display = 'none';
    console.log(`cancel`);
})




// deleting list
const listWrapper = document.getElementById('listWrapper');

listWrapper.addEventListener('click', (e) => {
    if(e.target.classList.contains('close-btn')) {
       const itemKey = e.target.parentElement.parentElement.dataset.key;
       deleteList(itemKey);
    }
    // marking as done
    if(e.target.classList.contains('mark')) {
        const itemKey = e.target.parentElement.parentElement.dataset.key;
        toggleDone(itemKey);
    }

})

function toggleDone(item) {
    const index = todo.findIndex(el => el.id === Number(item));
    todo[index].checked = !todo[index].checked;
    makeList(todo[index]);
}

function deleteList(item) {
    const index = todo.findIndex(el => el.id === Number(item));
    
    const todoNew = {
        deleted : true,
        ...todo[index]
    }
    todo = todo.filter(el => el.id !== Number(item));
    makeList(todoNew);
}

// toggling reminder
const toggleRem = document.querySelector('.toggleRem');
toggleRem.addEventListener('click', () => {
    toggleRem.classList.toggle('on');
    if(toggleRem.classList.contains('on')) {
        toggleRem.innerHTML = 'ON'
    } else {
        toggleRem.innerHTML = 'OFF'
    }
});

// resetting all priorities
const reset = document.querySelector('.reset');
reset.addEventListener('click', () => {
    const priority = document.querySelectorAll('.priority');
    priority.forEach(el => {
        el.style.backgroundColor = '#5383FF';
    })
});

// deleting all activities
const clearList = document.getElementById('clearList');
clearList.addEventListener('click',deleteAll)

function deleteAll() {
    const listWrapper = document.getElementById('listWrapper');
    const backImg = document.getElementById('backImg');
    const quotes = document.getElementById('quotes');

    todo = [];
    listWrapper.innerHTML = '';
    backImg.style.display = 'block';
    quotes.style.display = 'block';
}

// show completed only
const showCompleted = document.querySelector('.showCompleted');
showCompleted.addEventListener('click',filterComplete)

function filterComplete() {
    showCompleted.classList.toggle('on');
    const listWrapper = document.getElementById('listWrapper');
    const list = listWrapper.querySelectorAll('li');
    if(showCompleted.classList.contains('on')) {

    list.forEach(el => {
        if(!el.classList.contains('checked')) {
            el.style.display = 'none';
        } else {
            el.style.display = 'block';
        }
    })
    } else {
        list.forEach(el => {
            el.style.display = 'block';
        })
    }
}
