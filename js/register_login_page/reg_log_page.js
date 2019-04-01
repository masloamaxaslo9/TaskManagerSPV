// Animation for form[login] and form[register] (checkbox)

document.getElementById('change-box').addEventListener('input', changeLoginOrRegister); // Event for change input Login/Register

function changeLoginOrRegister() {
  let  login_register_forms = document.getElementById('all_forms');
  if(event.target.checked) {
    return login_register_forms.classList.add('register');
  }
  login_register_forms.classList.remove('register');
}

// Close Animation

// Require login

let userLogin = {};

// document.getElementById('login-submit').addEventListener('click', validator.bind(null, 'loginForm')); // Start validator
document.getElementById('login-submit').addEventListener('click', getDataLogin);

function getDataLogin(event) {
  // event.preventDefault();

  let userData = document.querySelectorAll('.login-form > form > div > input'); // All inputs

  userLogin = {
    email: userData[0].value,
    password: userData[1].value
  };

  if (!validator('loginForm')) {
    return false;
  } else {
      let option = {
          method: 'POST',
          body: JSON.stringify(userLogin)
      };

      requireAuth('http://localhost:3000/clients', option, requireAuthCallbackLogin);

      function requireAuthCallbackLogin(data) {
        document.forms.loginForm.submit();
      }
  }
}

// Close Require Login

// Require Register

let userRegister = {};

document.getElementById('register-submit').addEventListener('click', getDataRegister);

function getDataRegister(event) {
  // event.preventDefault();

  let userData = document.querySelectorAll('.register-form > form > div > input'); // All inputs

  userRegister = {
    username: userData[0].value,
    password: userData[1].value,
    password_confirm: userData[2].value,
    email: userData[3].value,
    first_name: userData[4].value,
    last_name: userData[5].value
  };

  if (!validator('registerForm')) {
      return false;
  } else {
      let option = {
          method: 'post',
          body: JSON.stringify(userRegister)
      };

      requireAuth('http://localhost:3000/clients', option, requireAuthCallbackRegister);

      function requireAuthCallbackRegister(data) {
          console.log(data);
          document.forms.registerForm.submit();
      }
  }

}

// Close Require Register
