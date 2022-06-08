let form = document.querySelector('#form-vm');

function submitProvisioningRequest(event) {
    event.preventDefault();
    console.log('hello');
    const provAPI = 'https://provisioningserviceapi.azurewebsites.net/provisioning/api/RequisitionNotes';


    let data = {
        virtualMachineType: parseInt(form.querySelector('#environment').value),
        description: form.querySelector('#description').value,
        employeeEmailAddress: form.querySelector('#email').value

    }
    console.log(data);

    let request = new Request(provAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })

    fetch(request)
        .then((res) => {
            if (res.status === 201) {
                alert('Antrag erfolgreich gesendet!')
                // window.location.href = '/'
            } else {
                alert('Fehler beim Senden des Requests')
            }
        })


}

form.addEventListener('submit', submitProvisioningRequest);