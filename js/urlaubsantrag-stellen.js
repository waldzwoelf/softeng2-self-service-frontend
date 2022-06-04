function sendVacationRequest() {
  // dann gegen richtige ID austauschen, die wa durch den login bkommen
  let DBGID = -1

  let form = document.querySelector('.form-urlaub')

  let data = {
    userId: DBGID,
    startDate: new Date(form.querySelector('input[name="von"]').value).getTime(),
    endDate: new Date(form.querySelector('input[name="bis"]').value).getTime(),
    comment: form.querySelector('textarea[name="comment"]').value,
    status: 'beantragt',
  }

  fetch('https://studium.webfajo.de/mitarbeiter/antragstellung', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
