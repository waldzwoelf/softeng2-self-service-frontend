document.getElementById('thisform').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById("errors").innerHTML = "";

    let switchValue = document.getElementById('switch-value').checked;
    if (switchValue) {
        signIn();

    } else {
        register();
    }
})

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
    const form = document.getElementById('thisform');
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;
    const passwordconfirm = form.elements['password_confirmation'].value;
    const role = form.elements['role'];
    const rolevalue = role.options[role.selectedIndex].value;

    const registerdata = {
        "name": name,
        "email": email,
        "password": password,
        "password_confirmation": passwordconfirm,
        "role": rolevalue
    }

    fetch('https://auth.ber.ski/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerdata)
    }).then(response => response.json())
        .then(data => {
            const json = JSON.parse(data);

            // Data inputted not correct => output Error messages in error paragraph
            if (!json.hasOwnProperty('user')) {
                for (const item in json) {
                    json[item].forEach(errormsg => {
                        document.getElementById("errors").innerHTML += (errormsg + "<br>");
                    });
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function signIn() {
    const form = document.getElementById('thisform');
    const email = form.elements['email'].value;
    const passwort = form.elements['password'].value;

    const data = {
        "email": email,
        "password": passwort
    };

    fetch('https://auth.ber.ski/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            // Data inputted not correct => output Error messages in error paragraph
            if (!data.hasOwnProperty('user')) {
                for (const item in data) {

                    data[item].forEach(errormsg => {
                        document.getElementById("errors").innerHTML += (errormsg + "<br>");
                    });
                }
            } else {

                // JWT in Cookie speichern und auch die Homepage weiterleiten
                const JWT = data.access_token;
                const expire_time = data.expires_in;
                setCookie("JWT", JWT, expire_time)
            }

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// auxilerie function to get a cookie with name of cname
function getCookie(cname) {
    let name = cname + "=";

    // let decodedCookie = decodeURIComponent(document.cookie);
    //let ca = decodedCookie.split(';');

    let ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exseconds) {
    const d = new Date();
    d.setTime(d.getTime() + (exseconds * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// returns a user json with proporties [name, email, updated_at, created_at, id, role, email_verified_at] using the JWT stored inside the cookie
async function getUser() {
    try {
        let res = await fetch('https://auth.ber.ski/api/auth/user-profile', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + getCookie("JWT")
            }
        })
        let user = await res.json();
        console.log(user);
        return user;
    } catch (error) {
        console.log(error);
    }
}

// gets old JWT from Cookie and sends it to backend, which delivers a new JWT and replaces the old cookie with the new one
function refreshToken() {
    fetch('https://auth.ber.ski/api/auth/refresh', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + getCookie("JWT"),
        }
    })
        .then(response => response.json())
        .then(data => {
            // Data inputted not correct => output Error messages in error paragraph
            if (!data.hasOwnProperty('user')) {
                for (const item in data) {

                    data[item].forEach(errormsg => {
                        //TODO Fehlerbehandlung ändern für refresh
                        document.getElementById("errors").innerHTML += (errormsg + "<br>");
                    });
                }
            } else {
                // JWT in Cookie speichern
                const JWT = data.access_token;
                const expire_time = data.expires_in;

                setCookie("JWT", JWT, expire_time)
            }

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}