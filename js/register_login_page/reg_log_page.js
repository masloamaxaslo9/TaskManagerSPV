// Animation for form[login] and form[register] (checkbox)

document.getElementById('change-box').addEventListener('input', changeLoginOrRegister); // Event for change input Login/Register

function changeLoginOrRegister() {
  let  login_register_forms = document.getElementById('all_forms');
  if(event.target.checked) {
    return login_register_forms.classList.add('register');
  }
  login_register_forms.classList.remove('register');
}

// Get Data Login
let userLogin = {};

document.getElementById('login-submit').addEventListener('click', getDataLogin);
document.getElementById('login-submit').addEventListener('click', requireDataLogin);

function getDataLogin(event) {
  let userData = document.querySelectorAll('.login-form > form > div > input'); // All inputs

  userLogin = {
    email: userData[0].value,
    password: userData[1].value
  };

  event.preventDefault(); // temporarily !!!
}

// Require Data Login

function requireDataLogin(event) {
  fetch('http://localhost:3000/clients', {
    method: 'POST',
    body: JSON.stringify(userLogin)
  })
      .then(function (response) {
        console.log(response.status);
        return response.json();
      })
      .then(function (data) {
        return data // temporarily !!!

      })
      .catch(function (error) {
        console.log(error);
      });

  event.preventDefault(); // temporarily !!!
}


// Get Data Register
let userRegister = {};

document.getElementById('register-submit').addEventListener('click', getDataRegister);
document.getElementById('register-submit').addEventListener('click', requireDataRegister);

function getDataRegister(event) {
  let userData = document.querySelectorAll('.register-form > form > div > input'); // All inputs

  userRegister = {
    username: userData[0].value,
    password: userData[1].value,
    password_confirm: userData[2].value,
    email: userData[3].value,
    first_name: userData[4].value,
    last_name: userData[5].value
  };

  if (userRegister.password !== userRegister.password_confirm) {
    document.getElementById('input-password-confirm').parentElement.classList.add('has-error');
    return false
  }

  event.preventDefault(); // temporarily !!!
}

function requireDataRegister(event) {
  fetch('js/json.json', {
    method: 'post',
    body: JSON.stringify(userRegister)
  })
      .then(function (response) {
        console.log(response.status);
        console.log(response.json());
      })
      .catch();
  event.preventDefault();
}