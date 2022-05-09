const VacationView = {
  makeCard(vacation) {
    let frag = new DocumentFragment()
    let zeit = frag.appendChild(document.createElement('div'))
    zeit.appendChild(document.createElement('h3')).textContent = 'Zeitraum'
    zeit.appendChild(document.createElement('span')).textContent = `von ${vacation.start}`
    zeit.appendChild(document.createElement('span')).textContent = `bis ${vacation.end}`

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

    frag.appendChild(document.createElement('p')).textContent = vacation.comment

    let card = makeGenericCard(frag)
    return card
  },
  insertAvailableDays(days) {
    let segment = document.getElementById('available')
    segment.appendChild(document.createElement('h3')).textContent = `${days} Tage`
  },
  updateTitle() {
    document.querySelector('#content > h1').textContent = 'Urlaub'
  },
  display(params) {
    //backend und dann in '#requests' rein
  }
}


//dbg
let states = ['genehmigt', 'abgelehnt', 'offen']

VacationView.updateTitle()
VacationView.insertAvailableDays(17)
for (const i of Array(70).keys()) {
  document.getElementById('requests').appendChild(
    VacationView.makeCard({
      start: `2019-01-${i}`,
      end: `2019-01-${i + 1}`,
      status: states[i % 3],
      comment: 'Malle is nur einmal im Jahr'
    })
  )
}
//
