async function sendVacationRequest() {
  let user = await getUser()

  let form = document.querySelector('.form-urlaub')

  let data = {
    userId: user.id,
    startDate: new Date(form.querySelector('input[name="von"]').value).getTime(),
    endDate: new Date(form.querySelector('input[name="bis"]').value).getTime(),
    status: 'beantragt',
  }

  fetch('https://studium.webfajo.de/mitarbeiter/antragstellung', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('JWT'),
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status === 200) {
      alert('Antrag erfolgreich gesendet')
      window.location.href = '/'
    } else {
      alert('Fehler beim Senden des Antrags')
    }
  })

  return false
}
