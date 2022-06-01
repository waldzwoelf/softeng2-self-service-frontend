const VMView = {
  makeCard(vm) {
    // was fuer infos haben wir hier? die felder hier sind jz ausgedacht
    let frag = new DocumentFragment()
    let info = frag.appendChild(document.createElement('div'))
    info.appendChild(document.createElement('h3')).textContent = `${vm.ipAdress}`
    info.appendChild(document.createElement('span')).textContent = `Typ: ${vm.virtualMachineType}`
    info.appendChild(document.createElement('span')).textContent = `Username/Password:`
    info.appendChild(document.createElement('span')).textContent = `${vm.username}`
    info.appendChild(document.createElement('span')).textContent = `${vm.initialPassword}`

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
    frag.appendChild(document.createElement('p')).textContent = vm.description

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
          virtualMachineType: 0,
          description: "Dikka was",
          ipAdress: "255.255.255.255",
          username: "bvyuk4fds",
          initialPassword: "fsdfe88943nsifgdf",
          status: states[i % 3]
        })
      )
    }
  },
}
