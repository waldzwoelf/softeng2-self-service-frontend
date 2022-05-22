const VMView = {
  makeCard(vm) {
    // was fuer infos haben wir hier? die felder hier sind jz ausgedacht
    let frag = new DocumentFragment()
    let info = frag.appendChild(document.createElement('div'))
    info.appendChild(document.createElement('h3')).textContent = `${vm.name}`
    info.appendChild(document.createElement('span')).textContent = `${vm.environment}`
    info.appendChild(document.createElement('span')).textContent = `RAM: ${vm.ram}`
    info.appendChild(document.createElement('span')).textContent = `SSD: ${vm.storage}`
    info.appendChild(document.createElement('span')).textContent = `Erstellt am: ${vm.createdAt}`

    let status = frag.appendChild(document.createElement('div'))
    let statusText = status.appendChild(document.createElement('h3'))
    if (vm.status === 'genehmigt') {
      //string kommt vom backend dann
      statusText.textContent = 'Genehmigt'
      statusText.style.color = 'green'
    } else if (vm.status === 'abgelehnt') {
      statusText.textContent = 'Abgelehnt'
      statusText.style.color = 'red'
    } else {
      statusText.textContent = 'Offen'
      statusText.style.color = 'orange'
    }
    frag.appendChild(document.createElement('p')).textContent = vm.comment

    let card = makeGenericCard(frag)
    return card
  },
  updateTitle() {
    document.querySelector('#content > h1').textContent = 'Bedarf'
  },
  hideAvailableDays() {
    document.getElementById('available').style.display = 'none'
  },
  updateNewBtn() {
    document.querySelector('#newBtn a').href = '/new_vm'
  },
  display(params) {
    // die ganzen andere funktionen hier aufrufen, wie im dbg
    //backend und dann in '#requests' rein
    // sortien nach status? genehmigt -> offen -> abgelehnt

    //remove this
    this.dbg()
  },
  dbg() {
    document.querySelectorAll('#requests .card').forEach((it) => {
      it.remove()
    })
    let states = ['genehmigt', 'abgelehnt', 'offen']

    VMView.updateTitle()
    VMView.hideAvailableDays()
    VMView.updateNewBtn()
    for (const i of Array(70).keys()) {
      document.getElementById('requests').appendChild(
        VMView.makeCard({
          name: `VM${i}`,
          environment: `CoolOS 10.${i}`,
          ram: `${i} GB`,
          storage: `${i*11} GB`,
          createdAt: `2047-01-${i}`,
          status: states[i % 3],
          comment: 'Aufjedenfall nur für die arbeit ;)',
        })
      )
    }
  },
}
