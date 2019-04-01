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
        let form = document.forms.registerForm,
            username = form.elements.userNameReg,
            password = form.elements.passwordReg,
            passwordConfirm = form.elements.passwordRegConf,
            email = form.elements.emailReg,
            firstName = form.elements.firstNameReg,
            lastName = form.elements.lastNameReg;

        // arrAllData, itemsWithHasError, for remove class has-error at click
        let arrAllData = [username, password, passwordConfirm, email, firstName, lastName];

        let itemsWithHasError = arrAllData.filter(function (item) {
            return item.parentElement.classList.contains('has-error');
        });
        itemsWithHasError.forEach(function (item) {
            item.parentElement.classList.remove('has-error');
        });

        // Username
        if (username.value === '' || username.value > 100) {
            username.parentElement.classList.add('has-error');
            return false;
        }

        // Password
        if (password.value === '' || username.value > 200) {
            password.parentElement.classList.add('has-error');
            return false;
        }

        // Password Confirm
        if (passwordConfirm.value !== password.value) {
            passwordConfirm.parentElement.classList.add('has-error');
            return false;
        }

        // Email
        if (email.value.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i) === null) {
            email.parentElement.classList.add('has-error');
            return false;
        }

        // First name
        if(firstName.value === '') {
            firstName.parentElement.classList.add('has-error');
            return false;
        }

        // Last name
        if(lastName.value === '') {
            lastName.parentElement.classList.add('has-error');
            return false;
        }

        return true;

    }
}