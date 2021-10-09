const backendApi = 'https://tony-json-server.herokuapp.com';

// get elements
const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

function getUsers(callback) {
    fetch(`${backendApi}/api/users`)
        .then(response => response.json())
        .then(callback)
};

form.addEventListener('submit', function(event) {
    event.preventDefault();
    checkLogin();
});

function checkLogin() {
    getUsers(responseData => {
        const usersList = responseData.data;

        const emailValue = emailInput.value;
        const passwordValue = passwordInput.value;
        // console.log('u need: ', emailValue)
        // console.log('u need: ', passwordValue)

        console.log(usersList);

        const existUser = usersList.some(user => user.email === emailValue && user.password === passwordValue);
        // if(user.email === emailValue && user.password === passwordValue) {
        //     window.location.href = '../../registerPage.html'
        // }
        if(existUser === true) {
            window.location.href = '../../index.html'
        }
        else {
            alert('something wrong or missing. Please check your email and password again!')
        }
    });
};

// checkLogin();

