// Open modal for create task

document.getElementById('btn-open-modal-create-task').addEventListener('click', openOrCloceModalTask); // Open modal
document.getElementById('mask-modal-create-task').addEventListener('click', openOrCloceModalTask); // Close modal
document.querySelector('#modal-create-task > .modal-container > .modal-header > .btn-clear').addEventListener('click', openOrCloceModalTask); // Close modal

function openOrCloceModalTask() {
    document.getElementById('modal-create-task').classList.toggle('active');
}

// Start form require
document.getElementById('btn-create-task').addEventListener('click', funcCreate);
