let form = document.querySelector('#form-vm');

function submitProvisioningRequest(event) {
    event.preventDefault();


    let data = {
        virtualMachineType: parseInt(form.querySelector('#environment').value),
        description: form.querySelector('#description').value,
        employeeEmailAddress: form.querySelector('#email').value

    }

    fetch('https://provisioningserviceapi.azurewebsites.net/provisioning/api/RequisitionNotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then((res) => {
        if (res.status === 201) {
            alert('Antrag abgeschickt!')
        } else {
            alert('Etwas ist schief gelaufen...')
        }
    })
}

form.addEventListener('submit', submitProvisioningRequest);