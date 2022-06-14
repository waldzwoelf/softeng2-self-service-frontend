const VMView = {
  makeCard(type, vm) {
    // was fuer infos haben wir hier? die felder hier sind jz ausgedacht


    let vmTypes = {
      0: "WindowsServer2022",
      1: "Windows11",
      2: "Ubuntu2204"
    }


    if (type === 'available'){
      let frag = new DocumentFragment()
      let info = frag.appendChild(document.createElement('div'))
      info.appendChild(document.createElement('h3')).textContent = `${vm.ipAddress}`
      info.appendChild(document.createElement('span')).textContent = `Typ: ${vmTypes[vm.virtualMachineType]}`
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
      info.appendChild(document.createElement('span')).textContent = `Typ: ${vmTypes[vm.virtualMachineType]}`
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
    document.querySelectorAll('#requests .card').forEach((it) => {
      it.remove()
    })
    let states = ['genehmigt', 'abgelehnt', 'offen']

    VMView.updateTitle()
    VMView.hideAvailableDays()
    VMView.updateNewBtn()
    VMView.showAvailableVMs()

   // Anträge holen

    let user = await getUser();

      let res = await fetch(`https://provisioningserviceapi.azurewebsites.net/provisioning/api/RequisitionNotes?emailAddress=${user.email}`,{
        headers: {
          Authorization: 'Bearer ' + getCookie('JWT'),
        },
      }).then((res) => {
        if (res.status === 404){
          document.getElementById('requests').appendChild(makeInfoCard('Keine Einträge vorhanden'))
        }
      })
      let antraegeData = await res.json()
      antraegeData.forEach((antrag) => {
      document.getElementById('requests').appendChild(VMView.makeCard('request',antrag))
    })






    // Verfügbare VMs holen und im 'available-vms' Segment anzeigen
    try {
      let vmres = await fetch(`https://provisioningserviceapi.azurewebsites.net/provisioning/api/VirtualEnvironments?emailAddress=${user.email}`, {
        headers: {
          Authorization: 'Bearer ' + getCookie('JWT'),
        },
      })
      console.log('available',vmres.status);
      if (vmres.status === 404){
        document.getElementById('available-vms').appendChild(makeInfoCard2('Keine VMS vorhanden'))
      }else {
      let vmData = await vmres.json()
      vmData.forEach((vmObj) => {
        document.getElementById('available-vms').appendChild(VMView.makeCard('available', vmObj))

      })

      }
    } catch (e) {
      console.log(e);
    }
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

  },
}
