// backend api user
const backendApi = 'https://tony-json-server.herokuapp.com';

// get elements
const registerForm = document.getElementById('register-form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('confirm-password');



let usersList = [];

function getUsers(callback) {
    fetch(`${backendApi}/api/users`)
        .then(response => response.json())
        .then(callback)
};

getUsers(responseData => usersList = responseData.data);


// register form event
registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addUser();
});

// add new users
function addUser() {
    // get input value
    const userFirstName = firstName.value;
    const userLastName = lastName.value;
    const userEmail = email.value;
    const userPassword = password.value;
    const userPassConfirm = passwordConfirm.value;

    console.log(usersList);

    const existUser = usersList.filter(user => {
        return user.email;
    });

    // console.log('u need: ', existUser)
    // console.log('value: ', userEmail)
    const duplicateEmail = existUser.some(user => user.email === userEmail);
    console.log('helllo: ', duplicateEmail);
    
    const showEmailError = document.getElementById('email-error-mess');

    if(duplicateEmail === true) {
        showEmailError.style.display = "block";
        showEmailError.innerHTML = "The email has been registered. Please choose another email.";
        return;
    };

    if(userEmail === '') {
        showEmailError.style.display = "block";
        showEmailError.innerHTML = "This field cannot be empty.";
        return;
    };
    
    const showFirstNameError = document.getElementById('firstName-error-mess');
    if(userFirstName === '') {
        showFirstNameError.style.display = "block";
        showFirstNameError.innerHTML = "This field cannot be empty.";
        return;
    };

    const showLastNameError = document.getElementById('lastName-error-mess');
    if(userLastName === '') {
        showLastNameError.style.display = "block";
        showLastNameError.innerHTML = "This field cannot be empty.";
        return;
    };  

    const showPasswordError = document.getElementById('password-error-mess');
    if(userPassword === '') {
        showPasswordError.style.display = "block";
        showPasswordError.innerHTML = "This field cannot be empty.";
        return;
    };

    const showPasswordConfirmError = document.getElementById('passwordConfirm-error-mess');
    if(userPassConfirm === '') {
        showPasswordConfirmError.style.display = "block";
        showPasswordConfirmError.innerHTML = "This field cannot be empty.";
        return;
    };

    if(userPassConfirm !== userPassword) {
        showPasswordConfirmError.style.display = "block";
        showPasswordConfirmError.innerHTML = "The password confirmation does not match.";
        return;
    };


    const userInfo = {
        "firstName": userFirstName,
        "lastName": userLastName,
        "email": userEmail,
        "password": userPassword,
    };

    // {
    //   "avatar": "https://cdn.fakercloud.com/avatars/ManikRathee_128.jpg",
    //   "firstName": "Graham 1",
    //   "lastName": "Leanne",
    //   "email": "aincere@april.biz",
    //   "role": "operator",
    //   "location": [
    //     {
    //       "address": "243 Nguyen Thi Minh Khai",
    //       "district": "Phu Nhuan",
    //       "city": "TP.HCM"
    //     },
    //     {
    //       "address": "425 Nguyen Bieu",
    //       "district": "Phu Nhuan",
    //       "city": "TP.HCM"
    //     }
    //   ]
    // }

        
    // console.log('u need: ', usersList);
    postUser(userInfo);


    const successfulMess = document.getElementById('successful');
    successfulMess.style.display = 'flex';
    successfulMess.style.justifyContent = 'center';
    successfulMess.style.alignItems = 'center'
    
    setTimeout(() => {
        window.location.href = '../../loginPage.html'
    }, 2000)
};


// post user to server
function postUser(postData) {
    fetch(`${backendApi}/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
}





