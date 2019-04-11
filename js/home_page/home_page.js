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
            table.setAttribute('data-id-desk', desk.id);
            table.querySelector('.info > h4').innerHTML = desk.name;
            table.querySelector('.info > p').innerHTML = desk.description;
            document.getElementById('section').insertBefore(table, document.getElementById('section').children[1]);
        })
    } else {
        let table = tableDefault.cloneNode(true);
        table.style.display = 'flex';
        table.setAttribute('id', `desk-${desksOrDesk.length}`);
        table.setAttribute('data-id-desk', desksOrDesk.id);
        table.querySelector('.info > h4').innerHTML = desksOrDesk.name;
        table.querySelector('.info > p').innerHTML = desksOrDesk.description;
        document.getElementById('section').insertBefore(table, document.getElementById('section').children[1]);
    }
}

// Click of the desk

document.getElementById('section').addEventListener('click', clickOnDesk);

function clickOnDesk(event) {

    let target = event.target;

    while (target !== this) {
        if (target.tagName === 'A') {
            setCookie('desk_id', target.getAttribute('data-id-desk'));
            return;
        }
        target = target.parentNode;
    }

}