// Animation for form[login] and form[register] (checkbox)

function changeLoginOrRegister() {
  document.getElementById('change-box').addEventListener('input', function (event) {
    let  login_register_forms = document.getElementById('forms');
    if(event.target.checked) {
      return login_register_forms.classList.add('register');
    }
    login_register_forms.classList.remove('register');
  });
}

changeLoginOrRegister();