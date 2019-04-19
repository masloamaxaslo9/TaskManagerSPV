function validator(formName) {
    event.preventDefault();

    // Start logic
    if (formName === 'loginForm') {
        return loginValidator();
    } else if (formName === 'registerForm') {
        return registerValidator();
    } else if (formName === 'formCreateDesk') {
        return createDeskValidator();
    } else if (formName === 'formCreateColumn') {
        return createColumnValidator();
    } else if (formName === 'formCreateTask') {
        return createTaskValidator();
    } else if (formName === 'createComment') {
        return createCommentValidator();
    } else if (formName === 'replyComment') {
        return createReplyValidator();
    } else if (formName === 'modalAddUser') {
        return addUserOnDeskValidator();
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

    // Modal Create Desk validation
    function createDeskValidator() {
        let form = document.forms.formCreateDesk,
            title = form.elements.title,
            description = form.elements.description;

        // arrAllData, itemsWithHasError, for remove class has-error at click
        let arrAllData = [title, description];

        let itemsWithHasError = arrAllData.filter(function (item) {
            return item.parentElement.classList.contains('has-error');
        });
        itemsWithHasError.forEach(function (item) {
            item.parentElement.classList.remove('has-error');
        });

        // Title
        if (title.value === '' || title.value > 50) {
            title.parentElement.classList.add('has-error');
            return false;
        }

        //Description
        if(description.value === '' || description.value > 200) {
            description.parentElement.classList.add('has-error');
            return false;
        }

        return true;

    }

    // Modal Create Column validation
    function createColumnValidator() {
        let form = document.forms.formCreateColumn,
            name = form.elements.name;

        // arrAllData, itemsWithHasError, for remove class has-error at click
        let arrAllData = [name];

        let itemsWithHasError = arrAllData.filter(function (item) {
            return item.parentElement.classList.contains('has-error');
        });
        itemsWithHasError.forEach(function (item) {
            item.parentElement.classList.remove('has-error');
        });

        // Name
        if (name.value === '' || name.value > 50) {
            name.parentElement.classList.add('has-error');
            return false;
        }

        return true;

    }

    // Modal Create Task validation
    function createTaskValidator() {
        let form = document.forms.formCreateTask,
            name = form.elements.name,
            description = form.elements.description,
            task_deadline = form.elements.deadline,
            priority = form.elements.priority;

        // arrAllData, itemsWithHasError, for remove class has-error at click
        let arrAllData = [name, description, task_deadline, priority];

        let itemsWithHasError = arrAllData.filter(function (item) {
            return item.parentElement.classList.contains('has-error');
        });
        itemsWithHasError.forEach(function (item) {
            item.parentElement.classList.remove('has-error');
        });

        // Name
        if (name.value === '' || name.value > 50) {
            name.parentElement.classList.add('has-error');
            return false;
        }

        // Description
        if (description.value === '' || description.value > 1500) {
            description.parentElement.classList.add('has-error');
            return false;
        }

        // Deadline
        let arrYearMonthDay = task_deadline.value.split('-');
        let arrNormalYearMonthDay = new Date().toDateInputValue().split('-');
        let counter = 0;
        let result = arrYearMonthDay.map((item, i) => {
            if (i === counter) item < arrNormalYearMonthDay[i] ? task_deadline.parentElement.classList.add('has-error') : counter++;
            if (task_deadline.parentElement.classList.contains('has-error')) return false;
        });

        for (let i = 0; i <= result.length; i++) if (result[i] === false) return false;

        return true;

    }

    // Create Comment
    function createCommentValidator() {
        let inputComment = document.getElementById('input-task-comment');
        inputComment.parentElement.classList.remove('has-error');
        if(inputComment.value === '' || inputComment.value.length > 500) {
            inputComment.parentElement.classList.add('has-error');
            return false;
        }

        return true;

    }

    // Create Reply for comment
    function createReplyValidator() {
        let inputReply = document.getElementById('active-reply').querySelector('input');
        if (inputReply.value === '') {
            return false
        } else {
            return true;
        }
    }
    
    //
    function addUserOnDeskValidator() {
        let inputEmailUser = document.getElementById('input-email-form-add-user');

        // Email
        if (inputEmailUser.value.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i) === null) {
            inputEmailUser.parentElement.classList.add('has-error');
            return false;
        }
        return true;
    }
}