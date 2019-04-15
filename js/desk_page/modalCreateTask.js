// Open modal for create task

document.getElementById('btn-open-modal-create-task-def').addEventListener('click', openOrCloseModalTask); // Open modal
document.getElementById('mask-modal-create-task').addEventListener('click', openOrCloseModalTask); // Close modal
document.querySelector('#modal-create-task > .modal-container > .modal-header > .btn-clear').addEventListener('click', openOrCloseModalTask); // Close modal

function openOrCloseModalTask(event) {

    let target = event.target;

    document.getElementById('modal-create-task').classList.toggle('active');
    while (target !== this) {
        if (target.tagName === 'BUTTON') {
            console.log(target);
            console.log(target.getAttribute('data-column-id'));
            setCookie('column_id', target.getAttribute('data-column-id'));
            return;
        }
        target = target.parentNode;
    }
}

// Start form require
document.getElementById('btn-create-task').addEventListener('click', funcCreate);
