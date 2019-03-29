// Get Data Login
let userLogin = {};

document.getElementById('login-submit').addEventListener('click', getDataLogin);
// document.getElementById('login-submit').addEventListener('click', requireDataLogin);

function getDataLogin(event) {
    let userData = document.querySelectorAll('.login-form > form > div > input'); // All inputs

    userLogin = {
        email: userData[0].value,
        password: userData[1].value
    };
    
    let option = {
        method: 'POST',
        body: JSON.stringify(userLogin)
    };

    event.preventDefault(); // temporarily !!!
}

// Require Data Login

// function requireDataLogin(event) {
//     fetch('http://localhost:3000/clients', {
//         method: 'POST',
//         body: JSON.stringify(userLogin)
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
//
//     event.preventDefault(); // temporarily !!!
// }