const VacationView = {
  makeCard(vacation) {
    let frag = new DocumentFragment()
    let zeit = frag.appendChild(document.createElement('div'))
    zeit.appendChild(document.createElement('h3')).textContent = 'Zeitraum'
    zeit.appendChild(document.createElement('span')).textContent = `${vacation.dayCount} Tage`
    zeit.appendChild(document.createElement('span')).textContent = `von ${new Date(
      vacation.startDate
    ).toLocaleDateString('de-DE')}`
    zeit.appendChild(document.createElement('span')).textContent = `bis ${new Date(vacation.endDate).toLocaleDateString(
      'de-DE'
    )}`

    let status = frag.appendChild(document.createElement('div'))
    let statusText = status.appendChild(document.createElement('h3'))
    if (vacation.status === 'genehmigt') {
      //string kommt vom backend dann
      statusText.textContent = 'Genehmigt'
      statusText.style.color = 'green'
    } else if (vacation.status === 'abgelehnt') {
      statusText.textContent = 'Abgelehnt'
      statusText.style.color = 'red'
    } else {
      statusText.textContent = 'Offen'
      statusText.style.color = 'orange'
    }

    frag.appendChild(document.createElement('p')).textContent = vacation.comment || 'Kein Kommentar'

    let card = makeGenericCard(frag)
    return card
  },
  showAvailableDays(days) {
    let segment = document.getElementById('available')
    segment.style.display = 'flex'
    segment.querySelector('h3').textContent = `${days} Tage`
  },
  hideAvailableVMs() {
    document.getElementById('available-vms').style.display = 'none'
  },
  updateTitle() {
    document.querySelector('#content > h1').textContent = 'Urlaub'
  },
  updateNewBtn() {
    document.querySelector('#newBtn a').href = '/urlaubsantrag-stellen'
  },
  async display(params) {
    document.querySelectorAll('#requests .card').forEach((it) => {
      it.remove()
    })
    this.updateTitle()
    this.updateNewBtn()
    this.hideAvailableVMs()

    let user = await getUser()

    // available days

    try {
      let res = await fetch(`https://studium.webfajo.de/mitarbeiter/userdata/${user.id}`, {
        headers: {
          Authorization: 'Bearer ' + getCookie('JWT'),
        },
      })
      let userdata = await res.json()
      VacationView.showAvailableDays(userdata.nachAbzugUrlaubsKonto)
    } catch (e) {
      alert('Fehler beim Abrufen der Daten')
    }

    // antrage
    res = await fetch(`https://studium.webfajo.de/mitarbeiter/urlaubsantraege/${user.id}`, {
      headers: {
        Authorization: 'Bearer ' + getCookie('JWT'),
      },
    })
    if (res.status !== 200) {
      document.getElementById('requests').appendChild(makeInfoCard('Keine Anträge vorhanden'))
    }
    let vacations = await res.json()

    console.log(vacations)
    vacations.forEach((vacay) => {
      document.getElementById('requests').appendChild(VacationView.makeCard(vacay))
    })
  },
  dbg() {
    document.querySelectorAll('#requests .card').forEach((it) => {
      it.remove()
    })
    let states = ['genehmigt', 'abgelehnt', 'offen']

    VacationView.updateTitle()
    VacationView.showAvailableDays(17)
    VacationView.hideAvailableVMs()
    VacationView.updateNewBtn()
    for (const i of Array(70).keys()) {
      document.getElementById('requests').appendChild(
        VacationView.makeCard({
          start: `2019-01-${i}`,
          end: `2019-01-${i + 1}`,
          status: states[i % 3],
          comment: 'Malle is nur einmal im Jahr',
        })
      )
    }
  },
}
