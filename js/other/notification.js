function notification(status, result) {
    let elementNotification = document.getElementById('notification');
    if(status === 201) {
        elementNotification.classList.toggle('active');
    }
    setTimeout(deleteNotification, 5000, elementNotification);
    document.querySelector('#notification > .btn-clear').addEventListener('click', deleteNotification.bind(null, elementNotification));
}
function deleteNotification(elementNotification) {
    elementNotification.classList.remove('active')
}
