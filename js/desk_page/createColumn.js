// Open modal for create column

document.getElementById('btn-open-modal-create-column').addEventListener('click', openOrCloceModalColumn); // Open modal
document.getElementById('mask-modal-create-column').addEventListener('click', openOrCloceModalColumn); // Close modal
document.querySelector('#modal-create-column > .modal-container > .modal-header > .btn-clear').addEventListener('click', openOrCloceModalColumn); // Close modal

function openOrCloceModalColumn() {
    document.getElementById('modal-create-column').classList.toggle('active');
}

// є варіант зробити одну функцію конструктор з createDesk.js