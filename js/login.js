// logic fuer login backend requests
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
        buttonText.innerText = 'Sign up';

    }
}

function onSubmitPress() {
    let switchValue = document.getElementById('switch-value').checked;
    if (switchValue) {
        signIn();

    } else {
        register();
    }

}

function register() {
    console.log("SEND Register");
}

function signIn() {
    console.log("SEND Sign In");

}