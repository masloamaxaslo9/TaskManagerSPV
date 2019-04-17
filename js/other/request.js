function request(url, option, requestCallback) {
    loaderFunc('show');
    fetch(url, option)
        .then(function (response) {
            return response;
        })
        .then(function (data) {
            setTimeout(loaderFunc, 0, 'hide');
            requestCallback(data); // temporarily !!!
        })
        .catch(function (error) {
            console.log(error.message);
        });
}