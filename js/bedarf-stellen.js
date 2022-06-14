let form = document.querySelector('#form-vm');

async function submitProvisioningRequest(event) {
     event.preventDefault();


    let user = await getUser()



    let data = {
        virtualMachineType: parseInt(form.querySelector('#environment').value),
        description: form.querySelector('#description').value,
        employeeEmailAddress: user.email

    }


    fetch('https://provisioningserviceapi.azurewebsites.net/provisioning/api/RequisitionNotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('JWT')
        },
        body: JSON.stringify(data),
    }).then((res) => {
        if (res.status === 201) {
            alert('Antrag abgeschickt!')
            window.location.href = '/'
            // VMView.display()
        } else {
            alert('Etwas ist schief gelaufen...')
        }
    })
}

form.addEventListener('submit', submitProvisioningRequest);