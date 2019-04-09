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
                        buildingDesks(result);
                    })
            }
        }
    }
}

// Close for Create Desk

// Require for Load Desk

function loadDesk() {
    let csrftoken = getCookie('csrftoken');
    let option = {
        method: 'GET',
        headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    };

    request('http://127.0.0.1:8000/api-desks/', option, requestCallbackloadDesk);

    function requestCallbackloadDesk(data) {
        if (data.status !== 200) {
            console.log(data.status);
            console.log(data);
        } else {
            let result = data.json();
            result
                .then((resolve) => {
                    buildingDesks(resolve);
                })
        }
    }
}

loadDesk();

function buildingDesks(desksOrDesk) {
    if (desksOrDesk.length === 0) {
        return false;
    } else {
        document.getElementById('not-found-desks').style.display = 'none'; // Hide text: Desks not found.
        createDeskOrDesks(desksOrDesk);
    }
}

function createDeskOrDesks(desksOrDesk) {
    let tableDefault = document.getElementById('desk-def').cloneNode(true); // Hidden desk for inner desks
    if (desksOrDesk instanceof Array) {
        // Create Desks in window
        desksOrDesk.forEach(function (desk, i) {
            let table = tableDefault.cloneNode(true);
            table.style.display = 'flex';
            table.setAttribute('id', `desk-${i}`);
            table.querySelector('.info > h4').innerHTML = desk.name;
            table.querySelector('.info > p').innerHTML = desk.description;
            document.getElementById('section').insertBefore(table, document.getElementById('section').children[1]);
        })
    } else {
        let table = tableDefault.cloneNode(true);
        table.style.display = 'flex';
        table.setAttribute('id', `desk-${desksOrDesk.length}`);
        table.querySelector('.info > h4').innerHTML = desksOrDesk.name;
        table.querySelector('.info > p').innerHTML = desksOrDesk.description;
        document.getElementById('section').insertBefore(table, document.getElementById('section').children[1]);
    }
}