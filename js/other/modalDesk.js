// Open modal for create desk

document.getElementById('btn-open-modal-create-desk').addEventListener('click', openOrCloceModal); // Open modal
document.getElementById('mask-modal-create-desk').addEventListener('click', openOrCloceModal); // Close modal
document.querySelector('#modal-create-desk > .modal-container > .modal-header > .btn-clear').addEventListener('click', openOrCloceModal); // Close modal

function openOrCloceModal() {
    document.getElementById('modal-create-desk').classList.toggle('active');
}

// Start form require
document.getElementById('btn-create-desk').addEventListener('click', funcCreate);
