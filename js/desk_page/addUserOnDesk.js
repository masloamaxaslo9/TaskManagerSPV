// Open modal for add user

document.getElementById('btn-open-modal-add-user').addEventListener('click', openOrCloceModalAddUser); // Open modal
document.getElementById('mask-modal-add-user').addEventListener('click', openOrCloceModalAddUser); // Close modal
document.querySelector('#modal-add-user > .modal-container > .modal-header > .btn-clear').addEventListener('click', openOrCloceModalAddUser); // Close modal

function openOrCloceModalAddUser() {
    document.getElementById('modal-add-user').classList.toggle('active');
}

// Start form require
document.getElementById('btn-add-user').addEventListener('click', addUser);

function addUser() {
    event.preventDefault();

    let objCreate = {
        email: document.getElementById('input-email-form-add-user').value,
        permission: document.getElementById('user-permission').value
    };

    if (!validator('modalAddUser')) {
        return false;
    } else {
        let csrftoken = getCookie('csrftoken');
        let option = {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(objCreate)
        };

        console.log(option);

        request(`https://evening-inlet-45238.herokuapp.com/api-desks/${getCookie('desk_id')}/rules/`, option, callBackAddUser);
    }
}

function callBackAddUser(result) {
    result.json()
        .then((resolve) => {
            return resolve
        })
        .then((resolve) => {
            massangeReplyAddUser(resolve, result.status)
        })
}

function massangeReplyAddUser(result, status) {
    console.log(status);
    if (status !== 201) {
        let inputForError = document.getElementById('input-email-form-add-user');
        inputForError.parentElement.classList.add('has-error');
        if (result.email) {
            inputForError.nextElementSibling.innerHTML = result.email;
        } else if (result.detail) {
            inputForError.nextElementSibling.innerHTML = result.detail;
        }
    } else {
        notification(status);
        location.reload();
    }
}
