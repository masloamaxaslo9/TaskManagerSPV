// Open modal for create desk

document.getElementById('btn-open-modal-create-desk').addEventListener('click', openOrCloceModal); // Open modal
document.getElementById('mask-modal-create-desk').addEventListener('click', openOrCloceModal); // Close modal
document.querySelector('#modal-create-desk > .modal-container > .modal-header > .btn-clear').addEventListener('click', openOrCloceModal); // Close modal

function openOrCloceModal() {
    document.getElementById('modal-create-desk').classList.toggle('active');
}

// Require for Create Desk

let objCreateDesk = {};

document.getElementById('btn-create-desk').addEventListener('click', funcCreateDesk);

function funcCreateDesk() {

    objCreateDesk = {
        name: document.getElementById('input-name').value,
        description: document.getElementById('input-description').value
    };

    if (!validator('formCreateDesk')) {
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
            body: JSON.stringify(objCreateDesk)
        };


        request('http://127.0.0.1:8000/api-desks/', option, requestCallbackCreateDesk);

        function requestCallbackCreateDesk(data) {
            if (data.status !== 201) {
                console.log(data.status);
                console.log(data.json());
            } else {
                document.getElementById('modal-create-desk').classList.remove('active');

                data.json()
                    .then((resolve) => {
                        return resolve
                    })
                    .then((result) => {
                        if (document.getElementById('section').parentElement.classList.contains('home-page')) {
                            buildingDesks(result);
                        } else if (document.getElementById('section').parentElement.classList.contains('desk-page')) {
                            notification(data.status, result);
                        } else {
                            console.log('Inner page')
                        }

                    })
            }
        }
    }
}

// Close for Create Desk