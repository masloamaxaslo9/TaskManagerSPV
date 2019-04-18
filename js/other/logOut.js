document.getElementById('log-out-account').addEventListener('click', logOut);

function logOut() {
    // Delete cookie
    let cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    let csrftoken = getCookie('csrftoken');
    let option = {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
            'Content-Type': contentType
        },
        credentials: 'include'
    };

    request(`http://127.0.0.1:8000/api-users/logout/`, option, callBackLogOut);

    function callBackLogOut(result) {
        console.log(result);
    }

    window.location.replace(window.location.origin);
    event.preventDefault();
}