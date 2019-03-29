function validator(formName) {
    event.preventDefault();

    // Start logic
    if (formName === 'loginForm') {
        return loginValidator();
    } else if (formName === 'registerForm') {
        return registerValidator();
    }

    // Login validation
    function loginValidator() {
        let form = document.forms.loginForm;
        let email = form.elements.email;
        let password = form.elements.password;

        if (email.parentElement.classList.contains('has-error')) email.parentElement.classList.remove('has-error');
        if (password.parentElement.classList.contains('has-error')) password.parentElement.classList.remove('has-error');

        // Email
        if (email.value.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i) === null) {
            email.parentElement.classList.add('has-error');
            return false;
        }

        // Password
        if (password.value === '' || password.value.length >= 200) {
            password.parentElement.classList.add('has-error');
            return false;
        }

        return true;

    }

    // Register validation
    function registerValidator() {

    }
}