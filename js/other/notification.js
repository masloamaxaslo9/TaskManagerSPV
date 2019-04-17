function notification(status) {
    let elementNotification = document.getElementById('notification');
    if(status === 201 || status === 200) {
        elementNotification.classList.toggle('active');
    }
    setTimeout(deleteNotification, 5000, elementNotification);
    document.querySelector('#notification > .btn-clear').addEventListener('click', deleteNotification.bind(null, elementNotification));
}
function deleteNotification(elementNotification) {
    elementNotification.classList.remove('active')
}
