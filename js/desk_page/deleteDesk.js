// Open modal for create column

document.getElementById('btn-open-modal-delete-desk').addEventListener('click', openOrCloceModalDeleteDesk); // Open modal
document.getElementById('mask-modal-delete-desk').addEventListener('click', openOrCloceModalDeleteDesk); // Close modal
document.querySelector('#modal-delete-desk > .modal-container > .modal-header > .btn-clear').addEventListener('click', openOrCloceModalDeleteDesk); // Close modal

function openOrCloceModalDeleteDesk() {
    document.getElementById('modal-delete-desk').classList.toggle('active');
}

// Start form require
document.getElementById('btn-delete-desk-no').addEventListener('click', deleteDesk);
document.getElementById('btn-delete-desk-yes').addEventListener('click', deleteDesk);

function deleteDesk(event) {

    if (event.target.id === 'btn-delete-desk-no') {
        event.target.closest('#modal-delete-desk').classList.remove('active'); // Hide Modal
    } else if (event.target.id === 'btn-delete-desk-yes') {

        let csrftoken = getCookie('csrftoken');
        let option = {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': csrftoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };


        request(`http://127.0.0.1:8000/api-desks/${getCookie('desk_id')}/`, option, requestCallbackDeleteDesk);

        function requestCallbackDeleteDesk(result) {
            if (result.status === 204) window.location.replace(window.location.origin + '/pages/homePage.html');
        }
    }
}