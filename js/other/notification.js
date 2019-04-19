function notification(status) {
    let elementNotification = document.getElementById('notification');
    if(status === 201 || status === 200 || status === 204) {
        elementNotification.childNodes[2].textContent = 'Successfully';
        elementNotification.classList.toggle('active');
    } else if (status === 403) {
        elementNotification.childNodes[2].textContent = 'Permission Denied';
        elementNotification.classList.toggle('active-error')
    }
    setTimeout(deleteNotification, 5000, elementNotification);
    document.querySelector('#notification > .btn-clear').addEventListener('click', deleteNotification.bind(null, elementNotification));
}
function deleteNotification(elementNotification) {
    elementNotification.classList.remove('active');
    elementNotification.classList.remove('active-error');
}
