function createTask(obj, formName, url) {
    console.log(obj);
    console.log('======================================');
    console.log(formName);
    console.log('======================================');
    console.log(url);


    let csrftoken = getCookie('csrftoken');  // 'X-CSRFToken': csrftoken, // 'Accept': 'application/json',
    let boundary = String(Math.random()).slice(2);
    let boundaryMiddle = '--' + boundary + '\r\n';
    let boundaryLast = '--' + boundary + '--\r\n';

    let body = ['\r\n'];
    for (let key in obj) {
        // добавление поля
        body.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n' + obj[key] + '\r\n');
    }

    body = body.join(boundaryMiddle) + boundaryLast;

// Тело запроса готово, отправляем

    let xhr = new XMLHttpRequest();
    xhr.open('POST', `https://evening-inlet-45238.herokuapp.com${url}`, false);

    xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
    xhr.setRequestHeader('Cookie', document.cookie);
    // xhr.setRequestHeader('X-CSRFToken', csrftoken);
    xhr.setRequestHeader("Accept", "application/json");

    xhr.onreadystatechange = function() {
        if (this.readyState !== 4) return;

        console.log( this.response );
    };

    xhr.send(body);
    
}