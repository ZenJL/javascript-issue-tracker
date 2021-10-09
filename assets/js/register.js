// backend api user
const backendApi = 'https://tony-json-server.herokuapp.com';

// get elements
const registerForm = document.getElementById('register-form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('confirm-password');


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

    // validate multiple input
    const inputValues = [
        userFirstName,
        userLastName,
        userEmail,
        userPassword,
        userPassConfirm,
    ];
    const validateInput = inputValues.some(element => element === '');

    if(validateInput === true) {
        alert('Please enter full data');
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

    // call users api to check existed
    fetch(`${backendApi}/api/users`)
        .then(response => response.json())
        .then(responseData => {
            const usersList = responseData.data;
            console.log(usersList)
            const existEmail = usersList.some(element => element.email === userEmail)

            if(existEmail === true) {
                alert('email already registered, please choose another email');
                return;
            };

            // console.log('u need: ', usersList);
            postUser(userInfo);
            
            // window.location.href = './loginPage.html'
        });
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
    // .then(response => response.json())
    // .then(data => console.log(data))
}





