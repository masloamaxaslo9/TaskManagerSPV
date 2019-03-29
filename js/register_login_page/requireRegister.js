// // Get Data Register
// let userRegister = {};
//
// document.getElementById('register-submit').addEventListener('click', getDataRegister);
// document.getElementById('register-submit').addEventListener('click', requireDataRegister);
//
// function getDataRegister(event) {
//     let userData = document.querySelectorAll('.register-form > form > div > input'); // All inputs
//
//     userRegister = {
//         username: userData[0].value,
//         password: userData[1].value,
//         password_confirm: userData[2].value,
//         email: userData[3].value,
//         first_name: userData[4].value,
//         last_name: userData[5].value
//     };
//
//     if (userRegister.password !== userRegister.password_confirm) {
//         document.getElementById('input-password-confirm').parentElement.classList.add('has-error');
//         return false
//     }
//
//     event.preventDefault(); // temporarily !!!
// }
//
// function requireDataRegister(event) {
//     fetch('js/json.json', {
//         method: 'post',
//         body: JSON.stringify(userRegister)
//     })
//         .then(function (response) {
//             console.log(response.status);
//             return response.json();
//         })
//         .then(function (data) {
//             return data // temporarily !!!
//
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
//     event.preventDefault();
// }