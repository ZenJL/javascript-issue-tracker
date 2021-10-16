const backendApi = 'https://tony-json-server.herokuapp.com';

// get elements
const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loading = document.getElementById('loading');
// loading.style.display = 'none';


let usersList = [];

function getUsers(callback) {
    fetch(`${backendApi}/api/users`)
        .then(response => response.json())
        .then(callback)
};

getUsers(responseData => usersList = responseData.data);

form.addEventListener('submit', function(event) {
    loading.style.display = 'block';
    event.preventDefault();
    checkLogin();
    
});

function checkLogin() {

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    // console.log('u need: ', emailValue)
    // console.log('u need: ', passwordValue)

    setTimeout(() => {
        loading.style.display = 'none';
    }, 1500);

    console.log(usersList);

    const existUser = usersList.filter(user => {
        return user.email === emailValue;
    });
    console.log('u need: ', existUser);

    // invalid email
    if(existUser.length > 0) {
        if(existUser[0].password === passwordValue) {
            loading.classList.add('active');
            localStorage.setItem('user', email.value);
            if (localStorage.getItem('user') !== null) {
                setTimeout(() => {
                    window.location.href = '../../index.html'
                }, 1500);
            };
        };

        if(existUser[0].password !== passwordValue) {
            const showPassError = document.getElementById('password-error-mess');
            passwordInput.style.border = "1px solid red";
            showPassError.style.display = "block";
            showPassError.innerHTML = "The password incorrect. Please check your password again.";
        };

    }
    else {
        const showEmailError = document.getElementById('email-error-mess');
        emailInput.style.border = "1px solid red";
        showEmailError.style.display = "block";
        showEmailError.innerHTML = "The email hasn't been registered yet. Please check your email and try again.";
    };


    // const existUser = usersList.filter(user => user.email === emailValue && user.password === passwordValue);
    // if(user.email === emailValue && user.password === passwordValue) {
    //     window.location.href = '../../registerPage.html'
    // }
    // if(existUser === true) {
    //     window.location.href = '../../index.html'
    // }
    // if()
};


//Password incorrect. Please check your password again.