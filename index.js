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

// function openModal() {
    
// }