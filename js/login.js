// logic fuer login backend requests


const form = document.getElementById('thisform');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let switchValue = document.getElementById('switch-value').checked;
    if (switchValue) {
        signIn();

    } else {
        register();
    }
})
// check if already logged in? (kommt aufs backend an ob das so geht)


function toggle() {
    let register = document.getElementById('register-header');
    let login = document.getElementById('login-header');
    let roleSelect = document.getElementById('role');
    let roleLabel = document.getElementById('role-label');
    let switchValue = document.getElementById('switch-value').checked;
    let buttonText = document.getElementById('submit-button');
    let nameInput = document.getElementById('nameInput');
    let pwdconfirmationInput = document.getElementById('pwdconfirmationInput');
    let nameLabel = document.getElementById('name-label');
    let pwdconfLabel = document.getElementById('pwdconf-label');

    if (switchValue) {
        register.style.display = 'none';
        login.style.display = 'block';
        roleSelect.style.display = 'none';
        roleLabel.style.display = 'none';
        nameInput.style.display = 'none';
        pwdconfirmationInput.style.display = 'none';
        nameLabel.style.display = 'none';
        pwdconfLabel.style.display = 'none';
        nameInput.removeAttribute('required');
        pwdconfirmationInput.removeAttribute('required');
        buttonText.innerText = 'Sign in'
    } else {
        register.style.display = 'block';
        login.style.display = 'none';
        roleSelect.style.display = 'block';
        roleLabel.style.display = 'block';
        nameInput.style.display = 'block';
        pwdconfirmationInput.style.display = 'block';
        nameLabel.style.display = 'block';
        pwdconfLabel.style.display = 'block';
        nameInput.setAttribute('required', '');
        pwdconfirmationInput.setAttribute('required', '');
        buttonText.innerText = 'Sign up';

    }
}

function register() {
    console.log("SEND Register");
}

function signIn() {
    console.log("SEND Sign In");

    const data = {};
    data['email'] = form.elements['email'].value;
    data['password'] = form.elements['password'].value;

    const text = JSON.stringify(data);
    console.log('Sending POST with ' + text);

    fetch('https://auth.ber.ski/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);

            // JWT speichern und auch die Homepage weiterleiten
        })
        .catch((error) => {
            console.error('Error:', error);

            // Error ausgabe
        });
}