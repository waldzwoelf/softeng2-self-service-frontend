const VMView = {
  makeCard(type, vm) {
    // was fuer infos haben wir hier? die felder hier sind jz ausgedacht


    if (type === 'available'){
      let frag = new DocumentFragment()
      let info = frag.appendChild(document.createElement('div'))
      info.appendChild(document.createElement('h3')).textContent = `${vm.ipAddress}`
      info.appendChild(document.createElement('span')).textContent = `Typ: ${vm.virtualMachineType}`
      info.appendChild(document.createElement('span')).textContent = `Username/Password:`
      info.appendChild(document.createElement('span')).textContent = `${vm.username}`
      info.appendChild(document.createElement('span')).textContent = `${vm.initialPassword}`

      frag.appendChild(document.createElement('p')).textContent = vm.description

      let card = makeGenericCard(frag)
      return card

    }
    if (type === 'request') {
      let frag = new DocumentFragment()
      let info = frag.appendChild(document.createElement('div'))
      info.appendChild(document.createElement('h3')).textContent = `${vm.employeeEmailAddress}`
      let vmType = ""
      if (vm.virtualMachineType === 0){
        vmType = "WindowsServer2022"
      } else if(vm.virtualMachineType === 1){
        vmType = "Windows11"
      } else if (vm.virtualMachineType === 2){
        vmType = "Ubuntu2204"
      }
      info.appendChild(document.createElement('span')).textContent = `Typ: ${vmType}`
      info.appendChild(document.createElement('p')).textContent = vm.description
      let status = frag.appendChild(document.createElement('div'))
      let statusText = status.appendChild(document.createElement('h3'))
       if(vm.businessApprovalState === 0){
        statusText.textContent = 'Genehmigt'
        statusText.style.color = 'green'
      } else if(vm.businessApprovalState === 1){
        statusText.textContent = 'Abgelehnt'
        statusText.style.color = 'red'
      }else if (vm.businessApprovalState === 2) {
         statusText.textContent = 'Offen'
         statusText.style.color = 'orange'
       }

      let card = makeGenericCard(frag)
      return card

    }



  },
  updateTitle() {
    document.querySelector('#content > h1').textContent = 'Bedarf'
  },
  showAvailableVMs(){
    let segment = document.getElementById('available-vms')
    segment.style.display = 'flex'
   segment.querySelector('h2').textContent = `Verfügbare VMs`
  },

  hideAvailableDays() {
    document.getElementById('available').style.display = 'none'
  },
  updateNewBtn() {
    document.querySelector('#newBtn a').href = '/new_vm'
  },
  async display(params) {
    // die ganzen andere funktionen hier aufrufen, wie im dbg
    //backend und dann in '#requests' rein
    // sortien nach status? genehmigt -> offen -> abgelehnt
      this.dbg()

   // Anträge holen

    let antraege = await fetch('https://provisioningserviceapi.azurewebsites.net/provisioning/api/RequisitionNotes', )

    let antraegeData = await antraege.json()
    antraegeData.forEach((antrag) => {
      document.getElementById('requests').appendChild(VMView.makeCard('request',antrag))
    })


    // Verfügbare VMs holen und im 'available-vms' Segment anzeigen
      let res = await fetch('https://provisioningserviceapi.azurewebsites.net/provisioning/api/VirtualEnvironments')
      let vmData = await res.json()

      vmData.forEach((vmObj) => {
          document.getElementById('available-vms').appendChild(VMView.makeCard('available',vmObj))
      })
    //remove this
    //this.dbg()
  },
  dbg() {
    document.querySelectorAll('#requests .card').forEach((it) => {
      it.remove()
    })
    let states = ['genehmigt', 'abgelehnt', 'offen']

    VMView.updateTitle()
    VMView.hideAvailableDays()
    VMView.updateNewBtn()
    VMView.showAvailableVMs()
    /*for (const i of Array(70).keys()) {
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
    }*/
  },
}
