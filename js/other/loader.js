function loaderFunc(require) {
    let loaderObj = {
        show: function () {
            let loader  = document.createElement('div');
            loader.id = 'active-loader';
            loader.classList.add('loading' , 'loading-lg');
            document.body.appendChild(loader);
        },
        hide: function () {
            let loader = document.getElementById('active-loader');
            document.body.removeChild(loader);
        }
    };

    if (require === 'show') {
        loaderObj.show();
    } else {
        loaderObj.hide();
    }
}