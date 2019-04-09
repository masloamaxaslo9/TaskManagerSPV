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
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(userLogin)
      };

      requireAuth('http://127.0.0.1:8000/api-users/login/', option, requireAuthCallbackLogin);

      function requireAuthCallbackLogin(data) {
          if (data.status !== 200) {
              let div = document.createElement('div');
              div.classList.add('error');
              div.innerText = data.statusText;
              document.forms.loginForm.appendChild(div);
          } else {
              document.forms.loginForm.submit();
          }
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
    password2: userData[2].value,
    email: userData[3].value,
    first_name: userData[4].value,
    last_name: userData[5].value
  };

  if (!validator('registerForm')) {
      return false;
  } else {
      let option = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(userRegister)
      };

      requireAuth('http://127.0.0.1:8000/api-users/register/', option, requireAuthCallbackRegister);

      function requireAuthCallbackRegister(data) {

          if (data.status !== 201) {
              let forTextError = data.json();
              forTextError
                  .then((result) => {
                      console.log(result);
                      if(result.username) {
                          document.getElementById('error').innerText = result.username;
                      } else if(result.email) {
                          document.getElementById('error').innerText = result.email;
                      }
                  })
          } else {
              document.forms.registerForm.submit();
          }
      }
  }

}

// Close Require Register
