// logic fuer login backend requests
// check if already logged in? (kommt aufs backend an ob das so geht)


function toggle() {
    let register = document.getElementById('register-header');
    let login = document.getElementById('login-header');
    let roleSelect = document.getElementById('role');
    let roleLabel = document.getElementById('role-label');
    let switchValue = document.getElementById('switch-value').checked;
    let buttonText = document.getElementById('submit-button');
    if (switchValue){
        register.style.display= 'none';
        login.style.display = 'block';
        roleSelect.style.display = 'none';
        roleLabel.style.display = 'none';
        buttonText.innerText = 'Sign in'
    } else {
        register.style.display = 'block';
        login.style.display = 'none';
        roleSelect.style.display = 'block';
        roleLabel.style.display = 'block';
        buttonText.innerText = 'Sign up';
    }
}



