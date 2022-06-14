const ApprovalView = {


    makeCard(type='available', vm) {

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
    updateTitle()   {
        document.querySelector('#content > h1').textContent = 'Genehmigungen'
    },
    showApprovableRequests(){

        let segment = document.querySelector('#approvable-requests')
        segment.style.display = 'flex'
        segment.querySelector('h2').textContent = 'Zu genehmigende Anträge'

    },
    hideAvailableDays() {
        document.querySelector('#available').style.display = 'none'
    },
    updateNewBtn() {
        document.querySelector('#newBtn a').href = ''
    },
    hideAvailableVMs() {
        document.getElementById('available-vms').style.display = 'none'
        document.getElementById('requests').style.display = 'none'
    },
    async display(params) {
        document.querySelectorAll('#requests .card').forEach((it) => {
            it.remove()
        })


        ApprovalView.updateTitle()
        ApprovalView.hideAvailableVMs()
        ApprovalView.hideAvailableDays()
        ApprovalView.showApprovableRequests()


    }


}